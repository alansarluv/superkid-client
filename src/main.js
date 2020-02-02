import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import { routes } from './routes'

import axios from 'axios'
import store from './store'

axios.defaults.baseURL = 'http://superkid.id:3000'
// axios.defaults.headers.common['Authorization'] = 'dasdasds'
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
