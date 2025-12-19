/**
 * Sudoku Logic Lab - Services (API & Storage)
 *
 * API service layer for GAS/Firebase Cloud Functions backend communication and local storage management.
 * This file uses plain JavaScript (no JSX) and can be loaded before React.
 *
 * @version 3.1.0 (Cloud Functions)
 */

import {
  KEYS,
  GAME_SETTINGS,
  THEMES,
  SOUND_PACKS,
  BADGES,
} from "./constants.js";
import { generateGuestId, sortLeaderboard } from "./utils.js";

// ============================================================================
// CONFIGURATION
// ============================================================================

// GAS Backend API URL - Configure via config/config.local.js
export const DEFAULT_GAS_URL = "";

// Helper to get GAS_URL dynamically to handle race conditions with config loading
const getGasUrl = () =>
  (typeof window.CONFIG !== "undefined" && window.CONFIG.GAS_URL) ||
  DEFAULT_GAS_URL;

/**
 * Check if Backend is properly configured
 * @returns {boolean} Whether Backend URL is available
 */
export const isGasEnvironment = () => {
  try {
    const url = getGasUrl();
    if (typeof url !== "string" || !url) return false;
    return true;
  } catch (e) {
    return false;
  }
};

// ============================================================================
// API SERVICE
// ============================================================================

/**
 * Call a Backend API function
 * @param {string} fnName - Function name to call
 * @param {Object} args - Arguments to pass
 * @returns {Promise<any>} API response
 */
export const runGasFn = async (fnName, ...args) => {
  const gasUrl = getGasUrl();
  if (!gasUrl) {
    console.error("Backend URL not configured");
    return null;
  }

  const isGas = gasUrl.includes("script.google.com");

  try {
    // Map function names to API actions
    const actionMap = {
      generateSudoku: { action: "generateSudoku", method: "GET" },
      getLeaderboardData: { action: "getLeaderboard", method: "GET" },
      saveLeaderboardScore: {
        action: "saveScore",
        method: isGas ? "GET" : "POST",
      },
      getChatData: { action: "getChat", method: "GET" },
      postChatData: { action: "postChat", method: isGas ? "GET" : "POST" },
      logClientError: { action: "logError", method: isGas ? "GET" : "POST" },
      registerUser: { action: "register", method: isGas ? "GET" : "POST" },
      loginUser: { action: "login", method: isGas ? "GET" : "POST" },
      getUserProfile: { action: "getUserProfile", method: "GET" },
      updateUserProfile: {
        action: "updateUserProfile",
        method: isGas ? "GET" : "POST",
      },
      getUserState: { action: "getUserState", method: "GET" },
      saveUserState: {
        action: "saveUserState",
        method: isGas ? "GET" : "POST",
      },
      getUserBadges: { action: "getUserBadges", method: "GET" },
      awardBadge: { action: "awardBadge", method: isGas ? "GET" : "POST" },
    };

    const mapping = actionMap[fnName];
    if (!mapping) {
      console.error("Unknown function:", fnName);
      return null;
    }

    const { action, method } = mapping;
    const url = new URL(gasUrl);

    // For GET requests or GAS, append params to URL
    if (method === "GET") {
      url.searchParams.set("action", action);
      url.searchParams.set("_ts", Date.now().toString());

      if (args[0] !== undefined) {
        if (typeof args[0] === "object") {
          Object.entries(args[0]).forEach(([k, v]) => {
            const value =
              v !== null && typeof v === "object" ? JSON.stringify(v) : v;
            if (value !== undefined) url.searchParams.set(k, value);
          });
        } else {
          url.searchParams.set("data", args[0]);
        }
      }
    }

    const fetchOptions = {
      method: method,
      redirect: "follow",
      cache: "no-store",
    };

    // For POST requests (Firebase only), send JSON body
    if (method === "POST") {
      fetchOptions.headers = {
        "Content-Type": "application/json",
      };
      const body = { action, ...args[0] };
      fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url.toString(), fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    const guidance =
      "Failed to reach backend. Ensure your API URL is correct in config/config.local.js.";
    const wrapped = new Error(`${error.message || error} — ${guidance}`);
    wrapped.original = error;
    throw wrapped;
  }
};

/**
 * Retry wrapper for API calls
 */
export const robustRunGasFn = async (fnName, args = {}, opts = {}) => {
  const retries = Number(opts.retries || 2);
  let attempt = 0;
  while (true) {
    try {
      return await runGasFn(fnName, args);
    } catch (err) {
      attempt++;
      if (attempt > retries) throw err;
      await new Promise((r) => setTimeout(r, 300 * Math.pow(2, attempt)));
    }
  }
};

// ============================================================================
// HIGH-LEVEL SERVICES (App.jsx Compatibility)
// ============================================================================

export const getLeaderboard = async () => {
  return await runGasFn("getLeaderboardData");
};

export const saveScore = async (data) => {
  return await runGasFn("saveLeaderboardScore", data);
};

export const LeaderboardService = {
  getLeaderboard,
  saveScore,
};

export const getChatMessages = async () => {
  return await runGasFn("getChatData");
};

export const postChatMessage = async (data) => {
  return await runGasFn("postChatData", data);
};

export const ChatService = {
  getMessages: getChatMessages,
  postMessage: postChatMessage,
};

export const isUserAuthenticated = () => {
  return !!StorageService.getUserProfile();
};

export const UnlockService = {
  isLevelUnlocked: (levelId) => {
    const progress = StorageService.getCampaignProgress();
    return progress.unlockedLevels.includes(levelId);
  },
  unlockLevel: (levelId) => {
    const progress = StorageService.getCampaignProgress();
    if (!progress.unlockedLevels.includes(levelId)) {
      progress.unlockedLevels.push(levelId);
      StorageService.saveCampaignProgress(progress);
    }
  },
};

export const BadgeService = {
  getUserBadges: async (userId) => {
    return await runGasFn("getUserBadges", { userId });
  },
  awardBadge: async (userId, badgeId) => {
    return await runGasFn("awardBadge", { userId, badgeId });
  },
};

export const logError = async (errorInfo) => {
  console.error("Client Error:", errorInfo);
  return await runGasFn("logClientError", errorInfo);
};

// ============================================================================
// LOCAL STORAGE SERVICE (Unchanged)
// ============================================================================

export const StorageService = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error("Storage Get Error:", e);
      return null;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error("Storage Set Error:", e);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error("Storage Remove Error:", e);
      return false;
    }
  },

  // --- Game State ---
  saveGameState: (state) => StorageService.set(KEYS.GAME_STATE, state),
  getGameState: () => StorageService.get(KEYS.GAME_STATE),
  clearGameState: () => StorageService.remove(KEYS.GAME_STATE),

  // --- Settings ---
  saveSettings: (settings) => StorageService.set(KEYS.SETTINGS, settings),
  getSettings: () => {
    const saved = StorageService.get(KEYS.SETTINGS);
    return { ...GAME_SETTINGS, ...saved };
  },

  // --- Statistics ---
  saveStats: (stats) => StorageService.set(KEYS.STATS, stats),
  getStats: () => {
    const defaults = {
      gamesStarted: 0,
      gamesWon: 0,
      bestTime: null,
      totalTime: 0,
    };
    return { ...defaults, ...StorageService.get(KEYS.STATS) };
  },

  // --- Theme ---
  saveTheme: (themeId) => StorageService.set(KEYS.THEME, themeId),
  getTheme: () => StorageService.get(KEYS.THEME) || THEMES.DEFAULT,

  // --- Sound ---
  saveSoundPack: (packId) => StorageService.set(KEYS.SOUND_PACK, packId),
  getSoundPack: () =>
    StorageService.get(KEYS.SOUND_PACK) || SOUND_PACKS.DEFAULT,

  // --- Campaign Progress ---
  saveCampaignProgress: (progress) =>
    StorageService.set(KEYS.CAMPAIGN_PROGRESS, progress),
  getCampaignProgress: () =>
    StorageService.get(KEYS.CAMPAIGN_PROGRESS) || {
      currentLevel: 1,
      unlockedLevels: [1],
      stars: {},
    },

  // --- User Profile (Local Cache) ---
  saveUserProfile: (profile) => StorageService.set(KEYS.USER_PROFILE, profile),
  getUserProfile: () => StorageService.get(KEYS.USER_PROFILE),
  clearUserProfile: () => StorageService.remove(KEYS.USER_PROFILE),

  // --- Auth Token (Session) ---
  saveAuthToken: (token) => sessionStorage.setItem(KEYS.AUTH_TOKEN, token),
  getAuthToken: () => sessionStorage.getItem(KEYS.AUTH_TOKEN),
  clearAuthToken: () => sessionStorage.removeItem(KEYS.AUTH_TOKEN),

  // --- Guest ID ---
  getGuestId: () => {
    let id = localStorage.getItem(KEYS.GUEST_ID);
    if (!id) {
      id = generateGuestId();
      localStorage.setItem(KEYS.GUEST_ID, id);
    }
    return id;
  },

  // --- User Status ---
  saveUserStatus: (status) => StorageService.set(KEYS.USER_STATUS, status),
  getUserStatus: () => StorageService.get(KEYS.USER_STATUS),

  // --- User Session ---
  saveUserSession: (session) => StorageService.set(KEYS.USER_SESSION, session),
  getUserSession: () => StorageService.get(KEYS.USER_SESSION),
  clearUserSession: () => StorageService.remove(KEYS.USER_SESSION),

  // --- User ID ---
  saveUserId: (id) => StorageService.set(KEYS.USER_ID, id),
  getUserId: () => StorageService.get(KEYS.USER_ID),

  // --- Unlocked Themes ---
  saveUnlockedThemes: (themes) =>
    StorageService.set(KEYS.UNLOCKED_THEMES, themes),
  getUnlockedThemes: () =>
    StorageService.get(KEYS.UNLOCKED_THEMES) || [THEMES.DEFAULT],

  // --- Active Theme ---
  saveActiveTheme: (themeId) => StorageService.set(KEYS.ACTIVE_THEME, themeId),
  getActiveTheme: () => StorageService.get(KEYS.ACTIVE_THEME) || THEMES.DEFAULT,

  // --- Unlocked Sound Packs ---
  saveUnlockedSoundPacks: (packs) =>
    StorageService.set(KEYS.UNLOCKED_SOUND_PACKS, packs),
  getUnlockedSoundPacks: () =>
    StorageService.get(KEYS.UNLOCKED_SOUND_PACKS) || [SOUND_PACKS.DEFAULT],

  // --- Active Sound Pack ---
  saveActiveSoundPack: (packId) =>
    StorageService.set(KEYS.ACTIVE_SOUND_PACK, packId),
  getActiveSoundPack: () =>
    StorageService.get(KEYS.ACTIVE_SOUND_PACK) || SOUND_PACKS.DEFAULT,

  // --- Game Stats ---
  saveGameStats: (stats) => StorageService.set(KEYS.GAME_STATS, stats),
  getGameStats: () => StorageService.get(KEYS.GAME_STATS) || {},

  // --- Aliases for Backward Compatibility ---
  loadGame: () => StorageService.getGameState(),
  saveGame: (data) => StorageService.saveGameState(data),
  clearSavedGame: () => StorageService.clearGameState(),
  setUserSession: (session) => StorageService.saveUserSession(session),
  getCurrentUserId: () => StorageService.getUserId(),
};

// Export to window for global access if needed
window.runGasFn = runGasFn;
window.StorageService = StorageService;
