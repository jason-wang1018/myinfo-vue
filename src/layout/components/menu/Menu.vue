<template>
    <div class="menuAll">
        <el-menu default-active="2" class="el-menu-vertical-demo menuBar" :collapse="collapseStore.collapse" @open="handleOpen"
            text-color="#fff" background-color="#304156" active-text-color="pink" router @close="handleClose">


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
    Location,
    Setting,
    Pointer,
    Monitor,
    MapLocation
} from '@element-plus/icons-vue'

import useLayout from  '@s/layout'

const collapseStore=useLayout()





const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
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