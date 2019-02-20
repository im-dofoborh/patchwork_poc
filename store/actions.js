import localSettings from '~/local-settings';

/**
 * Vuex actions.
 */
export default {
  /**
   * Nuxt client init action dispatched from plugins/nuxt-client-init.
   */
  async nuxtClientInit({ dispatch, state }, { query }) {
    await dispatch('loadSites');
    await dispatch('loadBaseTheme');

    // Load alternative theme if valid site query param set
    if (query.site && state.sites.find(site => site.key === query.site)) {
      await dispatch('setCurrentSite', query.site);
    }

    dispatch('loadComponents');
  },

  /**
   * Load the available sites.
   * @param {object} vuexContext
   *   The Vuex context.
   */
  async loadSites({ commit }) {
    const res = await this.app.$fabric.getSites();

    commit('SET_ITEM', {
      key: 'sites',
      value: res.data,
    });
  },

  /**
   * Load the base theme.
   * @param {object} vuexContext
   *   The Vuex context.
   */
  async loadBaseTheme({ dispatch, getters }) {
    await dispatch('setCurrentSite', localSettings.baseSite);
    const { grunticon, typekitId } = getters.baseTheme;

    // Load grunticons and fonts
    this.app.head.script.push(...[
      {
        src: grunticon.loader,
        type: 'text/javascript'
      },
      {
        innerHTML: `
          setTimeout(() => {
            grunticon(
              ${JSON.stringify(grunticon.stylesheets)},
              grunticon.svgLoadedCORSCallback
            );
          }, 2000);
        `,
        type: 'text/javascript',
        body: true
      },
      {
        innerHTML: `
          (function(d) {
            var config = {
              kitId: '${typekitId}',
              scriptTimeout: 3000,
              async: true
            },
            h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
          })(document);
        `,
        type: 'text/javascript',
        body: true
      }
    ]);
  },

  /**
   * Store the site and theme that we are viewing Patchwork for.
   * @param {string} key
   *   A site key.
   * @param {object} vuexContext
   *   The Vuex context.
   */
  async setCurrentSite({ commit, state }, key) {
    let res = null;
    let theme = state.themes[key];

    // Request the theme if not already stored
    if (!theme) {
      res = await this.app.$fabric.getTheme(key);
      theme = res.data;
    }

    commit('SET_ITEM', {
      key: 'currentSite',
      value: state.sites.find(site => site.key === key),
    });

    commit('ADD_ITEM', {
      id: key,
      key: 'themes',
      value: theme,
    });
  },

  /**
   * Load the data for all components.
   * @param {object} vuexContext
   *   The Vuex context.
   */
  async loadComponents({ commit }) {
    const res = await this.app.$fabric.getComponents();

    commit('SET_ITEM', {
      key: 'components',
      value: res.data.reduce((obj, component) => {
        obj[component.metadata.id] = component
        return obj;
      }, {})
    });

    commit('SET_ITEM', {
      key: 'componentsLoaded',
      value: true,
    });
  },

  /**
   * Load the data for a single components.
   * @param {object} vuexContext
   *   The Vuex context.
   * @param {string} id
   *   A component ID.
   */
  async loadComponent({ commit }, id) {
    const res = await this.app.$fabric.getComponent(id);
    const component = res.data;
    if (res.status === 200) {
      commit('ADD_ITEM', {
        key: 'components',
        id: component.metadata.id,
        value: component,
      });
    }
  },

  /**
   * Set the current component.
   * @param {object} vuexContext
   *   The Vuex context.
   * @param {object} id
   *   A component.
   */
  setCurrentComponent({ commit }, component) {
    commit('SET_ITEM', {
      key: 'currentComponent',
      value: component,
    });
  },

  /**
   * Set the current component.
   * @param {object} vuexContext
   *   The Vuex context.
   * @param {string} size
   *   A size.
   */
  setComponentViewportSize({ commit }, size) {
    commit('SET_ITEM', {
      key: 'componentViewportSize',
      value: size,
    });
  }
}
