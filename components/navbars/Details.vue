<template>
  <nav class="sg-details-sidebar">

    <section v-if="component">
      <atomicity-icon :atomicity="component.metadata.atomicity" />
      <h2 class="heading-4 mt-xs mb-xxs">{{ component.metadata.name }}</h2>

      <p class="sg-details-sidebar__muted body-copy-extra-small mb-xxs">
        Contributors:
      </p>
      <contributor-list
        :path="component.metadata.yamlLocation"
        class="mb-xxs" />

      <p
        v-if="component.metadata.plugin"
        class="sg-details-sidebar__muted body-copy-extra-small mb-xs">
        <strong>Plugin:</strong> {{ component.metadata.plugin }}
      </p>

      <h3 class="heading-7">Viewport:</h3>
      <radio-input
        v-for="size in sizes"
        ref="size-radio"
        :id="size"
        :key="size"
        :label="size | upperCase"
        :class="`sg-details-sidebar__size-radio sg-details-sidebar__size-radio--${size}`"
        :checked="size === componentViewportSize"
        name="sizes"
        @input="switchViewport(size)" />

      <h3
        v-if="component.metadata.readmeHtml"
        class="heading-5 mt-sm">
        <a
          v-scroll-to="`#readme`"
          href="#" >
          Readme
        </a>
      </h3>
      <section>
        <h3
          class="sg-details-sidebar__dropdown heading-5 mt-xs mb-sm"
          @click="showVariants = !showVariants">
          Variants
        </h3>
        <ul
          v-show="showVariants"
          class="sg-details-sidebar__list">
          <li
            v-for="variant in component.variants"
            :key="variant.id"
            class="sg-details-sidebar__list-item">
            <a
              v-scroll-to="`#${variant.id}`"
              href="#">
              {{ variant.id | titleCase }}
            </a>
          </li>
        </ul>
      </section>
      <section class="sg-details-sidebar__border-top">
        <h3 class="heading-5 mt-sm">Dev Links</h3>
        <ul
          class="sg-details-sidebar__list sg-details-sidebar__list--no-padding">
          <li
            v-for="(link, label) in devLinks"
            :key="label"
            class="sg-details-sidebar__list-item">
            <a
              :href="link"
              target="_blank"
              class="sg-details-sidebar__list-link">
              {{ label }}
            </a>
          </li>
        </ul>
        <p
          v-if="component.metadata.devNotes"
          class="sg-details-sidebar__muted body-copy-extra-small">
          <strong>Notes:</strong> {{ component.metadata.devNotes }}
        </p>
      </section>
    </section>

  </nav>
</template>

<script>
  import RadioInput from '~/components/inputs/Radio'
  import AtomicityIcon from '~/components/icons/Atomicity'
  import ContributorList from '~/components/lists/Contributor'

  export default {
    components: {
      AtomicityIcon,
      RadioInput,
      ContributorList,
    },

    data() {
      return {
        showVariants: false,
      }
    },

    computed: {
      component() {
        return this.$store.state.currentComponent;
      },

      sizes() {
        return [
          'xs',
          'sm',
          'md',
          'lg'
        ]
      },

      componentViewportSize() {
        return this.$store.state.componentViewportSize;
      },

      devLinks() {
        return {
          'Edit YAML Data': this.component.devLinks.yaml,
          'Edit README': this.component.devLinks.readme,
        };
      },
    },

    mounted() {
      this.$store.dispatch('setComponentViewportSize', this.sizes[0]);
    },

    methods: {
      /**
       * Switch the viewport size.
       * @param {string} size
       *   A size.
       */
      switchViewport(size) {
        this.$store.dispatch('setComponentViewportSize', size);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .sg-details-sidebar {
    display: none;
    font-size: 0.85rem;
    width: $sg-layout-sidebar-width;
    border-left: 1px solid $color--background--light;
    height: 100vh;
    position: sticky;
    top: 0;
    padding: spacing-unit(sm);
    overflow-wrap: break-word;

    &__list {
      margin-bottom: spacing-unit(sm);
      list-style: none;
      padding-left: spacing-unit(sm);
      color: #333;

      &--no-padding {
        padding-left: 0;
      }
    }

    &__list-item {
      margin-top: spacing-unit(xxs);
      color: #666;
    }

    &__list-link {
      color: $color--clickable--regular;
    }

    &__size-radio {
      display: none;
      margin-top: spacing-unit(xxs);
      margin-bottom: spacing-unit(xxs);

      &:not(:last-child) {
        margin-right: spacing-unit(xxs);
      }

      @each $breakpoint in map-keys($sg-component-breakpoints) {
        $value: map-get($sg-component-breakpoints, $breakpoint);
        @media(min-width: $value) {
          &--#{$breakpoint} {
            display: inline-block;
          }
        }
      }
    }

    &__dropdown {
      position: relative;
      cursor: pointer;

      &:after {
        content: '▾';
        right: 0;
        position: absolute;
        transition: transform 0.2s;
      }
    }

    &__muted {
      color: $color--background--extra-dark;
    }

    &__border-top {
      border-top: 1px solid $color--background--light;
    }
  }

  @media(min-width: map-get($sg-component-breakpoints, xs)) {
    .sg-details-sidebar {
      display: block;
    }
  }
</style>