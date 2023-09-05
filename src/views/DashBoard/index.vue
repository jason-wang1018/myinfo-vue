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
        <el-col :xs="24" :sm="12" :md="12" :lg="16" :xl="16">

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

            </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="24" :lg="16" :xl="12">
            <div class="grid-content ep-bg-purple" >
                
            </div>
        </el-col>
    </el-row>

</template>


<script setup lang="ts">
import {
    Star
} from '@element-plus/icons-vue'

import { getIndexChartData } from '@a/index'
import { reactive, ref } from 'vue';

const state = ref({})

// 获取首页数据
const getIndex = () => {
    getIndexChartData().then((res) => {
        state.value = res.data.data.message
    })
}

getIndex()

setInterval(() => {
    getIndex()
}, 2000)

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
            background: linear-gradient(to right, #a184a0, #da90d0);
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
</style>