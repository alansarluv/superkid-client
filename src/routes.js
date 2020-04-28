import Dashboard from './components/Dashboard.vue';
import Login from './components/auth/Login.vue';
import Reset from './components/auth/Reset.vue';
import Signup from './components/auth/Signup.vue';
import NewPassword from './components/auth/NewPassword.vue';

// Free Menu
import Menu from './components/menu/Index.vue';
import SpeechHelper from './components/menu/SpeechHelper.vue';
import ColorPlay from './components/menu/ColorPlay.vue';
import BreakoutGame from './components/menu/Breakout.vue';

// Authenticated Menu
import AtecIndex from './components/atec/Index.vue';
import AtecForm from './components/atec/Form.vue';
import AtecReport from './components/atec/Report.vue';
import AtecFlash from './components/atec/Flash.vue';
import AtecDetail from './components/atec/Detail.vue';
import AtecChart from './components/atec/Chart.vue';
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
    props: true,
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
  { 
    path: '/atec/flash', 
    name: 'atec-flash',
    component: AtecFlash, 
    props: true,
    beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        next('/login')
      }
    }
  },
  { 
    path: '/atec/report/detail', 
    name: 'atec-detail',
    component: AtecDetail, 
    props: true,
    beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        next('/login')
      }
    }
  },
  { 
    path: '/atec/chart', 
    name: 'atec-chart',
    component: AtecChart, 
    props: true,
    beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        next('/login')
      }
    }
  },
  // Authentication login
  { path: '/login', component: Login },
  { path: '/reset', component: Reset },
  { path: '/signup', component: Signup },
  { path: '/new-password', component: NewPassword },

  // Free menu
  { path: '/menu', component: Menu },
  { path: '/speech-helper', component: SpeechHelper },
  { path: '/color-play', component: ColorPlay },
  { path: '/breakout-game', component: BreakoutGame },

];
