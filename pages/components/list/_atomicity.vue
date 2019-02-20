<template>
  <div class="sg-atomicity-list-page">
    <h1 class="heading-1 mb-md">
      {{ title }}
    </h1>
    <p class="body-copy-large mb-md">
      {{ description }}
    </p>

    <text-input
      v-model="searchValue"
      placeholder="Search by component name, description, tags, atomicity"
      title="Try: button, recipe, atom, broken, todo"
      type="search"
      autofocus />

    <p class="sg-atomicity-list-page__results body-copy-small mb-md">
      {{ filteredComponents.length }} results
    </p>

    <component-list :components="filteredComponents" />

    <div
      v-if="!componentsLoaded"
      class="sg-atomicity-list-page__spinner">
      <spinner />
    </div>

  </div>
</template>

<script>
  import { titleCase } from 'change-case';
  import Spinner from '~/components/Spinner'
  import ComponentList from '~/components/lists/Component'
  import TextInput from '~/components/inputs/Text'

  export default {
    components: {
      ComponentList,
      TextInput,
      Spinner,
    },

    data() {
      return {
        searchValue: '',
      }
    },

    head() {
      return {
        title: this.title,
      }
    },

    computed: {
      title() {
        if (!this.atomicity.length) {
          return 'All Components';
        }
        return titleCase(`${this.atomicity}s`);
      },

      description() {
        if (!this.atomicity.length) {
          return 'A list of all components available to this theme.'
        }
        return `${this.title} are one of the key building blocks of atomic design`;
      },

      atomicity() {
        return this.$route.params.atomicity
          ? this.$route.params.atomicity.slice(0, -1)
          : '';
      },

      componentsLoaded() {
        return this.$store.state.componentsLoaded;
      },

      filteredComponents() {
        const { components } = this.$store.state;
        const searchWords = this.searchValue.toLowerCase().split();
        return Object.values(components).filter((component) => {
          const content = [
            component.metadata.atomicity || '',
            component.metadata.description || '',
            component.metadata.name || '',
            component.metadata.tags ? component.metadata.tags.join(' ') : '',
          ].join(' ').toLowerCase();
          const matchesSearch = searchWords.every(word => content.includes(word));
          const correctAtomicity = this.atomicity.length
            ? this.atomicity === component.metadata.atomicity
            : true;
          return matchesSearch && correctAtomicity;
        });
      },
    },

    watch: {
      '$route.query' () {
        this.searchValue = this.$route.query.search || '';
      },
    },

    mounted() {
      const atomicities = [
        '',
        'atom',
        'molecule',
        'organism',
        'template',
      ];
      if (atomicities.indexOf(this.atomicity) < 0) {
        this.$nuxt.error({ statusCode: 404 });
      }
      this.searchValue = this.$route.query.search || '';
    },
  }
</script>

<style lang="scss" scoped>
  .sg-atomicity-list-page {
    &__spinner {
      display: flex;
      justify-content: center;
    }

    &__results {
      text-align: right;
    }
  }
</style>