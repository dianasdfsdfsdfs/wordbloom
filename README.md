# 🌱 Wordbloom

**Grow your vocabulary, one bloom at a time.** Wordbloom is a mobile flashcard app for learning a foreign language by CEFR level — with tactile swipe cards and spaced repetition. Learn new words, review the ones you're about to forget, and watch your progress *bloom*.

> **Status:** in active development. The frontend is being built first (on mock data) for visual approval — see the [Roadmap](#-roadmap).

## ✨ What makes it different

- **Level-based collections.** Each CEFR level (A1 → C2) is its own curated collection, sourced from official vocabulary lists. New words appear in random order, so you're never stuck grinding every word that starts with "a".
- **Swipe to learn.** A card deck you flip to reveal the translation, part of speech, and an example sentence.
- **Smart spaced repetition.** Words you know return on a growing schedule (minutes → hours → days → weeks). Miss a few days? Nothing is lost — overdue words simply wait for you.
- **Your bloom.** A living blossom visualizes how much of a level you've mastered.

## 🎯 MVP scope

- Target languages: **English** and **German**; translations into **Russian**.
- Card = headword · part of speech · translation · example sentence (audio & phonetics later).
- Streaks, a daily goal, and progress stats with charts.
- Dark & light themes.

## 🎨 Design

A "garnet / bloom" botanical identity built from a bold red + green palette:

| Role | Colors |
| --- | --- |
| Bloom — deep surfaces & brand | garnet `#5C0000` · wine `#751717` · brick `#BA0C0C` |
| Growth — accent & progress | fern `#27A300` · India green `#2A850E` · deep green `#005C00` |
| Light tints | Lavender Blush `#FFEBEB` · Honeydew `#ECFFEB` |

Type: **Fraunces** (editorial serif — headwords & headings) + **Manrope** (UI & Cyrillic translations).

## 🛠 Tech stack

- **Expo** (React Native) + **Expo Router** — file-based navigation
- **TypeScript**
- **Reanimated 4** + **Gesture Handler** — the swipe deck
- **Zustand** (+ AsyncStorage) — state & persistence
- **react-native-svg** — the bloom visual & charts
- **expo-sqlite + Drizzle ORM** — local-first word data (backend phase)

## 🚀 Getting started

```bash
npm install
npx expo start
```

Open the project in **Expo Go** (scan the QR code) on your phone, or run it on a simulator.

## 🗺 Roadmap

**Frontend** (mock data first, for visual approval):

0. ✅ Project setup & design system
1. Onboarding & auth
2. Swipe flashcard deck
3. Home dashboard
4. Levels & collections
5. Stats
6. Settings

**Then:** local SQLite + SRS engine + real CEFR word lists → accounts & cloud sync.

## 📚 Data & credits

English vocabulary is CEFR-graded using the open **CEFR-J Vocabulary Profile** (A1–B2) and the **Octanove Vocabulary Profile** (C1–C2), both CC BY-SA. Russian translations are generated via the free **MyMemory** translation API (`scripts/build-words.mjs`) and may vary in quality. German words are hand-curated.

## 📄 License

See [LICENSE](./LICENSE).
