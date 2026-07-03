// German vocabulary pipeline (quality / exam-oriented).
// Source: abdullahbutt/deutsch-lernen-goethe-a1-c2 — real Goethe/telc exam
// vocabulary A1–C2 with articles and (for A1) example sentences. We parse the
// markdown word lists, translate the headword (and A1 examples) DE→RU via
// MyMemory, and pull Tatoeba examples for levels that lack them.
//
// Run:  node scripts/build-words-de.mjs   (safe to re-run; resumes from cache)
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const EMAIL = 'vmsinvest@gmail.com';
const EX_PER_LEVEL = 45; // Tatoeba examples for levels without built-in ones
const DELAY_MS = 200;
const BASE = 'https://raw.githubusercontent.com/abdullahbutt/deutsch-lernen-goethe-a1-c2/HEAD';
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const CACHE_PATH = new URL('./de-translations-cache.json', import.meta.url);
const EX_CACHE_PATH = new URL('./de-examples-cache.json', import.meta.url);
const OUT_PATH = new URL('../src/data/words-de.generated.ts', import.meta.url);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const slug = (s) =>
  s
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function clean(t) {
  let s = String(t).trim();
  s = s.replace(/^[\s\-–—•.,;:"'`(){}\[\]]+/, '');
  s = s.replace(/[\s.…\-–—]+$/, '');
  return s.replace(/\s+/g, ' ').trim();
}
function isGoodWord(s) {
  s = s ? s.charAt(0).toLowerCase() + s.slice(1) : s;
  if (!s || !/[а-яё]/i.test(s)) return null;
  if (/[a-z]/i.test(s) || /[:/]/.test(s) || s.includes('...') || s.includes('…')) return null;
  if (s.length > 36 || s.split(/\s+/).length > 4) return null;
  return s;
}

const cache = existsSync(CACHE_PATH) ? JSON.parse(readFileSync(CACHE_PATH, 'utf8')) : {};
const saveCache = () => writeFileSync(CACHE_PATH, JSON.stringify(cache));
const exCache = existsSync(EX_CACHE_PATH) ? JSON.parse(readFileSync(EX_CACHE_PATH, 'utf8')) : {};
const saveExCache = () => writeFileSync(EX_CACHE_PATH, JSON.stringify(exCache));

const QUOTA = Symbol('quota');

async function mmTranslate(text) {
  if (cache[text] !== undefined) return cache[text];
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=de|ru&de=${encodeURIComponent(EMAIL)}`;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url);
      const j = await res.json();
      const raw = String(j?.responseData?.translatedText ?? '');
      if (j?.responseStatus === 429 || /MYMEMORY WARNING|QUOTA|USAGE LIMIT|too many/i.test(raw)) return QUOTA;
      const t = raw.trim();
      await sleep(DELAY_MS);
      if (t && /[а-яё]/i.test(t) && t.toLowerCase() !== text.toLowerCase()) {
        cache[text] = t;
        return t;
      }
      return null;
    } catch {
      await sleep(600);
    }
  }
  return null;
}

async function fetchExample(word) {
  if (exCache[word] !== undefined) return exCache[word];
  const url = `https://tatoeba.org/en/api_v0/search?from=deu&to=rus&query=${encodeURIComponent(word)}&sort=relevance&limit=8`;
  let picked = null;
  try {
    const j = await (await fetch(url)).json();
    for (const s of j.results || []) {
      const de = String(s.text || '').trim();
      const tr = (s.translations || []).flat().find((t) => t && t.lang === 'rus');
      const ru = tr ? String(tr.text || '').trim() : '';
      if (!de || !ru || de.length < 8 || de.length > 70) continue;
      if (!de.toLowerCase().includes(word.toLowerCase()) || !/[а-яё]/i.test(ru)) continue;
      picked = { de, ru };
      break;
    }
  } catch {
    /* ignore */
  }
  if (picked) exCache[word] = picked;
  await sleep(350);
  return picked;
}

const ARTICLE_MARK = /^(m\.|f\.|n\.|—|-|–|pl\.)$/;

function parseWord(field, level, exampleDe) {
  const raw = String(field || '').trim();
  if (!raw || raw === '—' || raw === '-') return null;
  let article;
  let rest = raw;
  const m = raw.match(/^(der|die|das)\s+(.+)$/i);
  if (m) {
    article = m[1].toLowerCase();
    rest = m[2];
  }
  const headword = rest.split(',')[0].split('(')[0].split('/')[0].trim();
  if (!headword || headword.length < 2 || !/[a-zäöüß]/i.test(headword)) return null;
  if (/[.:]/.test(headword)) return null;
  return { headword, article, level, exampleDe: exampleDe ? String(exampleDe).trim() : null };
}

function parseLevel(md, level) {
  const out = [];
  for (const line of md.split(/\r?\n/)) {
    if (!line.startsWith('|')) continue;
    if (/^\|\s*:?-{2,}/.test(line)) continue; // separator
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.length < 2 || cells[0] === 'Deutsch' || cells[0] === '') continue;
    if (cells.length >= 4 && ARTICLE_MARK.test(cells[1])) {
      const w = parseWord(cells[0], level, cells[3]); // A1: de | artikel | en | beispiel
      if (w) out.push(w);
    } else {
      const w1 = parseWord(cells[0], level, null); // 2-pair: de | en | de | en
      if (w1) out.push(w1);
      if (cells.length >= 3 && cells[2]) {
        const w2 = parseWord(cells[2], level, null);
        if (w2) out.push(w2);
      }
    }
  }
  return out;
}

function writeOut(words) {
  const out =
    `// AUTO-GENERATED by scripts/build-words-de.mjs — do not edit by hand.\n` +
    `// German exam vocabulary A1–C2 (Goethe/telc) from\n` +
    `// abdullahbutt/deutsch-lernen-goethe-a1-c2; RU via MyMemory, examples via\n` +
    `// the source (A1) or Tatoeba (A2–C2).\n` +
    `import type { Word } from '@/types/domain';\n\n` +
    `// Stored as a JSON string parsed at load (avoids the TS2590 union blow-up).\n` +
    `export const GENERATED_DE: Word[] = JSON.parse(\n  ${JSON.stringify(JSON.stringify(words))},\n);\n`;
  writeFileSync(OUT_PATH, out);
}

async function main() {
  const parsed = [];
  const seen = new Set();
  for (const lvl of LEVELS) {
    let md = '';
    try {
      md = await (await fetch(`${BASE}/${lvl}/01_Wortschatz.md`)).text();
    } catch (e) {
      console.log(`failed to fetch ${lvl}: ${e}`);
      continue;
    }
    let added = 0;
    for (const w of parseLevel(md, lvl)) {
      const key = w.headword.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      parsed.push(w);
      added++;
    }
    console.log(`${lvl}: parsed ${added}`);
  }
  console.log(`total parsed ${parsed.length}`);

  const words = [];
  const exCount = Object.fromEntries(LEVELS.map((l) => [l, 0]));
  let done = 0;
  let skipped = 0;
  let quotaHit = false;

  for (const w of parsed) {
    const ru = await mmTranslate(w.headword);
    if (ru === QUOTA) {
      console.log(`translation quota reached — stopping at ${done}/${parsed.length}`);
      quotaHit = true;
      break;
    }
    done++;
    if (done % 100 === 0) {
      console.log(`processed ${done}/${parsed.length} (kept ${words.length}, skipped ${skipped})`);
      saveCache();
      saveExCache();
      if (done % 400 === 0) writeOut(words);
    }
    const ru2 = isGoodWord(ru ? clean(ru) : '');
    if (!ru2) {
      skipped++;
      continue;
    }
    const word = {
      id: `de-${w.level.toLowerCase()}-${slug(w.headword)}`,
      lang: 'de',
      level: w.level,
      headword: w.headword,
      pos: w.article ? 'noun' : /[a-zäöü]en$/i.test(w.headword) ? 'verb' : 'other',
      translations: { ru: ru2 },
    };
    if (w.article) word.article = w.article;

    if (w.exampleDe && w.exampleDe.length >= 6) {
      const exru = await mmTranslate(w.exampleDe);
      if (exru && exru !== QUOTA && /[а-яё]/i.test(exru)) {
        word.example = w.exampleDe;
        word.exampleTranslation = exru.trim();
      }
    } else if (exCount[w.level] < EX_PER_LEVEL) {
      const ex = await fetchExample(w.headword);
      if (ex) {
        word.example = ex.de;
        word.exampleTranslation = ex.ru;
        exCount[w.level]++;
      }
    }
    words.push(word);
  }
  saveCache();
  saveExCache();
  writeOut(words);
  console.log(`WROTE ${words.length} German words (skipped ${skipped}${quotaHit ? ', quota-limited — re-run to continue' : ''})`);
}

main();
