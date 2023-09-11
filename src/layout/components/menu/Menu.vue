<template>
    <div class="menuAll">
        <el-menu class="el-menu-vertical-demo menuBar" :collapse="collapseStore.collapse" text-color="#fff"
            :default-active="route.path" background-color="#304156" active-text-color="pink" router
            :collapse-transition="true" :unique-opened='true'>

            <div class="logoArea">
                <img src="@/assets/logo.png" alt="" :style="{ width: collapseStore.collapse ? '64px' : '64px' }">
                <div v-if="!collapseStore.collapse">课程管理系统</div>
            </div>

            <template v-for="item in menuStore.menu" key="item.path">
                <template v-if="!item.children">
                    <el-menu-item :index="item.path">
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
                <template v-else>
                    <el-sub-menu :index="item.path">
                        <template #title>
                            <el-icon>
                                <component :is="item.icon"></component>
                            </el-icon>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="child in item.children" :key="child.path">
                            <el-menu-item :index="child.path">
                                <el-icon>
                                    <component :is="child.icon"></component>
                                </el-icon>
                                <template #title>
                                    {{ child.title }}
                                </template>
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
            </template>
            <el-menu-item index="/handwrittenSignature">
                <el-icon>
                    <EditPen />
                </el-icon>
                <template #title>手写签名</template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import useLayout from '@s/layout'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import useDynamicRouting from '@s/routers'
const menuStore = useDynamicRouting()


const route = useRoute()
const collapseStore = useLayout()
import useTable from '@s/table'
const tableStore = useTable()


//侦听路由的变化

watch(route, (newRoute) => {

    if(!newRoute.meta.table) return
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

    .logoArea {
        display: flex;
        align-items: center;
        height: 80px;
        width: 100%;

        &>div {
            color: #cc98b6;
            font-size: 21px;
            font-weight: 600;
        }
    }
}
</style>