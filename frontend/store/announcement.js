export const state = () => ({
  all: []
});

export const mutations = {
  set(state, announcements) {
    state.all = announcements;
  },

  created(state, announcement) {
    state.all.push(announcement);
  },

  updated(state, announcement) {

  },

  destroyed(state, announcement) {

  }
};
