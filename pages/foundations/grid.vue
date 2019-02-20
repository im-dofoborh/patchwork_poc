<template>
  <div class="sg-content container">
    <div class="sg-content__header">
      <h1 class="heading-1">{{ title }}</h1>
    </div>

    <div class="sg-content__section editor-content">
      <h2>Overview</h2>
      <p>
        Our grid system uses Bootstrap 4 Alpha 6 with a custom configuration. See the Bootstrap
        <a :href="externalLinks.bootstrapGrid">grid documentation</a>
        to understand how to use the grid.
      </p>
      <p>
        All pages within {{ currentSite.name }} should use an identical grid. This is partly
        down to our usage of ad skins which requires a consistency in our grid between pages. See our
        <a href="/patchwork/adverts">adverts</a> documentation or
        <a :href="externalLinks.adSkinGridChanges">
          Confluence
        </a>
        for more information.
      </p>
    </div>

    <div
      v-for="(grid, i) in grids.fluid"
      :key="`fluid-${i}`"
      class="sg-content__section">

      <div class="editor-content">
        <h3 class="heading-3">{{ grid.name }} ({{ grid.device }})</h3>
        <p>
          <template v-if="grid.breakpointMin && grid.breakpointMax">
            Between {{ grid.breakpointMin }}px and {{ grid.breakpointMax }}px
          </template>
          <template v-else-if="grid.breakpointMin && !grid.breakpointMax">
            From {{ grid.breakpointMin }}px
          </template>
          <template v-else-if="grid.breakpointMax && !grid.breakpointMin">
            Up to {{ grid.breakpointMax }}px
          </template>
          we can use up to {{ grid.columns }} columns in any combination within the grid with
          a maximum width of {{ grid.container }} and a {{ grid.gutter }}px gutter between columns.
          This results in a minimum outer gutter of {{ grid.outerGutter }}.
        </p>
      </div>

      <mock-grid
        :columns="grid.columns"
        :width="grid.containerPx" />

    </div>

    <div class="sg-content__section editor-content">
      <h2>Fixed columns</h2>
      <p>
        Due to having to support fixed-width adverts, it is sometimes necessary to ensure that
        within a layout, a single column is set to a width of 300px. The other column will use
        the remaining space and behave like a typical Bootstrap grid.
      </p>
      <p>
        We can achieve this by using the following layout below. Details on how to implement
        this are available in
        <a :href="externalLinks.fixedGridColumns">Confluence</a>.
      </p>
      <p>
        'When the 'small' and 'extra small' breakpoints are hit, these columns will follow typical
        bootstrap column behaviour and will fit 100% width and stack.
      </p>
    </div>

    <div
      v-for="(grid, i) in grids.fixed"
      :key="`fixed-${i}`"
      class="sg-content__section">
      <div class="editor-content">
        <h3 class="heading-3">{{ grid.name }} ({{ grid.device }})</h3>
      </div>

      <mock-grid
        :width="grid.containerPx"
        :fluid-text="grid.textFluid"
        :fixed-text="grid.textFixed" />

    </div>
  </div>
</template>

<script>
  import grids from '~/data/grids';
  import externalLinks from '~/data/external-links'
  import MockGrid from '~/components/grids/Mock'

  export default {
    components: {
      MockGrid,
    },

    data() {
      return {
        title: 'Grid',
        externalLinks,
        grids,
      }
    },

    head() {
      return {
        title: this.title,
      }
    },

    computed: {
      currentSite() {
        return this.$store.state.currentSite;
      },
    },
  }
</script>