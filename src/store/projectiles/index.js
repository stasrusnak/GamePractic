import {PROJECTILES} from '../mutations';

const state = {
  projectiles: [],
};

const getters = {
  projectiles: state => state.projectiles,
};

const mutations = {
  [PROJECTILES](state, projectiles) {
    if (projectiles) {
      state.projectiles.push(projectiles)
    }
  },
};

export default {
  state,
  getters,
  mutations,
};
