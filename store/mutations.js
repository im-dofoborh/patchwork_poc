/**
 * Vuex mutations.
 */
export default {
  SET_ITEM: (state, { key, value }) => {
    state[key] = value;
  },

  ADD_ITEM: (state, { key, id, value }) => {
    state[key][id] = value;
  },
}
