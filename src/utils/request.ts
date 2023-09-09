//引入axios
import axios from "axios";
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router";
const router = useRouter();
import { clearUserInfo, getToken } from '@u/user'
import loading from '@u/loading/index.js'

const request = axios.create({
    //'https://www.fastmock.site/mock/935d86475772276cc0f2649e50c82123'
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000
})

request.interceptors.request.use(config => {
    //开启全局动画
    // loading.open()
    config.headers.token = getToken()
    // 添加token
    return config
}, (error) => {
    Promise.reject(error)
})

request.interceptors.response.use(response => {
    // loading.close()
    // 登陆过期了
    if (response.data.code == 401) {
        // 清除用户信息
        clearUserInfo()
        ElMessage({
            type: 'error',
            message: '登陆过期了',
            duration: 2000,
            onClose: () => {
                // 跳转到登陆页
                router.replace('/login')
            }
        })
    }
    // 没有权限
    if (response.data.code == 403) {
        // 清除用户信息
        clearUserInfo()
        ElMessage({
            type: 'error',
            message: '你还没有登陆',
            duration: 2000,
            onClose: () => {
                // 跳转到登陆页
                router.replace('/login')
            }
        })
    }
    //判断登陆状态
    return response
}, (error) => {
    Promise.reject(error)
})

export default request