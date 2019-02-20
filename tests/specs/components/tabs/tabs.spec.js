import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Tabs from '~/components/Tabs';
import { editorContent } from '~/tests/fixtures';
import { site } from '~/tests/fixtures';

describe('Tabs component', () => {
  let localVue = null;
  let wrapper = null;
  let store = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('tabs', Tabs);
    localVue.use(Vuex);
    store = new Vuex.Store({
      state: {
        currentSite: site,
      },
    });
    wrapper = shallowMount(Tabs, {
      localVue,
      store,
    });
  })

  it('renders default variant', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders with title', () => {
    wrapper.setProps({
      title: 'Slate',
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders with raw tab', () => {
    wrapper.setProps({
      tabs: {
        foo: {
          type: 'raw',
          value: '<div class="bar">Baz</div>',
        }
      }
    })
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders with variables tab', () => {
    wrapper.setProps({
      tabs: {
        foo: {
          type: 'variable',
          value: editorContent,
        }
      }
    })
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders with themed iFrame tab', () => {
    wrapper.setProps({
      tabs: {
        foo: {
          type: 'themed',
          value: '<div class="bar">Baz</div>',
        }
      }
    })
    expect(wrapper.html()).toMatchSnapshot();
  });
});
