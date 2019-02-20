import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import ComponentList from '~/components/lists/Component';

describe('ComponentList component', () => {
  let router = null;
  let localVue = null;
  let wrapper = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('component-list', ComponentList);
    localVue.use(VueRouter);
    router = new VueRouter();
    wrapper = mount(ComponentList, {
      localVue,
      router,
    });
  })

  it('renders default variant', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders with multiple components', () => {
    wrapper.setProps({
      components: [
        {
          route: '/family1/name1',
          metadata: {
            atomicity: 'atom',
            description: 'This is a component',
            tags: [
              'Tag 1',
              'Tag 2'
            ]
          }
        },
        {
          route: '/family2/name2',
          metadata: {
            atomicity: 'molecule',
            description: 'This is another component',
            tags: [
              'Tag 3',
              'Tag 4'
            ]
          }
        }
      ]
    })
    expect(wrapper.html()).toMatchSnapshot();
  });
});
