<template>
  <div
    :title="word"
    :style="outerStyle"
    class="sg-letter-icon">
    <div
      :style="innerStyle"
      class="sg-letter-icon__inner">
      {{ firstLetter }}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      size: {
        type: [ Number, String ],
        default: 30,
      },
      colour: {
        type: String,
        default: '#ff543d',
      },
      textColour: {
        type: String,
        default: '#fff',
      },
      word: {
        type: String,
        default: 'Unknown',
      }
    },

    computed: {
      outerStyle() {
        return {
          width: `${this.size}px`,
        }
      },

      innerStyle() {
        return {
          height: `${this.size}px`,
          width: `${this.size}px`,
          backgroundColor: this.colour,
          color: this.textColour,
          fontSize: `${this.size / 1.8}px`,
        }
      },

      firstLetter() {
        return this.word.charAt(0).toUpperCase();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sg-letter-icon {
    display: block;

    &__inner {
      align-items: center;
      display:flex;
      font-weight: bold;
      justify-content: center;
    }
  }
</style>