import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import HomePage from '~/pages/index';

describe('Home page', () => {
  let localVue = null;
  let wrapper = null;
  let router = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('home-page', HomePage);
    localVue.use(VueRouter);
    router = new VueRouter();
    wrapper = mount(HomePage, {
      localVue,
      router,
    });
  })

  it('renders', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
