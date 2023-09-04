import  './assets/rest.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

//element-plus的全局导入
import ElementPlus from 'element-plus'
//element-plus全局样式
import 'element-plus/dist/index.css'
//element-push国际化中文
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'


import App from './App.vue'
import router from './router'

const app = createApp(App)


app.use(ElementPlus, {locale: zhCn,})

app.use(createPinia())

app.use(router)

app.mount('#app')
