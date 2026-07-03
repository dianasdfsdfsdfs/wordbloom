// Word-list pipeline.
// Pulls open CEFR-graded English vocabulary (CEFR-J A1–B2 + Octanove C1/C2),
// takes a large seeded sample per level, translates EN→RU via the free MyMemory
// API (cached + resumable), fetches a few example sentences per level from
// Tatoeba, and writes src/data/words.generated.ts.
//
// Run:  node scripts/build-words.mjs   (safe to re-run; resumes from the cache)
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const EMAIL = 'vmsinvest@gmail.com'; // raises the free MyMemory quota
const N_PER_LEVEL = 1000; // words per level (capped by what the source has)
const EX_PER_LEVEL = 50; // example sentences fetched per level
const DELAY_MS = 200;
const CACHE_PATH = new URL('./translations-cache.json', import.meta.url);
const EX_CACHE_PATH = new URL('./examples-cache.json', import.meta.url);
const OUT_PATH = new URL('../src/data/words.generated.ts', import.meta.url);

const SOURCES = [
  'https://raw.githubusercontent.com/openlanguageprofiles/olp-en-cefrj/master/cefrj-vocabulary-profile-1.5.csv',
  'https://raw.githubusercontent.com/openlanguageprofiles/olp-en-cefrj/master/octanove-vocabulary-profile-c1c2-1.0.csv',
];

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const POS_MAP = {
  noun: 'noun',
  verb: 'verb',
  adjective: 'adjective',
  adverb: 'adverb',
  preposition: 'preposition',
  conjunction: 'conjunction',
  pronoun: 'pronoun',
};
const mapPos = (p) => POS_MAP[String(p || '').toLowerCase()] ?? 'other';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const eligible = (hw) => /^[a-zA-Z][a-zA-Z'-]{1,23}$/.test(hw);

// Normalise a raw translation: strip edge junk, collapse spaces, lowercase 1st letter.
function clean(t) {
  let s = String(t).trim();
  s = s.replace(/^[\s\-–—•.,;:"'`(){}\[\]]+/, '');
  s = s.replace(/[\s.…\-–—]+$/, '');
  s = s.replace(/\s+/g, ' ').trim();
  return s ? s.charAt(0).toLowerCase() + s.slice(1) : s;
}

function isGood(s) {
  if (!s || !/[а-яё]/i.test(s)) return false;
  if (/[a-z]/i.test(s)) return false;
  if (/[:/]/.test(s) || s.includes('...') || s.includes('…')) return false;
  if (s.length > 36 || s.split(/\s+/).length > 4) return false;
  return true;
}

// Seeded RNG so the per-level selection is reproducible (re-runs hit the cache).
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260702);

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  lines.shift(); // header
  const rows = [];
  for (const line of lines) {
    const [headword, pos, cefr] = line.split(',');
    if (!headword || !cefr) continue;
    rows.push({ headword: headword.trim(), pos: (pos || '').trim(), cefr: (cefr || '').trim() });
  }
  return rows;
}

const cache = existsSync(CACHE_PATH) ? JSON.parse(readFileSync(CACHE_PATH, 'utf8')) : {};
const saveCache = () => writeFileSync(CACHE_PATH, JSON.stringify(cache));
const exCache = existsSync(EX_CACHE_PATH) ? JSON.parse(readFileSync(EX_CACHE_PATH, 'utf8')) : {};
const saveExCache = () => writeFileSync(EX_CACHE_PATH, JSON.stringify(exCache));

const QUOTA = Symbol('quota');

async function translate(word) {
  if (cache[word] !== undefined) return cache[word];
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|ru&de=${encodeURIComponent(EMAIL)}`;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url);
      const j = await res.json();
      const raw = String(j?.responseData?.translatedText ?? '');
      if (j?.responseStatus === 429 || /MYMEMORY WARNING|QUOTA|USAGE LIMIT|too many/i.test(raw)) {
        return QUOTA;
      }
      const t = raw.trim();
      await sleep(DELAY_MS);
      if (t && /[а-яё]/i.test(t) && t.toLowerCase() !== word.toLowerCase()) {
        cache[word] = t;
        return t;
      }
      return null; // no usable translation (don't cache → retry on a later run)
    } catch {
      await sleep(600);
    }
  }
  return null;
}

async function fetchExample(word) {
  if (exCache[word] !== undefined) return exCache[word];
  const url = `https://tatoeba.org/en/api_v0/search?from=eng&to=rus&query=${encodeURIComponent(word)}&sort=relevance&limit=8`;
  const re = new RegExp(`\\b${word.replace(/[^a-zA-Z]/g, '')}`, 'i');
  let picked = null;
  try {
    const j = await (await fetch(url)).json();
    for (const s of j.results || []) {
      const en = String(s.text || '').trim();
      const tr = (s.translations || []).flat().find((t) => t && t.lang === 'rus');
      const ru = tr ? String(tr.text || '').trim() : '';
      if (!en || !ru || en.length < 8 || en.length > 64) continue;
      if (!re.test(en) || !/[а-яё]/i.test(ru)) continue;
      picked = { en, ru };
      break;
    }
  } catch {
    /* ignore network/parse errors */
  }
  if (picked) exCache[word] = picked;
  await sleep(350);
  return picked;
}

function writeOut(words) {
  const out =
    `// AUTO-GENERATED by scripts/build-words.mjs — do not edit by hand.\n` +
    `// English vocabulary: CEFR-J (A1–B2) + Octanove (C1/C2), CC BY-SA;\n` +
    `// Russian translations via MyMemory, example sentences via Tatoeba.\n` +
    `import type { Word } from '@/types/domain';\n\n` +
    `// Stored as a JSON string parsed at load: a multi-thousand-element typed\n` +
    `// array literal overflows the TypeScript checker (TS2590).\n` +
    `export const GENERATED_WORDS: Word[] = JSON.parse(\n  ${JSON.stringify(JSON.stringify(words))},\n);\n`;
  writeFileSync(OUT_PATH, out);
}

async function main() {
  const rows = [];
  for (const src of SOURCES) {
    try {
      rows.push(...parseCsv(await (await fetch(src)).text()));
      console.log(`fetched ${src.split('/').pop()}`);
    } catch (e) {
      console.log(`FAILED to fetch ${src}: ${e}`);
    }
  }

  const seen = new Set();
  const byLevel = Object.fromEntries(LEVELS.map((l) => [l, []]));
  for (const r of rows) {
    const key = r.headword.toLowerCase();
    if (seen.has(key) || !eligible(r.headword) || !byLevel[r.cefr]) continue;
    seen.add(key);
    byLevel[r.cefr].push(r);
  }

  const selected = [];
  for (const lvl of LEVELS) selected.push(...shuffle(byLevel[lvl]).slice(0, N_PER_LEVEL));
  console.log(`selected ${selected.length}:`, LEVELS.map((l) => `${l}:${Math.min(byLevel[l].length, N_PER_LEVEL)}`).join(' '));

  const words = [];
  const exCount = Object.fromEntries(LEVELS.map((l) => [l, 0]));
  let done = 0;
  let skipped = 0;
  let quotaHit = false;

  for (const r of selected) {
    const ru = await translate(r.headword);
    if (ru === QUOTA) {
      console.log(`translation quota reached — stopping at ${done}/${selected.length}`);
      quotaHit = true;
      break;
    }
    done++;
    if (done % 100 === 0) {
      console.log(`processed ${done}/${selected.length} (kept ${words.length}, skipped ${skipped})`);
      saveCache();
      saveExCache();
      if (done % 500 === 0) writeOut(words); // persist partial progress on long runs
    }
    const ru2 = ru ? clean(ru) : '';
    if (!isGood(ru2)) {
      skipped++;
      continue;
    }
    const word = {
      id: `en-${r.cefr.toLowerCase()}-${slug(r.headword)}`,
      lang: 'en',
      level: r.cefr,
      headword: r.headword,
      pos: mapPos(r.pos),
      translations: { ru: ru2 },
    };
    if (exCount[r.cefr] < EX_PER_LEVEL) {
      const ex = await fetchExample(r.headword);
      if (ex) {
        word.example = ex.en;
        word.exampleTranslation = ex.ru;
        exCount[r.cefr]++;
      }
    }
    words.push(word);
  }
  saveCache();
  saveExCache();
  writeOut(words);
  console.log(`WROTE ${words.length} words (skipped ${skipped}${quotaHit ? ', quota-limited — re-run to continue' : ''}) -> src/data/words.generated.ts`);
}

main();
