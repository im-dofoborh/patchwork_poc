<template>
  <div
    :style="gridStyle"
    class="sg-letter-grid-card">
    <letter-icon
      v-for="(character, i) in characters"
      :key="i"
      :size="size"
      :word="character"
      :style="letterStyles[i]"
      class="sg-letter-grid-card__letter" />
  </div>
</template>

<script>
  import LetterIcon from '~/components/icons/Letter'

  export default {
    components: {
      LetterIcon,
    },

    props: {
      word: {
        type: String,
        default: 'Patchwork',
      },
      explode: {
        type: Boolean,
        default: false,
      },
      columns: {
        type: Number,
        default: 3,
      },
      size: {
        type: Number,
        default: 80,
      }
    },

    computed: {
      characters() {
        return this.word.split('');
      },

      gridStyle() {
        return {
          gridTemplateColumns: Array(this.columns).fill(`${this.size}px`).join(' ')
        }
      },

      letterStyles() {
        const minOpacity = 0.2;
        const opacityDiff = (1 - minOpacity) / this.characters.length;
        const styles = this.characters.map((char, idx) => {
          return {
            opacity: 1 - (opacityDiff * idx),
          }
        });

        if(this.explode) {
          styles[0].bottom = '25px';
          styles[0].right = '25px';
          styles[1].bottom = '10px';
          styles[1].right = '10px';
          styles[styles.length - 1].top = '10px';
          styles[styles.length - 1].left = '10px';
        }

        return styles;
      }
    },
  }
</script>

<style lang="scss" scoped>
  .sg-letter-grid-card {
    display: grid;

    &__letter {
      display: inline-block; // Basic fallback
      position: relative;
    }
  }
</style>