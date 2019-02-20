<template>
  <div class="sg-error">
    <letter-grid-card
      :word="word"
      :columns="word.length"
      class="mb-lg" />
    <h1 class="heading-1">
      {{ normalisedMessage }}
    </h1>
  </div>
</template>

<script>
  import httpStatus from 'http-status'
  import LetterGridCard from '~/components/cards/LetterGrid'

  export default {
    layout: 'landing',

    components: {
      LetterGridCard,
    },

    props: {
      error: {
        type: Object,
        default: () => {},
      }
    },

    data () {
      return {
        letterSize: 100,
        messages: {
          '404': 'This page could not be found.',
          '405': 'Method not allowed.',
          '500': 'Uh oh, something\'s broken. We will fix it as soon as we can.'
        }
      }
    },

    computed: {
      normalisedMessage() {
        const { statusCode, message } = this.error;
        return this.messages[statusCode] || message;
      },

      title() {
        return httpStatus[this.statusCode];
      },

      word() {
        const { statusCode } = this.error;
        const word = statusCode || 'Error';
        return String(word);
      },
    },

    head() {
      return {
        title: this.title,
      }
    },

    mounted () {
      if (process.env.NODE_ENV === 'development') {
        console.error(this.error);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sg-error {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 100px;
  }
</style>