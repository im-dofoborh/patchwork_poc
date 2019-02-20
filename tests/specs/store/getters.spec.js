import localSettings from '~/local-settings';
import { theme } from '~/tests/fixtures';
import getters from '~/store/getters';

describe('Store getters', () => {
  let themes = null;
  let currentSite = null;
  let state = null;

  beforeEach(() => {
    themes = {};
    currentSite = {};
    state = {
      themes,
      currentSite,
    };
  });

  it('loads current theme from key', () => {
    const key = 'foo';
    themes[key] = theme;
    state = {
      themes,
      currentSite: {
        key,
      }
    };
    expect(getters.currentTheme(state)).toEqual(theme);
  });

  it('loads base theme as default current theme', () => {
    themes[localSettings.baseSite] = theme;
    expect(getters.currentTheme(state)).toEqual(theme);
  });

  it('loads empty object if current theme not found', () => {
    themes[`not-${localSettings.baseSite}`] = theme;
    expect(getters.currentTheme(state)).toEqual({});
  });

  it('loads base theme from baseSite setting', () => {
    themes[localSettings.baseSite] = theme;
    expect(getters.baseTheme(state)).toEqual(theme);
  });

  it('loads empty object if base theme not found', () => {
    themes[`not-${localSettings.baseSite}`] = theme;
    expect(getters.baseTheme(state)).toEqual({});
  });
});
