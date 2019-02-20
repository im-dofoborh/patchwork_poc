<template>
  <div class="sg-code-editor">

    <div class="sg-code-editor__editable">
      <div class="sg-code-editor__editable-text">
        {{ editableText }}
      </div>
      <div
        :style="dotStyle"
        class="sg-code-editor__editable-dot" />
    </div>

    <codemirror
      ref="editor"
      :options="options"
      :value="value"
      @input="onChange"/>

  </div>
</template>

<script>
  import 'codemirror/mode/twig/twig'
  import 'codemirror/mode/htmlmixed/htmlmixed'

  export default {
    props: {
      value: {
        type: String,
        default: '',
      },
      mode: {
        type: String,
        default: 'twig',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      errors: {
        type: Array,
        default: () => [],
      },
    },

    data() {
      return {
        textMarkers: [],
      }
    },

    computed: {
      options() {
        return {
          mode: this.mode,
          readOnly: this.disabled,
        }
      },

      codemirror() {
        return this.$refs.editor.codemirror;
      },

      dotStyle() {
        return {
          background: this.disabled ? 'orange' : 'green',
        };
      },

      editableText() {
        return this.disabled ? 'Not Editable' : 'Editable';
      },

      hasErrors() {
        return this.errors.length > 0;
      }
    },

    watch: {
      hasErrors() {
        this.highlightErrors();
      }
    },

    methods: {
      /**
       * Handle code change.
       */
      onChange(code) {
        this.highlightErrors();
        this.$emit('input', code);
      },

      /**
       * Highlight errors.
       *
       * See https://codemirror.net/doc/manual.html#api_marker
       */
      highlightErrors() {
        const { doc } = this.codemirror;
        this.textMarkers.forEach(marker => marker.clear());

        this.errors.filter((error) => {
          return Number.isInteger(error.line);
        }).forEach((error) => {
          const lineNumber = error.line - 1;
          const lineinfo = doc.lineInfo(lineNumber);
          const text = lineinfo ? lineinfo.text : '';
          const start = text.length - text.replace(/^\s+/, '').length;
          const end = text.replace(/\s+$/, '').length;

          const from = {
            line: lineNumber,
            ch: start,
          };
          const to = {
            line: lineNumber,
            ch: end,
          };
          const options = {
            className: 'sg-code-editor__syntax-error',
            title: error.message,
          };
          const marker = doc.markText(from, to, options);
          this.textMarkers.push(marker);
        });
      }
    }
  }
</script>

<style lang="scss">
  .sg-code-editor {
    position: relative;

    &__editable {
      display: flex;
      font-size: 0.85em;
      justify-content: center;
      align-items: center;
      z-index: 100;
      position: absolute;
      margin: spacing-unit(xs);
      padding: spacing-unit(xxs) spacing-unit(xs);
      top: 0;
      right: 0;
      color: rgba($color--base--white, 0.8);
      border: 1px solid rgba($color--base--white, 0.2);
    }

    &__editable-dot {
      height: 0.85em;
      width: 0.85em;
      border-radius: 50%;
    }

    &__editable-text {
      margin-right: spacing-unit(xxs);
    }

    &__syntax-error {
      border-bottom: 1px dotted $color--form--warning--regular;
    }

    .CodeMirror {
      border-top: 1px solid $color--background--light;
      height: auto;
      font-size: 1em;
      line-height: 1.5em;
      font-family: $code-font-family;
      letter-spacing: 0.3px;
      word-spacing: 1px;
      color: $code-default-color;
      background: $code-bg-color;
      padding: spacing-unit(sm);

      div.CodeMirror-cursor {
        border-left: 2px solid $code-cursor-color;
      }

      .CodeMirror-activeline-background {
        background: lighten($code-bg-color, 20%);
      }

      .CodeMirror-selected {
        background: lighten($code-bg-color, 20%);
      }

      .cm-tag {
        color: $code-tag-color
      }

      .cm-string {
        color: $code-string-color;
      }

      .cm-keyword,
      .cm-attribute {
        color: darken($code-tag-color, 20%)
      }

      .cm-def,
      .cm-variable,
      .cm-variable-2,
      .cm-operator {
        color: $code-variable-color;
      }

      .cm-number,
      .cm-property,
      .cm-atom {
        color: $code-atom-color;
      }
    }
  }
</style>
