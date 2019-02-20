import { mount, createLocalVue } from '@vue/test-utils';
import MockGrid from '~/components/grids/Mock';

describe('MockGrid component', () => {
  let localVue = null;
  let wrapper = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('mock-grid', MockGrid);
    wrapper = mount(MockGrid, {
      localVue,
      propsData: {
        width: 100,
      }
    })
  })

  it('renders default variant', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders with alternative columns', () => {
    wrapper.setProps({
      columns: 6,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders fluid and fixed variant', () => {
    wrapper.setProps({
      fluidText: 'Foo',
      fixedText: 'Bar',
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
