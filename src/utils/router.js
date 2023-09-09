const children=[
    //仪表盘
    {
        path: '/dashBoard',
        name: 'dashBoard',
        meta: {
            icon:'Pointer',
            title: '仪表盘',
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
        component: '/DashBoard'
    },
    //地图
    {
        path: '/map',
        name: 'map',
        meta: {
            icon:'MapLocation',
            title: '高德地图',
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
        component:'/MapPage'
    },
    //课程列表
    {
        path: '/courseList',
        name: 'courseList',
        meta: {
            icon:'TrophyBase',
            title: '课程列表',
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
        component: '/SourceManage'
    },
    //学习时长
    {
        path: '/learnTime',
        name: 'learnTime',
        meta: {
            icon:'Sunny',
            title: '学习时长',
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
        component: '/LearnTime'
    },
    //课程通知
    {
        path: '/messageRelease',
        name: 'messageRelease',
        meta: {
            icon:'AlarmClock',
            title: '课程通知',
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
        component: '/MessageRelease'
    }, 
    //讲师列表
    {

        path: '/teachList',
        name: 'teachList',
        meta: {
            icon:'Coin',
            title: '讲师列表',
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
        component: '/TeachList'

    },
    //讲师订单
    {
        path: '/teachOrder',
        name: 'teachOrder',
        meta: {
            icon:'Sell',
            title: '讲师订单',
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
        component: '/TeachOrder'
    }
]

const children=[
    //仪表盘
    {
        path: '/dashBoard',
        name: 'dashBoard',
        meta: {
            icon:'Pointer',
            title: '仪表盘',
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
        component: '/DashBoard'
    },
    //地图
    {
        path: '/map',
        name: 'map',
        meta: {
            icon:'MapLocation',
            title: '高德地图',
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
        component:'/MapPage'
    },
    //课程列表
    {
        path: '/courseList',
        name: 'courseList',
        meta: {
            icon:'TrophyBase',
            title: '课程列表',
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
        component: '/SourceManage'
    },
    //学习时长
    {
        path: '/learnTime',
        name: 'learnTime',
        meta: {
            icon:'Sunny',
            title: '学习时长',
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
        component: '/LearnTime'
    },
    //课程通知
    {
        path: '/messageRelease',
        name: 'messageRelease',
        meta: {
            icon:'AlarmClock',
            title: '课程通知',
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
        component: '/MessageRelease'
    }, 
    //讲师列表
    {

        path: '/teachList',
        name: 'teachList',
        meta: {
            icon:'Coin',
            title: '讲师列表',
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
        component: '/TeachList'

    },
    //讲师订单
    {
        path: '/teachOrder',
        name: 'teachOrder',
        meta: {
            icon:'Sell',
            title: '讲师订单',
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
        component: '/TeachOrder'
    }
]