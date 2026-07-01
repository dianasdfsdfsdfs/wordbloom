/**
 * Wordbloom design tokens — the "Garnet / bloom" botanical identity, modern.
 *
 * Concept: red (garnet / wine) is the *bloom* and the deep surfaces;
 * green is *growth* and progress. These are brand colors — NOT swipe
 * semantics (red does not mean "wrong", green does not mean "right").
 */
import { Platform, type TextStyle } from 'react-native';

/* ------------------------------------------------------------------ */
/*  Raw brand palette (+ derived shades)                              */
/* ------------------------------------------------------------------ */
export const palette = {
  garnet: '#5C0000',
  wine: '#751717',
  brick: '#BA0C0C',
  red: '#FF0000',
  fern: '#27A300',
  india: '#2A850E',
  olive: '#2D661B',
  forest: '#005C00',
  leaf: '#2FB015',
  blush: '#FFEBEB',
  honeydew: '#ECFFEB',
  ink900: '#140708',
  ink800: '#1C0B0D',
  ink700: '#241014',
  ink600: '#301820',
  ink500: '#3E2129',
  petal50: '#FFF7F5',
  petal100: '#FDEDEC',
  rose300: '#CBA9AD',
  rose400: '#AE8B8F',
  rose500: '#8E6E72',
} as const;

/* ------------------------------------------------------------------ */
/*  Semantic color tokens                                             */
/* ------------------------------------------------------------------ */
export const lightColors = {
  bg: palette.petal50,
  surface: '#FFFFFF',
  surfaceAlt: '#FBEDEC',
  surfaceGreen: palette.honeydew,
  overlay: 'rgba(42,10,11,0.35)',

  textPrimary: '#241012',
  textSecondary: '#7A5457',
  textMuted: '#AB8D90',
  textOnBrand: '#FFF3F2',
  textOnAccent: '#F1FFEE',

  brand: palette.brick,
  brandStrong: palette.wine,
  brandDeep: palette.garnet,

  accent: palette.india,
  accentStrong: palette.forest,
  accentSoft: '#E6F5E2',

  border: '#F0DBD9',
  borderStrong: '#E7C9C7',
  danger: '#C81E1E',
  shadowTint: 'rgba(92,0,0,0.16)',

  swipePositive: palette.india,
  swipeNegative: palette.brick,
} as const;

export const darkColors: Record<keyof typeof lightColors, string> = {
  bg: palette.ink900,
  surface: '#221016',
  surfaceAlt: '#2C1620',
  surfaceGreen: '#12240F',
  overlay: 'rgba(0,0,0,0.55)',

  textPrimary: '#FCECEC',
  textSecondary: palette.rose300,
  textMuted: '#9B7C80',
  textOnBrand: '#FFF3F2',
  textOnAccent: '#F1FFEE',

  brand: '#D21313',
  brandStrong: palette.brick,
  brandDeep: palette.wine,

  accent: palette.leaf,
  accentStrong: palette.india,
  accentSoft: '#17300F',

  border: '#3A2029',
  borderStrong: '#4C2C35',
  danger: '#FF5A52',
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
  md: 14,
  lg: 20,
  xl: 26,
  card: 28,
  pill: 999,
} as const;

/** One modern family (Inter) across the app; hierarchy via weight + size. */
export const fonts = {
  display: {
    regular: 'Inter_500Medium',
    medium: 'Inter_600SemiBold',
    semibold: 'Inter_700Bold',
    bold: 'Inter_800ExtraBold',
    black: 'Inter_900Black',
  },
  body: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semibold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
    extrabold: 'Inter_800ExtraBold',
  },
} as const;

export const typeScale = {
  largeTitle: { fontFamily: fonts.display.bold, fontSize: 34, lineHeight: 40, letterSpacing: -0.8 },
  heroWord: { fontFamily: fonts.display.bold, fontSize: 40, lineHeight: 44, letterSpacing: -0.8 },
  displayL: { fontFamily: fonts.display.semibold, fontSize: 30, lineHeight: 36, letterSpacing: -0.6 },
  displayM: { fontFamily: fonts.display.semibold, fontSize: 24, lineHeight: 30, letterSpacing: -0.5 },
  titleL: { fontFamily: fonts.display.semibold, fontSize: 20, lineHeight: 26, letterSpacing: -0.3 },
  titleM: { fontFamily: fonts.body.semibold, fontSize: 17, lineHeight: 22, letterSpacing: -0.2 },
  body: { fontFamily: fonts.body.regular, fontSize: 16, lineHeight: 24 },
  bodyMed: { fontFamily: fonts.body.medium, fontSize: 16, lineHeight: 24 },
  small: { fontFamily: fonts.body.medium, fontSize: 14, lineHeight: 20 },
  label: { fontFamily: fonts.body.semibold, fontSize: 15, lineHeight: 20, letterSpacing: -0.1 },
  caption: { fontFamily: fonts.body.medium, fontSize: 13, lineHeight: 18 },
  overline: {
    fontFamily: fonts.body.bold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
} satisfies Record<string, TextStyle>;

const cardShadow =
  Platform.select({
    ios: { shadowColor: '#2A0A0B', shadowOpacity: 0.1, shadowRadius: 18, shadowOffset: { width: 0, height: 10 } },
    android: { elevation: 5 },
    default: {},
  }) ?? {};

const softShadow =
  Platform.select({
    ios: { shadowColor: '#2A0A0B', shadowOpacity: 0.08, shadowRadius: 9, shadowOffset: { width: 0, height: 4 } },
    android: { elevation: 3 },
    default: {},
  }) ?? {};

export const shadows = {
  card: cardShadow,
  soft: softShadow,
} as const;
