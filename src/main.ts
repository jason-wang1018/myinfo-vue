//配置全局重置样式
import  './assets/rest.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

//element-plus的全局导入
import ElementPlus from 'element-plus'
//element-plus全局样式
import 'element-plus/dist/index.css'
//element-push国际化中文
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

//pinia持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

//全局滚动事件
import  globalScroll from '@h/globalScrollEvent'
globalScroll()

//datv的全局组件挂载
import dataV from '@jiaminghi/data-view'


import App from './App.vue'
import router from './router'

const app = createApp(App)


app.use(ElementPlus, {locale: zhCn,})

const pinia=createPinia()
//pinia持久化插件
pinia.use(piniaPluginPersistedstate)

app.use(dataV)

app.use(pinia)

app.use(router)

app.mount('#app')
