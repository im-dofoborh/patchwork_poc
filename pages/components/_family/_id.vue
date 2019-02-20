<template>
  <section class="sg-component-page">
    <h1 class="heading-1 mb-md">
      {{ component.metadata.name }}
    </h1>

    <alert
      v-if="component.error"
      :message="component.error"
      class="mt-sm mb-sm" />

    <div v-else>

      <p
        v-if="component.metadata.description"
        class="body-copy-large mb-md">
        {{ component.metadata.description }}
      </p>
      <alert
        v-else
        type="error"
        class="sg-component-list__error mb-sm"
        message="This component has no description" />

      <tag-list
        :tags="component.metadata.tags"
        class="mb-md" />

      <div class="sg-component">
        <div
          v-for="(variant, i) in component.variants"
          :key="i">

          <alert
            v-if="variant.error"
            :message="variant.error"
            type="error"
            class="mt-sm mb-sm" />

          <variant-card
            v-else
            :id="variant.id"
            :variant="variant"
            :component="component"
            :markup="customMarkup[variant.id] || variant.output"
            :code-errors="renderErrors[variant.id]"
            :code-editor-disabled="codeEditorDisabled"
            @code-change="onCodeChange">

            <alert
              v-if="renderErrors[variant.id] && renderErrors[variant.id].length"
              slot="header"
              type="error"
              message="Failed to render the custom code snippet"
              class="mt-sm mb-xxs" />

          </variant-card>

          <template v-if="i === 0">
            <content-editor
              :content="component.metadata.readmeHtml"
              :path="component.metadata.yamlLocation.replace(/\/([^\/]+)\/?$/, '/README.md')"
              :owner="localSettings.github.repos.styleguide.owner"
              :repo="localSettings.github.repos.styleguide.name"
              :branch="localSettings.github.repos.styleguide.branch"
              placeholder="This component doesn't have a README file associated with it."
              class="sg-component-page__readme mb-lg" />

            <h2
              v-if="component.variants.length > i + 1"
              id="variants"
              class="heading-3 mb-lg">
              Variants
            </h2>

          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import ContentEditor from '~/components/editors/Content'
  import VariantCard from '~/components/cards/Variant'
  import Alert from '~/components/Alert'
  import TagList from '~/components/lists/Tag'
  import localSettings from '~/local-settings'

  export default {
    components: {
      ContentEditor,
      VariantCard,
      Alert,
      TagList,
    },

    head() {
      return {
        title: this.component.metadata.name
      }
    },

    async asyncData({ app, store, error, params }) {
      if (!(params.id in store.state.components)) {
        await store.dispatch('loadComponent', params.id);
      }

      const component = store.state.components[params.id];

      if (!component) {
        error({ statusCode: 404 });
      }

      return {
        component,
      }
    },

    data() {
      return {
        editable: false,
        renderErrors: {},
        customMarkup: {},
        inputTimeout: null,
        localSettings,
      }
    },

    computed: {
      codeEditorDisabled() {
        return !this.$store.state.componentsLoaded || !this.editable;
      },
    },

    watch: {
      '$store.state.componentsLoaded'() {
        this.editable = this.renderCodeSnippet(this.component.realTemplate);
      }
    },

    mounted() {
      this.$store.dispatch('setCurrentComponent', this.component);
      if (this.$store.state.componentsLoaded) {
        this.editable = this.renderCodeSnippet(this.component.realTemplate);
      }
    },

    destroyed() {
      this.$store.dispatch('setCurrentComponent', null);
    },

    methods: {
      /**
       * Handle code change.
       *
       * Timeouts are used to wait for the user to stop typing.
       * @param {string} snippet
       *   A modified code snippet.
       * @param {string} variantId
       *   The ID of the modified variant.
       */
      onCodeChange(snippet, variantId) {
        let variant = this.component.variants.find(variant => variant.id === variantId);
        clearTimeout(this.inputTimeout);
        this.inputTimeout = setTimeout(() => {
          this.renderCodeSnippet(snippet, variantId);
        }, 500);
      },

      /**
       * Attempt to render a code snippet for a variant.
       *
       * If the snippet cannot be rendered then an error object is stored to
       * be passed through to the code editor component.
       * @param {string} snippet
       *   A code snippet.
       * @param {string} variantId
       *   The ID of the modified variant.
       * @returns {boolean}
       *   True if the custom snippeet could be rendered, false otherwise.
       */
      renderCodeSnippet(snippet, variantId) {
        try {
          this.customMarkup[variantId] = this.$twig.render(snippet);
          this.renderErrors[variantId] = [];
        } catch (err) {
          console.error(err);
          this.customMarkup[variantId] = '';
          this.renderErrors[variantId] = [
            {
              line: err.lineno - 1,
              message: err.message,
            }
          ];
        }
        this.customMarkup = { ...this.customMarkup };
        this.renderErrors = { ...this.renderErrors };

        return this.customMarkup[variantId].length > 0;
      },
    },
  }
</script>

<style lang="scss" scoped>
  .sg-component-page {
    &__readme {
      background-color: $readme-background-color;
      border: 1px solid $color--background--light;
      border-radius: 4px;
      padding: spacing-unit(md);
      overflow: hidden;
      position: relative;

      &-edit {
        font-size: 0.85em;
        float: right;
        clear: both;
        top: 0;
        right: 0;
        margin: 0;
        padding: 0 spacing-unit(xs) spacing-unit(xs);
      }
    }
  }
</style>