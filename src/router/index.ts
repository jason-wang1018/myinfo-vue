import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect: '/dashBoard',
      component: Layout,
      children: [
        //仪表盘
        {
          path: '/dashBoard',
          name: 'dashBoard',
          meta:{
              nav:[
                {
                  path:'/',
                  name:'首页'
                },
                {
                  name:'仪表盘'
                },
              ]
          },
          component: () => import('@v/DashBoard/index.vue')
        },
        //地图
        {
          path: '/map',
          name: 'map',
          meta:{
            nav:[
              {
                path:'/',
                name:'首页'
              },
              {
                name:'高德地图'
              },
            ]
        },
          component: () => import('@v/MapPage/index.vue')
        },
      ]
    },
    //大屏
    {
      path: '/largeScreen',
      name: 'largeScreen',
      component: () => import('@v/LargeScreen/index.vue')
    },
    //登陆
    {
      path: '/login',
      name: 'login',
      component: () => import('@v/LoginPage/index.vue')
    },
    // 404
    {
      path: '/:pathMath(.*)',
      name: 'notfound',
      component: () => import('@v/NotFound/index.vue')
    },
    //注册页
    {
      path: '/register',
      name: 'register',
      component: () => import('@v/RegisterPage/index.vue')
    }
  ]
})

export default router
