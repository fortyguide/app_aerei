import Vue from 'vue';
import Vuex from 'vuex';
import authService from '../services/authService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearAuthData(state) {
      state.user = null;
      state.token = '';
      localStorage.removeItem('token');
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await authService.login(credentials);
        commit('setToken', response.token);
        commit('setUser', response.user);
      } catch (error) {
        throw error;
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await authService.register(userData);
        commit('setToken', response.token);
        commit('setUser', response.user);
      } catch (error) {
        throw error;
      }
    },
    logout({ commit }) {
      commit('clearAuthData');
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    user(state) {
      return state.user;
    }
  }
});