/**
 * Wordbloom design tokens — the "Garnet / bloom" botanical identity.
 *
 * Concept: red (garnet / wine) is the *bloom* and the deep surfaces;
 * green is *growth* and progress. These are brand colors — NOT swipe
 * semantics (red does not mean "wrong", green does not mean "right").
 *
 * All values derive from the client palette:
 *   Dark Garnet #5C0000 · Dark Wine #751717 · Brick Ember #BA0C0C · Red #FF0000
 *   Bright Fern #27A300 · India Green #2A850E · Olive Leaf #2D661B · Deep Green #005C00
 *   Lavender Blush #FFEBEB · Honeydew #ECFFEB
 */
import { Platform, type TextStyle } from 'react-native';

/* ------------------------------------------------------------------ */
/*  Raw brand palette (+ derived shades)                              */
/* ------------------------------------------------------------------ */
export const palette = {
  // Reds — the bloom
  garnet: '#5C0000',
  wine: '#751717',
  brick: '#BA0C0C',
  red: '#FF0000', // use sparingly, for critical accents only
  // Greens — the growth
  fern: '#27A300',
  india: '#2A850E',
  olive: '#2D661B',
  forest: '#005C00',
  leaf: '#2FB015', // slightly brighter fern for legibility on dark grounds
  // Light tints
  blush: '#FFEBEB',
  honeydew: '#ECFFEB',
  // Derived warm-dark grounds (garnet-ink, never neutral black)
  ink900: '#150708',
  ink800: '#1D0B0D',
  ink700: '#241012',
  ink600: '#2C161A',
  ink500: '#3A1F23',
  // Derived soft whites / rosy neutrals
  petal50: '#FFF7F6',
  petal100: '#FDEDEC',
  rose300: '#C9A9AC',
  rose400: '#A98A8D',
  rose500: '#8E6E72',
} as const;

/* ------------------------------------------------------------------ */
/*  Semantic color tokens                                             */
/* ------------------------------------------------------------------ */
export const lightColors = {
  bg: palette.petal50,
  surface: '#FFFFFF',
  surfaceAlt: '#FFF0EF',
  surfaceGreen: palette.honeydew,
  overlay: 'rgba(42,10,11,0.35)',

  textPrimary: '#2B0B0C',
  textSecondary: '#7A5457',
  textMuted: '#A98A8D',
  textOnBrand: '#FFF3F2',
  textOnAccent: '#F1FFEE',

  brand: palette.brick,
  brandStrong: palette.wine,
  brandDeep: palette.garnet,

  accent: palette.india,
  accentStrong: palette.forest,
  accentSoft: '#EAF7E6',

  border: '#F0DAD8',
  borderStrong: '#E7C9C7',
  danger: '#D21414',
  shadowTint: 'rgba(92,0,0,0.16)',

  // Swipe feedback — aesthetic pairing, not "correct/incorrect"
  swipePositive: palette.india,
  swipeNegative: palette.brick,
} as const;

export const darkColors: Record<keyof typeof lightColors, string> = {
  bg: palette.ink900,
  surface: palette.ink700,
  surfaceAlt: palette.ink600,
  surfaceGreen: '#12240F',
  overlay: 'rgba(0,0,0,0.55)',

  textPrimary: '#FBEAEA',
  textSecondary: palette.rose300,
  textMuted: palette.rose500,
  textOnBrand: '#FFF3F2',
  textOnAccent: '#F1FFEE',

  brand: palette.brick,
  brandStrong: palette.wine,
  brandDeep: palette.garnet,

  accent: palette.leaf,
  accentStrong: palette.india,
  accentSoft: '#16300F',

  border: palette.ink500,
  borderStrong: '#4A282C',
  danger: '#FF3B30',
  shadowTint: 'rgba(0,0,0,0.6)',

  swipePositive: palette.leaf,
  swipeNegative: '#E23A2E',
};

export type ThemeColors = Record<keyof typeof lightColors, string>;
export type ColorName = keyof ThemeColors;
export type ThemeMode = 'light' | 'dark';

export const themes: Record<ThemeMode, ThemeColors> = {
  light: lightColors,
  dark: darkColors,
};

/* ------------------------------------------------------------------ */
/*  Spacing, radii, typography, shadows                               */
/* ------------------------------------------------------------------ */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  huge: 64,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  card: 30,
  pill: 999,
} as const;

/**
 * Font-family names map to the weights loaded via @expo-google-fonts
 * in the root layout. Display = Fraunces (editorial serif, used for
 * headwords & headings). Body = Manrope (humanist grotesque, UI +
 * Cyrillic translations).
 */
export const fonts = {
  display: {
    regular: 'Fraunces_400Regular',
    medium: 'Fraunces_500Medium',
    semibold: 'Fraunces_600SemiBold',
    bold: 'Fraunces_700Bold',
    black: 'Fraunces_900Black',
    italic: 'Fraunces_400Regular_Italic',
  },
  body: {
    regular: 'Manrope_400Regular',
    medium: 'Manrope_500Medium',
    semibold: 'Manrope_600SemiBold',
    bold: 'Manrope_700Bold',
    extrabold: 'Manrope_800ExtraBold',
  },
} as const;

export const typeScale = {
  heroWord: { fontFamily: fonts.display.semibold, fontSize: 46, lineHeight: 50, letterSpacing: -0.6 },
  displayL: { fontFamily: fonts.display.semibold, fontSize: 34, lineHeight: 40, letterSpacing: -0.4 },
  displayM: { fontFamily: fonts.display.semibold, fontSize: 26, lineHeight: 32, letterSpacing: -0.3 },
  titleL: { fontFamily: fonts.body.bold, fontSize: 22, lineHeight: 28, letterSpacing: -0.2 },
  titleM: { fontFamily: fonts.body.bold, fontSize: 18, lineHeight: 24 },
  body: { fontFamily: fonts.body.regular, fontSize: 16, lineHeight: 24 },
  bodyMed: { fontFamily: fonts.body.medium, fontSize: 16, lineHeight: 24 },
  small: { fontFamily: fonts.body.medium, fontSize: 14, lineHeight: 20 },
  caption: { fontFamily: fonts.body.medium, fontSize: 13, lineHeight: 18 },
  overline: {
    fontFamily: fonts.body.bold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
} satisfies Record<string, TextStyle>;

const cardShadow =
  Platform.select({
    ios: { shadowColor: '#3A0000', shadowOpacity: 0.28, shadowRadius: 26, shadowOffset: { width: 0, height: 14 } },
    android: { elevation: 10 },
    default: {},
  }) ?? {};

const softShadow =
  Platform.select({
    ios: { shadowColor: '#3A0000', shadowOpacity: 0.16, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } },
    android: { elevation: 4 },
    default: {},
  }) ?? {};

export const shadows = {
  card: cardShadow,
  soft: softShadow,
} as const;
