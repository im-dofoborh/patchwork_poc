import { createLocalVue } from '@vue/test-utils'
import storeConfig from '~/store'
import Vuex from 'vuex'

describe('Store config', () => {
  it('sets initial state', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const { state } = storeConfig();
    const defaultState = {
      sites: [],
      currentSite: {},
      themes: {},
      components: [],
      componentsLoaded: false,
      currentComponent: null,
      componentViewportSize: null,
    }
    expect(state).toEqual(defaultState);
  });
});
