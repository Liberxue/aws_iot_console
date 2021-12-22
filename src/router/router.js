import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import ThermostatCollection from '@/components/dashboards/ThermostatCollection.vue';
import Account from '@/components/users/Account.vue';
import NotFound from '../views/NotFound.vue';
import DashboardEmbed from '@/components/dashboards/DashboardEmbed.vue';
import AuthComponent from '@/components/users/Auth.vue';
import { Auth } from 'aws-amplify';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboards',
    component: ThermostatCollection,
    name: 'ThermostatCollection',
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboards/:id',
    name: 'DashboardEmbed',
    component: DashboardEmbed,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/auth',
    name: 'AuthComponent',
    component: AuthComponent
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: { requiresAuth: true }
  },
  {
    path: '/:notFound(.*)',
    alias: '/404',
    name: 'NotFound',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: '',
  base: process.env.BASE_URL,
  routes
});

// called right before navigation is confirmed
// if user is NOT authenticated, redirect to /auth
router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    Auth.currentAuthenticatedUser().then(() => {
      next();
    }).catch(() => {
      next({
        path: '/auth'
      });
    });
  }
  next();
});

export default router;
