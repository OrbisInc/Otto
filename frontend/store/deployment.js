export const state = () => ({
  all: []
});

export const mutations = {
  set(state, deployments) {
    state.all = deployments;
  },

  created(state, deployment) {
    state.all.push(deployment);
  },

  updated(state, deployment) {

  },

  destroyed(state, deployment) {

  }
};
