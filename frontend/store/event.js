export const state = () => ({
    all: []
  });
  
  export const mutations = {
    set(state, events) {
      state.all = events;
    },
  
    created(state, event) {
      state.all.push(event);
    },
  
    updated(state, event) {
  
    },
  
    destroyed(state, event) {
  
    }
  };
  