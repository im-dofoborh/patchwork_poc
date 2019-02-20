import { mount, createLocalVue } from '@vue/test-utils';
import LetterIcon from '~/components/icons/Letter';

describe('LetterIcon component', () => {
  let localVue = null;
  let wrapper = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('letter-icon', LetterIcon);
    wrapper = mount(LetterIcon, {
      localVue,
    });
  })

  it('renders default variant', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders alternative size and colour variant', () => {
    wrapper.setProps({
      size: 100,
      colour: '#fff',
      textColour: '#000',
      word: 'Foo',
    })
    expect(wrapper.html()).toMatchSnapshot();
  });
});
