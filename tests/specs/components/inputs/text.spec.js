
import { mount, createLocalVue } from '@vue/test-utils';
import TextInput from '~/components/inputs/Text';

describe('TextInput component', () => {
  let localVue = null;
  let wrapper = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('text-input', TextInput);
    wrapper = mount(TextInput, {
      localVue
    });
  })

  it('renders default variant', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('emits input event on input', () => {
    const input = wrapper.find('input');
    const value = 'foo';
    input.element.value = value;
    input.trigger('input');
    expect(wrapper.emitted().input[0]).toEqual([value]);
  });
});
