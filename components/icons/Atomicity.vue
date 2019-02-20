<template>
  <router-link :to="searchRoute">
    <letter-icon
      :word="atomicity"
      :colour="colour" />
  </router-link>
</template>

<script>
  import LetterIcon from '~/components/icons/Letter'

  export default {
    components: {
      LetterIcon,
    },

    props: {
      atomicity: {
        type: String,
        default: 'todo',
      }
    },

    computed: {
      colour() {
        const colours = {
          'atom': '#21bdff',
          'molecule': '#1b97cc',
          'organism': '#177199',
          'template': '#124c66',
          'todo': '#0b2533',
        };
        return colours[this.atomicity] || '#21bdff';
      },

      searchRoute() {
        return {
          path: '/components/list',
          query: {
            search: this.atomicity,
          }
        }
      },
    },
  }
</script>
