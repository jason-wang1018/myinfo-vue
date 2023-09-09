
//判断是否登陆
export const isLogin =()=> !!localStorage.getItem('token')

//拿到token
export const getToken=() => localStorage.getItem('token')

//退出清除用户信息
export const clearUserInfo=()=>{
    localStorage.clear()

}

