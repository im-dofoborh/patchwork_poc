import { mount, createLocalVue } from '@vue/test-utils';
import SampleGrid from '~/components/grids/Sample';

describe('SampleGrid component', () => {
  let localVue = null;
  let wrapper = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('sample-grid', SampleGrid);
    wrapper = mount(SampleGrid, {
      localVue,
      slots: {
        default: '<div id="some-component" />',
      }
    })
  })

  it('renders default variant', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
