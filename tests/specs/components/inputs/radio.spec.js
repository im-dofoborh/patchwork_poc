import { mount, createLocalVue } from '@vue/test-utils';
import RadioInput from '~/components/inputs/Radio';

describe('RadioInput component', () => {
  let localVue = null;
  let wrapper = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('radio-input', RadioInput);
    wrapper = mount(RadioInput, {
      localVue,
      propsData: {
        label: 'foo',
        name: 'bar',
        id: 'baz',
      }
    });
  })

  it('renders default variant', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('emits input event on click', () => {
    const input = wrapper.find('input');
    input.trigger('click');
    expect(wrapper.emitted().input).toBeTruthy();
  });
});
