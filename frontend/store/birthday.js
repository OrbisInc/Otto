export const state = () => ({
    all: []
  });
  
  export const mutations = {
    set(state, birthdays) {
      state.all = birthdays;
    },
  
    created(state, birthday) {
      state.all.push(birthday);
    },
  
    updated(state, birthday) {
    },
  
    destroyed(state, birthday) {
  
    }
  };
  