import mutations from '~/store/mutations';

describe('Store mutations', () => {
  it('sets item', () => {
    const state = {};
    const key = 'foo';
    const value = 'bar';
    mutations.SET_ITEM(state, { key, value });
    expect(state[key]).toEqual(value);
  });

  it('adds item', () => {
    const state = {};
    const key = 'foo';
    const value = 'bar';
    const id = 'baz';
    state[key] = {};
    mutations.ADD_ITEM(state, { key, id, value });
    expect(state[key][id]).toEqual(value);
  });
});
