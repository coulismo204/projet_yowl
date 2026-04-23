import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/addcom',
      name: 'addcom',
      component: () => import('../views/AddComView.vue'),
    },
    {
      path: '/details/:id',      // path: '/details/:id',
      name: 'details',
      component: () => import('../views/Details.vue'),
    },     
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/login.vue'),
    },
    {
      path: '/dashboardadmin',
      name: 'dashboardadmin',
      component: () => import('../views/DashboardAdmin.vue'),
    },
    {
      path: '/dashboardusers',
      name: 'dashboardusers',
      component: () => import('../views/DashboardUsers.vue'),
    },
  ],
})

export default router
