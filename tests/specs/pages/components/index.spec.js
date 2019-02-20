import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import ComponentsIndexPage from '~/pages/components/index';

describe('Components index page', () => {
  let localVue = null;
  let wrapper = null;
  let router = null;
  let store = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('components-index-page', ComponentsIndexPage);
    localVue.use(VueRouter);
    router = new VueRouter();
    localVue.use(Vuex);
    store = new Vuex.Store({
      state: {
        componentsLoaded: false,
      },
    });
    wrapper = mount(ComponentsIndexPage, {
      localVue,
      router,
      store,
      stubs: [
        'component-stats-card'
      ],
    });
  })

  it('renders', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders stats when components loaded', () => {
    store.state.componentsLoaded = true;
    expect(wrapper.html()).toMatchSnapshot();
  });
});
