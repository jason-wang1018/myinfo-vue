import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import { isLogin, getToken } from '@/utils/user'

export const routes = [
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
            title: '课程通知',
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
      , {

        path: '/teachList',
        name: 'teachList',
        meta: {
          table: {
            title: '讲师列表',
            name: '6',
            path: '/teachList'
          },
          nav: [
            {
              path: '/',
              name: '首页'
            },
            {
              name: '讲师列表'
            }
          ]
        },
        component: () => import('@v/TeachList/index.vue')

      }
      , {
        path: '/teachOrder',
        name: 'teachOrder',
        meta: {
          table: {
            title: '讲师订单',
            name: '7',
            path: '/teachOrder'
          },
          nav: [
            {
              path: '/',
              name: '首页'
            },
            {
              name: '讲师订单'
            }
          ]
        },
        component: () => import('@v/TeachOrder/index.vue')


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

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  //注册页和登陆页放行
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    //判断登陆了
    if (isLogin()) {
      next()
    } else {
      console.log('未登录');
      //登陆失效从哪个页面来的
      next({
        path: '/login',
        query: {
          redirect: to.path
        }
      })
    }
  }
}
)


export default router

