export const state = () => ({
    all: []
  });
  
  export const mutations = {
    set(state, vacations) {
      state.all = vacations;
    },
  
    created(state, vacation) {
      state.all.push(vacation);
    },
  
    updated(state, vacation) {
  
    },
  
    destroyed(state, vacation) {
  
    }
  };
  