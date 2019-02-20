<template>
  <div
    v-show="show"
    :class="`sg-alert sg-alert--${type}`">
    <button
      class="sg-alert__button"
      @click="show = false">
      ×
    </button>
    <small
      v-html="message" />
  </div>
</template>

<script>
  export default {
    props: {
      message: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: 'info',
      },
    },

    data() {
      return {
        show: true,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .sg-alert {
    color: $color--form--info--regular;
    background: $color--form--warning--light;
    display: block;
    padding: spacing-unit(sm);
    position: relative;

    &--error {
      color: $color--form--warning--regular;
      background: $color--form--warning--light;
    }

    &--success {
      color: $color--form--success--regular;
      background: $color--form--success--light;
    }

    &__button {
      border: 0;
      background: transparent;
      margin-left: auto;
      position: absolute;
      color: rgba(0, 0, 0, 0.5);
      font-weight: bold;
      padding: spacing-unit(xxs) spacing-unit(sm);
      right: 0;
      top: 0;
    }
  }
</style>