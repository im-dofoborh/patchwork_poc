<template>
  <transition-group
    name="fade"
    tag="ul"
    class="sg-contributor-list">
    <li
      v-for="(contributor, i) in contributors"
      :key="contributor.id"
      class="sg-contributor-list__item">
      <a
        :href="contributor.html_url"
        :title="contributor.login"
        :style="contributorStyles[i]"
        target="_blank"
        class="sg-contributor-list__link" />
    </li>
  </transition-group>
</template>

<script>
  import localSettings from '~/local-settings';

  export default {
    props: {
      path: {
        type: String,
        default: '',
      }
    },

    data() {
      return {
        contributors: [],
      }
    },

    computed: {
      contributorStyles() {
        const pixelRatio = window.devicePixelRatio;
        return this.contributors.map((contributor, index) => {
          return {
            backgroundImage: `url(${contributor.avatar_url}size=${60 * pixelRatio}`,
            backgroundColor: `hsl(${190 + index * 40}, 50%, 81%)`,
          }
        });
      }
    },

    watch: {
      path() {
        this.loadContributors();
      }
    },

    created() {
      this.loadContributors();
    },

    methods: {
      async loadContributors() {
        const { apiUrl } = localSettings.github;
        const { owner, name } = localSettings.github.repos.styleguide;
        const endpoint = `${apiUrl}/repos/${owner}/${name}/commits`;
        let data = [];
        console.log('foo')
        try {
          data = await this.$axios.$get(endpoint, {
            params: {
              path: this.path
            },
            headers: {
              'Authorization': `Basic ${localSettings.github.readOnlyToken}`
            }
          });
        } catch (err) {
          console.log(err);
          this.contributors = [];
        }
        this.contributors = this.getUniqueAuthors(data);
      },

      /**
       * Get the unique authors of a set of commits.
       * @param {array} commits
       *   Some commit data.
       * @returns {array}
       *   The unique commit authors.
       */
      getUniqueAuthors(commits) {
        const authoredCommits = commits.filter(commit => commit.author);
        const authors = authoredCommits.map(commit => commit.author);
        return [...authors.reduce((map, author) => {
          map.has(author.id) || map.set(author.id, author);
          return map;
        }, new Map()).values()];
      },
    },
  }
</script>

<style lang="scss" scoped>
  .sg-contributor-list {
    min-height: 20px;
    margin: 0;
    padding: 0;

    &__item {
      margin-right: spacing-unit(xxs);
      display: inline-block;
    }

    &__link {
      display: block;
      border-radius: 50%;
      background-size: cover;
      height: 20px;
      width: 20px;
      line-height: 0;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .3s;
    }

    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
  }
</style>
