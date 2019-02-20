<template>
  <div class="sg-spinner">
    <transition name="fade">
      <div v-if="show">
        <letter-icon
          :size="letterSize"
          :colour="color"
          word="Patchwork"
          class="sg-spinner__letter" />
      </div>
    </transition>
  </div>
</template>

<script>
  import LetterIcon from '~/components/icons/Letter'

  export default {
    components: {
      LetterIcon
    },

    props: {
      size: {
        type: String,
        default: 'md',
      },
      light: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        show: false,
      }
    },

    computed: {
      letterSize() {
        const sizes = {
          sm: 25,
          md: 50,
          lg: 75,
        }
        return sizes[this.size] || sizes.sm;
      },

      color() {
        return this.light ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.2)';
      }
    },

    mounted() {
      this.show = true; // Triggers transition
    }
  }
</script>

<style lang="scss" scoped>
  .sg-spinner {
    &__letter {
      animation: spinner 2s infinite linear;
    }

    @keyframes spinner {
      0% {
        transform: perspective(120px) rotateX(0deg) rotateY(0deg);
      }
      25% {
        transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
      }
      50% {
        transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
      }
      75% {
        transform: perspective(120px) rotateX(0.1deg) rotateY(-180.1deg);
      }
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity 5s;
    }

    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
  }
</style>
