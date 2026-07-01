import type { CEFRLevel, LangCode, Word } from '@/types/domain';

/**
 * Placeholder vocabulary for building the UI. Real collections are sourced
 * from official CEFR lists in a later phase; these are only for the demo.
 */
export const MOCK_WORDS: Word[] = [
  // ── English · A1 ───────────────────────────────────────────────
  { id: 'en-a1-house', lang: 'en', level: 'A1', headword: 'house', pos: 'noun', ipa: '/haʊs/', translations: { ru: 'дом' }, example: 'This house is very old.', exampleTranslation: 'Этот дом очень старый.' },
  { id: 'en-a1-water', lang: 'en', level: 'A1', headword: 'water', pos: 'noun', ipa: '/ˈwɔːtər/', translations: { ru: 'вода' }, example: 'Can I have some water?', exampleTranslation: 'Можно мне воды?' },
  { id: 'en-a1-friend', lang: 'en', level: 'A1', headword: 'friend', pos: 'noun', ipa: '/frɛnd/', translations: { ru: 'друг' }, example: 'She is my best friend.', exampleTranslation: 'Она моя лучшая подруга.' },
  { id: 'en-a1-eat', lang: 'en', level: 'A1', headword: 'eat', pos: 'verb', ipa: '/iːt/', translations: { ru: 'есть, кушать' }, example: 'I eat breakfast at eight.', exampleTranslation: 'Я завтракаю в восемь.' },
  { id: 'en-a1-big', lang: 'en', level: 'A1', headword: 'big', pos: 'adjective', ipa: '/bɪɡ/', translations: { ru: 'большой' }, example: 'That is a big dog.', exampleTranslation: 'Это большая собака.' },
  { id: 'en-a1-happy', lang: 'en', level: 'A1', headword: 'happy', pos: 'adjective', ipa: '/ˈhæpi/', translations: { ru: 'счастливый' }, example: 'I am very happy today.', exampleTranslation: 'Сегодня я очень счастлив.' },
  { id: 'en-a1-book', lang: 'en', level: 'A1', headword: 'book', pos: 'noun', ipa: '/bʊk/', translations: { ru: 'книга' }, example: 'I am reading a good book.', exampleTranslation: 'Я читаю хорошую книгу.' },
  { id: 'en-a1-go', lang: 'en', level: 'A1', headword: 'go', pos: 'verb', ipa: '/ɡoʊ/', translations: { ru: 'идти, ехать' }, example: "Let's go home.", exampleTranslation: 'Пойдём домой.' },
  { id: 'en-a1-day', lang: 'en', level: 'A1', headword: 'day', pos: 'noun', ipa: '/deɪ/', translations: { ru: 'день' }, example: 'Have a nice day!', exampleTranslation: 'Хорошего дня!' },
  { id: 'en-a1-work', lang: 'en', level: 'A1', headword: 'work', pos: 'verb', ipa: '/wɜːrk/', translations: { ru: 'работать' }, example: 'I work in an office.', exampleTranslation: 'Я работаю в офисе.' },
  { id: 'en-a1-small', lang: 'en', level: 'A1', headword: 'small', pos: 'adjective', ipa: '/smɔːl/', translations: { ru: 'маленький' }, example: 'It is a small town.', exampleTranslation: 'Это маленький город.' },
  { id: 'en-a1-love', lang: 'en', level: 'A1', headword: 'love', pos: 'verb', ipa: '/lʌv/', translations: { ru: 'любить' }, example: 'I love this song.', exampleTranslation: 'Я люблю эту песню.' },
  { id: 'en-a1-time', lang: 'en', level: 'A1', headword: 'time', pos: 'noun', ipa: '/taɪm/', translations: { ru: 'время' }, example: 'What time is it?', exampleTranslation: 'Который час?' },
  { id: 'en-a1-child', lang: 'en', level: 'A1', headword: 'child', pos: 'noun', ipa: '/tʃaɪld/', translations: { ru: 'ребёнок' }, example: 'The child is sleeping.', exampleTranslation: 'Ребёнок спит.' },
  { id: 'en-a1-speak', lang: 'en', level: 'A1', headword: 'speak', pos: 'verb', ipa: '/spiːk/', translations: { ru: 'говорить' }, example: 'Do you speak English?', exampleTranslation: 'Вы говорите по-английски?' },
  { id: 'en-a1-good', lang: 'en', level: 'A1', headword: 'good', pos: 'adjective', ipa: '/ɡʊd/', translations: { ru: 'хороший' }, example: 'This is good food.', exampleTranslation: 'Это хорошая еда.' },

  // ── German · A1 ────────────────────────────────────────────────
  { id: 'de-a1-haus', lang: 'de', level: 'A1', headword: 'Haus', article: 'das', pos: 'noun', translations: { ru: 'дом' }, example: 'Das Haus ist groß.', exampleTranslation: 'Дом большой.' },
  { id: 'de-a1-wasser', lang: 'de', level: 'A1', headword: 'Wasser', article: 'das', pos: 'noun', translations: { ru: 'вода' }, example: 'Ich trinke Wasser.', exampleTranslation: 'Я пью воду.' },
  { id: 'de-a1-freund', lang: 'de', level: 'A1', headword: 'Freund', article: 'der', pos: 'noun', translations: { ru: 'друг' }, example: 'Er ist mein Freund.', exampleTranslation: 'Он мой друг.' },
  { id: 'de-a1-essen', lang: 'de', level: 'A1', headword: 'essen', pos: 'verb', translations: { ru: 'есть, кушать' }, example: 'Wir essen zu Abend.', exampleTranslation: 'Мы ужинаем.' },
  { id: 'de-a1-gross', lang: 'de', level: 'A1', headword: 'groß', pos: 'adjective', translations: { ru: 'большой' }, example: 'Der Hund ist groß.', exampleTranslation: 'Собака большая.' },
  { id: 'de-a1-buch', lang: 'de', level: 'A1', headword: 'Buch', article: 'das', pos: 'noun', translations: { ru: 'книга' }, example: 'Das Buch ist neu.', exampleTranslation: 'Книга новая.' },
  { id: 'de-a1-gehen', lang: 'de', level: 'A1', headword: 'gehen', pos: 'verb', translations: { ru: 'идти' }, example: 'Wir gehen nach Hause.', exampleTranslation: 'Мы идём домой.' },
  { id: 'de-a1-tag', lang: 'de', level: 'A1', headword: 'Tag', article: 'der', pos: 'noun', translations: { ru: 'день' }, example: 'Schönen Tag!', exampleTranslation: 'Хорошего дня!' },
  { id: 'de-a1-arbeiten', lang: 'de', level: 'A1', headword: 'arbeiten', pos: 'verb', translations: { ru: 'работать' }, example: 'Ich arbeite viel.', exampleTranslation: 'Я много работаю.' },
  { id: 'de-a1-klein', lang: 'de', level: 'A1', headword: 'klein', pos: 'adjective', translations: { ru: 'маленький' }, example: 'Die Katze ist klein.', exampleTranslation: 'Кошка маленькая.' },
  { id: 'de-a1-zeit', lang: 'de', level: 'A1', headword: 'Zeit', article: 'die', pos: 'noun', translations: { ru: 'время' }, example: 'Ich habe keine Zeit.', exampleTranslation: 'У меня нет времени.' },
  { id: 'de-a1-sprechen', lang: 'de', level: 'A1', headword: 'sprechen', pos: 'verb', translations: { ru: 'говорить' }, example: 'Sprichst du Deutsch?', exampleTranslation: 'Ты говоришь по-немецки?' },
];

/** Words for a given collection, optionally shuffled (random, not alphabetical). */
export function getWords(lang: LangCode, level: CEFRLevel, shuffle = false): Word[] {
  const words = MOCK_WORDS.filter((w) => w.lang === lang && w.level === level);
  if (!shuffle) return words;
  const copy = [...words];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}
