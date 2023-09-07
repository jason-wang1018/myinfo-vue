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
          meta: {
            table: {
              title: '仪表盘',
              name: '1',
              path: '/dashBoard'
            },
            nav: [
              {
                path: '/',
                name: '首页'
              },
              {
                name: '仪表盘'
              },
            ]
          },
          component: () => import('@v/DashBoard/index.vue')
        },
        //地图
        {
          path: '/map',
          name: 'map',
          meta: {
            table: {
              title: '高德地图',
              name: '2',
              path: '/map'
            },
            nav: [
              {
                path: '/',
                name: '首页'
              },
              {
                name: '高德地图'
              },
            ]
          },
          component: () => import('@v/MapPage/index.vue')
        },
        //课程列表
        {
          path: '/courseList',
          name: 'courseList',
          meta: {
            table: {
              title: '课程列表',
              name: '3',
              path: '/courseList'
            },
            nav: [
              {
                path: '/',
                name: '首页'
              },
              {
                name: '课程列表'
              },
            ]
          },
          component: () => import('@v/SourceManage/index.vue')
        },
        //学习时长
        {
          path: '/learnTime',
          name: 'learnTime',
          meta: {
            table: {
              title: '学习时长',
              name: '4',
              path: '/learnTime'
            },
            nav: [
              {
                path: '/',
                name: '首页'
              },
              {
                name: '学习时长'
              },
            ]
          },
          component: () => import('@v/LearnTime/index.vue')
        },
        //消息发布
        {
          path: '/messageRelease',
          name: 'messageRelease',
          meta: {
            table: {
              title: '消息发布',
              name: '5',
              path: '/messageRelease'
            },
            nav: [
              {
                path: '/',
                name: '首页'
              },
              {
                name: '课程通知'
              }
            ]
          },
          component: () => import('@v/MessageRelease/index.vue')
        }
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
