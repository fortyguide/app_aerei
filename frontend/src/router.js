import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Flights from './views/Flights.vue';
import Tickets from './views/Tickets.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/flights',
    name: 'flights',
    component: Flights
  },
  {
    path: '/tickets',
    name: 'tickets',
    component: Tickets
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;