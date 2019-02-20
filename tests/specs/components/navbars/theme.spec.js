import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ThemeNavbar from '~/components/navbars/Theme';
import { site } from '~/tests/fixtures';

describe('ThemeNavbar component', () => {
  let localVue = null;
  let wrapper = null;
  let store = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('theme-navbar', ThemeNavbar);
    localVue.use(Vuex);
    store = new Vuex.Store({
      state: {
        sites: [
          site
        ],
      },
    });
    wrapper = mount(ThemeNavbar, {
      localVue,
      store,
    });
  })

  it('renders default variant', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
