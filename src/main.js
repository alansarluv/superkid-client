import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import { routes } from './routes'

import axios from 'axios'
import store from './store'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then(function(){
      console.log("yihaa service worker registered"); // eslint-disable-line no-console
    })
}

axios.defaults.baseURL = 'https://api.superkid.id'
// axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODA3NDU1ODYsImV4cCI6MTU4MDkxODM4NiwiaXNzIjoiaHR0cHM6Ly9zY290Y2guaW8ifQ.DXbDvUWe-jhX3aB3gRiAXrDLlYb9izsICGhvfm-xoIE'
// axios.defaults.headers.get['Accepts'] = 'application/json'

Vue.config.productionTip = false
Vue.use( VueRouter );

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
