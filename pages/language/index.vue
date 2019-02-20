<template>
  <section>
    <content-editor
      :content="content"
      :path="path" />
  </section>
</template>

<script>
  import languageContent from '~/content/language.md'
  import ContentEditor from '~/components/editors/Content'

  export default {
    components: {
      ContentEditor,
    },

    data() {
      return {
        title: 'Visual Language',
        path: 'content/language.md',
        content: languageContent,
      }
    },

    head() {
      return {
        title: this.title,
      }
    },
  }
</script>
