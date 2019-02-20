<template>
  <section>
    <content-editor
      :content="content"
      :path="path" />
  </section>
</template>

<script>
  import overviewContent from '~/content/overview.md'
  import ContentEditor from '~/components/editors/Content'

  export default {
    components: {
      ContentEditor,
    },

    data() {
      return {
        title: 'Overview',
        path: 'content/overview.md',
        content: overviewContent,
      }
    },

    head() {
      return {
        title: this.title,
      }
    },
  }
</script>
