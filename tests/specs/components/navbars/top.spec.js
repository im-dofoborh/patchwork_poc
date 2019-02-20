import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import TopNavbar from '~/components/navbars/Top';

describe('TopNavbar component', () => {
  let localVue = null;
  let wrapper = null;
  let router = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('top-navbar', TopNavbar);
    localVue.use(VueRouter);
    router = new VueRouter();
    wrapper = mount(TopNavbar, {
      localVue,
      router,
    });
  })

  it('renders default variant', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders open variant', () => {
    wrapper.setProps({
      menuOpen: true,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
