import request from '@/utils/request'

//获取课程列表
const getSourceList = (params={}) => {
    return request.get('/sourceList',{params})
}

//修改课程状态
const changeSourceStatus = (params={}) => {
    return request.post('/changeSourceStatus',{...params})
}

//新增课程
const addSourceAPI= (params={}) => {
    return request.post('/addSource',{...params})
}

//获取学习信息
const getStudyInfo = (params={}) => {
    return request.get('/getStudyInfo',{params})
}

export {
    getSourceList,
    changeSourceStatus,
    addSourceAPI,
    getStudyInfo
}