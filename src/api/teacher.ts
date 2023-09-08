import request from '@/utils/request'

//获取老师列表
const getTeacherList = (data: any) => {
    return  request.get('/teachList',{data})
}

//获取订单列表
const getOrderList = (data: any) => {
    return  request.get('/orderList',{data})
}
//删除订单
const deleteOrder = (data: any) => {
    return  request.post('/deleteOrder',{data})
}

export {
    getTeacherList,
    getOrderList,
    deleteOrder
}