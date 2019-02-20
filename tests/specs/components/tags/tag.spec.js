import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Tag from '~/components/Tag';

describe('Tag component', () => {
  let router = null;
  let localVue = null;
  let wrapper = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('tag', Tag);
    localVue.use(VueRouter);
    router = new VueRouter();
    wrapper = mount(Tag, {
      localVue,
      router,
      propsData: {
        tag: 'Foo',
      }
    })
  })

  it('renders default variant', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
