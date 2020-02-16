import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: localStorage.getItem('access_token') || null,
    configHeader: {
      'Authorization': `Bearer ${localStorage.getItem('access_token') || null}`,
      'Accept': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    userId: null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    monthNames : ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
      state.user = userData.user
    },
    storeUser (state, user) {
      state.user = user
    }
  },
  actions: {
    signup ({commit}, authData) {  // eslint-disable-line no-unused-vars
      axios
        .post('/register', {
          email: authData.email,
          password: authData.password
        })
        .then(res => {
          if (res.status) {
            window.location = '/login';
          }
        })
        .catch(error => console.log(error)) // eslint-disable-line no-console
    },
    login ({commit}, authData) {
      axios 
        .post('/login', {
          email: authData.email,
          password: authData.password
        })
        .then(res => {
          commit('authUser', {
            token: res.data.token,
            userId: res.data.user._id,
            user: res.data.user
          })
          localStorage.setItem('access_token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.user))
          if (res.data.token !== null) {
            window.location = '/atec';
          }
        })
        .catch(error => console.log(error)) // eslint-disable-line no-console
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    userKids (state) {
      if (state.user !== null) {        
        return state.user.kids;
      } else {
        return [];
      }
    },
    userEmail (state) {
      if (state.user !== null) {
        const userName = state.user.email.split('@');
        return userName[0];
      } else {
        return "";
      }
    },
    isAuth (state) {
      return state.user !== null ? true : false
    },
    token (state) {
      return state.idToken
    },
    monthNames (state) {
      return state.monthNames;
    },
    configHeader (state) {
      return state.configHeader;
    }
  }
})