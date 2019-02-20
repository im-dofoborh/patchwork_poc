import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import GridPage from '~/pages/foundations/grid';
import { site } from '~/tests/fixtures';

describe('Grid page', () => {
  let localVue = null;
  let wrapper = null;
  let store = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('grid-page', GridPage);
    localVue.use(Vuex);
    store = new Vuex.Store({
      state: {
        currentSite: site,
      },
    });
    wrapper = mount(GridPage, {
      localVue,
      store,
    });
  })

  it('renders', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
