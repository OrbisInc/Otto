export const state = () => ({
  all: []
});

export const mutations = {
  set(state, alerts) {
    state.all = alerts;
  },

  created(state, alert) {
    state.all.push(alert);
  },

  updated(state, alert) {

  },

  destroyed(state, alert) {

  }
};
