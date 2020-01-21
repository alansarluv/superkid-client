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
    
  },
  actions: {
    login ({commit}, authData) {  // eslint-disable-line no-unused-vars
      axios 
        .post('http://superkid.id:3000/login', {
          email: authData.email,
          password: authData.password
        })
        .then(res => console.log("test:", res))  // eslint-disable-line no-console
        .catch(error => console.log(error)) // eslint-disable-line no-console
    }
  },
  getters: {

  }
})