import { mount, createLocalVue } from '@vue/test-utils';
import LanguageIndexPage from '~/pages/language/index';

describe('Language index page', () => {
  let localVue = null;
  let wrapper = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('language-index-page', LanguageIndexPage);
    wrapper = mount(LanguageIndexPage, {
      localVue,
    });
  })

  it('renders', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
