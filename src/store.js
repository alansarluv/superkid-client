import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    }
  },
  actions: {
    login ({commit}, authData) {  // eslint-disable-line no-unused-vars
      axios 
        .post('http://superkid.id:3000/login', {
          email: authData.email,
          password: authData.password
        })
        .then(res => {
          console.log("test:", res) // eslint-disable-line no-console
          commit('authUser', {
            token: res.data.token,
            userId: res.data.user._id
          })
        })
        .catch(error => console.log(error)) // eslint-disable-line no-console
    }
  },
  getters: {

  }
})