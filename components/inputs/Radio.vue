<template>
  <div class="sg-input-radio input-radio">

    <input
      :id="id"
      :name="name"
      :value="label"
      :checked="checked"
      type="radio"
      class="input-radio__input"
      @input="onInput">

    <label
      :for="id"
      class="input-radio__label js-supress-focus-on-click">
      {{ label }}
    </label>

  </div>
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      checked: {
        type: Boolean,
        default: false,
      }
    },

    methods: {
      onInput() {
        this.$emit('input');
      }
    }
  }
</script>
