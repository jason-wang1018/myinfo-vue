<template>
    <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <div class="grid-content ep-bg-purple">
                <div class="leftBody">
                    <img class="logoImg" src="https://image-1gi.pages.dev/file/adcab20d47f56e1a2aa30.jpg" alt="">
                    <el-descriptions title="个人简介" direction="vertical" :column="4" border>
                        <el-descriptions-item label="网名">jason-wang</el-descriptions-item>
                        <el-descriptions-item label="电话号码">15156562576</el-descriptions-item>
                        <el-descriptions-item label="工作地" :span="2">安徽合肥</el-descriptions-item>
                        <el-descriptions-item label="邮箱" :span="4">
                            wangdi101843@gmail.com
                        </el-descriptions-item>
                        <el-descriptions-item label="地址" :span="1">
                            <el-tag size="small">School</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="Address" :span="3">
                            安徽省宿州市宿州学院
                        </el-descriptions-item>
                        <el-descriptions-item label="个性标签" :span="4">
                            <el-tag class="ml-2" type="success" large>篮球</el-tag>
                            <el-tag class="ml-2" type="info">游戏</el-tag>
                            <el-tag class="ml-2" type="warning">长跑</el-tag>
                            <el-tag class="ml-2" type="danger">马拉松</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="最喜欢的一句话" :span="4">
                            自律让你更自由
                        </el-descriptions-item>
                    </el-descriptions>
                </div>
            </div>
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="16" :xl="16" class="top">

            <div class="grid-content  numberOfUsers  ep-bg-purple-light">

                <el-col :xs="8" :sm="24" :md="24" :lg="8" :xl="8">
                    <div class="outerLayer">
                        <div class="icon">
                            <el-icon>
                                <Star />
                            </el-icon>
                        </div>
                        <div class="message">
                            <span>{{ state.message1 }}</span>
                            <span>用户访问量</span>
                        </div>
                    </div>
                </el-col>


                <el-col :xs="8" :sm="24" :md="24" :lg="8" :xl="8">

                    <div class="outerLayer">
                        <div class="icon">
                            <el-icon>
                                <Star />
                            </el-icon>
                        </div>
                        <div class="message">
                            <span>{{ state.message2 }}</span>
                            <span>系统消息</span>
                        </div>
                    </div>
                </el-col>

                <el-col :xs="8" :sm="24" :md="24" :lg="8" :xl="8">
                    <div class="outerLayer">
                        <div class="icon">
                            <el-icon>
                                <Star />
                            </el-icon>
                        </div>
                        <div class="message">
                            <span>{{ state.message3 }}</span>
                            <span>数量</span>
                        </div>
                    </div>
                </el-col>

                <div id="pieChart"></div>

            </div>
        </el-col>
    </el-row>
</template>


<script setup lang="ts">
import { ElNotification } from 'element-plus'
import axios from 'axios';
import {
    Star
} from '@element-plus/icons-vue'

import { getIndexChartData } from '@a/index'
import { reactive, ref, onMounted, } from 'vue';
import * as echarts from 'echarts';

const state = ref({})
const pieChart = ref()
const open = ref(false)
const orderData = reactive({
    totalOrderAmount: 1111,
    numberOfOrders: 555,
    actualIncome: 9666,
    cashCollection: 7000,
})


//获取首页数据
const getIndex = () => {
    getIndexChartData().then((res) => {
        state.value = res.data.data.message
    })
}

//定义图标数据
const initChart = () => {
    const Chart = echarts.init(document.getElementById('pieChart'));
    const piePatternImg = new Image();
    piePatternImg.src = piePatternSrc;
    const bgPatternImg = new Image();
    bgPatternImg.src = bgPatternSrc;
    var option = {
        backgroundColor: {
            image: bgPatternImg,
            repeat: 'repeat'
        },
        title: {
            text: '用户访问数据',
            textStyle: {
                color: '#235894'
            }
        },
        tooltip: {},
        series: [
            {
                name: 'pie',
                type: 'pie',
                selectedMode: 'single',
                selectedOffset: 30,
                clockwise: true,
                label: {
                    fontSize: 18,
                    color: '#235894'
                },
                labelLine: {
                    lineStyle: {
                        color: '#235894'
                    }
                },
                data: [
                    { value: 1048, name: '访问量' },
                    { value: 735, name: '访问时间' },
                    { value: 580, name: '客户群体' },
                    { value: 484, name: '在线人数' },
                    { value: 300, name: '注册人数' }
                ],
                itemStyle: {
                    opacity: 0.7,
                    color: {
                        image: piePatternImg,
                        repeat: 'repeat'
                    },
                    borderWidth: 3,
                    borderColor: '#235894'
                }
            }
        ]
    };
    Chart.setOption(option)
    pieChart.value = Chart
}
import { piePatternSrc, bgPatternSrc } from '@/assets/imgs/charts'

let time = 1
onMounted(() => {
    getIndex()
    time = setInterval(() => {
        getIndex()
    }, 2000)

    //初始化图表
    initChart()
    window.addEventListener('resize', () => {
        pieChart.value.resize();
    });

    axios.get("https://api.vvhan.com/api/en").then(res => {
        console.log(res.data.data.zh)
        const name = localStorage.getItem('username')
        ElNotification({
            title: `欢迎${name}登陆成功!!`,
            dangerouslyUseHTMLString: true,
            message: `<h4>${res.data.data.zh}</h4>`,
            type: 'success',
        })
    })


})


</script>

<style lang="less" scoped>
.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.leftBody {
    width: 100%;
    height: 730px;
    padding: 10px;
    background-color: #fff;
    border: 2px solid rgb(252, 205, 213);


    .el-descriptions__title {
        margin-left: 10px;
    }

    .el-tag {
        margin: 0px 10px;
    }


}

.top {
    height: 400px;
}

.el-icon {
    font-size: 20px;
}

.numberOfUsers {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;


    .outerLayer {
        width: 100%;
        margin-bottom: 20px;
        height: 100px;
        display: flex;
        align-items: center;

        & .icon {
            width: 40%;
            height: 100%;
            background: linear-gradient(to right, #c7d2f1, #e3ceeb);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .message {
            width: 60%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #070606;
            font-size: 15px;
            background-color: white;

            &>span:first-child {
                color: #da90d0;
                font-weight: 600;
                font-size: 40px;
            }
        }


    }
}

.logoImg {
    width: 80px;
    margin: 20px 0px;
    border-radius: 50%;
}

#pieChart {
    width: 100%;
    height: 620px;
}
</style>