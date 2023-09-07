<template>
    <div class="largeScreenMainBody">
        <!-- flex布局实现大屏可视化效果 -->
        <!-- 头部标题 -->
        <div class="topBody">
            课程管理可视化平台
        </div>
        <div class="leftBody">
            <div style="width: 100%;height:100%">
                <h4>周访问量</h4>
                <div id="leftTop">
                </div>
                <div id="leftBottom">
                    <h4>用户在线状态</h4>
                    <table >
                        <thead>
                            <th>序号</th>
                            <th>用户</th>
                            <th>时间</th>
                            <th>状态</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in tableData" :key="index">
                                <td>{{item.id}}</td>
                                <td>{{item.userName}}</td>
                                <td>{{item.data}}</td>
                                <td>{{item.state}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="centerBody">
            <div id="centerTop">
            </div>
            <div id="centerBottom">

            </div>
        </div>
        <div class="rightBody">
            <div id="rightTop"></div>
            <div id="rightBottom"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { getUserTable } from "@a/bigScreen"
import { Ref } from 'vue';

const leftBody = ref()

//用户浏览图
const browseChart = ref()

//定义初始方法
const initBrowseChart = () => {
    const chart = echarts.init(document.getElementById('leftTop'));
    const option = {
        title: {
            // text: '周流量统计',

        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        toolbox: {
            // feature: {
            //     saveAsImage: {}
            // }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Email',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Union Ads',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 'Video Ads',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: 'Direct',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: 'Search Engine',
                type: 'line',
                stack: 'Total',
                label: {
                    show: true,
                    position: 'top'
                },
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };
    chart.setOption(option);
    browseChart.value = chart
}

interface user{
    id:number,
    userName:string,
    data:string,
    state:number
}

const tableData:Ref<user[]>= ref([])
const getUserTableData = () => {
    getUserTable().then(res => {
        if (res.data.code === 200) {
            tableData.value = res.data.data.userList
            console.log(tableData.value);

        }
    })
}


onMounted(() => {
    initBrowseChart()
    window.addEventListener('resize', () => {
        browseChart.value.resize()
    })

    getUserTableData()
})



</script>


<style lang="less" scoped>
#leftTop {
    width: 100%;
    height: 40%;
}

thead{
    background-color: #4445c8;
}

th{
    text-align: center;
}
td{
    text-align: center;
    height: 31px;
}
table{
    overflow: hidden;
}
tbody tr:nth-child(2n){
    background-color: #234299;
}
tbody tr:nth-child(2n+1){
    background-color:#6c7ed6;
}
.largeScreenMainBody {
    width: 100%;
    height: 100vh;
    display: flex;
    background-color: #eae9ee;
    padding: 60px 10px 10px 20px;
    BAckground-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-width: 800px;

    #leftTop{
        margin: 20px 0px ;
    }
    .topBody {
        position: fixed;
        top: 0px;
        text-align: center;
        left: 0;
        right: 0;
        margin: auto;
        color: #bc2e1e;
        font-size: 40px;
        font-family: '楷体';
        text-shadow: 0 1px 0px #378ab4, 1px 0 0px #5dabcd, 1px 2px 1px #378ab4, 2px 1px 1px #5dabcd, 2px 3px 2px #378ab4, 3px 2px 2px #5dabcd, 3px 4px 2px #378ab4, 4px 3px 3px #5dabcd, 4px 5px 3px #378ab4, 5px 4px 2px #5dabcd, 5px 6px 2px #378ab4, 6px 5px 2px #5dabcd, 6px 7px 1px #378ab4, 7px 6px 1px #5dabcd, 7px 8px 0px #378ab4, 8px 7px 0px #5dabcd;
    }

    .leftBody {
        width: 24vw;
        min-width: 250px;

        border: 1px solid rgb(43, 40, 40);
    }

    #leftBottom{
        overflow: hidden;
    }

    .centerBody {
        flex: 1 0 auto;
        min-width: 600px;
        border: 1px solid rgb(46, 43, 43);
    }

    .rightBody {
        width: 24vw;
        min-width: 250px;
        border: 1px solid rgb(22, 21, 21);

    }
}
</style>