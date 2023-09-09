<template>
    <ScaleBox :width="1920" :height="1080" bgc="" :delay="100" :isFlat="false">
        <div class="ec-demo" id="ec-demo">
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
                            <table>
                                <thead>
                                    <th>序号</th>
                                    <th>用户</th>
                                    <th>时间</th>
                                    <th>状态</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in tableData" :key="index">
                                        <td>{{ item.id }}</td>
                                        <td>{{ item.userName }}</td>
                                        <td>{{ item.data }}</td>
                                        <td>{{ item.state == 1 ? "在线" : "下线" }}</td>
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
                        <div>
                            <img src="./1.gif" alt="">
                            <div class="right">
                                <div>用户访问数量:</div>
                                <div>200点击每分钟</div>
                            </div>

                        </div>
                        <div>
                            <img src="./1.gif" alt="">
                            <div class="right">
                                <div>用户访问数量:</div>
                                <div>200点击每分钟</div>
                            </div>

                        </div>
                        <div>
                            <img src="./1.gif" alt="">
                            <div class="right">
                                <div>用户访问数量:</div>
                                <div>200点击每分钟</div>
                            </div>
                        </div>
                        <div>
                            <img src="./1.gif" alt="">
                            <div class="right">
                                <div>用户访问数量:</div>
                                <div>200点击每分钟</div>
                            </div>
                        </div>
                        <div>
                            <img src="./1.gif" alt="">
                            <div class="right">
                                <div>用户访问数量:</div>
                                <div>200点击每分钟</div>
                            </div>
                        </div>
                        <div>
                            <img src="./1.gif" alt="">
                            <div class="right">
                                <div>用户访问数量:</div>
                                <div>200点击每分钟</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rightBody">
                    <div id="rightTop"></div>
                    <div id="rightBottom"></div>
                </div>
            </div>
        </div>
    </ScaleBox>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { getUserTable } from "@a/bigScreen"
import { Ref } from 'vue';
import chinaJSON from './china.json'
import { useRouter } from 'vue-router';
import ScaleBox from "vue3-scale-box";
const router = useRouter()

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

interface user {
    id: number,
    userName: string,
    data: string,
    state: number
}

const tableData: Ref<user[]> = ref([])
const getUserTableData = () => {
    getUserTable().then(res => {
        if (res.data.code === 200) {
            tableData.value = res.data.data.userList
        }
    })
}

const roseChart = ref()


const initRoseChart = () => {
    const chart = echarts.init(document.getElementById('rightTop'));
    let option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ]
            }
        ]
    };
    chart.setOption(option);
    roseChart.value = chart
}



//中国地图
const chinaMap = ref()
let regions = [
    {
        name: '新疆维吾尔自治区',
        itemStyle: {
            areaColor: '#374ba4',
            opacity: 1,
        },
    },
    {
        name: '四川省',
        itemStyle: {
            areaColor: '#fe9b45',
            opacity: 1,
        },
    },
    {
        name: '陕西省',
        itemStyle: {
            areaColor: '#fd691b',
            opacity: 1,
        },
    },
    {
        name: '黑龙江省',
        itemStyle: {
            areaColor: '#ffc556',
            opacity: 1,
        },
    },
]
let scatter = [
    { name: '北京烤鸭', value: [116.46122, 39.97886, 9] },
    { name: '兰州拉面', value: [103.86615, 36.040129, 9] },
    { name: '新疆烤肉', value: [87.613228, 43.810394, 9] },
    { name: '长沙臭豆腐', value: [112.915204, 28.207735, 9] },
    { name: '西安肉夹馍', value: [108.953445, 34.288842, 9] },
    { name: '云南', value: [102.710002, 25.045806, 9] },
]
const drawChina = () => {
    var myChart = echarts.init(document.getElementById('centerTop'))
    echarts.registerMap('china', chinaJSON) //注册可用的地图
    var option = {
        geo: {
            map: 'china',
            roam: true, //是否允许缩放，拖拽
            zoom: 1.6, //初始化大小
            //缩放大小限制
            scaleLimit: {
                min: 1.6, //最小
                max: 2, //最大
            },
            //设置中心点
            center: [105, 35.91],
            //省份地图添加背景
            regions: regions,
            itemStyle: {
                areaColor: '#0b122e',
                color: 'red',
                borderColor: '#232652',
                borderWidth: 2,
            },
            //高亮状态
            emphasis: {
                itemStyle: {
                    areaColor: 'pink',
                    color: '#fff',
                },
            },
        },
        //配置属性
        series: {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: scatter,
            showEffectOn: 'render',
            rippleEffect: {
                //涟漪特效相关配置
                brushType: 'stroke', //波纹的绘制方式，可选 'stroke' 和 'fill'
            },
            // hoverAnimation: true, //是否开启鼠标 hover 的提示动画效果
            // label: {
            //     //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
            //     normal: {
            //         formatter: '{b}',
            //         position: 'right',
            //         show: true,
            //     },
            // },
            itemStyle: {
                //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时
                // normal: {
                //     color: '#ffffff', //散点的颜色
                //     shadowBlur: 10,
                //     shadowColor: 20,
                //     fontSize: '12px',
                // },
            },
            zlevel: 1,
        },
    }
    myChart.setOption(option)
    chinaMap.value = myChart
}



//雷达图
const radarChart = ref()
const initRadarChart = () => {
    const chart = echarts.init(document.getElementById('rightBottom'));
    let option = {
        title: {
            text: ''
        },
        legend: {
            data: ['Allocated Budget', 'Actual Spending']
        },
        radar: {
            // shape: 'circle',
            indicator: [
                { name: 'Sales', max: 6500 },
                { name: 'Administration', max: 16000 },
                { name: 'Information Technology', max: 30000 },
                { name: 'Customer Support', max: 38000 },
                { name: 'Development', max: 52000 },
                { name: 'Marketing', max: 25000 }
            ]
        },
        series: [
            {
                name: 'Budget vs spending',
                type: 'radar',
                data: [
                    {
                        value: [4200, 3000, 20000, 35000, 50000, 18000],
                        name: 'Allocated Budget'
                    },
                    {
                        value: [5000, 14000, 28000, 26000, 42000, 21000],
                        name: 'Actual Spending'
                    }
                ]
            }
        ]
    };
    chart.setOption(option);
    radarChart.value = chart
};



onMounted(() => {
    initBrowseChart()
    getUserTableData()
    initRoseChart()
    drawChina()
    initRadarChart()
    window.addEventListener('resize', () => {
        browseChart.value.resize()
        chinaMap.value.resize()
        roseChart.value.resize()
        radarChart.value.resize()
    })
})





</script>


<style lang="less" scoped>
#leftTop {
    width: 100%;
    height: 40%;
}

thead {
    background-color: #4445c8;
}

th {
    text-align: center;
}

td {
    text-align: center;
    height: 31px;
    color: rgb(211, 194, 194);
}

table {
    overflow: hidden;
    color: rgb(206, 192, 192);
}

tbody tr:nth-child(2n) {
    background-color: #475a8f;
}

tbody tr:nth-child(2n+1) {
    background-color: #5262af;
}

.largeScreenMainBody {
    width: 100%;
    height: 100vh;
    display: flex;
    background-color: #0a1222;
    padding: 60px 10px 10px 20px;
    BAckground-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-width: 800px;


    #leftTop {
        margin: 20px 0px;
    }

    #leftTop {
        -webkit-box-shadow: inset -1px 3px 8px 5px #1F87FF, 2px 5px 16px 0px #0B325E, 5px 5px 15px 5px rgba(0, 0, 0, 0);
        box-shadow: inset -1px 3px 8px 5px #1F87FF, 2px 5px 16px 0px #0B325E, 5px 5px 15px 5px rgba(0, 0, 0, 0);
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
        overflow: hidden;
        text-shadow: 0 1px 0px #378ab4, 1px 0 0px #5dabcd, 1px 2px 1px #378ab4, 2px 1px 1px #5dabcd, 2px 3px 2px #378ab4, 3px 2px 2px #5dabcd, 3px 4px 2px #378ab4, 4px 3px 3px #5dabcd, 4px 5px 3px #378ab4, 5px 4px 2px #5dabcd, 5px 6px 2px #378ab4, 6px 5px 2px #5dabcd, 6px 7px 1px #378ab4, 7px 6px 1px #5dabcd, 7px 8px 0px #378ab4, 8px 7px 0px #5dabcd;
    }

    .leftBody {
        width: 25vw;
        min-width: 250px;

    }

    #leftBottom {
        overflow: hidden;
        height: 50%;
    }

    .centerBody {
        flex: 1 1 auto;
        min-width: 700px;

    }

    #centerTop {
        width: 100%;
        height: 75%;


    }

    #centerBottom {
        height: 25%;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;

        &>div {
            width: 30%;
            display: flex;
            height: 40%;
            margin-top: 10px;
            border: 1px solid #11182f;
            background: linear-gradient(to right bottom,
                    rgba(255, 255, 255, .7),
                    rgba(255, 255, 255, .5),
                    rgba(247, 242, 242, 0.4));
            /* 使背景模糊化 */
            backdrop-filter: blur(8px);

            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 0 80px rgba(0, 0, 0, 0.25);

            &>img {
                width: 80px;
            }

            &>.right {
                padding: 20px;


            }
        }
    }


    .rightBody {
        width: 25vw;
        min-width: 250px;


    }

    #rightTop {
        width: 100%;
        height: 45%;

        -webkit-box-shadow: inset -1px 3px 8px 5px #1F87FF, 2px 5px 16px 0px #0B325E, 5px 5px 15px 5px rgba(0, 0, 0, 0);
        box-shadow: inset -1px 3px 8px 5px #1F87FF, 2px 5px 16px 0px #0B325E, 5px 5px 15px 5px rgba(0, 0, 0, 0);
    }

    #rightBottom {
        width: 100%;
        margin-top: 30px;
        height: 45%;
        -webkit-box-shadow: inset -1px 3px 8px 5px #1F87FF, 2px 5px 16px 0px #0B325E, 5px -8px 8px -5px rgba(0, 0, 0, 0.53);
        box-shadow: inset -1px 3px 8px 5px #1F87FF, 2px 5px 16px 0px #0B325E, 5px -8px 8px -5px rgba(0, 0, 0, 0.53);
    }
}
</style>