import { createRouter, createWebHistory } from 'vue-router'
import  Layout from  '@/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path:'/',
      component: Layout
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@v/LoginPage/index.vue')
    }
  ]
})

export default router
