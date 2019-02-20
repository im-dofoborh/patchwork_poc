import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ColoursPage from '~/pages/language/colours';
import { site, theme, colours } from '~/tests/fixtures';

describe('Colours page', () => {
  let $fabric = {
    getColours: async () => {
      return {
        data: colours,
      }
    }
  };

  let localVue = null;
  let wrapper = null;
  let store = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('colours-page', ColoursPage);
    localVue.use(Vuex);
    store = new Vuex.Store({
      state: {
        currentSite: site,
        currentTheme: theme,
      },
    });
    wrapper = mount(ColoursPage, {
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
    expect(asyncData).toEqual({ colours });
  });

  it('renders with loaded data', () => {
    wrapper = mount(ColoursPage, {
      localVue,
      store,
      data() {
        return {
          colours,
        }
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
