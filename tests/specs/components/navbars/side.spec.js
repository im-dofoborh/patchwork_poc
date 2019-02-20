import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import SideNavbar from '~/components/navbars/Side';

describe('SideNavbar component', () => {
  let localVue = null;
  let wrapper = null;
  let router = null;
  let store = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('side-navbar', SideNavbar);
    localVue.use(VueRouter);
    router = new VueRouter();
    localVue.use(Vuex);
    store = new Vuex.Store({
      state: {
        componentsLoaded: false,
        components: [],
      },
    });
    wrapper = mount(SideNavbar, {
      localVue,
      router,
      store,
    });
  })

  it('renders default variant', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
