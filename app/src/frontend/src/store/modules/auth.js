const state = {
  user: null,
};
const getters = {
  isAuthenticated: (state) => !!state.user,
  getAuthUser: (state) => state.user,
  getUsername: (state) => state.user.user.firstname,
  getUserRole: (state) => state.user.user.role,
};
const actions = {
  Login({ commit }, user) {
    commit("setUser", user);
  },
  updateUser({ commit }, user) {
    commit("setUser", user);
  },
  async Logout({ commit }) {
    let user = null;
    commit("Logout", user);
  },
};
const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  Logout(state) {
    state.user = null;
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
