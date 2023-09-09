import request from '@/utils/request'

//登陆页
const login = (params: any) => {
    return  request.get('/login',{params})
}

export {
    login
}