<template>
  <section class="sg-colours-page">
    <div class="sg-content container">

      <div class="sg-content__header">
        <h1 class="heading-1">{{ title }}</h1>
      </div>

      <div class="sg-content__section">
        <div class="editor-content">
          <p>
            These are all of the colours currently declared in the
            {{ currentSite.name }} color.scss theme. It does not mean that
            all of these are in use. You will also have access to all of the
            colours in the parent theme, provided that you have not overridden
            them.
          </p>
        </div>

        <sample-grid class="mt-lg">
          <div
            v-for="(colour, key) in colours"
            :key="key">
            <div class="sg-colours-page__palette">

              <div
                :style="`background-color: ${colour.hex}`"
                class="sg-colours-page__palette-swatch" />

              <div class="sg-colours-page__palette-name">
                <code>{{ key }}</code>
              </div>

              <div class="sg-colours-page__palette-hex">
                <code>{{ colour.hex }}</code>
              </div>

              <div
                v-if="colour.override"
                class="sg-colours-page__palette-note">
                <p class="sg-colours-page__palette-note-text">From:</p>
                <code>
                  {{ colour.override }}
                </code>
              </div>

              <div
                v-if="colour.comment"
                class="sg-colours-page__palette-note">
                <p class="sg-colours-page__palette-note-text">
                  {{ colour.comment }}
                </p>
              </div>

            </div>
          </div>
        </sample-grid>

      </div>
    </div>
  </section>
</template>

<script>
  import SampleGrid from '~/components/grids/Sample';

  export default {
    components: {
      SampleGrid,
    },

    async asyncData({ app }) {
      const res = await app.$fabric.getColours();
      return {
        colours: res.data,
      };
    },

    data() {
      return {
        title: 'Colours',
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

    watch: {
      '$store.state.currentSite'() {
        this.$fabric.getColours().then(res => this.colours = res.data);
      }
    },
  }
</script>

<style lang="scss" scoped>
  .sg-colours-page {
    &__palette {
      &-name {
        margin: spacing-unit(sm) 0 spacing-unit(xs);
        font-weight: bold;
      }

      &-swatch {
        height: 100px;
        border: 2px solid $color--base--white;
      }

      &-hex {
        margin-bottom: spacing-unit(sm);
      }

      &-note {
        padding: spacing-unit(sm) 0;
        border-top: 2px solid $color--background--dark;

        &:last-child {
          padding-bottom: 0;
        }
      }

      &-note-text {
        margin-bottom: 0;
      }
    }
  }
</style>
