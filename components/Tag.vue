<template>
  <router-link
    :to="route"
    class="standard-tag standard-tag--link" >
    {{ tag }}
  </router-link>
</template>

<script>
  export default {
    props: {
      tag: {
        type: String,
        required: true,
      }
    },

    computed: {
      route() {
        return {
          path: '/components/list',
          query: {
            search: this.tag.toLowerCase(),
          },
        }
      }
    }
  }
</script>
