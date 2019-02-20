import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueCodemirror from 'vue-codemirror';
import CodeEditor from '~/components/editors/Code';

describe('CodeEditor component', () => {
  let localVue = null;
  let wrapper = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('code-editor', CodeEditor);
    localVue.use(VueCodemirror);
    wrapper = shallowMount(CodeEditor, {
      localVue,
    });
  })

  it('renders default variant', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders disabled variant', () => {
    wrapper.setProps({
      disabled: true,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
