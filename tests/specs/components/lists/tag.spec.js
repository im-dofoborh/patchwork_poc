import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import TagList from '~/components/lists/Tag';

describe('TagList component', () => {
  let router = null;
  let localVue = null;
  let wrapper = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('tag-list', TagList);
    localVue.use(VueRouter);
    router = new VueRouter();
    wrapper = mount(TagList, {
      localVue,
      router,
    });
  })

  it('renders default variant', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders with multiple tags', () => {
    wrapper.setProps({
      tags: [
        'foo',
        'bar',
        'baz',
      ]
    })
    expect(wrapper.html()).toMatchSnapshot();
  });
});
