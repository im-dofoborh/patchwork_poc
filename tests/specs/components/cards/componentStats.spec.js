import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import ComponentStatsCard from '~/components/cards/ComponentStats';

describe('ComponentStatsCard component', () => {
  let $stats = {
    getComponentStats() {
      return {
        componentCount: 1,
        variantCount: 2,
        atomCount: 3,
        moleculeCount: 4,
        organismCount: 5,
        templateCount: 6,
        todoCount: 7,
        mostUsedTags: {
          foo: 12,
          bar: 24,
        },
        leastUsedTags: {
          foo: 48,
          bar: 96,
        }
      }
    }
  };

  let localVue = null;
  let wrapper = null;
  let router = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('component-stats-card', ComponentStatsCard);
    localVue.use(VueRouter);
    router = new VueRouter();
    wrapper = mount(ComponentStatsCard, {
      localVue,
      router,
      mocks: {
        $stats,
      }
    });
  })

  it('renders default variant', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
