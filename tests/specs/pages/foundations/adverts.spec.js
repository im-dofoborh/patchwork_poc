import { mount, createLocalVue } from '@vue/test-utils';
import AdvertsPage from '~/pages/foundations/adverts';

describe('Adverts page', () => {
  let localVue = null;
  let wrapper = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('adverts-page', AdvertsPage);
    wrapper = mount(AdvertsPage, {
      localVue,
    });
  })

  it('renders', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
