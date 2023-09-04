import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect:'/dashBoard',
      component: Layout,
      children: [
        {
          path:'/dashBoard',
          name:'dashBoard',
          component: () => import('@v/DashBoard/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@v/LoginPage/index.vue')
    },
    {
      path: '/:pathMath(.*)',
      name: 'notfound',
      component: () => import('@v/NotFound/index.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@v/RegisterPage/index.vue')
    }
  ]
})

export default router
