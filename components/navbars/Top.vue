<template>
  <nav class="sg-top-nav">

    <div class="sg-top-nav__section">
      <router-link :to="homeRoute">
        <letter-icon
          :to="homeRoute"
          size="30"
          word="Patchwork"
          class="sg-top-nav__icon-small" />
        <letter-icon
          :to="homeRoute"
          size="70"
          word="Patchwork"
          class="sg-top-nav__icon-large" />
      </router-link>
    </div>

    <ul
      class="sg-top-nav__section sg-top-nav__section--links">
      <li
        v-for="(route, name) in navRoutes"
        :key="route"
        class="sg-top-nav__item">
        <router-link
          :to="route"
          class="sg-top-nav__link">
          {{ name }}
        </router-link>
      </li>
    </ul>

    <menu-icon
      :open="menuOpen"
      class="sg-top-nav__menu-icon"
      @click="onClick" />

  </nav>
</template>

<script>
  import LetterIcon from '~/components/icons/Letter'
  import MenuIcon from '~/components/icons/Menu'

  export default {
    components: {
      LetterIcon,
      MenuIcon,
    },

    props: {
      menuOpen: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        homeRoute: {
          path: '/',
        },
        navRoutes: {
          'Overview': '/overview',
          'Structural Foundations': '/foundations',
          'Component Library': '/components',
          'Visual Language': '/language',
        }
      }
    },

    methods: {
      onClick() {
        this.$emit('menu-click');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sg-top-nav {
    height: 50px;
    background: $color--base--grey;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: spacing-unit(lg);
    padding-right: spacing-unit(lg);

    &__section {
      display: flex;
      align-items: center;
      height: 100%;
      margin: 0;
      padding: 0;

      &--links {
        display: none;
        margin-left: auto;
      }
    }

    &__item {
      position: relative;
      display: flex;
      height: 100%;
      margin-left: spacing-unit(sm);
      margin-right: spacing-unit(sm);
    }

    &__link {
      display: flex;
      align-items: center;

      color: $color--background--light;
      height: 100%;
      box-sizing: border-box;
      transition: color 200ms;

      &:after {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 5px;
        content: '';
        background-color: $color--base--white;
        opacity: 0;
        transition: opacity 200ms, transform 200ms;
        transform: translateY(5px);
      }

      &:hover,
      &.nuxt-link-active {
        color: $color--base--white;
        &:after {
          opacity: 1;
          transform: none;
        }
      }
    }

    &__icon-large {
      display: none;
    }
  }

  @media(min-width: map-get($grid-breakpoints, md)) {
    .sg-top-nav {
      height: 100px;

      &__section--links {
        display: flex;
      }

      &__icon-small {
        display: none;
      }

      &__icon-large {
        display: block;
      }

      &__menu-icon {
        display: none;
      }
    }
  }
</style>