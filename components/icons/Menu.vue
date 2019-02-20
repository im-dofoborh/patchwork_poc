<template>
  <div
    ref="icon"
    :class="classNames"
    @click="onClick">
    <div class="sg-menu-icon__bar" />
    <div class="sg-menu-icon__bar" />
    <div class="sg-menu-icon__bar" />
  </div>
</template>

<script>
  export default {
    props: {
      open: {
        type: Boolean,
        default: false,
      }
    },

    computed: {
      classNames() {
        return {
          'sg-menu-icon': true,
          'sg-menu-icon--open': this.open,
        }
      }
    },

    methods: {
      /**
       * Handle click event.
       */
      onClick() {
        this.$emit('click');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sg-menu-icon {
    display: inline-block;
    cursor: pointer;

    &__bar {
      width: 25px;
      height: 3px;
      background-color: $color--base--white;
      margin: 6px 0;
      transition: 200ms;
    }

    &--open {
      .sg-menu-icon__bar:first-child {
        transform: rotate(-45deg) translate(-7px, 6px);
      }

      .sg-menu-icon__bar:not(:first-child):not(:last-child) {
        opacity: 0;
      }

      .sg-menu-icon__bar:last-child {
        transform: rotate(45deg) translate(-6px, -6px);
      }
    }
  }
</style>