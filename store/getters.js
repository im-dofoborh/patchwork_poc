import localSettings from '~/local-settings';

/**
 * Vuex getters.
 */
export default {
  /**
   * Get the current theme.
   * @param {array} state
   *   The Vuex state.
   * @returns {array}
   *   The current theme.
   */
  currentTheme(state) {
    return state.themes[state.currentSite.key] || state.themes[localSettings.baseSite] || {};
  },

  /**
   * Get the base theme.
   * @param {array} state
   *   The Vuex state.
   * @returns {array}
   *   The base theme.
   */
  baseTheme(state) {
    return state.themes[localSettings.baseSite] || {};
  }
}
