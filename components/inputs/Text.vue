<template>
  <input
    ref="input"
    :value="value"
    class="input-text"
    @input="onInput">
</template>

<script>
  export default {
    // All regular HTML attributes can be passed as non-prop attributes
    // https://vuejs.org/v2/guide/components-props.html#Non-Prop-Attributes

    props: {
      value: {
        type: String,
        default: '',
      }
    },

    methods: {
      onInput() {
        this.$emit('input', this.$refs.input.value)
      }
    }
  }
</script>
