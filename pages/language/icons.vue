<template>
  <section class="sg-icons-page">
    <div class="sg-content container editor-content">

      <div class="sg-content__header">
        <h1 class="heading-1">{{ title }}</h1>
      </div>

      <section class="sg-content__section">
        <h2>Using icons</h2>
        <p>
          Icons are supplied in SVG format and accessed as a background image
          on an element decorated with the class name for the required icon.
          For example, to apply the arrow icon you would use
          <code>
            {{ iconBasic }}
          </code>
          As the size of an icon will
          vary depending on the component it is within, it does not get given a
          size by default. Typically you would want to include the icon as part
          of your BEM block
          <code>
            {{ iconBem }}
          </code>
          to allow you to
          apply sizing and positioning to your icon within the component.
        </p>
        <p>
          To apply CSS, including animations, to an icon you may optionally add
          the attribute <code>data-grunticon-embed</code> to the icon element.
          For example,
          <code>
            {{ iconGrunticon }}
          </code>.
          On page load,
          the SVG markup will be injected inside this element, allowing you to
          target elements within the SVG for styling.
        </p>
        <p>
          For the full documentation about our icon build process and usage,
          including how to add new icons, see the icons page on
          <a :href="externalLinks.confluenceIcons">Confluence</a>.
        </p>
      </section>

      <section class="sg-content__section">
        <h2>Available icons</h2>
        <sample-grid class="mt-lg">
          <div
            v-for="icon in icons"
            :key="icon.name">
            <div class="sg-card">
              <p><code>{{ icon.class }}</code></p>
              <i :class="`sg-icons-page__icon ${icon.class}`" />
            </div>
          </div>
        </sample-grid>
      </section>

    </div>
  </section>
</template>

<script>
  import externalLinks from '~/data/external-links'
  import SampleGrid from '~/components/grids/Sample'

  export default {
    components: {
      SampleGrid,
    },

    async asyncData({ app }) {
      const res = await app.$fabric.getIcons();
      return {
        icons: res.data,
      };
    },

    data() {
      return {
        title: 'Icons',
        externalLinks,
        iconBasic: '<i class="icon-arrow" />',
        iconBem: '<i class="bem-block__icon icon-arrow" />',
        iconGrunticon: '<i class="icon-arrow" data-grunticon-embed />',
      }
    },

    head() {
      return {
        title: this.title,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .sg-icons-page {
    &__icon {
      background-position: 50%;
      background-size: auto 50px;
      padding-bottom: 50%;
      display: block;
      margin: auto;
    }
  }
</style>
