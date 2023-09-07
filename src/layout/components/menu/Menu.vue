<template>
    <div class="menuAll">
        <el-menu class="el-menu-vertical-demo menuBar" :collapse="collapseStore.collapse" text-color="#fff"
            :default-active="route.path" background-color="#304156" active-text-color="pink" router
            :collapse-transition="true" :unique-opened='true'>


            <el-menu-item index="/dashBoard">
                <el-icon>
                    <Pointer />
                </el-icon>
                <template #title>仪表盘</template>
            </el-menu-item>

            <el-menu-item index="/largeScreen">
                <el-icon>
                    <Monitor />
                </el-icon>
                <template #title>大屏可视化</template>
            </el-menu-item>

            <el-menu-item index="/map">
                <el-icon>
                    <MapLocation />
                </el-icon>
                <template #title>高德地图</template>
            </el-menu-item>

            <el-sub-menu index="/">
                <template #title>
                    <el-icon>
                        <Calendar />
                    </el-icon>
                    <span>课程管理</span>
                </template>
                <el-menu-item index="/courseList">
                    <el-icon>
                        <TrophyBase />
                    </el-icon>
                    <template #title>
                        课程列表
                    </template>
                </el-menu-item>
                <el-menu-item index="/learnTime">
                    <el-icon>
                        <Sunny />
                    </el-icon>
                    <template #title>学习时长</template>
                </el-menu-item>
                <el-menu-item index="/messageRelease">
                    <el-icon><AlarmClock /></el-icon>
                    <template #title>课程通知</template>
                </el-menu-item>

            </el-sub-menu>

        </el-menu>
    </div>
</template>

<script lang="ts" setup>

import {
    Menu as IconMenu,
    Pointer,
    Monitor,
    MapLocation,
    Calendar,
    TrophyBase,
    Sunny,
    AlarmClock
} from '@element-plus/icons-vue'

import useLayout from '@s/layout'
import { useRoute } from 'vue-router'
import { watch } from 'vue'


const route = useRoute()
const collapseStore = useLayout()
import useTable from '@s/table'
const tableStore = useTable()


//侦听路由的变化

watch(route, (newRoute) => {


    const flag = tableStore.editableTabs.some(item => item.path === newRoute.fullPath)
    if (!flag) {
        tableStore.editableTabs.push(newRoute.meta.table)
        //tableIndex时钟为数组的最后一项的name值
        tableStore.tableIndex = tableStore.editableTabs[tableStore.editableTabs.length - 1].name
    } else {
        //已经存在了 只要更改tableIndex
        tableStore.tableIndex = newRoute.meta.table.name
    }

}, {
    immediate: true
})





</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;

    min-height: 400px;
}

.el-menu {
    border-right: none;
}

.menuAll {
    background-color: #304156;
    height: 100%;

    .menuBar {
        background-color: #304156 !important;

        &>el-icon {
            color: #dbe5f0 !important;
        }

        & span {
            color: #e4e6e9;
        }

        .el-menu--inline {
            background-color: #304156;
        }
    }
}
</style>