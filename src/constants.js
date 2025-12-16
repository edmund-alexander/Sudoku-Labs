/**
 * Sudoku Logic Lab - Constants
 * 
 * Global constants for themes, sound packs, campaign levels, and storage keys.
 * This file uses plain JavaScript (no JSX) and can be loaded before React.
 * 
 * @version 2.3.0
 */

// ============================================================================
// STORAGE KEYS
// ============================================================================

const KEYS = Object.freeze({
  GAME_STATE: 'sudoku_v2_state',
  LEADERBOARD: 'sudoku_v2_leaderboard',
  CHAT: 'sudoku_v2_chat',
  USER_ID: 'sudoku_v2_uid',
  SOUND_ENABLED: 'sudoku_v2_sound',
  CAMPAIGN_PROGRESS: 'sudoku_v2_campaign',
  USER_SESSION: 'sudoku_v2_user_session',
  UNLOCKED_THEMES: 'sudoku_v2_unlocked_themes',
  ACTIVE_THEME: 'sudoku_v2_active_theme',
  UNLOCKED_SOUND_PACKS: 'sudoku_v2_unlocked_sound_packs',
  ACTIVE_SOUND_PACK: 'sudoku_v2_active_sound_pack',
  GAME_STATS: 'sudoku_v2_game_stats',
  USER_STATUS: 'sudoku_v2_user_status'
});

// ============================================================================
// DIFFICULTY SETTINGS
// ============================================================================

const DIFFICULTY = Object.freeze({
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
  DAILY: 'Daily'
});

const DIFFICULTY_REMOVE_COUNTS = Object.freeze({
  [DIFFICULTY.EASY]: 30,
  [DIFFICULTY.MEDIUM]: 45,
  [DIFFICULTY.HARD]: 55,
  [DIFFICULTY.DAILY]: 40 // Base, modified by date
});

// ============================================================================
// GAME SETTINGS
// ============================================================================

const GAME_SETTINGS = Object.freeze({
  MAX_MISTAKES: 3,
  CHAT_POLL_INTERVAL: 5000,
  CHAT_MAX_LENGTH: 140,
  STATUS_MAX_LENGTH: 50,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 20,
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 100,
  HISTORY_MAX_LENGTH: 10,
  LEADERBOARD_MAX_ENTRIES: 50,
  CHAT_MAX_MESSAGES: 50
});

// ============================================================================
// CAMPAIGN LEVELS
// ============================================================================

const CAMPAIGN_LEVELS = Object.freeze([
  {
    id: 1,
    title: "The Awakening",
    difficulty: DIFFICULTY.EASY,
    desc: "Start your journey. Complete an Easy puzzle.",
    criteria: (s) => s.status === 'won',
    biome: 'grass'
  },
  {
    id: 2,
    title: "Swift Mind",
    difficulty: DIFFICULTY.EASY,
    desc: "Solve an Easy puzzle in under 3 minutes.",
    criteria: (s) => s.status === 'won' && s.time < 180,
    biome: 'grass'
  },
  {
    id: 3,
    title: "Treasure Trove",
    difficulty: DIFFICULTY.EASY,
    desc: "Bonus Level! Solve with 0 mistakes.",
    criteria: (s) => s.status === 'won' && s.mistakes === 0,
    biome: 'grass',
    isChest: true
  },
  {
    id: 4,
    title: "Sandstorm",
    difficulty: DIFFICULTY.MEDIUM,
    desc: "Step up the challenge. Complete a Medium puzzle.",
    criteria: (s) => s.status === 'won',
    biome: 'desert'
  },
  {
    id: 5,
    title: "Mirage",
    difficulty: DIFFICULTY.MEDIUM,
    desc: "Medium puzzle, max 1 mistake.",
    criteria: (s) => s.status === 'won' && s.mistakes <= 1,
    biome: 'desert'
  },
  {
    id: 6,
    title: "Oasis Cache",
    difficulty: DIFFICULTY.MEDIUM,
    desc: "Bonus! Medium puzzle under 8 mins.",
    criteria: (s) => s.status === 'won' && s.time < 480,
    biome: 'desert',
    isChest: true
  },
  {
    id: 7,
    title: "Void Walker",
    difficulty: DIFFICULTY.HARD,
    desc: "Face the ultimate test. Complete a Hard puzzle.",
    criteria: (s) => s.status === 'won',
    biome: 'space'
  },
  {
    id: 8,
    title: "Star Lord",
    difficulty: DIFFICULTY.HARD,
    desc: "Hard puzzle, 0 mistakes, under 15 min.",
    criteria: (s) => s.status === 'won' && s.mistakes === 0 && s.time < 900,
    biome: 'space'
  }
]);

// ============================================================================
// THEMES
// ============================================================================

const THEMES = Object.freeze({
  default: {
    id: 'default',
    name: 'Classic',
    description: 'The original Sudoku experience',
    background: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800',
    boardBg: 'bg-white dark:bg-gray-800',
    cellBg: 'bg-white dark:bg-gray-800',
    fixedCellBg: 'bg-gray-50 dark:bg-gray-800',
    selectedCellBg: 'bg-blue-200 dark:bg-blue-900',
    icon: '📋',
    unlocked: true,
    pairedSoundPack: 'classic',
    pairingName: 'Classic Logic'
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean Depths',
    description: 'Dive into tranquil waters',
    background: 'bg-gradient-to-br from-cyan-100 to-blue-200 dark:from-cyan-950 dark:to-blue-950',
    boardBg: 'bg-cyan-50/80 dark:bg-cyan-900/50',
    cellBg: 'bg-cyan-50 dark:bg-cyan-900/70',
    fixedCellBg: 'bg-cyan-100 dark:bg-cyan-950',
    selectedCellBg: 'bg-blue-300 dark:bg-blue-800',
    icon: '🌊',
    unlocked: false,
    unlockCriteria: 'Win 5 games',
    pairedSoundPack: 'zen',
    pairingName: 'Underwater Meditation'
  },
  forest: {
    id: 'forest',
    name: 'Emerald Forest',
    description: 'Find peace among the trees',
    background: 'bg-gradient-to-br from-emerald-100 to-green-300 dark:from-emerald-950 dark:to-green-900',
    boardBg: 'bg-emerald-50/80 dark:bg-emerald-900/50',
    cellBg: 'bg-emerald-50 dark:bg-emerald-900/70',
    fixedCellBg: 'bg-emerald-100 dark:bg-emerald-950',
    selectedCellBg: 'bg-green-300 dark:bg-green-800',
    icon: '🌲',
    unlocked: false,
    unlockCriteria: 'Win 10 games',
    pairedSoundPack: 'nature',
    pairingName: 'Woodland Breeze'
  },
  sunset: {
    id: 'sunset',
    name: 'Golden Sunset',
    description: 'Bask in warm twilight hues',
    background: 'bg-gradient-to-br from-orange-100 to-pink-300 dark:from-orange-900 dark:to-pink-900',
    boardBg: 'bg-orange-50/80 dark:bg-orange-900/50',
    cellBg: 'bg-orange-50 dark:bg-orange-800/70',
    fixedCellBg: 'bg-orange-100 dark:bg-orange-900',
    selectedCellBg: 'bg-orange-300 dark:bg-orange-700',
    icon: '🌅',
    unlocked: false,
    unlockCriteria: 'Complete a Hard puzzle',
    pairedSoundPack: 'funfair',
    pairingName: 'Carnival Twilight'
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Sky',
    description: 'Puzzle under the stars',
    background: 'bg-gradient-to-br from-indigo-900 to-purple-900 dark:from-black dark:to-indigo-950',
    boardBg: 'bg-indigo-900/50 dark:bg-black/50',
    cellBg: 'bg-indigo-800/70 dark:bg-gray-900/70',
    fixedCellBg: 'bg-indigo-900 dark:bg-black',
    selectedCellBg: 'bg-purple-700 dark:bg-purple-900',
    icon: '🌙',
    unlocked: false,
    unlockCriteria: 'Win a puzzle with 0 mistakes',
    pairedSoundPack: 'space',
    pairingName: 'Cosmic Stargazing'
  },
  sakura: {
    id: 'sakura',
    name: 'Sakura Bloom',
    description: 'Cherry blossoms in spring',
    background: 'bg-gradient-to-br from-pink-100 to-rose-200 dark:from-pink-900 dark:to-rose-900',
    boardBg: 'bg-pink-50/80 dark:bg-pink-900/50',
    cellBg: 'bg-pink-50 dark:bg-pink-800/70',
    fixedCellBg: 'bg-pink-100 dark:bg-pink-900',
    selectedCellBg: 'bg-pink-300 dark:bg-pink-700',
    icon: '🌸',
    unlocked: false,
    unlockCriteria: 'Win 3 Easy puzzles',
    pairedSoundPack: 'retro',
    pairingName: '8-Bit Blossom Garden'
  },
  volcano: {
    id: 'volcano',
    name: 'Volcanic Heat',
    description: 'Feel the magma flow',
    background: 'bg-gradient-to-br from-red-100 to-orange-400 dark:from-red-900 dark:to-orange-900',
    boardBg: 'bg-red-50/80 dark:bg-red-900/50',
    cellBg: 'bg-red-50 dark:bg-red-800/70',
    fixedCellBg: 'bg-red-100 dark:bg-red-900',
    selectedCellBg: 'bg-red-300 dark:bg-red-700',
    icon: '🌋',
    unlocked: false,
    unlockCriteria: 'Win 3 Medium puzzles',
    pairedSoundPack: 'minimal',
    pairingName: 'Focused Intensity'
  },
  arctic: {
    id: 'arctic',
    name: 'Arctic Ice',
    description: 'Cool crystalline clarity',
    background: 'bg-gradient-to-br from-blue-50 to-cyan-200 dark:from-blue-950 dark:to-cyan-950',
    boardBg: 'bg-blue-50/80 dark:bg-blue-950/50',
    cellBg: 'bg-blue-50 dark:bg-blue-900/70',
    fixedCellBg: 'bg-blue-100 dark:bg-blue-950',
    selectedCellBg: 'bg-blue-200 dark:bg-blue-800',
    icon: '❄️',
    unlocked: false,
    unlockCriteria: 'Win a puzzle in under 3 minutes',
    pairedSoundPack: 'crystal',
    pairingName: 'Ice Crystal Sparkle'
  }
});

// ============================================================================
// SOUND PACKS
// ============================================================================

const SOUND_PACKS = Object.freeze({
  classic: {
    id: 'classic',
    name: 'Classic',
    description: 'Original Logic Lab blips',
    icon: '🎛️',
    unlocked: true
  },
  zen: {
    id: 'zen',
    name: 'Zen',
    description: 'Calm sine tones and long tails',
    icon: '🧘',
    unlocked: true
  },
  funfair: {
    id: 'funfair',
    name: 'Funfair',
    description: 'Playful bells and ramps',
    icon: '🎡',
    unlocked: false,
    unlockCriteria: 'Win 3 games'
  },
  retro: {
    id: 'retro',
    name: 'Retro',
    description: '8-bit inspired pulses',
    icon: '🕹️',
    unlocked: false,
    unlockCriteria: 'Win 3 Easy games'
  },
  space: {
    id: 'space',
    name: 'Space',
    description: 'Cosmic arps and sweeps',
    icon: '🪐',
    unlocked: false,
    unlockCriteria: 'Win a Hard game'
  },
  nature: {
    id: 'nature',
    name: 'Nature',
    description: 'Soft wood and breeze chimes',
    icon: '🍃',
    unlocked: false,
    unlockCriteria: 'Win 3 Medium games'
  },
  crystal: {
    id: 'crystal',
    name: 'Crystal',
    description: 'Clean triangle sparkles',
    icon: '💎',
    unlocked: false,
    unlockCriteria: 'Win with 0 mistakes'
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    description: 'Short, dry clicky cues',
    icon: '◽',
    unlocked: false,
    unlockCriteria: 'Win under 3 minutes'
  }
});

// ============================================================================
// COMBINATORIAL THEME SYSTEM
// ============================================================================

/**
 * ThemeAssetSet defines the unique visual output for each (Audio, Visual) combination.
 * Each combination results in a distinct "recipe" with specific:
 * - name: Display name for this combination
 * - description: Flavor text describing the aesthetic
 * - background: CSS gradient classes for the page background
 * - backgroundImage: Optional subtle background image/pattern
 * - boardTexture: Visual texture for the Sudoku grid (wood, pixel, stone, paper, etc.)
 * - boardBg: Background color/style for the board container
 * - cellBg: Default cell background
 * - fixedCellBg: Pre-filled cell background
 * - selectedCellBg: Selected cell highlight
 * - decor: Theme-specific decorative elements to render around the UI
 */

// Helper to generate combination key
const getComboKey = (visualId, audioId) => `${visualId}_${audioId}`;

// Base visual themes (extracted from THEMES for cleaner combination logic)
const VISUAL_BASES = Object.freeze({
  default: {
    background: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800',
    boardBg: 'bg-white dark:bg-gray-800',
    cellBg: 'bg-white dark:bg-gray-800',
    fixedCellBg: 'bg-gray-50 dark:bg-gray-800',
    selectedCellBg: 'bg-blue-200 dark:bg-blue-900'
  },
  ocean: {
    background: 'bg-gradient-to-br from-cyan-100 to-blue-200 dark:from-cyan-950 dark:to-blue-950',
    boardBg: 'bg-cyan-50/80 dark:bg-cyan-900/50',
    cellBg: 'bg-cyan-50 dark:bg-cyan-900/70',
    fixedCellBg: 'bg-cyan-100 dark:bg-cyan-950',
    selectedCellBg: 'bg-blue-300 dark:bg-blue-800'
  },
  forest: {
    background: 'bg-gradient-to-br from-emerald-100 to-green-300 dark:from-emerald-950 dark:to-green-900',
    boardBg: 'bg-emerald-50/80 dark:bg-emerald-900/50',
    cellBg: 'bg-emerald-50 dark:bg-emerald-900/70',
    fixedCellBg: 'bg-emerald-100 dark:bg-emerald-950',
    selectedCellBg: 'bg-green-300 dark:bg-green-800'
  },
  sunset: {
    background: 'bg-gradient-to-br from-orange-100 to-pink-300 dark:from-orange-900 dark:to-pink-900',
    boardBg: 'bg-orange-50/80 dark:bg-orange-900/50',
    cellBg: 'bg-orange-50 dark:bg-orange-800/70',
    fixedCellBg: 'bg-orange-100 dark:bg-orange-900',
    selectedCellBg: 'bg-orange-300 dark:bg-orange-700'
  },
  midnight: {
    background: 'bg-gradient-to-br from-indigo-900 to-purple-900 dark:from-black dark:to-indigo-950',
    boardBg: 'bg-indigo-900/50 dark:bg-black/50',
    cellBg: 'bg-indigo-800/70 dark:bg-gray-900/70',
    fixedCellBg: 'bg-indigo-900 dark:bg-black',
    selectedCellBg: 'bg-purple-700 dark:bg-purple-900'
  },
  sakura: {
    background: 'bg-gradient-to-br from-pink-100 to-rose-200 dark:from-pink-900 dark:to-rose-900',
    boardBg: 'bg-pink-50/80 dark:bg-pink-900/50',
    cellBg: 'bg-pink-50 dark:bg-pink-800/70',
    fixedCellBg: 'bg-pink-100 dark:bg-pink-900',
    selectedCellBg: 'bg-pink-300 dark:bg-pink-700'
  },
  volcano: {
    background: 'bg-gradient-to-br from-red-100 to-orange-400 dark:from-red-900 dark:to-orange-900',
    boardBg: 'bg-red-50/80 dark:bg-red-900/50',
    cellBg: 'bg-red-50 dark:bg-red-800/70',
    fixedCellBg: 'bg-red-100 dark:bg-red-900',
    selectedCellBg: 'bg-red-300 dark:bg-red-700'
  },
  arctic: {
    background: 'bg-gradient-to-br from-blue-50 to-cyan-200 dark:from-blue-950 dark:to-cyan-950',
    boardBg: 'bg-blue-50/80 dark:bg-blue-950/50',
    cellBg: 'bg-blue-50 dark:bg-blue-900/70',
    fixedCellBg: 'bg-blue-100 dark:bg-blue-950',
    selectedCellBg: 'bg-blue-200 dark:bg-blue-800'
  }
});

// ============================================================================
// SVG PATTERN LIBRARY - Theme-specific visual assets
// ============================================================================

/**
 * SVG pattern generators for each theme
 * Each pattern is encoded as a data URI for direct use in backgroundImage
 */
const SVG_PATTERNS = Object.freeze({
  // Default theme - clean, minimal lines
  default_bg: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3ClinearGradient id='grad'%3E%3Cstop offset='0%25' stop-color='%234f46e5' stop-opacity='0.05'/%3E%3Cstop offset='100%25' stop-color='%232563eb' stop-opacity='0.02'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='200' height='200' fill='url(%23grad)'/%3E%3Cline x1='0' y1='0' x2='200' y2='200' stroke='%234f46e5' stroke-width='0.5' opacity='0.08'/%3E%3Cline x1='200' y1='0' x2='0' y2='200' stroke='%232563eb' stroke-width='0.5' opacity='0.08'/%3E%3C/svg%3E")`,
  
  // Ocean theme - wave-like flowing patterns
  ocean_bg: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='150'%3E%3Cdefs%3E%3ClinearGradient id='oceanGrad' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2306b6d4' stop-opacity='0.08'/%3E%3Cstop offset='100%25' stop-color='%230369a1' stop-opacity='0.04'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='150' fill='url(%23oceanGrad)'/%3E%3Cpath d='M0,50 Q75,30 150,50 T300,50' stroke='%230ea5e9' stroke-width='1' fill='none' opacity='0.15'/%3E%3Cpath d='M0,80 Q75,60 150,80 T300,80' stroke='%230284c7' stroke-width='0.8' fill='none' opacity='0.12'/%3E%3Cpath d='M0,110 Q75,90 150,110 T300,110' stroke='%230369a1' stroke-width='0.8' fill='none' opacity='0.1'/%3E%3C/svg%3E")`,
  
  // Forest theme - organic leaves and branches
  forest_bg: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3ClinearGradient id='forestGrad'%3E%3Cstop offset='0%25' stop-color='%2310b981' stop-opacity='0.06'/%3E%3Cstop offset='100%25' stop-color='%23047857' stop-opacity='0.04'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='200' height='200' fill='url(%23forestGrad)'/%3E%3Cpath d='M50,30 Q40,60 50,90 Q60,60 50,30' fill='%2310b981' opacity='0.1'/%3E%3Cpath d='M150,50 Q140,80 150,110 Q160,80 150,50' fill='%2334d399' opacity='0.08'/%3E%3Ccircle cx='40' cy='50' r='8' fill='%236ee7b7' opacity='0.12'/%3E%3Ccircle cx='160' cy='160' r='6' fill='%2310b981' opacity='0.1'/%3E%3C/svg%3E")`,
  
  // Sunset theme - gradient waves and warmth
  sunset_bg: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Cdefs%3E%3ClinearGradient id='sunsetGrad' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23f97316' stop-opacity='0.08'/%3E%3Cstop offset='100%25' stop-color='%23ec4899' stop-opacity='0.06'/%3E%3C/linearGradient%3E%3CradialGradient id='sunGlow'%3E%3Cstop offset='0%25' stop-color='%23fbbf24' stop-opacity='0.15'/%3E%3Cstop offset='100%25' stop-color='%23f97316' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='300' height='200' fill='url(%23sunsetGrad)'/%3E%3Ccircle cx='250' cy='80' r='40' fill='url(%23sunGlow)'/%3E%3Cpath d='M0,150 Q75,140 150,150 T300,150' stroke='%23f97316' stroke-width='1.5' fill='none' opacity='0.1'/%3E%3C/svg%3E")`,
  
  // Midnight theme - stars and cosmic
  midnight_bg: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3CradialGradient id='starGlow' r='50%25'%3E%3Cstop offset='0%25' stop-color='white' stop-opacity='0.8'/%3E%3Cstop offset='100%25' stop-color='white' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='200' height='200' fill='%23111827' opacity='0.04'/%3E%3Ccircle cx='30' cy='40' r='1.5' fill='url(%23starGlow)'/%3E%3Ccircle cx='170' cy='50' r='1' fill='url(%23starGlow)'/%3E%3Ccircle cx='100' cy='30' r='0.8' fill='url(%23starGlow)'/%3E%3Ccircle cx='180' cy='150' r='1.2' fill='url(%23starGlow)'/%3E%3Ccircle cx='40' cy='170' r='0.9' fill='url(%23starGlow)'/%3E%3C/svg%3E")`,
  
  // Sakura theme - floating petals and circles
  sakura_bg: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3ClinearGradient id='sakuraGrad'%3E%3Cstop offset='0%25' stop-color='%23ec4899' stop-opacity='0.06'/%3E%3Cstop offset='100%25' stop-color='%23be185d' stop-opacity='0.03'/%3E%3C/linearGradient%3E%3CradialGradient id='petalGlow'%3E%3Cstop offset='0%25' stop-color='%23f472b6' stop-opacity='0.2'/%3E%3Cstop offset='100%25' stop-color='%23ec4899' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='200' height='200' fill='url(%23sakuraGrad)'/%3E%3Ccircle cx='50' cy='60' r='15' fill='url(%23petalGlow)'/%3E%3Ccircle cx='150' cy='100' r='18' fill='url(%23petalGlow)'/%3E%3Ccircle cx='100' cy='160' r='12' fill='url(%23petalGlow)'/%3E%3C/svg%3E")`,
  
  // Volcano theme - heat waves and intensity
  volcano_bg: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='200'%3E%3Cdefs%3E%3ClinearGradient id='volcanoGrad' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23dc2626' stop-opacity='0.08'/%3E%3Cstop offset='100%25' stop-color='%23991b1b' stop-opacity='0.05'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='250' height='200' fill='url(%23volcanoGrad)'/%3E%3Cpath d='M50,80 L100,20 L150,80 Z' fill='%23ef4444' opacity='0.08'/%3E%3Cpath d='M60,100 Q125,30 190,100' stroke='%23f97316' stroke-width='1.5' fill='none' opacity='0.12'/%3E%3Cpath d='M40,120 Q125,50 210,120' stroke='%23ea580c' stroke-width='1' fill='none' opacity='0.1'/%3E%3C/svg%3E")`,
  
  // Arctic theme - crystalline and geometric
  arctic_bg: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cdefs%3E%3ClinearGradient id='arcticGrad'%3E%3Cstop offset='0%25' stop-color='%230ea5e9' stop-opacity='0.08'/%3E%3Cstop offset='100%25' stop-color='%230369a1' stop-opacity='0.04'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='180' height='180' fill='url(%23arcticGrad)'/%3E%3Cpath d='M90,10 L130,60 L90,90 L50,60 Z' fill='%2399ccff' opacity='0.12'/%3E%3Cpath d='M30,50 L50,80 L30,110 L10,80 Z' fill='%237dd3fc' opacity='0.1'/%3E%3Cpath d='M140,120 L160,150 L140,170 L120,150 Z' fill='%2399ccff' opacity='0.08'/%3E%3C/svg%3E")`
});

// ============================================================================
// SVG DECORATIONS - Theme-aware custom drawn elements
// ============================================================================

/**
 * SVG decorator generators for each theme combination
 * Returns an array of SVG strings to render as floating decorations
 */
const SVG_DECORATIONS = Object.freeze({
  // Watercolor/Zen themes - brush strokes and flowing elements
  watercolor: [
    // Brush stroke 1
    `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='30' viewBox='0 0 40 30'><path d='M5,15 Q15,8 35,12 T50,15' stroke='%234f46e5' stroke-width='2' fill='none' opacity='0.4' stroke-linecap='round'/></svg>`,
    // Brush stroke 2
    `<svg xmlns='http://www.w3.org/2000/svg' width='35' height='25' viewBox='0 0 35 25'><ellipse cx='17' cy='12' rx='12' ry='8' fill='%232563eb' opacity='0.25'/></svg>`,
    // Flowing wash
    `<svg xmlns='http://www.w3.org/2000/svg' width='50' height='20' viewBox='0 0 50 20'><path d='M0,10 Q12,5 25,10 T50,10' stroke='%237c3aed' stroke-width='1.5' fill='none' opacity='0.3'/></svg>`
  ],
  
  // Ocean/Aquatic - bubbles and water droplets
  aquatic: [
    // Bubble
    `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' fill='none' stroke='%230ea5e9' stroke-width='1.5' opacity='0.5'/><circle cx='14' cy='10' r='2' fill='%23bfdbfe' opacity='0.6'/></svg>`,
    // Water droplet
    `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='20' viewBox='0 0 16 20'><path d='M8,2 Q12,8 12,14 Q12,18 8,20 Q4,18 4,14 Q4,8 8,2' fill='%230284c7' opacity='0.4'/></svg>`,
    // Spiral wave
    `<svg xmlns='http://www.w3.org/2000/svg' width='35' height='15' viewBox='0 0 35 15'><path d='M2,8 Q8,3 14,8 T26,8 T38,8' stroke='%2306b6d4' stroke-width='1' fill='none' opacity='0.4'/></svg>`
  ],
  
  // Forest/Nature - leaves and organic shapes
  organic: [
    // Leaf 1
    `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='28' viewBox='0 0 20 28'><path d='M10,2 Q15,10 14,18 Q10,24 10,28 Q6,24 6,18 Q5,10 10,2' fill='%2310b981' opacity='0.45' stroke='%23059669' stroke-width='0.5'/></svg>`,
    // Leaf 2
    `<svg xmlns='http://www.w3.org/2000/svg' width='18' height='26' viewBox='0 0 18 26'><path d='M9,1 Q14,8 13,16 Q9,22 9,26 Q5,22 5,16 Q4,8 9,1' fill='%2334d399' opacity='0.4' stroke='%2310b981' stroke-width='0.5'/></svg>`,
    // Organic blob
    `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><circle cx='12' cy='12' r='8' fill='%236ee7b7' opacity='0.35'/><circle cx='10' cy='10' r='3' fill='%2310b981' opacity='0.3'/></svg>`
  ],
  
  // Pixel/Retro - 8-bit style elements
  pixel: [
    // Pixel square 1
    `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><rect x='4' y='4' width='8' height='8' fill='%23f97316' opacity='0.5'/><rect x='6' y='6' width='4' height='4' fill='%23fbbf24' opacity='0.6'/></svg>`,
    // Pixel square 2
    `<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'><rect x='2' y='2' width='8' height='8' fill='%23ec4899' opacity='0.5'/></svg>`,
    // Pixel petals (for 8-bit blossom)
    `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><rect x='8' y='2' width='4' height='4' fill='%23f472b6' opacity='0.6'/><rect x='2' y='8' width='4' height='4' fill='%23f472b6' opacity='0.6'/><rect x='14' y='8' width='4' height='4' fill='%23f472b6' opacity='0.6'/><rect x='8' y='14' width='4' height='4' fill='%23f472b6' opacity='0.6'/></svg>`
  ],
  
  // Cosmic/Space - stars and celestial
  cosmic: [
    // Star glow
    `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><circle cx='10' cy='10' r='6' fill='%2360a5fa' opacity='0.3'/><circle cx='10' cy='10' r='2' fill='%2393c5fd' opacity='0.7'/></svg>`,
    // Twinkle
    `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><circle cx='8' cy='8' r='4' fill='%2397f3ff' opacity='0.4'/></svg>`,
    // Cosmic dust
    `<svg xmlns='http://www.w3.org/2000/svg' width='28' height='10' viewBox='0 0 28 10'><circle cx='4' cy='5' r='1.5' fill='%236366f1' opacity='0.3'/><circle cx='10' cy='3' r='1' fill='%2360a5fa' opacity='0.4'/><circle cx='16' cy='6' r='1.2' fill='%238b5cf6' opacity='0.35'/><circle cx='24' cy='4' r='1' fill='%2360a5fa' opacity='0.3'/></svg>`
  ],
  
  // Sakura/Blossom - petals and flowers
  blossom: [
    // Petal 1
    `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='18' viewBox='0 0 16 18'><path d='M8,1 Q11,6 10,14 Q8,16 6,14 Q5,6 8,1' fill='%23ec4899' opacity='0.45'/></svg>`,
    // Petal 2
    `<svg xmlns='http://www.w3.org/2000/svg' width='18' height='16' viewBox='0 0 18 16'><path d='M9,1 Q14,5 14,12 Q12,15 9,15 Q6,15 4,12 Q4,5 9,1' fill='%23f472b6' opacity='0.4'/></svg>`,
    // Flower center
    `<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'><circle cx='7' cy='7' r='5' fill='%23fbcfe8' opacity='0.5'/><circle cx='7' cy='7' r='2' fill='%23ec4899' opacity='0.6'/></svg>`
  ],
  
  // Volcano/Heat - flames and intensity
  flame: [
    // Flame shape
    `<svg xmlns='http://www.w3.org/2000/svg' width='14' height='24' viewBox='0 0 14 24'><path d='M7,2 Q10,8 9,15 Q7,21 7,24 Q5,21 4,15 Q3,8 7,2' fill='%23ef4444' opacity='0.45'/><path d='M7,5 Q9,10 8,16 Q7,20 7,23 Q5,20 5,16 Q4,10 7,5' fill='%23f97316' opacity='0.35'/></svg>`,
    // Glow spark
    `<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'><circle cx='9' cy='9' r='7' fill='%23fbbf24' opacity='0.3'/><circle cx='9' cy='9' r='3' fill='%23f97316' opacity='0.5'/></svg>`,
    // Heat wave
    `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='10' viewBox='0 0 32 10'><path d='M2,7 Q8,2 14,7 T26,7 T40,7' stroke='%23ea580c' stroke-width='1.5' fill='none' opacity='0.4'/></svg>`
  ],
  
  // Arctic/Crystal - crystalline patterns
  crystal: [
    // Ice crystal 1
    `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path d='M10,2 L12,8 L10,10 L8,8 Z' fill='%2399ccff' opacity='0.5'/><path d='M18,10 L12,12 L10,10 L12,8 Z' fill='%237dd3fc' opacity='0.45'/><path d='M10,18 L8,12 L10,10 L12,12 Z' fill='%2399ccff' opacity='0.5'/><path d='M2,10 L8,8 L10,10 L8,12 Z' fill='%237dd3fc' opacity='0.45'/></svg>`,
    // Ice diamond
    `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path d='M8,1 L13,8 L8,15 L3,8 Z' fill='none' stroke='%2399ccff' stroke-width='1.2' opacity='0.5'/></svg>`,
    // Snowflake
    `<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'><circle cx='9' cy='9' r='6' fill='%23bfdbfe' opacity='0.3'/><path d='M9,3 L9,15 M3,9 L15,9 M5,5 L13,13 M13,5 L5,13' stroke='%230ea5e9' stroke-width='1' opacity='0.4'/></svg>`
  ]
});

// Audio theme modifiers (how audio themes influence the visual rendering)
const AUDIO_MODIFIERS = Object.freeze({
  classic: { style: 'clean', textureHint: 'smooth' },
  zen: { style: 'watercolor', textureHint: 'paper' },
  funfair: { style: 'playful', textureHint: 'carnival' },
  retro: { style: 'pixel', textureHint: 'pixelgrid' },
  space: { style: 'cosmic', textureHint: 'nebula' },
  nature: { style: 'organic', textureHint: 'wood' },
  crystal: { style: 'crystalline', textureHint: 'ice' },
  minimal: { style: 'stark', textureHint: 'concrete' }
});

// Board texture definitions
const BOARD_TEXTURES = Object.freeze({
  smooth: { name: 'Smooth', pattern: 'none', opacity: 0 },
  paper: { name: 'Rice Paper', pattern: 'paper', opacity: 0.15 },
  wood: { name: 'Wood Grain', pattern: 'wood', opacity: 0.2 },
  pixelgrid: { name: 'Pixel Grid', pattern: 'pixel', opacity: 0.25 },
  stone: { name: 'Stone', pattern: 'stone', opacity: 0.18 },
  ice: { name: 'Ice Crystal', pattern: 'ice', opacity: 0.12 },
  nebula: { name: 'Cosmic Dust', pattern: 'nebula', opacity: 0.15 },
  carnival: { name: 'Carnival', pattern: 'carnival', opacity: 0.1 },
  concrete: { name: 'Concrete', pattern: 'concrete', opacity: 0.08 }
});

// Decorative element sets
const DECOR_SETS = Object.freeze({
  none: [],
  bubbles: ['🫧', '💧', '🐚'],
  petals: ['🌸', '🎀', '✨'],
  leaves: ['🍃', '🌿', '🍂'],
  stars: ['⭐', '✨', '💫'],
  pixels: ['▪️', '◾', '◽'],
  flames: ['🔥', '✨', '💥'],
  snowflakes: ['❄️', '🌨️', '💎'],
  clouds: ['☁️', '🌤️', '✨'],
  notes: ['🎵', '🎶', '🎼']
});

/**
 * THEME_COMBINATIONS - The Recipe System
 * Maps (visualId, audioId) => unique ThemeAssetSet
 * Every permutation produces a distinct visual experience
 */
const THEME_COMBINATIONS = Object.freeze({
  // Default visual + all audio themes
  'default_classic': {
    name: 'Classic Logic',
    description: 'The original Sudoku experience',
    boardTexture: 'smooth',
    decor: 'none'
  },
  'default_zen': {
    name: 'Mindful Classic',
    description: 'Clean design with calming energy',
    boardTexture: 'paper',
    decor: 'clouds'
  },
  'default_funfair': {
    name: 'Classic Carnival',
    description: 'Traditional puzzles with playful flair',
    boardTexture: 'carnival',
    decor: 'notes'
  },
  'default_retro': {
    name: '8-Bit Logic',
    description: 'Classic puzzles, pixel perfect',
    boardTexture: 'pixelgrid',
    decor: 'pixels'
  },
  'default_space': {
    name: 'Cosmic Classic',
    description: 'Timeless puzzles among the stars',
    boardTexture: 'nebula',
    decor: 'stars'
  },
  'default_nature': {
    name: 'Natural Logic',
    description: 'Classic design with organic warmth',
    boardTexture: 'wood',
    decor: 'leaves'
  },
  'default_crystal': {
    name: 'Crystal Clear',
    description: 'Pristine clarity for focused solving',
    boardTexture: 'ice',
    decor: 'snowflakes'
  },
  'default_minimal': {
    name: 'Pure Logic',
    description: 'Stripped down to essentials',
    boardTexture: 'concrete',
    decor: 'none'
  },

  // Ocean visual + all audio themes
  'ocean_classic': {
    name: 'Ocean Breeze',
    description: 'Tranquil waters with classic sounds',
    boardTexture: 'smooth',
    decor: 'bubbles'
  },
  'ocean_zen': {
    name: 'Underwater Meditation',
    description: 'Deep sea tranquility',
    boardTexture: 'paper',
    decor: 'bubbles'
  },
  'ocean_funfair': {
    name: 'Beach Carnival',
    description: 'Seaside fun and games',
    boardTexture: 'carnival',
    decor: 'bubbles'
  },
  'ocean_retro': {
    name: '8-Bit Ocean',
    description: 'Pixel art sea creatures, chiptune waves',
    boardTexture: 'pixelgrid',
    decor: 'pixels'
  },
  'ocean_space': {
    name: 'Cosmic Depths',
    description: 'Where the ocean meets the cosmos',
    boardTexture: 'nebula',
    decor: 'stars'
  },
  'ocean_nature': {
    name: 'Coral Garden',
    description: 'Living reef atmosphere',
    boardTexture: 'wood',
    decor: 'bubbles'
  },
  'ocean_crystal': {
    name: 'Frozen Depths',
    description: 'Ice crystals beneath the waves',
    boardTexture: 'ice',
    decor: 'snowflakes'
  },
  'ocean_minimal': {
    name: 'Silent Sea',
    description: 'Calm waters, minimal distractions',
    boardTexture: 'concrete',
    decor: 'none'
  },

  // Forest visual + all audio themes
  'forest_classic': {
    name: 'Forest Logic',
    description: 'Classic solving among the trees',
    boardTexture: 'smooth',
    decor: 'leaves'
  },
  'forest_zen': {
    name: 'Bamboo Grove',
    description: 'Eastern forest meditation',
    boardTexture: 'paper',
    decor: 'leaves'
  },
  'forest_funfair': {
    name: 'Enchanted Forest',
    description: 'Whimsical woodland adventure',
    boardTexture: 'carnival',
    decor: 'notes'
  },
  'forest_retro': {
    name: 'Pixel Woods',
    description: '8-bit forest adventure',
    boardTexture: 'pixelgrid',
    decor: 'pixels'
  },
  'forest_space': {
    name: 'Alien Forest',
    description: 'Bioluminescent alien flora',
    boardTexture: 'nebula',
    decor: 'stars'
  },
  'forest_nature': {
    name: 'Woodland Breeze',
    description: 'Pure forest immersion',
    boardTexture: 'wood',
    decor: 'leaves'
  },
  'forest_crystal': {
    name: 'Frost Forest',
    description: 'Winter wonderland among the pines',
    boardTexture: 'ice',
    decor: 'snowflakes'
  },
  'forest_minimal': {
    name: 'Quiet Grove',
    description: 'Simple serenity in nature',
    boardTexture: 'concrete',
    decor: 'none'
  },

  // Sunset visual + all audio themes
  'sunset_classic': {
    name: 'Golden Hour',
    description: 'Classic puzzles at twilight',
    boardTexture: 'smooth',
    decor: 'clouds'
  },
  'sunset_zen': {
    name: 'Twilight Meditation',
    description: 'Peaceful sunset contemplation',
    boardTexture: 'paper',
    decor: 'clouds'
  },
  'sunset_funfair': {
    name: 'Carnival Twilight',
    description: 'Evening fair under warm skies',
    boardTexture: 'carnival',
    decor: 'notes'
  },
  'sunset_retro': {
    name: 'Pixel Sunset',
    description: 'Retro vibes at dusk',
    boardTexture: 'pixelgrid',
    decor: 'pixels'
  },
  'sunset_space': {
    name: 'Cosmic Dusk',
    description: 'Where sunset meets starlight',
    boardTexture: 'nebula',
    decor: 'stars'
  },
  'sunset_nature': {
    name: 'Evening Meadow',
    description: 'Golden fields at golden hour',
    boardTexture: 'wood',
    decor: 'leaves'
  },
  'sunset_crystal': {
    name: 'Amber Crystal',
    description: 'Warm light through crystal prisms',
    boardTexture: 'ice',
    decor: 'snowflakes'
  },
  'sunset_minimal': {
    name: 'Simple Sunset',
    description: 'Clean lines at twilight',
    boardTexture: 'concrete',
    decor: 'none'
  },

  // Midnight visual + all audio themes
  'midnight_classic': {
    name: 'Midnight Logic',
    description: 'Classic puzzles under the stars',
    boardTexture: 'smooth',
    decor: 'stars'
  },
  'midnight_zen': {
    name: 'Night Meditation',
    description: 'Peaceful darkness for focus',
    boardTexture: 'paper',
    decor: 'stars'
  },
  'midnight_funfair': {
    name: 'Night Carnival',
    description: 'Neon lights in the darkness',
    boardTexture: 'carnival',
    decor: 'notes'
  },
  'midnight_retro': {
    name: 'Neon Nights',
    description: 'Cyberpunk pixel aesthetic',
    boardTexture: 'pixelgrid',
    decor: 'pixels'
  },
  'midnight_space': {
    name: 'Cosmic Stargazing',
    description: 'Deep space exploration',
    boardTexture: 'nebula',
    decor: 'stars'
  },
  'midnight_nature': {
    name: 'Moonlit Forest',
    description: 'Nocturnal woodland atmosphere',
    boardTexture: 'wood',
    decor: 'leaves'
  },
  'midnight_crystal': {
    name: 'Starlight Crystal',
    description: 'Crystalline beauty in moonlight',
    boardTexture: 'ice',
    decor: 'snowflakes'
  },
  'midnight_minimal': {
    name: 'Dark Mode',
    description: 'Pure focus in darkness',
    boardTexture: 'concrete',
    decor: 'none'
  },

  // Sakura visual + all audio themes
  'sakura_classic': {
    name: 'Cherry Blossom',
    description: 'Classic beauty in bloom',
    boardTexture: 'smooth',
    decor: 'petals'
  },
  'sakura_zen': {
    name: 'Watercolor Garden',
    description: 'Eastern watercolor paintings, paper textures',
    boardTexture: 'paper',
    decor: 'petals'
  },
  'sakura_funfair': {
    name: 'Hanami Festival',
    description: 'Cherry blossom celebration',
    boardTexture: 'carnival',
    decor: 'petals'
  },
  'sakura_retro': {
    name: '8-Bit Blossom',
    description: 'Pixel petals falling',
    boardTexture: 'pixelgrid',
    decor: 'pixels'
  },
  'sakura_space': {
    name: 'Cosmic Petals',
    description: 'Blossoms among the stars',
    boardTexture: 'nebula',
    decor: 'stars'
  },
  'sakura_nature': {
    name: 'Spring Garden',
    description: 'Natural cherry blossom grove',
    boardTexture: 'wood',
    decor: 'petals'
  },
  'sakura_crystal': {
    name: 'Frozen Blossoms',
    description: 'Ice-preserved spring beauty',
    boardTexture: 'ice',
    decor: 'snowflakes'
  },
  'sakura_minimal': {
    name: 'Simple Sakura',
    description: 'Elegant minimalist spring',
    boardTexture: 'concrete',
    decor: 'none'
  },

  // Volcano visual + all audio themes
  'volcano_classic': {
    name: 'Volcanic Logic',
    description: 'Classic puzzles with fiery intensity',
    boardTexture: 'smooth',
    decor: 'flames'
  },
  'volcano_zen': {
    name: 'Lava Meditation',
    description: 'Finding calm in the heat',
    boardTexture: 'paper',
    decor: 'flames'
  },
  'volcano_funfair': {
    name: 'Fire Festival',
    description: 'Celebration of flames',
    boardTexture: 'carnival',
    decor: 'flames'
  },
  'volcano_retro': {
    name: 'Pixel Inferno',
    description: '8-bit volcanic action',
    boardTexture: 'pixelgrid',
    decor: 'pixels'
  },
  'volcano_space': {
    name: 'Solar Flare',
    description: 'Cosmic fire and fury',
    boardTexture: 'nebula',
    decor: 'stars'
  },
  'volcano_nature': {
    name: 'Geothermal Springs',
    description: 'Natural volcanic beauty',
    boardTexture: 'stone',
    decor: 'flames'
  },
  'volcano_crystal': {
    name: 'Obsidian Crystal',
    description: 'Volcanic glass formations',
    boardTexture: 'ice',
    decor: 'snowflakes'
  },
  'volcano_minimal': {
    name: 'Focused Intensity',
    description: 'Channeled volcanic energy',
    boardTexture: 'concrete',
    decor: 'none'
  },

  // Arctic visual + all audio themes
  'arctic_classic': {
    name: 'Arctic Logic',
    description: 'Crystal clear cold solving',
    boardTexture: 'smooth',
    decor: 'snowflakes'
  },
  'arctic_zen': {
    name: 'Frozen Meditation',
    description: 'Ice cold focus',
    boardTexture: 'paper',
    decor: 'snowflakes'
  },
  'arctic_funfair': {
    name: 'Winter Wonderland',
    description: 'Festive ice carnival',
    boardTexture: 'carnival',
    decor: 'snowflakes'
  },
  'arctic_retro': {
    name: 'Pixel Tundra',
    description: '8-bit frozen landscape',
    boardTexture: 'pixelgrid',
    decor: 'pixels'
  },
  'arctic_space': {
    name: 'Frozen Cosmos',
    description: 'Cold reaches of space',
    boardTexture: 'nebula',
    decor: 'stars'
  },
  'arctic_nature': {
    name: 'Snowy Forest',
    description: 'Winter woodland serenity',
    boardTexture: 'wood',
    decor: 'snowflakes'
  },
  'arctic_crystal': {
    name: 'Ice Crystal Sparkle',
    description: 'Pure crystalline beauty',
    boardTexture: 'ice',
    decor: 'snowflakes'
  },
  'arctic_minimal': {
    name: 'Arctic Minimal',
    description: 'Clean ice, clean mind',
    boardTexture: 'concrete',
    decor: 'none'
  }
});

/**
 * Get the combined ThemeAssetSet for a given visual and audio theme
 * @param {string} visualId - Visual theme ID
 * @param {string} audioId - Audio/sound pack ID
 * @returns {Object} Combined ThemeAssetSet with all styling properties
 */
const getThemeAssetSet = (visualId, audioId) => {
  const comboKey = getComboKey(visualId, audioId);
  const combo = THEME_COMBINATIONS[comboKey] || THEME_COMBINATIONS['default_classic'];
  const visualBase = VISUAL_BASES[visualId] || VISUAL_BASES.default;
  const texture = BOARD_TEXTURES[combo.boardTexture] || BOARD_TEXTURES.smooth;
  const decorSet = DECOR_SETS[combo.decor] || DECOR_SETS.none;
  
  // Get theme-specific SVG background pattern
  const svgBgKey = `${visualId}_bg`;
  const svgBg = SVG_PATTERNS[svgBgKey] || '';
  
  // Map audio themes to SVG decoration styles
  const audioDecorMap = {
    zen: SVG_DECORATIONS.watercolor,
    funfair: SVG_DECORATIONS.pixel,
    retro: SVG_DECORATIONS.pixel,
    space: SVG_DECORATIONS.cosmic,
    nature: SVG_DECORATIONS.organic,
    crystal: SVG_DECORATIONS.crystal,
    minimal: [] // No decorations for minimal
  };
  
  // Get SVG decorations based on audio theme, with aquatic/blossom fallbacks for visual themes
  let svgDecor = audioDecorMap[audioId] || [];
  if (!svgDecor.length) {
    if (audioId === 'classic') {
      // Default uses visual theme hints
      if (visualId === 'ocean') svgDecor = SVG_DECORATIONS.aquatic;
      else if (visualId === 'sakura') svgDecor = SVG_DECORATIONS.blossom;
      else if (visualId === 'volcano') svgDecor = SVG_DECORATIONS.flame;
      else if (visualId === 'arctic') svgDecor = SVG_DECORATIONS.crystal;
    }
  }
  
  return {
    // Combination metadata
    name: combo.name,
    description: combo.description,
    comboKey,
    
    // Visual base styles (from visual theme)
    background: visualBase.background,
    boardBg: visualBase.boardBg,
    cellBg: visualBase.cellBg,
    fixedCellBg: visualBase.fixedCellBg,
    selectedCellBg: visualBase.selectedCellBg,
    
    // SVG background pattern (theme-specific)
    svgBackground: svgBg,
    
    // SVG decorative elements (theme-specific)
    svgDecor: svgDecor,
    
    // Texture overlay
    texture: {
      name: texture.name,
      pattern: texture.pattern,
      opacity: texture.opacity
    },
    
    // Decorative elements (emoji - kept for fallback)
    decor: decorSet,
    
    // Original IDs for reference
    visualThemeId: visualId,
    audioThemeId: audioId
  };
};

// ============================================================================
// EMOJI CATEGORIES (for chat)
// ============================================================================

// Build emoji library by Unicode range
const isEmojiChar = (ch) => /\p{Emoji}/u.test(ch);

const buildEmojiList = (ranges) => {
  const seen = new Set();
  const out = [];
  ranges.forEach(([start, end]) => {
    for (let cp = start; cp <= end; cp++) {
      const ch = String.fromCodePoint(cp);
      if (isEmojiChar(ch) && !seen.has(ch)) {
        seen.add(ch);
        out.push(ch);
      }
    }
  });
  return out;
};

const EMOJI_CATEGORIES = Object.freeze([
  { id: 'smileys', label: 'Smileys', emojis: buildEmojiList([[0x1f600, 0x1f64f]]) },
  { id: 'gestures', label: 'Gestures', emojis: buildEmojiList([[0x1f44a, 0x1f4ff], [0x270a, 0x270d]]) },
  { id: 'animals', label: 'Animals', emojis: buildEmojiList([[0x1f400, 0x1f43f], [0x1f980, 0x1f9ae]]) },
  { id: 'food', label: 'Food', emojis: buildEmojiList([[0x1f347, 0x1f37f], [0x1f950, 0x1f97a]]) },
  { id: 'activities', label: 'Activities', emojis: buildEmojiList([[0x1f3a0, 0x1f3fa], [0x26bd, 0x26be], [0x1f93f, 0x1f94f]]) },
  { id: 'travel', label: 'Travel', emojis: buildEmojiList([[0x1f680, 0x1f6ff], [0x1f690, 0x1f6c5]]) },
  { id: 'objects', label: 'Objects', emojis: buildEmojiList([[0x1f4a0, 0x1f4ff], [0x1f9e0, 0x1f9ff]]) },
  { id: 'symbols', label: 'Symbols', emojis: buildEmojiList([[0x1f300, 0x1f5ff], [0x2600, 0x26ff]]) }
]);

// Make constants available globally
window.KEYS = KEYS;
window.DIFFICULTY = DIFFICULTY;
window.DIFFICULTY_REMOVE_COUNTS = DIFFICULTY_REMOVE_COUNTS;
window.GAME_SETTINGS = GAME_SETTINGS;
window.CAMPAIGN_LEVELS = CAMPAIGN_LEVELS;
window.THEMES = THEMES;
window.SOUND_PACKS = SOUND_PACKS;
window.EMOJI_CATEGORIES = EMOJI_CATEGORIES;

// Combinatorial Theme System exports
window.VISUAL_BASES = VISUAL_BASES;
window.AUDIO_MODIFIERS = AUDIO_MODIFIERS;
window.BOARD_TEXTURES = BOARD_TEXTURES;
window.DECOR_SETS = DECOR_SETS;
window.THEME_COMBINATIONS = THEME_COMBINATIONS;
window.SVG_PATTERNS = SVG_PATTERNS;
window.SVG_DECORATIONS = SVG_DECORATIONS;
window.getComboKey = getComboKey;
window.getThemeAssetSet = getThemeAssetSet;
