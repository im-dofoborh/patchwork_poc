<template>
  <ul class="sg-component-list">

    <li
      v-for="(component, i) in components"
      :key="i"
      class="sg-component-list__item">

      <div class="sg-component-list__icon">
        <atomicity-icon
          :atomicity="component.metadata.atomicity" />
      </div>

      <h2 class="sg-component-list__heading heading-3 mb-sm">
        <router-link :to="component.route">
          {{ component.metadata.name }}
        </router-link>
      </h2>

      <p
        v-if="component.metadata.description"
        class="sg-component-list__description body-copy mb-sm">
        {{ component.metadata.description }}
      </p>
      <alert
        v-else
        type="error"
        class="mb-sm"
        message="This component has no description" />

      <tag-list
        :tags="component.metadata.tags"
        class="mb-md" />

    </li>
  </ul>
</template>

<script>
  import Alert from '~/components/Alert'
  import AtomicityIcon from '~/components/icons/Atomicity'
  import TagList from '~/components/lists/Tag'

  export default {
    components: {
      AtomicityIcon,
      TagList,
      Alert
    },

    props: {
      components: {
        type: Array,
        default: () => [],
      },
    },
  }
</script>

<style lang="scss" scoped>
  .sg-component-list {
    list-style-type: none;
    padding: 0;

    &__item {
      border: 1px solid $color--background--regular;
      margin: -1px 0 0;
      padding: spacing-unit(md);

      &:not(:last-child) {
        border-bottom: none;
      }
    }

    &__icon {
      display: inline-block;
      margin-right: spacing-unit(xs);
      vertical-align: top;
    }

    &__heading {
      display: inline-block;
    }

    &__description {
      color: $color--base--grey;
    }

    &__results {
      margin: 0;
    }
  }
</style>