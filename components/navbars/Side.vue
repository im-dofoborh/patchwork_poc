<template>
  <nav :class="classNames">
    <section
      v-for="(node, i) in currentNodes"
      :key="i"
      :class="node.classNames">
      <div class="sg-side-nav__menu">

        <div
          v-if="node.heading || node.subheading"
          class="sg-side-nav__headings">
          <h3
            v-if="node.heading"
            :class="`sg-side-nav__heading ${node.hideItems ? 'sg-side-nav__toggle' : ''}`"
            @click="toggleNodeVisibility(node)">
            {{ node.heading }}
          </h3>
          <h4
            v-if="node.subheading"
            :class="`sg-side-nav__subheading ${node.hideItems ? 'sg-side-nav__toggle' : ''}`"
            @click="toggleNodeVisibility(node)">
            {{ node.subheading }}
          </h4>
        </div>

        <ul
          v-if="node.items && (!node.hideItems || shownNode === node)"
          class="sg-side-nav__list">
          <li
            v-for="(item, i) in node.items"
            :key="i"
            :class="`sg-side-nav__item ${ item.indent ? 'sg-side-nav__item--indent' : '' }`"
            @click="onItemClick">
            <router-link
              :to="item.route"
              class="sg-side-nav__link">
              {{ item.name }}
            </router-link>
          </li>
        </ul>

        <div
          v-if="node.divider"
          class="sg-side-nav__divider" />

      </div>
    </section>

    <div
      v-if="showSpinner"
      class="sg-side-nav__spinner">
      <spinner
        light
        size="sm" />
    </div>

  </nav>
</template>

<script>
  import { titleCase } from 'change-case';
  import Spinner from '~/components/Spinner';

  export default {
    components: {
      Spinner,
    },

    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        currentSection: null,
        coreNodes: [
          {
            classNames: 'hidden-md-up',
            divider: true,
            items: [
              {
                name: 'Overview',
                route: '/overview',
              },
              {
                name: 'Structural Foundations',
                route: '/foundations',
              },
              {
                name: 'Component Library',
                route: '/components',
              },
              {
                name: 'Visual Language',
                route: '/language',
              },
            ]
          }
        ],
        foundationNodes: [
          {
            heading: 'Structural Foundations',
            items: [
              {
                name: 'Adverts',
                route: '/foundations/adverts',
              },
              {
                name: 'Grid',
                route: '/foundations/grid',
              },
            ]
          }
        ],
        languageNodes: [
          {
            heading: 'Visual Language',
            items: [
              {
                name: 'Colours',
                route: '/language/colours',
              },
              {
                name: 'Icons',
                route: '/language/icons',
              },
            ]
          },
          {
            subheading: 'Typography',
            items: [
              {
                name: 'Editor Content',
                route: '/language/editor-content',
                indent: true,
              },
              {
                name: 'Fonts',
                route: '/language/fonts',
                indent: true,
              },
              {
                name: 'Headings & Body Text',
                route: '/language/text',
                indent: true,
              }
            ]
          }
        ],
        basicComponents: [],
        shownNode: null, // Used for dropdown menus, could be a seperate component
      }
    },

    computed: {
      currentNodes() {
        const sections = {
          'components': this.componentNodes,
          'foundations': this.foundationNodes,
          'language': this.languageNodes,
        };
        return [].concat(this.coreNodes, sections[this.currentSection] || []);
      },

      componentNodes() {
        return [
          {
            heading: 'Component Library',
            divider: true,
            items: [
              {
                name: 'All Components',
                route: '/components/list',
              },
              {
                name: 'Atoms',
                route: '/components/list/atoms',
              },
              {
                name: 'Molecules',
                route: '/components/list/molecules',
              },
              {
                name: 'Organisms',
                route: '/components/list/organisms',
              }
            ],
          },
          ...this.getFamilyNodes(),
        ]
      },

      componentsLoaded() {
        return this.$store.state.componentsLoaded || this.basicComponents.length;
      },

      classNames() {
        return {
          'sg-side-nav': true,
          'sg-side-nav--open': this.show,
        }
      },

      showSpinner() {
        return this.currentSection === 'components' && !this.componentsLoaded;
      }
    },

    watch: {
      $route(to, from) {
        if(to.path.split('/')[1] !== from.path.split('/')[1]) {
          this.shownNode = null;
          this.setCurrentSection();
        }
      },

      '$store.state.components'() {
        this.shownNode = null;
        this.setCurrentSection();
      },

      basicComponents() {
        this.shownNode = null;
        this.setCurrentSection();
      },
    },

    mounted() {
      const { path } = this.$router.currentRoute;
      const section = path.split('/')[1];
      if (section === 'components' && !this.componentsLoaded) {
        this.$fabric.getBasicComponents().then((res) => {
          this.basicComponents = res.data
        });
      }
      this.setCurrentSection();
    },

    methods: {
      /**
       * Get component metadata grouped by family.
       * @returns {object}
       *   The component metadata.
       */
      getFamilies() {
        const components = this.$store.state.componentsLoaded
          ? this.$store.state.components
          : this.basicComponents;
        return Object.values(components).reduce((obj, component) => {
          obj[component.metadata.family] = obj[component.metadata.family] || [];
          obj[component.metadata.family].push({
            name: titleCase(component.metadata.name),
            route: component.route,
            indent: true,
          });
          return obj;
        }, {});
      },

      /**
       * Get the nodes for the component menu.
       * @returns {object}
       *   The menu nodes.
       */
      getFamilyNodes() {
        const families = this.getFamilies();
        return Object.keys(families).filter((name) => {
          return name.toLowerCase() !== 'todos';
        }).map((name) => {
          return {
            subheading: name,
            items: families[name],
            // hideItems: true,
          };
        });
      },

      /**
       * Set menu items based on the current route.
       */
      setCurrentSection() {
        const { path } = this.$router.currentRoute;
        this.currentSection = path.split('/')[1];
      },

      /**
       * Handle item click.
       */
      onItemClick() {
        this.$emit('item-click');
      },

      /**
       * Toggle visibility of a node for dropdown menus.
       */
      toggleNodeVisibility(node) {
        if (this.shownNode === node) {
          this.shownNode = null;
        } else {
          this.shownNode = node;
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .sg-side-nav {
    display: none;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: $color--base--grey;
    color: $color--base--white;
    margin: 0;
    padding-top: spacing-unit(sm);
    padding-bottom: spacing-unit(sm);
    overflow-wrap: break-word;
    transition: all 200ms;
    border-top: 1px solid rgba($color--base--white, .2);

    &--open {
      display: block;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      overflow-y: auto;
      z-index: 1;

      .sg-side-nav__menu {
        opacity: 1;
      }
    }

    &__menu {
      width: 100%;
      opacity: 0;
      transition: all 200ms;
    }

    &__list {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    &__headings {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__heading,
    &__subheading {
      padding: spacing-unit(xs) spacing-unit(sm);
      margin: 0;
      width: 100%;
    }

    &__subheading {
      font-weight: 600;
    }

    &__divider {
      margin-top: spacing-unit(sm);
      margin-bottom: spacing-unit(sm);
      border-bottom: 1px solid rgba($color--base--white, 0.2);
    }

    &__toggle {
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;

      &:hover,
      &:active,
      &:focus {
        background: rgba($color--highlight--dark, 0.4);
      }
    }

    &__item {
      &--indent {
        .sg-side-nav__link {
          padding-left: spacing-unit(lg);
        }
      }
    }

    &__link {
      position: relative;
      color: $color--background--light;
      display: block;
      padding: spacing-unit(xs) spacing-unit(sm);
      transition: background transition-speed(fast) linear;

      &:hover,
      &:active,
      &:focus {
        background: $color--highlight--dark;
      }

      &.nuxt-link-exact-active {
        background-color: $color--clickable--regular;
        cursor: default;
        padding-right: spacing-unit(sm);

        &:after {
          content: '〉';
          color: rgba($color--base--white, .3);
          width: spacing-unit(xs);
          position: absolute;
          right: spacing-unit(xxs);
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }

    &__link,
    &__subheading {
      font-size: .85rem;
      line-height: 1.3;
    }

    &__spinner {
      display: flex;
      justify-content: center;
    }
  }

  @media(min-width: map-get($grid-breakpoints, md)) {
    .sg-side-nav {
      display: block;

      &--open {
        position: relative;
        overflow: hidden;
      }

      &__menu {
        opacity: 1;
      }
    }
  }
</style>
