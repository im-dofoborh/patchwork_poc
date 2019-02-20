import { mount, createLocalVue } from '@vue/test-utils';
import MenuIcon from '~/components/icons/Menu';

describe('MenuIcon component', () => {
  let localVue = null;
  let wrapper = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('menu-icon', MenuIcon);
    wrapper = mount(MenuIcon, {
      localVue,
    });
  })

  it('renders default variant', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders open variant', () => {
    wrapper.setProps({
      open: true,
    })
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('emits click event on click', () => {
    wrapper.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  });
});
