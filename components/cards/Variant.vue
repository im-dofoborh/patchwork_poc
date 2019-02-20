<template>
  <section class="sg-variant-card">

    <div class="sg-variant-card__header">
      <div class="sg-variant-card__title">
        <h3 class="heading-5">{{ variant.id }}</h3>
        <p
          v-if="variant.metadata && variant.metadata.description"
          class="sg-variant-card__description body-copy-small">
          {{ variant.metadata.description }}
        </p>

        <slot name="header" />

      </div>

      <div
        class="sg-variant-card__action sg-variant-card__action--clickable"
        @click="editorExpanded = !editorExpanded">
        <h2 class="sg-variant-card__expand-icon">
          {{ expandIcon }}
        </h2>
        <span>Try it</span>
      </div>
    </div>

    <div
      :class="`sg-variant-card__body ${variant.id}`"
      :style="variant.metadata.backgroundStyle">

      <spinner
        v-if="loading"
        class="sg-variant-card__spinner" />

      <no-ssr>
        <themed-iframe
          :theme="currentTheme"
          :body-class-names="variant.metadata.classNames"
          :wrap-in-document="component.metadata.atomicity !== 'template'"
          :markup="markup"
          :size="componentViewportSize"
          @load="loading = false" />
      </no-ssr>
    </div>

    <div v-if="editorExpanded">
      <no-ssr>
        <code-editor
          v-model="snippet"
          :disabled="codeEditorDisabled"
          :errors="codeErrors"
          @input="onCodeChange" />
      </no-ssr>
    </div>

  </section>
</template>

<script>
  import Spinner from '~/components/Spinner'
  import CodeEditor from '~/components/editors/Code'
  import ThemedIframe from '~/components/ThemedIframe'

  export default {
    components: {
      CodeEditor,
      ThemedIframe,
      Spinner,
    },

    props: {
      component: {
        type: Object,
        required: true,
      },
      variant: {
        type: Object,
        required: true,
      },
      codeEditorDisabled: {
        type: Boolean,
        default: true,
      },
      codeErrors: {
        type: Array,
        default: () => [],
      },
      markup: {
        type: String,
        required: true,
      },
    },

    data() {
      return {
        editorExpanded: false,
        expandIcon: '</>',
        snippet: this.variant.snippet,
        loading: true,
      }
    },

    computed: {
      currentTheme() {
        return this.$store.getters.currentTheme;
      },

      componentViewportSize() {
        return this.$store.state.componentViewportSize;
      }
    },

    methods: {
      /**
       * Handle code change.
       */
      onCodeChange() {
        this.$emit('code-change', this.snippet, this.variant.id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sg-variant-card {
    border: 1px solid $color--background--light;
    border-radius: 4px;
    margin-bottom: spacing-unit(lg);
    overflow: hidden;
    transition: all .3s ease;
    box-shadow: 0 0 15px transparent;
    position: relative;

    &__header {
      border-bottom: 1px solid $color--background--light;
      display: flex;
    }

    &__title {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: center;
      padding: spacing-unit(sm);
    }

    &__description {
      color: #666;
    }

    &__action {
      font-size: 0.85em;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: spacing-unit(sm);
      text-align: center;
      transition: all .3s ease;
      user-select: none;

      &--clickable {
        cursor: pointer;
      }

      &:hover {
        color: $code-expand-color;
      }
    }

    &__expand-icon {
      font-size: 26px;
      letter-spacing: 1.5px;
      margin: 0;
      content: '</>';
    }

    &__body {
      padding: spacing-unit(sm);
    }

    &__spinner {
      display: flex;
      justify-content: center;
      margin: spacing-unit(md);
    }
  }
</style>