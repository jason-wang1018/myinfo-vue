import request from '@/utils/request'

//获取首页图表数据
const getUserTable = (params: any={}) => {
    return request.get('/userOnline',{params})
}

//大屏数据
const getScreenData = (params: any={}) => {
    return request.get('/bigScreenData',{params})
}

export {
    getUserTable,
    getScreenData
}