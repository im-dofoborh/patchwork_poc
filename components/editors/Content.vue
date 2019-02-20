<template>
  <div class="sg-content-editor editor-content">
    <a
      :href="githubLink"
      class="sg-content-editor__link"
      target="_blank">
      Edit on GitHub
    </a>
    <div
      v-if="content.length"
      class="mt-md"
      v-html="content" />
    <p v-else>
      {{ placeholder }}
    </p>
  </div>
</template>

<script>
  import localSettings from '~/local-settings';

  export default {
    props: {
      path: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        default: '',
      },
      placeholder: {
        type: String,
        default: '',
      },
      owner: {
        type: String,
        default: localSettings.github.repos.patchwork.owner,
      },
      repo: {
        type: String,
        default: localSettings.github.repos.patchwork.name,
      },
      branch: {
        type: String,
        default: localSettings.github.repos.patchwork.branch,
      }
    },

    computed: {
      links() {
        return Array.from(this.$el.getElementsByTagName('a'));
      },

      githubLink() {
        const { baseUrl } = localSettings.github;
        const filename = this.path.split('/').slice(-1);
        const modifiedPath = this.content
          ? this.path
          : this.path.replace(/\/([^\/]+)\/?$/, `/new?filename=${filename}`);
        const action = this.content
          ? 'edit'
          : 'new';
        return `${baseUrl}/${this.owner}/${this.repo}/${action}/${this.branch}/${modifiedPath}`;
      }
    },

    watch: {
      content() {
        this.removeListeners();
        this.$nextTick(() => {
          this.addListeners();
        });
      },
    },

    mounted() {
      this.$nextTick(this.addListeners);
    },

    beforeDestroy() {
      this.removeListeners();
    },

    methods: {
      /**
       * Check the content for links and if local navigate with router link.
       * @param {object} evt
       *   An event.
       */
      navigate(evt) {
        let target = evt.target;
        let i = 0;

        // Go through 5 parents max to find a tag
        while (i < 5 && !(target instanceof HTMLAnchorElement) && target.parentNode) {
          target = target.parentNode;
          i++;
        }

        // If target is still not a link, ignore
        if (!(target instanceof HTMLAnchorElement)) {
          return;
        }

        const href = target.getAttribute('href')
        if (href && href[0] === '/') {
          evt.preventDefault()
          this.$router.push(href)
        }
      },

      /**
       * Add event listeners.
       */
      addListeners() {
        this.links.forEach((el) => {
          el.addEventListener('click', this.navigate, false);
        })
      },

      /**
       * Remove event listeners.
       */
      removeListeners() {
        this.links.forEach((el) => {
          el.removeEventListener('click', this.navigate, false);
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sg-content-editor {
    &__link {
      float: right;
      text-decoration: none;
      font-size: 0.85em;
    }
  }
</style>

