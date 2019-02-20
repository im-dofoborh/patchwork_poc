<template>
  <div class="sg-tag-list">
    <h3 class="sg-tag-list__title">Tags</h3>
    <ul class="sg-tag-list__list">
      <li>
        <router-link
          v-for="(tag, i) in routedTags"
          :key="i"
          :to="tag.route">
          <span class="sg-tag-list__item">
            {{ tag.name }}
          </span>
          <span
            v-if="i < routedTags.length - 1"
            class="sg-tag-list__seperator body-copy-small">
            |
          </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      tags: {
        type: Array,
        default: () => [],
      }
    },

    computed: {
      routedTags() {
        return this.tags.map((tag) => {
          return {
            name: tag,
            route: {
              path: '/components/list',
              query: {
                search: tag.toLowerCase(),
              },
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sg-tag-list {
    display: flex;
    align-items: center;
    margin: spacing-unit(xxs) 0;

    &__title {
      font-size: 0.85em;
      color: $color--background--dark;
      font-weight: normal;
      margin-bottom: 0;
      margin-right: 10px;
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    &__item {
      font-size: 0.85em;
      color: $color--clickable--regular;
      flex-shrink: 0;
    }

    &__seperator {
      padding: 0 spacing-unit(xxs);
    }
  }
</style>
