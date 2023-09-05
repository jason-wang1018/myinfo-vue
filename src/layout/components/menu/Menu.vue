<template>
    <div class="menuAll">
        <el-menu class="el-menu-vertical-demo menuBar" :collapse="collapseStore.collapse" @open="handleOpen"
            text-color="#fff" :default-active="route.path" background-color="#304156" active-text-color="pink" router
            :collapse-transition="true" :unique-opened='true' @close="handleClose">


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



            <!-- <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>Navigator One</span>
                </template>
                <el-menu-item-group>
                    <template #title><span>Group One</span></template>
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                    <template #title><span>item four</span></template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
            </el-sub-menu> -->




            <!-- <el-menu-item index="4">
                <el-icon>
                    <setting />
                </el-icon>
                <template #title>Navigator Four</template>
            </el-menu-item> -->
        </el-menu>
    </div>
</template>
  
<script lang="ts" setup>

import {
    Menu as IconMenu,
    Pointer,
    Monitor,
    MapLocation
} from '@element-plus/icons-vue'

import useLayout from '@s/layout'
import { useRoute } from 'vue-router'
const route = useRoute()
const collapseStore = useLayout()
import useTable from '@s/table'
const tableStore = useTable()



const handleOpen = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath)
    //判断当前路由是否存在了
    const flag = tableStore.editableTabs.some(item => item.path === key)
    if (!flag) {
        tableStore.editableTabs.push(route.meta.table)
        tableStore.tableIndex=(String(Number(tableStore.tableIndex)+1))
    }else{
        tableStore.editableTabs.forEach(item=>{
            if(item.path==key){
                tableStore.tableIndex=item.name
            }
        })
       
    }
}
const handleClose = (key: string, keyPath: string[]) => {
    //   console.log(key, keyPath)
}




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