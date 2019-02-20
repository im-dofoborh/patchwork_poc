import { mount, createLocalVue } from '@vue/test-utils';
import FoundationsIndexPage from '~/pages/foundations/index';

describe('Foundations index page', () => {
  let localVue = null;
  let wrapper = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('foundations-index-page', FoundationsIndexPage);
    wrapper = mount(FoundationsIndexPage, {
      localVue,
    });
  })

  it('renders', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
