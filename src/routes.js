import Dashboard from './components/Dashboard.vue';
import AtecIndex from './components/atec/Index.vue';
import Login from './components/auth/Login.vue';

export const routes = [
  { path: '/', component: Dashboard },
  { path: '/atec', component: AtecIndex },
  { path: '/login', component: Login },

];
