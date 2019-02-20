import { mount, createLocalVue } from '@vue/test-utils';
import LetterGridCard from '~/components/cards/LetterGrid';

describe('LetterGridCard component', () => {
  let localVue = null;
  let wrapper = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('letter-grid-card', LetterGridCard);
    wrapper = mount(LetterGridCard, {
      localVue,
    });
  })

  it('renders default variant', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders exploded variant', () => {
    wrapper.setProps({ explode: true });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders with alternative word', () => {
    wrapper.setProps({
      word: 'Foobar'
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders with alternative size', () => {
    wrapper.setProps({
      size: 400,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
