<template>
  <section class="sg-tabs">

    <!-- Nav tabs -->
    <ul
      class="sg-tabs__nav"
      role="tablist">
      <li class="sg-tabs__nav-item nav-item">
        <h4 class="sg-tabs__nav-title body-copy-small">
          <strong>
            {{ title }}
          </strong>
        </h4>
      </li>
      <li
        v-for="(options, key) in tabs"
        :key="key"
        role="tab"
        class="sg-tabs__nav-item nav-item">
        <a
          :class="tabLinkClasses[key]"
          @click="active = key">
          {{ key }}
        </a>
      </li>
    </ul>

    <!-- Tab panes -->
    <div
      class="sg-tabs__content">
      <div
        v-for="(options, key) in tabs"
        :key="key"
        :class="tabPaneClasses[key]"
        role="tabpanel">

        <no-ssr v-if="options && options.type === 'themed'">
          <themed-iframe
            :theme="currentTheme"
            :markup="options.value" />
        </no-ssr>

        <div
          v-if="options && options.type === 'raw'"
          v-html="options.value" />

        <code-editor
          v-else-if="options && options.type === 'html' && active === key"
          v-model="options.value"
          mode="htmlmixed"
          @input="onInput(key)" />

        <variables-table
          v-else-if="options && options.type === 'variable'"
          :variables="options.value"
          :theme-name="currentSite.name" />

      </div>
    </div>
  </section>
</template>

<script>
  import ThemedIframe from '~/components/ThemedIframe'
  import CodeEditor from '~/components/editors/Code'
  import VariablesTable from '~/components/tables/Variables'

  export default {
    components: {
      CodeEditor,
      VariablesTable,
      ThemedIframe,
    },

    props: {
      title: {
        type: String,
        default: 'Unknown',
      },
      tabs: {
        type: Object,
        default: () => ({}),
      }
    },

    data() {
      return {
        active: Object.keys(this.tabs)[0],
      }
    },

    computed: {
      currentSite() {
        return this.$store.state.currentSite;
      },

      tabLinkClasses() {
        return Object.keys(this.tabs).reduce((obj, key) => {
          obj[key] = {
            'sg-tabs__nav-link': true,
            'body-copy-small': true,
            'active': this.active === key,
          }
          return obj;
        }, {});
      },

      tabPaneClasses() {
        return Object.keys(this.tabs).reduce((obj, key) => {
          obj[key] = {
            'sg-tabs__pane': true,
            'active': this.active === key,
          }
          return obj;
        }, {});
      },

      currentTheme() {
        return this.$store.getters.currentTheme;
      },
    },

    methods: {
      onInput(key) {
        const func = this.tabs[key].onInput;
        if (func) {
          func(this.tabs);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sg-tabs {
    margin-bottom: spacing-unit(sm);
    margin-top: spacing-unit(md);

    &__nav {
      @include clearfix();
      padding-left: 0;
      margin-bottom: 0;
      list-style: none;
      border-bottom: 1px solid $color--background--dark;
    }

    &__nav-item {
      float: left;
      margin-bottom: -1px;

      + .sg-tabs__nav-item {
        margin-left: .2rem;
      }
    }

    &__nav-title {
      padding: spacing-unit(xxs) spacing-unit(xs);
    }

    &__nav-link {
      @include hover-focus {
        border-color: $color--background--light $color--background--light $color--background--dark;
      }

      cursor: pointer;
      display: block;
      padding: spacing-unit(xxs) spacing-unit(xs);
      border: 1px solid transparent;
      border-radius: 2px 2px 0 0;

      &.active {
        @include plain-hover-focus {
          color: $color--base--grey;
          background-color: $color--base--white;
          border-color: $color--background--dark $color--background--dark transparent;
        }
      }
    }

    &__content {
      padding: spacing-unit(xs);

      > .sg-tabs__pane {
        display: none;
      }

      > .active {
        display: block;
      }
    }
  }
</style>