import request from '@/utils/request'

//获取首页图表数据
const getUserTable = (params: any={}) => {
    return request.get('/userOnline',{params})
}


export {
    getUserTable
}