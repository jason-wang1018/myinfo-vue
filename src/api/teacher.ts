import request from '@/utils/request'

//获取老师列表
const getTeacherList = (data: any) => {
    return  request.get('/teachList',{data})
}



export {
    getTeacherList
}