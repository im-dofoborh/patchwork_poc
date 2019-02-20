import Vuex from 'vuex'
import mutations from '~/store/mutations'
import actions from '~/store/actions'
import getters from '~/store/getters'

/**
 * Vuex store.
 */
export default () => {
  return new Vuex.Store({
    state: {
      sites: [],
      currentSite: {},

      themes: {},

      components: [],
      componentsLoaded: false,
      currentComponent: null,
      componentViewportSize: null,
    },

    mutations,

    actions,

    getters,
  })
}
