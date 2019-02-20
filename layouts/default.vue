<template>
  <div :class="classNames">

    <theme-navbar />

    <top-navbar
      :menu-open="showSideNav"
      @menu-click="showSideNav = !showSideNav" />

    <div class="sg-default-layout__container">

      <side-navbar
        :show="showSideNav"
        class="sg-default-layout__sidebar"
        @item-click="showSideNav = false" />

      <main
        v-if="!showSideNav"
        class="sg-default-layout__main">
        <nuxt />
      </main>

      <details-navbar v-if="hasDetails" />

    </div>

  </div>
</template>

<script>
  import SideNavbar from '~/components/navbars/Side'
  import ThemeNavbar from '~/components/navbars/Theme'
  import TopNavbar from '~/components/navbars/Top'
  import DetailsNavbar from '~/components/navbars/Details'

  export default {
    components: {
      SideNavbar,
      ThemeNavbar,
      TopNavbar,
      DetailsNavbar,
    },

    data() {
      return {
        showSideNav: false,
      }
    },

    computed: {
      hasDetails() {
        return this.$store.state.currentComponent;
      },

      classNames() {
        return {
          'sg-default-layout': true,
          'sg-default-layout--side-nav-open': this.showSideNav,
        }
      },
    },

    head() {
      return {
        titleTemplate: `%s | ${this.$store.state.currentSite.name} Patchwork`,
        link: [
          { rel: 'stylesheet', href: this.$store.getters.baseTheme.css }
        ]
      }
    },

    created() {
      window.addEventListener('resize', this.handleResize)
    },

    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    },

    methods: {
      /**
       * Hide the sidenav on resize.
       */
      handleResize() {
        this.showSideNav = false;
      }
    },
  }
</script>

<style lang="scss" scoped>
  .sg-default-layout {
    &__sidebar {
      width: 100%;
      top: calc(#{$sg-layout-theme-nav-height} + #{$sg-layout-top-nav-height});
      height: calc(100vh - (#{$sg-layout-theme-nav-height} + #{$sg-layout-top-nav-height}));
    }

    &__main {
      padding: spacing-unit(sm);
    }

    &--side-nav-open {
      height: 100vh;
      overflow: hidden;
    }
  }

  @media(min-width: map-get($grid-breakpoints, md)) {
    .sg-default-layout {
      &__container {
        display: flex;
      }

      &__sidebar {
        height: auto;
        min-height: 100vh;
        flex: 0 0 $sg-layout-sidebar-width;
        width: $sg-layout-sidebar-width;
        top: 0;
      }

      &__main {
        flex: 1 0 0;
        padding: spacing-unit(lg);
        overflow: hidden;
      }

      &--side-nav-open {
        height: auto;
        overflow: visible;
      }
    }
  }
</style>
