import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import AtomicityIcon from '~/components/icons/Atomicity';

describe('AtomicityIcon component', () => {
  let router = null;
  let localVue = null;
  let wrapper = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('atomicity-icon', AtomicityIcon);
    localVue.use(VueRouter);
    router = new VueRouter();
    wrapper = mount(AtomicityIcon, {
      localVue,
      router,
    });
  })

  it('renders default variant', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('uses fallback colour for invalid atomicity', () => {
    wrapper.setProps({
      atomicity: 'foo',
    })
    expect(wrapper.html()).toMatchSnapshot();
  });
});
