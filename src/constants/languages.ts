import type { CEFRLevel, LangCode } from '@/types/domain';

export const LANGUAGES: Record<LangCode, { name: string; endonym: string; flag: string }> = {
  en: { name: 'English', endonym: 'English', flag: '🇬🇧' },
  de: { name: 'German', endonym: 'Deutsch', flag: '🇩🇪' },
  ru: { name: 'Russian', endonym: 'Русский', flag: '🇷🇺' },
};

/** Languages the user can learn in the MVP. */
export const TARGET_LANGUAGES: LangCode[] = ['en', 'de'];

export const LEVEL_INFO: Record<CEFRLevel, { name: string; blurb: string }> = {
  A1: { name: 'Beginner', blurb: 'The basics — everyday words and simple phrases.' },
  A2: { name: 'Elementary', blurb: 'Common expressions for routine, familiar tasks.' },
  B1: { name: 'Intermediate', blurb: 'Handle most situations while travelling.' },
  B2: { name: 'Upper-intermediate', blurb: 'Read complex texts and argue a point.' },
  C1: { name: 'Advanced', blurb: 'Express ideas fluently and spontaneously.' },
  C2: { name: 'Proficient', blurb: 'Near-native command of the language.' },
};
