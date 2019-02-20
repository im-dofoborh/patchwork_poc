<template>
  <section class="sg-adverts-page">
    <div class="sg-content container">

      <div class="sg-content__header">
        <h1 class="heading-1">{{ title }}</h1>
      </div>

      <div class="sg-content__section">
        <h2 class="heading-2">Standard advert sizes</h2>
        <p>
          These are the standard fixed-size ad units available on Fabric. The markup
          below is a sample of the typical usage of one of these ad units, in this case
          the second MPU unit on a home page. Depending on the location, this markup
          could include different position names for ad targeting or different classes
          to allow for functionality like sticky advert behaviour to be applied with JavaScript.
        </p>

        <div
          v-if="adverts.length"
          class="sg-adverts-page__grid">
          <div
            v-for="(advert, i) in adverts"
            :key="i"
            class="sg-adverts-page__grid-item">

            <div
              :style="`height: ${advert.height}px; width: ${advert.width}px;`"
              class="sg-adverts-page__mock-advert">
              <h6 class="heading-6">{{ advert.name }}</h6>
              <h6 class="heading-6">{{ `${advert.width}x${advert.height}` }}</h6>
              <p
                v-if="advert.notes"
                class="body-copy-small">
                {{ advert.notes }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="sg-content__section editor-content">
        <h2>Additional advert types</h2>
        <p>As well as the standard advert types, we also serve the following ad units:</p>
        <h3>Out of page unit (1x1)</h3>
        <p>
          On devices which are wide enough, we use an ad unit of the size "1x1" to display
          an advert which wraps around the top and sides of the page grid. This is known
          as a takeover advert. When this happens, the advert should append the
          <code>.ad-skin-active</code> class to the <code>body</code> element to allow us
          to control the page styling and ensure any full-width elements, such as
          the site header, fit neatly to the grid.
        </p>
        <p>
          A series of utility classes, including <code>.fluid-container</code> and
          <code>.body-background</code> are also available and can be used on markup to ensure
          the page responds correctly when a takeover advert is served. The
          <a :href="externalLinks.advertIntegrations">Advert Integrations</a>
          page on Confluence documents these classes in more detail.
        </p>
        <h3>Sharethrough unit (5x5)</h3>
        <p>
          A Sharethrough ad unit is a native ad unit which can be used within the content
          of a page, such as within an archive page. This unit requires a Sharethrough key
          which is unique based on the site and type of location (archive, article etc).
          A Sharethrough key is usually configured within the "Site Config" screen by
          a site admin. Including the Sharethrough Twig partial and passing the correct key
          will ensure your unit displays correctly.
        </p>
      </div>

      <div class="sg-content__section editor-content">
        <h2>Sticky adverts</h2>
        <p>
          On some pages we use JavaScript to enable sticky advert behaviour to ensure an advert
          remains on screen between specified scroll positions. Full documentation
          on this behaviour can be found on the
          <a :href="externalLinks.stickyAdvertBehaviour">Sticky Advert Behaviour</a>
          Confluence page.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
  import adverts from '~/data/adverts';
  import externalLinks from '~/data/external-links';
  import Alert from '~/components/Alert';

  export default {
    components: {
      Alert,
    },

    data() {
      return {
        title: 'Adverts',
        externalLinks,
        adverts,
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
  .sg-adverts-page {
    &__grid {
      @include clearfix;
      margin: 0 -#{spacing-unit(sm)};

      &-item {
        float: left;
        margin: spacing-unit(sm);
      }
    }

    &__mock-advert {
      background: $color--background--dark;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: spacing-unit(md);
    }
  }
</style>
