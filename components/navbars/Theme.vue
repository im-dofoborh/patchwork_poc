<template>
  <nav class="sg-theme-navbar">
    <select
      v-model="selectedSite"
      autocomplete="off"
      class="sg-theme-navbar__select"
      @change="setSite">
      <option> -- View in Brand -- </option>
      <option
        v-for="site in sites"
        :key="site.key"
        :value="site.key"
        v-html="site.name" />
    </select>
  </nav>
</template>

<script>
  import localSettings from '~/local-settings';

  export default {
    data() {
      return {
        selectedSite: localSettings.baseSite,
      }
    },

    computed: {
      sites() {
        return this.$store.state.sites;
      }
    },

    watch: {
      '$store.state.currentSite' () {
        this.selectedSite = this.$store.state.currentSite.key
      },
    },

    methods: {
      /**
       * Set the current site to the selected option.
       */
      setSite() {
        this.$store.dispatch('setCurrentSite', this.selectedSite);
      }
    },
  }
</script>

<style lang="scss" scoped>
  .sg-theme-navbar {
    background-color: $color--background--light;
    text-align: right;
    padding: spacing-unit(xxs);
    height: $sg-layout-theme-nav-height;

    &__select {
      height: 24px;
      max-width: 100%;
    }
  }
</style>
