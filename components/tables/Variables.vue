<template>
  <table class="sg-variables-table body-copy-small">
    <thead>
      <tr>
        <th class="sg-table__head sg-table__head--first">
          Variable name
        </th>
        <th class="sg-table__head">
          {{ themeName }}
        </th>
        <th
          class="sg-table__head">
          Fabric default
        </th>
      </tr>
    </thead>
    <tbody>

      <tr
        v-for="(val, key) in variables"
        :key="key">
        <td>
          <code>
            {{ key }}
          </code>
        </td>

        <td :colspan="val.child.value === val.parent.value ? '2' : '1'">
          <code v-html="val.child.processedValues || val.child.value" />
          <small
            v-if="val.child.processedValues && val.child.processedValues !== val.child.value">
            (from <code v-html="val.child.value" />)
          </small>
        </td>

        <td v-if="val.child.value !== val.parent.value">
          <code v-html="val.parent.processedValues || val.parent.value" />
          <small
            v-if="val.parent.processedValues && val.parent.processedValues !== val.parent.value">
            (from <code v-html="val.parent.value" />)
          </small>
        </td>

      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    props: {
      variables: {
        type: Object,
        required: true,
      },
      themeName: {
        type: String,
        required: true,
      },
    },
  }
</script>

<style lang="scss" scoped>
  .sg-variables-table {
    border-collapse: collapse;

    &__head {
      min-width: 250px;
      width: 40%;

      &--first {
        width: 20%;
      }
    }

    th,
    td {
      border: 1px solid $color--background--light;
      padding: spacing-unit(xxs);
    }
  }
</style>
