<template>
  <div class="sg-content container">

    <div class="sg-content__header">
      <h1 class="heading-1">{{ title }}</h1>
      <p class="body-copy">
        For markup which is outside of our direct control, such as that entered
        within the admin system, we have a class called
        <code>.editor-content</code> which ensures the undecorated markup still
        follows our style guide.
      </p>
      <p>
        To use, apply the class <code>.editor-content</code> to an element
        which is the direct parent of the editor controlled markup.
      </p>
    </div>

    <tabs
      :title="title"
      :tabs="tabs" />

  </div>
</template>

<script>
  import beautify from 'js-beautify';
  import postContent from '~/data/post-content'
  import Tabs from '~/components/Tabs';

  export default {
    components: {
      Tabs,
    },

    async asyncData({ app }) {
      const res = await app.$fabric.getEditorContent();
      return {
        editorVariables: res.data,
      };
    },

    data() {
      return {
        title: 'Editor Content',
      }
    },

    head() {
      return {
        title: this.title,
      }
    },

    computed: {
      tabs() {
        return {
          Visual: {
            type: 'themed',
            value: `<div class="editor-content">${postContent.content}</div>`,
          },
          Markup: {
            type: 'html',
            value: beautify.html(postContent.content, {
              indent_size: 2,
              wrap_line_length: 120,
            }),
            onInput(tabs) {
              tabs.Visual.value = tabs.Markup.value
            }
          },
          Variables: {
            type: 'variable',
            value: this.editorVariables,
          }
        }
      }
    },
  }
</script>