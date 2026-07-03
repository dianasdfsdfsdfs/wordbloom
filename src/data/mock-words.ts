import type { CEFRLevel, LangCode, Word } from '@/types/domain';
import { GENERATED_DE } from './words-de.generated';
import { GENERATED_WORDS } from './words.generated';

/**
 * Placeholder vocabulary for building the UI. Real collections are sourced
 * from official CEFR lists in a later phase; these are only for the demo.
 */
const CURATED_WORDS: Word[] = [
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

  // ── English · A2 ───────────────────────────────────────────────
  { id: 'en-a2-because', lang: 'en', level: 'A2', headword: 'because', pos: 'conjunction', ipa: '/bɪˈkɔːz/', translations: { ru: 'потому что' }, example: 'I stayed home because it rained.', exampleTranslation: 'Я остался дома, потому что шёл дождь.' },
  { id: 'en-a2-weather', lang: 'en', level: 'A2', headword: 'weather', pos: 'noun', ipa: '/ˈwɛðər/', translations: { ru: 'погода' }, example: 'The weather is nice today.', exampleTranslation: 'Сегодня хорошая погода.' },
  { id: 'en-a2-money', lang: 'en', level: 'A2', headword: 'money', pos: 'noun', ipa: '/ˈmʌni/', translations: { ru: 'деньги' }, example: 'I need some money.', exampleTranslation: 'Мне нужны деньги.' },
  { id: 'en-a2-remember', lang: 'en', level: 'A2', headword: 'remember', pos: 'verb', ipa: '/rɪˈmɛmbər/', translations: { ru: 'помнить' }, example: 'I remember your name.', exampleTranslation: 'Я помню твоё имя.' },
  { id: 'en-a2-already', lang: 'en', level: 'A2', headword: 'already', pos: 'adverb', ipa: '/ɔːlˈrɛdi/', translations: { ru: 'уже' }, example: 'We have already eaten.', exampleTranslation: 'Мы уже поели.' },
  { id: 'en-a2-decide', lang: 'en', level: 'A2', headword: 'decide', pos: 'verb', ipa: '/dɪˈsaɪd/', translations: { ru: 'решать' }, example: 'You must decide now.', exampleTranslation: 'Ты должен решить сейчас.' },

  // ── English · B1 ───────────────────────────────────────────────
  { id: 'en-b1-environment', lang: 'en', level: 'B1', headword: 'environment', pos: 'noun', ipa: '/ɪnˈvaɪrənmənt/', translations: { ru: 'окружающая среда' }, example: 'We must protect the environment.', exampleTranslation: 'Мы должны защищать окружающую среду.' },
  { id: 'en-b1-although', lang: 'en', level: 'B1', headword: 'although', pos: 'conjunction', ipa: '/ɔːlˈðoʊ/', translations: { ru: 'хотя' }, example: 'Although it was late, we continued.', exampleTranslation: 'Хотя было поздно, мы продолжили.' },
  { id: 'en-b1-improve', lang: 'en', level: 'B1', headword: 'improve', pos: 'verb', ipa: '/ɪmˈpruːv/', translations: { ru: 'улучшать' }, example: 'I want to improve my English.', exampleTranslation: 'Я хочу улучшить свой английский.' },
  { id: 'en-b1-experience', lang: 'en', level: 'B1', headword: 'experience', pos: 'noun', ipa: '/ɪkˈspɪəriəns/', translations: { ru: 'опыт' }, example: 'She has a lot of experience.', exampleTranslation: 'У неё большой опыт.' },
  { id: 'en-b1-advice', lang: 'en', level: 'B1', headword: 'advice', pos: 'noun', ipa: '/ədˈvaɪs/', translations: { ru: 'совет' }, example: 'Can you give me some advice?', exampleTranslation: 'Можешь дать мне совет?' },
  { id: 'en-b1-opportunity', lang: 'en', level: 'B1', headword: 'opportunity', pos: 'noun', ipa: '/ˌɒpəˈtjuːnɪti/', translations: { ru: 'возможность' }, example: 'This is a great opportunity.', exampleTranslation: 'Это отличная возможность.' },

  // ── English · B2 ───────────────────────────────────────────────
  { id: 'en-b2-significant', lang: 'en', level: 'B2', headword: 'significant', pos: 'adjective', ipa: '/sɪɡˈnɪfɪkənt/', translations: { ru: 'значительный' }, example: 'There was a significant change.', exampleTranslation: 'Произошло значительное изменение.' },
  { id: 'en-b2-achieve', lang: 'en', level: 'B2', headword: 'achieve', pos: 'verb', ipa: '/əˈtʃiːv/', translations: { ru: 'достигать' }, example: 'You can achieve your goals.', exampleTranslation: 'Ты можешь достичь своих целей.' },
  { id: 'en-b2-consequence', lang: 'en', level: 'B2', headword: 'consequence', pos: 'noun', ipa: '/ˈkɒnsɪkwəns/', translations: { ru: 'последствие' }, example: 'Every action has a consequence.', exampleTranslation: 'У каждого действия есть последствие.' },
  { id: 'en-b2-nevertheless', lang: 'en', level: 'B2', headword: 'nevertheless', pos: 'adverb', ipa: '/ˌnɛvəðəˈlɛs/', translations: { ru: 'тем не менее' }, example: 'It was hard; nevertheless, we finished.', exampleTranslation: 'Было трудно; тем не менее, мы закончили.' },
  { id: 'en-b2-reliable', lang: 'en', level: 'B2', headword: 'reliable', pos: 'adjective', ipa: '/rɪˈlaɪəbl/', translations: { ru: 'надёжный' }, example: 'She is a reliable friend.', exampleTranslation: 'Она надёжный друг.' },

  // ── English · C1 ───────────────────────────────────────────────
  { id: 'en-c1-inevitable', lang: 'en', level: 'C1', headword: 'inevitable', pos: 'adjective', ipa: '/ɪnˈɛvɪtəbl/', translations: { ru: 'неизбежный' }, example: 'Change is inevitable.', exampleTranslation: 'Перемены неизбежны.' },
  { id: 'en-c1-comprehensive', lang: 'en', level: 'C1', headword: 'comprehensive', pos: 'adjective', ipa: '/ˌkɒmprɪˈhɛnsɪv/', translations: { ru: 'всесторонний' }, example: 'It was a comprehensive report.', exampleTranslation: 'Это был всесторонний отчёт.' },
  { id: 'en-c1-notion', lang: 'en', level: 'C1', headword: 'notion', pos: 'noun', ipa: '/ˈnoʊʃən/', translations: { ru: 'представление' }, example: 'I have no notion of it.', exampleTranslation: 'Я не имею об этом представления.' },
  { id: 'en-c1-undermine', lang: 'en', level: 'C1', headword: 'undermine', pos: 'verb', ipa: '/ˌʌndəˈmaɪn/', translations: { ru: 'подрывать' }, example: 'This may undermine trust.', exampleTranslation: 'Это может подорвать доверие.' },
  { id: 'en-c1-prevail', lang: 'en', level: 'C1', headword: 'prevail', pos: 'verb', ipa: '/prɪˈveɪl/', translations: { ru: 'преобладать' }, example: 'Common sense will prevail.', exampleTranslation: 'Здравый смысл возобладает.' },

  // ── English · C2 ───────────────────────────────────────────────
  { id: 'en-c2-ubiquitous', lang: 'en', level: 'C2', headword: 'ubiquitous', pos: 'adjective', ipa: '/juːˈbɪkwɪtəs/', translations: { ru: 'вездесущий' }, example: 'Smartphones are ubiquitous.', exampleTranslation: 'Смартфоны вездесущи.' },
  { id: 'en-c2-meticulous', lang: 'en', level: 'C2', headword: 'meticulous', pos: 'adjective', ipa: '/məˈtɪkjələs/', translations: { ru: 'дотошный' }, example: 'Meticulous attention to detail.', exampleTranslation: 'Дотошное внимание к деталям.' },
  { id: 'en-c2-quintessential', lang: 'en', level: 'C2', headword: 'quintessential', pos: 'adjective', ipa: '/ˌkwɪntɪˈsɛnʃəl/', translations: { ru: 'образцовый' }, example: 'The quintessential example.', exampleTranslation: 'Образцовый пример.' },
  { id: 'en-c2-cogent', lang: 'en', level: 'C2', headword: 'cogent', pos: 'adjective', ipa: '/ˈkoʊdʒənt/', translations: { ru: 'убедительный' }, example: 'A cogent argument.', exampleTranslation: 'Убедительный аргумент.' },
  { id: 'en-c2-ephemeral', lang: 'en', level: 'C2', headword: 'ephemeral', pos: 'adjective', ipa: '/ɪˈfɛmərəl/', translations: { ru: 'эфемерный' }, example: 'Ephemeral beauty.', exampleTranslation: 'Эфемерная красота.' },

  // ── German · A2 ────────────────────────────────────────────────
  { id: 'de-a2-weil', lang: 'de', level: 'A2', headword: 'weil', pos: 'conjunction', translations: { ru: 'потому что' }, example: 'Ich bleibe zu Hause, weil es regnet.', exampleTranslation: 'Я остаюсь дома, потому что идёт дождь.' },
  { id: 'de-a2-wetter', lang: 'de', level: 'A2', headword: 'Wetter', article: 'das', pos: 'noun', translations: { ru: 'погода' }, example: 'Das Wetter ist schön.', exampleTranslation: 'Погода хорошая.' },
  { id: 'de-a2-geld', lang: 'de', level: 'A2', headword: 'Geld', article: 'das', pos: 'noun', translations: { ru: 'деньги' }, example: 'Ich brauche Geld.', exampleTranslation: 'Мне нужны деньги.' },
  { id: 'de-a2-schon', lang: 'de', level: 'A2', headword: 'schon', pos: 'adverb', translations: { ru: 'уже' }, example: 'Wir haben schon gegessen.', exampleTranslation: 'Мы уже поели.' },
  { id: 'de-a2-wichtig', lang: 'de', level: 'A2', headword: 'wichtig', pos: 'adjective', translations: { ru: 'важный' }, example: 'Das ist sehr wichtig.', exampleTranslation: 'Это очень важно.' },

  // ── German · B1 ────────────────────────────────────────────────
  { id: 'de-b1-umwelt', lang: 'de', level: 'B1', headword: 'Umwelt', article: 'die', pos: 'noun', translations: { ru: 'окружающая среда' }, example: 'Wir schützen die Umwelt.', exampleTranslation: 'Мы защищаем окружающую среду.' },
  { id: 'de-b1-obwohl', lang: 'de', level: 'B1', headword: 'obwohl', pos: 'conjunction', translations: { ru: 'хотя' }, example: 'Obwohl es spät war, blieben wir.', exampleTranslation: 'Хотя было поздно, мы остались.' },
  { id: 'de-b1-verbessern', lang: 'de', level: 'B1', headword: 'verbessern', pos: 'verb', translations: { ru: 'улучшать' }, example: 'Ich will mein Deutsch verbessern.', exampleTranslation: 'Я хочу улучшить свой немецкий.' },
  { id: 'de-b1-erfahrung', lang: 'de', level: 'B1', headword: 'Erfahrung', article: 'die', pos: 'noun', translations: { ru: 'опыт' }, example: 'Sie hat viel Erfahrung.', exampleTranslation: 'У неё большой опыт.' },
  { id: 'de-b1-moeglichkeit', lang: 'de', level: 'B1', headword: 'Möglichkeit', article: 'die', pos: 'noun', translations: { ru: 'возможность' }, example: 'Das ist eine gute Möglichkeit.', exampleTranslation: 'Это хорошая возможность.' },

  // ── German · B2 ────────────────────────────────────────────────
  { id: 'de-b2-bedeutend', lang: 'de', level: 'B2', headword: 'bedeutend', pos: 'adjective', translations: { ru: 'значительный' }, example: 'Eine bedeutende Änderung.', exampleTranslation: 'Значительное изменение.' },
  { id: 'de-b2-erreichen', lang: 'de', level: 'B2', headword: 'erreichen', pos: 'verb', translations: { ru: 'достигать' }, example: 'Du kannst deine Ziele erreichen.', exampleTranslation: 'Ты можешь достичь своих целей.' },
  { id: 'de-b2-folge', lang: 'de', level: 'B2', headword: 'Folge', article: 'die', pos: 'noun', translations: { ru: 'последствие' }, example: 'Alles hat eine Folge.', exampleTranslation: 'У всего есть последствие.' },
  { id: 'de-b2-dennoch', lang: 'de', level: 'B2', headword: 'dennoch', pos: 'adverb', translations: { ru: 'тем не менее' }, example: 'Es war schwer, dennoch schafften wir es.', exampleTranslation: 'Было трудно, тем не менее мы справились.' },
  { id: 'de-b2-zuverlaessig', lang: 'de', level: 'B2', headword: 'zuverlässig', pos: 'adjective', translations: { ru: 'надёжный' }, example: 'Ein zuverlässiger Freund.', exampleTranslation: 'Надёжный друг.' },

  // ── German · C1 ────────────────────────────────────────────────
  { id: 'de-c1-unvermeidlich', lang: 'de', level: 'C1', headword: 'unvermeidlich', pos: 'adjective', translations: { ru: 'неизбежный' }, example: 'Veränderung ist unvermeidlich.', exampleTranslation: 'Перемены неизбежны.' },
  { id: 'de-c1-umfassend', lang: 'de', level: 'C1', headword: 'umfassend', pos: 'adjective', translations: { ru: 'всесторонний' }, example: 'Ein umfassender Bericht.', exampleTranslation: 'Всесторонний отчёт.' },
  { id: 'de-c1-untergraben', lang: 'de', level: 'C1', headword: 'untergraben', pos: 'verb', translations: { ru: 'подрывать' }, example: 'Das kann Vertrauen untergraben.', exampleTranslation: 'Это может подорвать доверие.' },
  { id: 'de-c1-ueberwiegen', lang: 'de', level: 'C1', headword: 'überwiegen', pos: 'verb', translations: { ru: 'преобладать' }, example: 'Die Vorteile überwiegen.', exampleTranslation: 'Преимущества преобладают.' },
  { id: 'de-c1-nuance', lang: 'de', level: 'C1', headword: 'Nuance', article: 'die', pos: 'noun', translations: { ru: 'нюанс' }, example: 'Eine feine Nuance.', exampleTranslation: 'Тонкий нюанс.' },

  // ── German · C2 ────────────────────────────────────────────────
  { id: 'de-c2-allgegenwaertig', lang: 'de', level: 'C2', headword: 'allgegenwärtig', pos: 'adjective', translations: { ru: 'вездесущий' }, example: 'Smartphones sind allgegenwärtig.', exampleTranslation: 'Смартфоны вездесущи.' },
  { id: 'de-c2-akribisch', lang: 'de', level: 'C2', headword: 'akribisch', pos: 'adjective', translations: { ru: 'дотошный' }, example: 'Akribische Genauigkeit.', exampleTranslation: 'Дотошная точность.' },
  { id: 'de-c2-vergaenglich', lang: 'de', level: 'C2', headword: 'vergänglich', pos: 'adjective', translations: { ru: 'преходящий' }, example: 'Vergängliche Schönheit.', exampleTranslation: 'Преходящая красота.' },
  { id: 'de-c2-stichhaltig', lang: 'de', level: 'C2', headword: 'stichhaltig', pos: 'adjective', translations: { ru: 'убедительный' }, example: 'Ein stichhaltiges Argument.', exampleTranslation: 'Убедительный аргумент.' },

  // ── German · A1 (more) ─────────────────────────────────────────
  { id: 'de-a1-mann', lang: 'de', level: 'A1', headword: 'Mann', article: 'der', pos: 'noun', translations: { ru: 'мужчина' }, example: 'Der Mann ist groß.', exampleTranslation: 'Мужчина высокий.' },
  { id: 'de-a1-frau', lang: 'de', level: 'A1', headword: 'Frau', article: 'die', pos: 'noun', translations: { ru: 'женщина' }, example: 'Die Frau liest ein Buch.', exampleTranslation: 'Женщина читает книгу.' },
  { id: 'de-a1-kind', lang: 'de', level: 'A1', headword: 'Kind', article: 'das', pos: 'noun', translations: { ru: 'ребёнок' }, example: 'Das Kind spielt draußen.', exampleTranslation: 'Ребёнок играет на улице.' },
  { id: 'de-a1-trinken', lang: 'de', level: 'A1', headword: 'trinken', pos: 'verb', translations: { ru: 'пить' }, example: 'Ich trinke Kaffee.', exampleTranslation: 'Я пью кофе.' },
  { id: 'de-a1-gut', lang: 'de', level: 'A1', headword: 'gut', pos: 'adjective', translations: { ru: 'хороший' }, example: 'Das Essen ist gut.', exampleTranslation: 'Еда хорошая.' },
  { id: 'de-a1-heute', lang: 'de', level: 'A1', headword: 'heute', pos: 'adverb', translations: { ru: 'сегодня' }, example: 'Heute ist Montag.', exampleTranslation: 'Сегодня понедельник.' },

  // ── German · A2 (more) ─────────────────────────────────────────
  { id: 'de-a2-familie', lang: 'de', level: 'A2', headword: 'Familie', article: 'die', pos: 'noun', translations: { ru: 'семья' }, example: 'Meine Familie ist groß.', exampleTranslation: 'Моя семья большая.' },
  { id: 'de-a2-problem', lang: 'de', level: 'A2', headword: 'Problem', article: 'das', pos: 'noun', translations: { ru: 'проблема' }, example: 'Das ist kein Problem.', exampleTranslation: 'Это не проблема.' },
  { id: 'de-a2-stadt', lang: 'de', level: 'A2', headword: 'Stadt', article: 'die', pos: 'noun', translations: { ru: 'город' }, example: 'Berlin ist eine große Stadt.', exampleTranslation: 'Берлин — большой город.' },
  { id: 'de-a2-land', lang: 'de', level: 'A2', headword: 'Land', article: 'das', pos: 'noun', translations: { ru: 'страна' }, example: 'Deutschland ist ein schönes Land.', exampleTranslation: 'Германия — красивая страна.' },
  { id: 'de-a2-kaufen', lang: 'de', level: 'A2', headword: 'kaufen', pos: 'verb', translations: { ru: 'покупать' }, example: 'Ich kaufe Brot.', exampleTranslation: 'Я покупаю хлеб.' },
  { id: 'de-a2-reise', lang: 'de', level: 'A2', headword: 'Reise', article: 'die', pos: 'noun', translations: { ru: 'поездка' }, example: 'Die Reise war schön.', exampleTranslation: 'Поездка была прекрасной.' },
  { id: 'de-a2-gestern', lang: 'de', level: 'A2', headword: 'gestern', pos: 'adverb', translations: { ru: 'вчера' }, example: 'Gestern hat es geregnet.', exampleTranslation: 'Вчера шёл дождь.' },
  { id: 'de-a2-morgen', lang: 'de', level: 'A2', headword: 'morgen', pos: 'adverb', translations: { ru: 'завтра' }, example: 'Morgen arbeite ich.', exampleTranslation: 'Завтра я работаю.' },
  { id: 'de-a2-woche', lang: 'de', level: 'A2', headword: 'Woche', article: 'die', pos: 'noun', translations: { ru: 'неделя' }, example: 'Die Woche war lang.', exampleTranslation: 'Неделя была длинной.' },
  { id: 'de-a2-schule', lang: 'de', level: 'A2', headword: 'Schule', article: 'die', pos: 'noun', translations: { ru: 'школа' }, example: 'Die Kinder gehen zur Schule.', exampleTranslation: 'Дети идут в школу.' },
  { id: 'de-a2-zug', lang: 'de', level: 'A2', headword: 'Zug', article: 'der', pos: 'noun', translations: { ru: 'поезд' }, example: 'Der Zug ist spät.', exampleTranslation: 'Поезд опаздывает.' },

  // ── German · B1 (more) ─────────────────────────────────────────
  { id: 'de-b1-gesundheit', lang: 'de', level: 'B1', headword: 'Gesundheit', article: 'die', pos: 'noun', translations: { ru: 'здоровье' }, example: 'Gesundheit ist wichtig.', exampleTranslation: 'Здоровье важно.' },
  { id: 'de-b1-regierung', lang: 'de', level: 'B1', headword: 'Regierung', article: 'die', pos: 'noun', translations: { ru: 'правительство' }, example: 'Die Regierung entscheidet.', exampleTranslation: 'Правительство принимает решение.' },
  { id: 'de-b1-entwickeln', lang: 'de', level: 'B1', headword: 'entwickeln', pos: 'verb', translations: { ru: 'развивать' }, example: 'Wir entwickeln eine App.', exampleTranslation: 'Мы разрабатываем приложение.' },
  { id: 'de-b1-gesellschaft', lang: 'de', level: 'B1', headword: 'Gesellschaft', article: 'die', pos: 'noun', translations: { ru: 'общество' }, example: 'Die Gesellschaft verändert sich.', exampleTranslation: 'Общество меняется.' },
  { id: 'de-b1-vorteil', lang: 'de', level: 'B1', headword: 'Vorteil', article: 'der', pos: 'noun', translations: { ru: 'преимущество' }, example: 'Das hat viele Vorteile.', exampleTranslation: 'У этого много преимуществ.' },
  { id: 'de-b1-nachteil', lang: 'de', level: 'B1', headword: 'Nachteil', article: 'der', pos: 'noun', translations: { ru: 'недостаток' }, example: 'Es gibt auch Nachteile.', exampleTranslation: 'Есть и недостатки.' },
  { id: 'de-b1-entscheidung', lang: 'de', level: 'B1', headword: 'Entscheidung', article: 'die', pos: 'noun', translations: { ru: 'решение' }, example: 'Das ist eine schwere Entscheidung.', exampleTranslation: 'Это трудное решение.' },
  { id: 'de-b1-meinung', lang: 'de', level: 'B1', headword: 'Meinung', article: 'die', pos: 'noun', translations: { ru: 'мнение' }, example: 'Meiner Meinung nach ist das falsch.', exampleTranslation: 'По-моему, это неверно.' },
  { id: 'de-b1-vergleichen', lang: 'de', level: 'B1', headword: 'vergleichen', pos: 'verb', translations: { ru: 'сравнивать' }, example: 'Vergleiche die Preise.', exampleTranslation: 'Сравни цены.' },
  { id: 'de-b1-einfluss', lang: 'de', level: 'B1', headword: 'Einfluss', article: 'der', pos: 'noun', translations: { ru: 'влияние' }, example: 'Er hat großen Einfluss.', exampleTranslation: 'У него большое влияние.' },
  { id: 'de-b1-beschreiben', lang: 'de', level: 'B1', headword: 'beschreiben', pos: 'verb', translations: { ru: 'описывать' }, example: 'Beschreibe das Bild.', exampleTranslation: 'Опиши картину.' },

  // ── German · B2 (more) ─────────────────────────────────────────
  { id: 'de-b2-herausforderung', lang: 'de', level: 'B2', headword: 'Herausforderung', article: 'die', pos: 'noun', translations: { ru: 'вызов' }, example: 'Das ist eine große Herausforderung.', exampleTranslation: 'Это большой вызов.' },
  { id: 'de-b2-nachhaltig', lang: 'de', level: 'B2', headword: 'nachhaltig', pos: 'adjective', translations: { ru: 'устойчивый' }, example: 'Eine nachhaltige Entwicklung.', exampleTranslation: 'Устойчивое развитие.' },
  { id: 'de-b2-beruecksichtigen', lang: 'de', level: 'B2', headword: 'berücksichtigen', pos: 'verb', translations: { ru: 'учитывать' }, example: 'Wir müssen das berücksichtigen.', exampleTranslation: 'Мы должны это учесть.' },
  { id: 'de-b2-auswirkung', lang: 'de', level: 'B2', headword: 'Auswirkung', article: 'die', pos: 'noun', translations: { ru: 'воздействие' }, example: 'Die Auswirkungen sind groß.', exampleTranslation: 'Последствия велики.' },
  { id: 'de-b2-verfuegbar', lang: 'de', level: 'B2', headword: 'verfügbar', pos: 'adjective', translations: { ru: 'доступный' }, example: 'Das Produkt ist verfügbar.', exampleTranslation: 'Продукт доступен.' },
  { id: 'de-b2-faehigkeit', lang: 'de', level: 'B2', headword: 'Fähigkeit', article: 'die', pos: 'noun', translations: { ru: 'способность' }, example: 'Sie hat besondere Fähigkeiten.', exampleTranslation: 'У неё особые способности.' },
  { id: 'de-b2-vielfalt', lang: 'de', level: 'B2', headword: 'Vielfalt', article: 'die', pos: 'noun', translations: { ru: 'разнообразие' }, example: 'Die Vielfalt ist groß.', exampleTranslation: 'Разнообразие велико.' },
  { id: 'de-b2-gewaehrleisten', lang: 'de', level: 'B2', headword: 'gewährleisten', pos: 'verb', translations: { ru: 'обеспечивать' }, example: 'Wir gewährleisten Qualität.', exampleTranslation: 'Мы обеспечиваем качество.' },
  { id: 'de-b2-voraussetzung', lang: 'de', level: 'B2', headword: 'Voraussetzung', article: 'die', pos: 'noun', translations: { ru: 'предпосылка' }, example: 'Das ist eine wichtige Voraussetzung.', exampleTranslation: 'Это важная предпосылка.' },
  { id: 'de-b2-zustaendig', lang: 'de', level: 'B2', headword: 'zuständig', pos: 'adjective', translations: { ru: 'ответственный' }, example: 'Wer ist dafür zuständig?', exampleTranslation: 'Кто за это отвечает?' },
  { id: 'de-b2-umfang', lang: 'de', level: 'B2', headword: 'Umfang', article: 'der', pos: 'noun', translations: { ru: 'объём' }, example: 'Der Umfang der Arbeit ist groß.', exampleTranslation: 'Объём работы большой.' },

  // ── German · C1 (more) ─────────────────────────────────────────
  { id: 'de-c1-hervorheben', lang: 'de', level: 'C1', headword: 'hervorheben', pos: 'verb', translations: { ru: 'подчёркивать' }, example: 'Ich möchte das hervorheben.', exampleTranslation: 'Я хочу это подчеркнуть.' },
  { id: 'de-c1-wahrnehmung', lang: 'de', level: 'C1', headword: 'Wahrnehmung', article: 'die', pos: 'noun', translations: { ru: 'восприятие' }, example: 'Die Wahrnehmung ist subjektiv.', exampleTranslation: 'Восприятие субъективно.' },
  { id: 'de-c1-aspekt', lang: 'de', level: 'C1', headword: 'Aspekt', article: 'der', pos: 'noun', translations: { ru: 'аспект' }, example: 'Das ist ein wichtiger Aspekt.', exampleTranslation: 'Это важный аспект.' },
  { id: 'de-c1-bewaeltigen', lang: 'de', level: 'C1', headword: 'bewältigen', pos: 'verb', translations: { ru: 'справляться' }, example: 'Er kann die Aufgabe bewältigen.', exampleTranslation: 'Он может справиться с задачей.' },
  { id: 'de-c1-grundlage', lang: 'de', level: 'C1', headword: 'Grundlage', article: 'die', pos: 'noun', translations: { ru: 'основа' }, example: 'Das ist die Grundlage der Theorie.', exampleTranslation: 'Это основа теории.' },
  { id: 'de-c1-rueckgang', lang: 'de', level: 'C1', headword: 'Rückgang', article: 'der', pos: 'noun', translations: { ru: 'спад' }, example: 'Ein Rückgang der Zahlen.', exampleTranslation: 'Спад показателей.' },
  { id: 'de-c1-massgeblich', lang: 'de', level: 'C1', headword: 'maßgeblich', pos: 'adjective', translations: { ru: 'существенный' }, example: 'Ein maßgeblicher Faktor.', exampleTranslation: 'Существенный фактор.' },
  { id: 'de-c1-ausschliesslich', lang: 'de', level: 'C1', headword: 'ausschließlich', pos: 'adverb', translations: { ru: 'исключительно' }, example: 'Ausschließlich für Mitglieder.', exampleTranslation: 'Исключительно для членов.' },
  { id: 'de-c1-verdeutlichen', lang: 'de', level: 'C1', headword: 'verdeutlichen', pos: 'verb', translations: { ru: 'прояснять' }, example: 'Das verdeutlicht das Problem.', exampleTranslation: 'Это проясняет проблему.' },
  { id: 'de-c1-zusammenhang', lang: 'de', level: 'C1', headword: 'Zusammenhang', article: 'der', pos: 'noun', translations: { ru: 'связь' }, example: 'Ich sehe keinen Zusammenhang.', exampleTranslation: 'Я не вижу связи.' },
  { id: 'de-c1-erheblich', lang: 'de', level: 'C1', headword: 'erheblich', pos: 'adjective', translations: { ru: 'значительный' }, example: 'Ein erheblicher Unterschied.', exampleTranslation: 'Значительная разница.' },

  // ── German · C2 (more) ─────────────────────────────────────────
  { id: 'de-c2-unabdingbar', lang: 'de', level: 'C2', headword: 'unabdingbar', pos: 'adjective', translations: { ru: 'непременный' }, example: 'Eine unabdingbare Voraussetzung.', exampleTranslation: 'Непременное условие.' },
  { id: 'de-c2-diskrepanz', lang: 'de', level: 'C2', headword: 'Diskrepanz', article: 'die', pos: 'noun', translations: { ru: 'расхождение' }, example: 'Eine Diskrepanz zwischen Wort und Tat.', exampleTranslation: 'Расхождение между словом и делом.' },
  { id: 'de-c2-konsequent', lang: 'de', level: 'C2', headword: 'konsequent', pos: 'adjective', translations: { ru: 'последовательный' }, example: 'Konsequentes Handeln.', exampleTranslation: 'Последовательные действия.' },
  { id: 'de-c2-tragweite', lang: 'de', level: 'C2', headword: 'Tragweite', article: 'die', pos: 'noun', translations: { ru: 'масштаб' }, example: 'Die Tragweite der Entscheidung.', exampleTranslation: 'Масштаб решения.' },
  { id: 'de-c2-zwangslaeufig', lang: 'de', level: 'C2', headword: 'zwangsläufig', pos: 'adverb', translations: { ru: 'неизбежно' }, example: 'Das führt zwangsläufig zu Problemen.', exampleTranslation: 'Это неизбежно ведёт к проблемам.' },
  { id: 'de-c2-differenziert', lang: 'de', level: 'C2', headword: 'differenziert', pos: 'adjective', translations: { ru: 'дифференцированный' }, example: 'Eine differenzierte Betrachtung.', exampleTranslation: 'Дифференцированный взгляд.' },
  { id: 'de-c2-inhaerent', lang: 'de', level: 'C2', headword: 'inhärent', pos: 'adjective', translations: { ru: 'присущий' }, example: 'Ein inhärentes Risiko.', exampleTranslation: 'Присущий риск.' },
  { id: 'de-c2-zaesur', lang: 'de', level: 'C2', headword: 'Zäsur', article: 'die', pos: 'noun', translations: { ru: 'перелом' }, example: 'Eine historische Zäsur.', exampleTranslation: 'Исторический перелом.' },
  { id: 'de-c2-beilaeufig', lang: 'de', level: 'C2', headword: 'beiläufig', pos: 'adjective', translations: { ru: 'мимолётный' }, example: 'Eine beiläufige Bemerkung.', exampleTranslation: 'Мимолётное замечание.' },
  { id: 'de-c2-ambivalenz', lang: 'de', level: 'C2', headword: 'Ambivalenz', article: 'die', pos: 'noun', translations: { ru: 'амбивалентность' }, example: 'Eine gewisse Ambivalenz.', exampleTranslation: 'Определённая амбивалентность.' },
  { id: 'de-c2-sachverhalt', lang: 'de', level: 'C2', headword: 'Sachverhalt', article: 'der', pos: 'noun', translations: { ru: 'суть дела' }, example: 'Den Sachverhalt klären.', exampleTranslation: 'Прояснить суть дела.' },
  { id: 'de-c2-vermeintlich', lang: 'de', level: 'C2', headword: 'vermeintlich', pos: 'adjective', translations: { ru: 'мнимый' }, example: 'Ein vermeintlicher Vorteil.', exampleTranslation: 'Мнимое преимущество.' },
];

const curatedKeys = new Set(CURATED_WORDS.map((w) => `${w.lang}:${w.headword.toLowerCase()}`));

/** Curated words (articles + examples) first, then the generated CEFR set,
 *  skipping any generated word a curated one already covers. */
export const MOCK_WORDS: Word[] = [
  ...CURATED_WORDS,
  ...GENERATED_WORDS.filter((w) => !curatedKeys.has(`${w.lang}:${w.headword.toLowerCase()}`)),
  ...GENERATED_DE.filter((w) => !curatedKeys.has(`${w.lang}:${w.headword.toLowerCase()}`)),
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

/** All words for a target language (used for per-level progress). */
export function getLangWords(lang: LangCode): Word[] {
  return MOCK_WORDS.filter((w) => w.lang === lang);
}
