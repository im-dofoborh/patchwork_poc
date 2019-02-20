<template>
  <section class="sg-component-stats-card">
    <div class="row">

      <div class="col-md-4 mb-md">
        <div class="sg-component-stats-card__section">
          <p class="heading-1"> {{ stats.componentCount }} </p>
          <p class="body-copy-large mb-md"> Components </p>
          <p class="heading-1 mt-md"> {{ stats.variantCount }} </p>
          <p class="body-copy-large"> Variants </p>
        </div>
      </div>

      <div class="col-md-4 mb-md">
        <div class="sg-component-stats-card__section">
          <p class="body-copy-large mb-md"> {{ stats.atomCount }} Atoms </p>
          <p class="body-copy-large mb-md"> {{ stats.moleculeCount }} Molecules </p>
          <p class="body-copy-large mb-md"> {{ stats.organismCount }} Organisms </p>
          <p class="body-copy-large mb-md"> {{ stats.templateCount }} Template </p>
          <p class="body-copy-large"> {{ stats.todoCount }} ToDo </p>
        </div>
      </div>

      <div class="col-md-4 mb-md">
        <div class="sg-component-stats-card__section">
          <p class="body-copy-large mb-xs"> Most used tags: </p>
          <div class="mb-md">
            <div
              v-for="(count, tag) in stats.mostUsedTags"
              :key="tag"
              class="sg-component-stats-card__tag">
              <tag
                :tag="tag"
                class="mb-xs"/>
              <sup>{{ count }}</sup>
            </div>
          </div>
          <p class="body-copy-large mb-xs"> Least used tags: </p>
          <div>
            <div
              v-for="(count, tag) in stats.leastUsedTags"
              :key="tag"
              class="sg-component-stats-card__tag">
              <tag
                :tag="tag"
                class="mb-xs"/>
              <sup>{{ count }}</sup>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
  import Tag from '~/components/Tag'

  export default {
    components: {
      Tag,
    },

    computed: {
      stats() {
        return this.$stats.getComponentStats();
      },
    }
  }
</script>

<style lang="scss" scoped>
  .sg-component-stats-card {
    width: 100%;

    &__section {
      background-color: $color--background--extra-light;
      border-bottom: 4px solid $color--background--regular;
      flex-grow: 1;
      padding: spacing-unit(sm);
      text-align: center;
    }

    &__tag {
      display: inline-block;
      margin-right: spacing-unit(xxs);
    }
  }
</style>