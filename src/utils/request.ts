//引入axios
import axios  from "axios";   

const request =axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    timeout:5000  
})

request.interceptors.request.use(config=>{
    // 添加token
    return config
},(error)=>{
    Promise.reject(error)
})

request.interceptors.response.use(response=>{
    //判断登陆状态
    return response
},(error)=>{
    Promise.reject(error)
})

export default request