import { mount, createLocalVue } from '@vue/test-utils';
import ThemedIframe from '~/components/ThemedIframe';
import { theme } from '~/tests/fixtures';

describe('ContentEditor component', () => {
  let localVue = null;
  let wrapper = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('themed-iframe', ThemedIframe);
    wrapper = mount(ThemedIframe, {
      localVue,
      propsData: {
        theme,
      }
    });
  })

  it('renders default variant', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders with markup', () => {
    wrapper.setProps({
      markup: '<div class="foo">My Markup</div>',
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders small variant', () => {
    wrapper.setProps({
      size: 'sm',
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders unwrapped variant', () => {
    wrapper.setProps({
      wrapInDocument: false,
      markup: '<div class="foo">My Markup</div>',
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
