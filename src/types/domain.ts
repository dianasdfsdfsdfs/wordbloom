/** Core domain types for Wordbloom. */

export type LangCode = 'en' | 'de' | 'ru';

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export const CEFR_LEVELS: readonly CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'preposition'
  | 'conjunction'
  | 'pronoun'
  | 'phrase'
  | 'other';

export interface Word {
  id: string;
  /** Target language the word belongs to. */
  lang: LangCode;
  level: CEFRLevel;
  /** The word as shown on the card front. */
  headword: string;
  pos: PartOfSpeech;
  /** Phonetic transcription, e.g. /əˈbaʊt/. */
  ipa?: string;
  /** German article (der / die / das) or similar gender marker. */
  article?: string;
  /** Translations keyed by language; MVP fills `ru`. */
  translations: Partial<Record<LangCode, string>>;
  /** Example sentence in the target language. */
  example?: string;
  exampleTranslation?: string;
}

export type SrsStatus = 'new' | 'learning' | 'review' | 'mastered' | 'known';

export interface WordProgress {
  wordId: string;
  status: SrsStatus;
  /** Index into the SRS interval ladder. */
  stage: number;
  /** Epoch ms when the card is next due. */
  dueAt: number;
  lastReviewedAt?: number;
  seen: number;
  correct: number;
  wrong: number;
  /** Epoch ms when the word first reached "mastered". */
  learnedAt?: number;
}

/** A study collection = one CEFR level of one target language. */
export interface Collection {
  lang: LangCode;
  level: CEFRLevel;
  total: number;
}
