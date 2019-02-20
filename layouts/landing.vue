<template>
  <div class="sg-landing-layout">

    <theme-navbar />

    <top-navbar
      :menu-open="showSideNav"
      @menu-click="showSideNav = !showSideNav" />

    <side-navbar
      :show="showSideNav"
      class="sg-landing-layout__sidebar hidden-md-up" />

    <main v-if="!showSideNav">
      <nuxt />
    </main>

  </div>
</template>

<script>
  import ThemeNavbar from '~/components/navbars/Theme'
  import TopNavbar from '~/components/navbars/Top'
  import SideNavbar from '~/components/navbars/Side'

  export default {
    components: {
      ThemeNavbar,
      TopNavbar,
      SideNavbar,
    },

    data() {
      return {
        showSideNav: false,
      }
    },

    head() {
      return {
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
  .sg-landing-layout {
    &__sidebar {
      width: 100%;
      top: calc(#{$sg-layout-theme-nav-height} + #{$sg-layout-top-nav-height});
      height: calc(100vh - (#{$sg-layout-theme-nav-height} + #{$sg-layout-top-nav-height}));
    }
  }
</style>