import request from '@/utils/request'

//获取首页图表数据
const getIndexChartData = (params: any={}) => {
    return request.get('/indexChart',{params})
}


export {
    getIndexChartData
}