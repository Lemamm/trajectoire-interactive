// src/components/Trajectoire/useCache.js
// Petite API utilitaire pour gérer le localStorage proprement et réinitialiser les compteurs.
// Exporte : storage, LS_KEYS, initializeCache, resetStats, addReadEntry

export const LS_KEYS = {
  READ_MEMORY: "traj_read_memory_v1",
  DAILY_ASSIGN: "traj_daily_poem_v1",
  PALETTE: "traj_palette_v1",
  HAPTICS_ENABLED: "traj_haptics_enabled_v1",
  REMIXES: "traj_remixes_v1",
  ENTROPY_STATE: "traj_entropy_state_v1",
  PINNED_LINES: "traj_pinned_lines_v1",
  WEAR_LEVEL: "traj_wear_level_v1",
  ECHOS: "traj_echos_v1",
  GHOST_UNLOCK: "traj_ghost_unlock_v1",
  NOCTURNE_AUTO: "traj_nocturne_auto_v1"
};

export const storage = {
  get: (k, fallback = null) => {
    try {
      const v = localStorage.getItem(k);
      return v ? JSON.parse(v) : fallback;
    } catch (e) {
      console.warn("storage.get error", e);
      return fallback;
    }
  },
  set: (k, v) => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {
      console.warn("storage.set error", e);
    }
  },
  remove: (k) => {
    try {
      localStorage.removeItem(k);
    } catch (e) {
      console.warn("storage.remove error", e);
    }
  }
};

/**
 * initializeCache(poemCount)
 * - Crée des valeurs par défaut si elles n'existent pas (wearLevel, entropyState, etc.)
 * - Idempotent : peut être appelé plusieurs fois.
 */
export function initializeCache(poemCount = 0) {
  if (storage.get(LS_KEYS.READ_MEMORY, null) === null) {
    storage.set(LS_KEYS.READ_MEMORY, {});
  }
  if (storage.get(LS_KEYS.WEAR_LEVEL, null) === null) {
    storage.set(LS_KEYS.WEAR_LEVEL, new Array(Math.max(0, poemCount)).fill(0));
  }
  if (storage.get(LS_KEYS.ENTROPY_STATE, null) === null) {
    storage.set(LS_KEYS.ENTROPY_STATE, new Array(Math.max(0, poemCount)).fill(0));
  }
  if (storage.get(LS_KEYS.PINNED_LINES, null) === null) {
    storage.set(LS_KEYS.PINNED_LINES, {});
  }
  if (storage.get(LS_KEYS.REMIXES, null) === null) {
    storage.set(LS_KEYS.REMIXES, []);
  }
  if (storage.get(LS_KEYS.ECHOS, null) === null) {
    storage.set(LS_KEYS.ECHOS, {});
  }
  if (storage.get(LS_KEYS.GHOST_UNLOCK, null) === null) {
    storage.set(LS_KEYS.GHOST_UNLOCK, false);
  }
  // NOCTURNE_AUTO (optionnel)
  if (storage.get(LS_KEYS.NOCTURNE_AUTO, null) === null) {
    storage.set(LS_KEYS.NOCTURNE_AUTO, true);
  }
}

/**
 * resetStats(poemCount)
 * - Remet à zéro les compteurs de lecture / usure / états d'entropie / échos / épingles / remixes
 * - Utile pour "déboucher" un jeu de données corrompu ou pour tests.
 */
export function resetStats(poemCount = 0) {
  storage.set(LS_KEYS.READ_MEMORY, {});
  storage.set(LS_KEYS.WEAR_LEVEL, new Array(Math.max(0, poemCount)).fill(0));
  storage.set(LS_KEYS.ENTROPY_STATE, new Array(Math.max(0, poemCount)).fill(0));
  storage.set(LS_KEYS.PINNED_LINES, {});
  storage.set(LS_KEYS.REMIXES, []);
  storage.set(LS_KEYS.ECHOS, {});
  storage.set(LS_KEYS.GHOST_UNLOCK, false);
}

/**
 * addReadEntry(index)
 * - Ajoute proprement une entrée de lecture (date + hour) pour le poème index.
 * - Retourne le readMemory mis à jour.
 */
export function addReadEntry(index) {
  try {
    const rm = storage.get(LS_KEYS.READ_MEMORY, {});
    const list = Array.isArray(rm[index]) ? rm[index] : [];
    const now = new Date();
    const meta = {
      date: now.toISOString(),
      hour: now.getHours()
    };
    list.push(meta);
    rm[index] = list;
    storage.set(LS_KEYS.READ_MEMORY, rm);
    return rm;
  } catch (e) {
    console.warn("addReadEntry error", e);
    return storage.get(LS_KEYS.READ_MEMORY, {});
  }
}

export default {
  LS_KEYS,
  storage,
  initializeCache,
  resetStats,
  addReadEntry
};
