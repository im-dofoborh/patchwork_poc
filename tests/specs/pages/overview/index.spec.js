import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import OverviewPage from '~/pages/overview';

describe('Overview page', () => {
  let localVue = null;
  let wrapper = null;
  let router = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('overview-page', OverviewPage);
    localVue.use(VueRouter);
    router = new VueRouter();
    wrapper = mount(OverviewPage, {
      localVue,
      router,
    });
  })

  it('renders', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
