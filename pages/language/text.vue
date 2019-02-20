<template>
  <div class="sg-content editor-content container">
    <div class="sg-content__header">
      <h1 class="heading-1">
        {{ title }}
      </h1>
    </div>

    <tabs
      v-for="(style, i) in typography"
      :key="i"
      :title="style.name"
      :tabs="tabs[i]" />

  </div>
</template>

<script>
  import dedent from 'dedent';
  import Tabs from '~/components/Tabs';

  export default {
    components: {
      Tabs,
    },

    async asyncData({ app }) {
      const res = await app.$fabric.getTypography();
      return {
        typography: res.data,
      };
    },

    data() {
      return {
        title: 'Headings & Body Text',
      }
    },

    head() {
      return {
        title: this.title,
      }
    },

    computed: {
      tabs() {
        return this.typography.map((style) => {
          const mockString = this.getMockString(style);
          return {
            Visual: {
              type: 'themed',
              value: mockString,
            },
            Markup: {
              type: 'html',
              value: mockString,
              onInput(tabs) {
                tabs.Visual.value = tabs.Markup.value
              }
            },
            Variables: {
              type: 'variable',
              value: style.variables,
            }
          }
        });
      }
    },

    methods: {
      getMockString(style) {
        return dedent`
          <${style.mockElement} class="${style.class}">
            ${style.mockData}
          </${style.mockElement}>
        `;
      }
    }
  }
</script>
