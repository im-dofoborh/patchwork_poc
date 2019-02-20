<template>
  <section>
    <content-editor
      :content="content"
      :path="path" />
  </section>
</template>

<script>
  import foundationsContent from '~/content/foundations.md'
  import ContentEditor from '~/components/editors/Content'

  export default {
    components: {
      ContentEditor,
    },

    data() {
      return {
        title: 'Foundations',
        path: 'content/foundations.md',
        content: foundationsContent,
      }
    },

    head() {
      return {
        title: this.title,
      }
    },
  }
</script>
