// German function words to exclude from the frequency-based vocabulary:
// pronouns, articles/determiners, sein/haben/werden + modal verb forms, and
// filler particles. These dominate the top of a frequency list, aren't useful
// as flashcards, and often mistranslate out of context. Content words
// (nouns/verbs/adjectives), prepositions and question words are kept.
export const STOP = new Set([
  // personal / possessive / reflexive / indefinite pronouns
  'ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'mich', 'dich', 'ihn', 'sich', 'uns', 'euch',
  'mir', 'dir', 'ihm', 'ihnen', 'mein', 'meine', 'meinen', 'meinem', 'meiner', 'meines',
  'dein', 'deine', 'deinen', 'deinem', 'deiner', 'deines', 'sein', 'seine', 'seinen', 'seinem',
  'seiner', 'seines', 'ihre', 'ihren', 'ihrem', 'ihrer', 'ihres', 'unser', 'unsere', 'unseren',
  'unserem', 'unserer', 'euer', 'eure', 'euren', 'eurem', 'eurer', 'man', 'jemand', 'niemand',
  'jeder', 'jede', 'jedes', 'jeden', 'jedem', 'alle', 'allen', 'aller', 'alles', 'nichts', 'etwas',
  // articles / determiners
  'der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'einer', 'eines',
  'kein', 'keine', 'keinen', 'keinem', 'keiner', 'keines', 'dieser', 'diese', 'dieses', 'diesen',
  'diesem', 'jener', 'jene', 'jenes', 'welche', 'welcher', 'welches', 'welchen', 'manche',
  'solche', 'beide', 'beiden',
  // sein / haben / werden + modals (surface forms)
  'bin', 'bist', 'ist', 'sind', 'seid', 'war', 'warst', 'waren', 'wart', 'gewesen', 'sei', 'seien',
  'wäre', 'wären', 'habe', 'hast', 'hat', 'habt', 'haben', 'hatte', 'hattest', 'hatten', 'gehabt',
  'hätte', 'hätten', 'werde', 'wirst', 'wird', 'werden', 'werdet', 'wurde', 'wurdest', 'wurden',
  'worden', 'würde', 'würden', 'kann', 'kannst', 'können', 'könnt', 'konnte', 'konnten', 'könnte',
  'könnten', 'gekonnt', 'muss', 'musst', 'müssen', 'müsst', 'musste', 'mussten', 'müsste',
  'müssten', 'soll', 'sollst', 'sollen', 'sollt', 'sollte', 'sollten', 'will', 'willst', 'wollen',
  'wollt', 'wollte', 'wollten', 'gewollt', 'darf', 'darfst', 'dürfen', 'dürft', 'durfte', 'durften',
  'dürfte', 'mag', 'magst', 'mögen', 'mögt', 'mochte', 'möchte', 'möchten', 'möchtest',
  // filler particles / function adverbs / grammatical conjunctions
  'nicht', 'nein', 'doch', 'mal', 'schon', 'noch', 'nur', 'auch', 'denn', 'halt', 'eben', 'wohl',
  'etwa', 'sehr', 'ganz', 'mehr', 'zwar', 'eher', 'sogar', 'bloß', 'naja', 'nun', 'also', 'tja',
  'und', 'oder', 'aber', 'dass', 'sondern', 'damit', 'dabei', 'dafür', 'daran', 'darauf',
  'deshalb', 'deswegen', 'trotzdem', 'dies',
]);
