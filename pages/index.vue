<template>
  <section class="sg-landing-page">

    <div class="sg-landing-page__header">
      <div class="sg-landing-page__title-block">
        <h1 class="sg-landing-page__main-title heading-1">
          {{ title }}
        </h1>
        <p>
          Our design system helps us work together to build a great experience
          for all Immediate Media brands.
        </p>
      </div>
    </div>

    <section class="sg-landing-page__section container editor-content">
      <div class="row">
        <div class="col-md-6">
          <router-link
            :style="{ cursor: 'pointer' }"
            tag="h2"
            class="heading-2"
            to="/components">
            Component Library
          </router-link>
          <p>
            Our components are a collection of interface elements that can be
            reused across the Patchwork system. This frees us up to focus on
            solving unique client challenges, rather than reinventing interface
            elements that are already in use.
          </p>
          <p>
            <router-link to="/components">
              Patchwork Component Library
            </router-link>
          </p>
        </div>
        <div class="sg-landing-page__right-aligned-col col-md-6">
          <letter-grid-card
            :word="title"
            explode
            class="hidden-md-down" />
        </div>
      </div>
    </section>

    <section class="sg-landing-page__section sg-landing-page__section--foundations container-fluid">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <letter-icon
              :word="title"
              :size="210"
              colour="white"
              text-colour="#ff543d"
              class="sg-landing-page__foundations-icon hidden-md-down" />
          </div>
          <div class="sg-landing-page__right-aligned-col col-md-6">
            <router-link
              :style="{ cursor: 'pointer' }"
              tag="h2"
              class="sg-landing-page__sub-heading heading-2"
              to="/foundations">
              Foundations
            </router-link>
            <p>
              The structural foundations define how we lay out content and components.
              Incorporates the grid, responsive behaviour, accessibility rules, spacing
              units, image aspect ratios and ad formats. Being so structural makes these
              far less likely to change between sites.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="sg-landing-page__section sg-landing-page__section--language container-fluid">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h2 class="sg-landing-page__sub-heading heading-2">
              <router-link
                :style="{ cursor: 'pointer' }"
                tag="h2"
                class="sg-landing-page__sub-heading heading-2"
                to="/language">
                Visual Language
              </router-link>
            </h2>
            <p>
              Our library of basic stylistic tools that aim to help us achieve visual
              consistency throughout Fabric. Covers brand theming, including colours,
              typography and iconography with Fabric defining the hierarchy and each
              site tailoring the styles to suit their brand.
            </p>
          </div>
          <div class="sg-landing-page__center-aligned-col col-md-6">
            <letter-icon
              :word="title"
              :size="210"
              colour="white"
              text-colour="#21bdff"
              class="sg-landing-page__language-icon hidden-md-down" />
          </div>
        </div>
      </div>
    </section>

  </section>
</template>

<script>
  import LetterGridCard from '~/components/cards/LetterGrid'
  import LetterIcon from '~/components/icons/Letter'

  export default {
    layout: 'landing',

    components: {
      LetterGridCard,
      LetterIcon,
    },

    data() {
      return {
        title: 'Patchwork',
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
  .sg-landing-page {
    &__header {
      border-top: 2px solid $color--background--extra-light;
      background-color: $color--base--grey;
      height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    &__title-block {
      text-align: center;
      max-width: 600px;
      padding: spacing-unit(md);
    }

    &__main-title {
      text-transform: uppercase;
      font-weight: bold;
      color: $color--base--white;
    }

    &__section {
      padding-top: 120px;
      padding-bottom: 120px;

      &--foundations {
        background-color: $color--clickable--light;
        color: $color--base--white;
      }

      &--language {
        background-color: $color--highlight--light;
        color: $color--base--white;
      }
    }

    &__sub-heading {
      color: $color--base--white;
    }

    &__foundations-icon {
      position: relative;
      transform: rotate(-25deg);

      &:after {
        content: '';
        position: absolute;
        background-color: $color--clickable--light;
        height: 100px;
        width: 210px;
        z-index: 1;
        left: -60px;
        bottom: -60px;
        transform: rotate(25deg);
        width: 100%;
      }
    }

    &__language-icon {
      position: relative;
      transform: rotate(45deg);

      &:before {
        content: '';
        position: absolute;
        background: radial-gradient(circle at 80px -80px, $color--highlight--light, transparent 60%),
          linear-gradient($color--highlight--light, transparent 50%);
        opacity: 0.4;
        height: 100px;
        width: 210px;
        z-index: 1;
        bottom: 90px;
        right: -10px;
        transform: rotate(-45deg);
        width: 300px;
      }
    }

    &__right-aligned-col {
      text-align: right;
      display: flex;
      align-items: flex-end;
    }

    &__center-aligned-col {
      text-align: center;
      display: flex;
      align-items: center;
    }
  }
</style>