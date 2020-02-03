import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: localStorage.getItem('access_token') || null,
    userId: null,
    user: JSON.parse(localStorage.getItem('user')) || null
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
    login ({commit}, authData) {  // eslint-disable-line no-unused-vars
      axios 
        .post('/login', {
          email: authData.email,
          password: authData.password
        })
        .then(res => {
          console.log("test:", res) // eslint-disable-line no-console
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
    }
  }
})