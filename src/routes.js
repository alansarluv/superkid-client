import Dashboard from './components/Dashboard.vue';
import Login from './components/auth/Login.vue';
import Reset from './components/auth/Reset.vue';
import Signup from './components/auth/Signup.vue';
import NewPassword from './components/auth/NewPassword.vue';
import AtecIndex from './components/atec/Index.vue';
import AtecForm from './components/atec/Form.vue';
import AtecReport from './components/atec/Report.vue';
import store from './store'

export const routes = [
  { path: '/', component: Dashboard },
  { 
    path: '/atec', 
    component: AtecIndex,
    beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        next('/login')
      }
    }
  },
  { 
    path: '/atec/form', 
    component: AtecForm ,
    beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        next('/login')
      }
    }
  },
  { 
    path: '/atec/report', 
    component: AtecReport, 
    beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        next('/login')
      }
    }
  },
  { path: '/login', component: Login },
  { path: '/reset', component: Reset },
  { path: '/signup', component: Signup },
  { path: '/new-password', component: NewPassword }
];
