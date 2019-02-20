import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import IconsPage from '~/pages/language/icons';
import { site, theme, icons } from '~/tests/fixtures';

describe('Icons page', () => {
  let $fabric = {
    getIcons: async () => {
      return {
        data: icons,
      }
    }
  };

  let localVue = null;
  let wrapper = null;
  let store = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('icons-page', IconsPage);
    localVue.use(Vuex);
    store = new Vuex.Store({
      state: {
        currentSite: site,
        currentTheme: theme,
      },
    });
    wrapper = mount(IconsPage, {
      localVue,
      store,
      mocks: {
        $fabric
      },
    });
  })

  it('renders', async () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('loads asyncData', async () => {
    const app = wrapper.vm;
    const asyncData = await wrapper.vm.$options.asyncData({ app });
    expect(asyncData).toEqual({ icons });
  });
});
