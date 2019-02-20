<template>
  <div class="sg-content container">
    <div class="sg-content__header">
      <h1 class="heading-1">{{ title }}</h1>
    </div>

    <div class="sg-content__section">
      <div class="editor-content">
        <h2>Font families</h2>
        <p>
          {{ currentSite.name }} uses the following font families. Each one should only
          be used by accessed using it's SASS variable. These are declared in both im-fabric
          and in {{ currentSite.name }} theme folder.
        </p>
      </div>

      <div
        v-for="(font, key) in fonts"
        :key="key"
        class="sg-content__row">
        <h4 class="heading-4">{{ key }}</h4>
        <p
          v-if="font.fallback"
          class="pull-xs-right body-copy-small">
          <em>Uses a fallback font stack</em>
        </p>
        <p class="body-copy-small">{{ font.stack }}</p>

        <no-ssr>
          <themed-iframe
            :theme="currentTheme"
            :markup="markup[key]" />
        </no-ssr>
      </div>
    </div>

    <div class="sg-content__section editor-content">
      <h2>Font loading for web fonts</h2>
      <p>
        For each third-party web font delivered by TypeKit's
        <a :href="externalLinks.typekitEmbedCode">embed code</a> we also define
        a fallback font stack which we use while the font assets are being loaded
        or if TypeKit fails to load. Full details of how our font stacks are configured
        can be found on
        <a :href="externalLinks.fontStackVariables">Confluence</a>.
      </p>
    </div>

  </div>
</template>

<script>
  import ThemedIframe from '~/components/ThemedIframe'
  import externalLinks from '~/data/external-links'

  export default {
    components: {
      ThemedIframe,
    },

    async asyncData({ app }) {
      const res = await app.$fabric.getFonts();
      return {
        fonts: res.data,
      };
    },

    data() {
      return {
        title: 'Fonts',
        externalLinks,
        markup: {},
      }
    },

    head() {
      return {
        title: this.title,
      }
    },

    computed: {
      currentSite() {
        return this.$store.state.currentSite;
      },

      currentTheme() {
        return this.$store.getters.currentTheme;
      },
    },

    watch: {
      '$store.state.currentSite'() {
        this.$fabric.getFonts().then(res => this.setMarkup);
      }
    },

    mounted() {
      this.setMarkup();
    },

    methods: {
      /**
       * Set the markup for the themed iframes.
       */
      setMarkup() {
        this.markup = Object.keys(this.fonts).reduce((obj, key) => {
          obj[key] = `
            <span style="font-family: ${this.fonts[key].stack}; font-size: 50px; line-height: 1.5;">
              The quick brown fox jumps over the lazy dog
            </span>
          `;
          return obj;
        }, {});
      }
    }
  }
</script>