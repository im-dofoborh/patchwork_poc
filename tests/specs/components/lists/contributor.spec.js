import { mount, createLocalVue } from '@vue/test-utils';
import ContributorList from '~/components/lists/Contributor';

describe('ContributorList component', () => {
  let localVue = null;
  let wrapper = null;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.component('contributor-list', ContributorList);
    wrapper = mount(ContributorList, {
      localVue,
    });
  })

  describe('renders', () => {
    it('default variant', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('with contributors', () => {
      wrapper.setData({
        contributors: [
          {
            id: 'foo',
            login: 'Foo',
            html_url: 'https://github.com/foo',
            avatar_url: 'https://github.com/images/foo.png',
          },
          {
            id: 'bar',
            login: 'Bar',
            html_url: 'https://github.com/bar',
            avatar_url: 'https://github.com/images/bar.png',
          }
        ]
      })
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('getUniqueAuthors', () => {
    it('returns unique authors', () => {
      const author = {
        id: 'foo',
      };
      const commits = [
        {
          author,
        },
        {
          author,
        },
      ];
      expect(wrapper.vm.getUniqueAuthors(commits)).toEqual([author]);
    });

    it('ignores commits without authors', () => {
      const commits = [
        {
          sha: '123',
        },
      ];
      expect(wrapper.vm.getUniqueAuthors(commits)).toEqual([]);
    });
  });
});
