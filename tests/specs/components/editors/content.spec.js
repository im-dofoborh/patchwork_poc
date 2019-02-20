import { mount, createLocalVue } from '@vue/test-utils';
import ContentEditor from '~/components/editors/Content';

describe('ContentEditor component', () => {
  let localVue = null;
  let wrapper = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('content-editor', ContentEditor);
    wrapper = mount(ContentEditor, {
      localVue,
      propsData: {
        path: 'README.md',
      }
    });
  })

  it('renders default variant', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders with content', () => {
    wrapper.setProps({
      content: 'Foo',
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
