<template>
  <section class="sg-components-overview">
    <h1 class="heading-1 mb-lg">{{ title }}</h1>
    <p class="body-copy-large mb-lg">
      The component library is largest part of the design system, and displays
      the variety of components (of different atomicity and purpose) that exist
      within the Fabric platform.
    </p>

    <section class="sg-components-overview__stats">
      <h2 class="heading-2 mb-md">
        Component Statistics
      </h2>
      <component-stats-card v-if="componentsLoaded" />
      <spinner v-else />
    </section>

    <p class="body-copy mb-md">
      If you're reading this and there are still some
      <router-link
        class="link-copy"
        to="/component-list/todos">
        ToDos
      </router-link>
      not done, consider adding data for them,
      so we get a better picture of all the components used in Fabric.
      <a
        :href="externalLinks.howToAddComponents"
        class="link-copy">
        Here's how
      </a>
    </p>
    <p class="body-copy">
      All the components used in Fabric are members of 'component families' (listed in the menu).
      <router-link
        class="link-copy"
        to="/component-list">
        View All Components
      </router-link>
    </p>
    <p class="body-copy mb-lg">
      All components have <strong>properties</strong> that can create different
      <strong>variations</strong> which serve specific requirements.
    </p>

    <h2 class="heading-3 mb-sm">Properties a component can have:</h2>
    <div class="editor-content">
      <ul>
        <li>
          <strong>MODIFIERS: </strong> How the component <em>appears</em>
        </li>
        <li>
          <strong>ATTRIBUTES: </strong> How the component <em>behaves &amp; appears</em>
        </li>
        <li>
          <strong>OTHER: </strong> Component specific properties
        </li>
      </ul>
    </div>
    <h2 class="heading-3 mb-sm mt-lg">Every component should accept:</h2>
    <div class="editor-content">
      <ul>
        <li>
          <strong>modifiers: </strong> every component is styled using BEM classes,
          so it will already have at least one class. Usually you want to use the format
          of &lt;component-base-class&gt;--&lt;component-specific-modifier&gt; such as
          <ul>
            <li>
              standard-button--secondary
            </li>
            <li>
              pagination-arrow--next
            </li>
            <li>
              other classes you may want to add would be JS/QA handles for
              additional JavaScript interactions, or some of our utility classes
              such as spacing (e.g. "mb-md" which adds 20px margin-bottom to an element)
            </li>
          </ul>
        </li>
        <li>
          <strong>attributes: </strong> normal HTML tag attributes. E.g
          <ul>
            <li>
              data-something -
              <a :href="externalLinks.mdnDataAttributes">data attributes</a>
              can be used to add arbitrary
              information to an HTML element, which can then be accessed
              by JavaScript or CSS.
            </li>
            <li>
              hidden - boolean attribute. Hides element from the page. Can be later
              shown by some JS interaction.
            </li>
            <li>
              style - if you really really need to override the styling of the element,
              just in this case. But try not to do that.
            </li>
            <li>
              title - shows a tooltip on hover on mouse-enabled devices
            </li>
            <li>
              any other
              <a :href="externalLinks.mdnGlobalAttributes">global</a>
              or element-specific attributes you may require to modify
              the component's functionality (except for "class" - we have "modifiers" for that)
            </li>
          </ul>
        </li>
        <li>
          other properties: Most components accept additional properties, specific to each component,
          that will be listed on its Component Details page.
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import externalLinks from '~/data/external-links'
  import ComponentStatsCard from '~/components/cards/ComponentStats'
  import Spinner from '~/components/Spinner'

  export default {
    components: {
      ComponentStatsCard,
      Spinner,
    },

    data() {
      return {
        title: 'Component Library',
        externalLinks,
      }
    },

    head() {
      return {
        title: this.title,
      }
    },

    computed: {
      componentsLoaded() {
        return this.$store.state.componentsLoaded;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sg-components-overview {
    &__stats {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: spacing-unit(md);
    }
  }
</style>