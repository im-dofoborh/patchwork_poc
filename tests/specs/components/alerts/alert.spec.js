import { mount, createLocalVue } from '@vue/test-utils';
import Alert from '~/components/Alert';

describe('Alert component', () => {
  let localVue = null;
  let wrapper = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('alert', Alert);
    wrapper = mount(Alert, {
      localVue,
      propsData: {
        message: 'Look out, this is an alert',
      }
    })
  })

  it('renders default variant', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders alternative type variant', () => {
    wrapper.setProps({
      type: 'error',
    })
    expect(wrapper.html()).toMatchSnapshot();
  });
});
