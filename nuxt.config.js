const pkg = require('./package')
const axios = require('axios');
const localSettings = require('./local-settings');

// Set domain
const domain = process.env.NODE_ENV === 'production'
  ? 'release.wcp.imdserve.com'
  : 'local.wcp.imdserve.com';

// Set `router.base = '/<owner>/<repo>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/WCP/patchwork/'
  }
} : {}

/**
 * Nuxt config.
 */
module.exports = {
  mode: 'spa',

  /**
   * Page headers.
   */
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /**
   * Progress bar.
   */
  loading: {
    color: '#102B3A',
    height: '3px',
  },

  /**
   * Global CSS.
   */
  css: [
    'normalize.css',
    '~/assets/scss/style.scss',
    'codemirror/lib/codemirror.css',
  ],

  /**
   * Expose SCSS variables to Vue components.
   */
  styleResources: {
    scss: './assets/scss/settings/_settings.scss'
  },

  /**
   * Plugins.
   */
  plugins: [
    '~/plugins/filters',
    '~/plugins/nuxt-client-init',
    '~/plugins/vue-scrollto',
    { src: '~/plugins/vue-codemirror', ssr: false },
  ],

  /**
   * Modules.
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/markdownit',
    '~/modules/fabric',
    '~/modules/twig',
    '~/modules/stats',
  ],

  /**
   * Build configuration.
   */
  build: {
    // Extend WebPack config.
    extend(config, ctx) {
      // Run ESLint on save.
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      // Create sourcemaps
      if (
        ctx.isClient
        && process.env.NODE_ENV !== 'production'
        || process.env.npm_config_sourcemaps
      ) {
        config.devtool = '#source-map'
      }
    },

    // Set autoprefixer options
    postcss: {
      preset: {
        autoprefixer: {
          browsers: ['last 2 versions', 'ie >= 9']
        }
      }
    },

    // Watch for changes in custom folders
    watch: process.env.npm_config_watch
    ? [process.env.npm_config_watch]
    : [],

    // Prevent discarding or mangling of function names as it breaks the Twig
    // renderer, which uses Function.prototype.name to register its extensions
    terser: {
      terserOptions: {
        keep_fnames: true,
      },
    },

    /**
     * Analyze bundles.
     */
    analyze: process.env.npm_config_analyze,
  },

  /**
   * Environment variables.
   */
  env: {
    domain,
  },

  /**
   * Generate dynamic routes for static deployment.
   */
  generate: {
    routes: () => {
      const { styleguideApi, baseSite } = localSettings;
      const baseUrl = `https://${baseSite}.${domain}`;
      const endpoint = `${baseUrl}/${styleguideApi}/components`;

      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

      return axios.get(endpoint).then((res) => {
        return res.data.map((component) => {
          const { family, id } = component.metadata;
          return `/components/${family.toLowerCase()}/${id.toLowerCase()}`;
        })
      })
    }
  },

  /**
   * Set default transitions.
   */
  transition: {
    name: 'page',
    mode: 'out-in',
  },

  /**
   * Inject markdownit as $md.
   */
  markdownit: {
    injected: true
  },

  ...routerBase,
};
