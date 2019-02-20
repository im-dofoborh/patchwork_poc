import { mount, createLocalVue } from '@vue/test-utils';
import Spinner from '~/components/Spinner';

describe('Spinner component', () => {
  let localVue = null;
  let wrapper = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('spinner', Spinner);
    wrapper = mount(Spinner, {
      localVue,
    })
  })

  it('renders default variant', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders small variant', () => {
    wrapper.setProps({
      size: 'sm',
    })
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders large variant', () => {
    wrapper.setProps({
      size: 'lg',
    })
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders medium variant as fallback', () => {
    wrapper.setProps({
      size: 'some-invalid-size',
    })
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders light variant', () => {
    wrapper.setProps({
      light: true,
    })
    expect(wrapper.html()).toMatchSnapshot();
  });
});
