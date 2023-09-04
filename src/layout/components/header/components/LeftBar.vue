<template>
    <div class="leftBar">
        <div>
            <el-icon @click="changeCollapse">
                <component :is="LayoutStore.collapse? Expand:Fold " />
            </el-icon>
        </div>
        <div>
            <el-breadcrumb :separator-icon="ArrowRight">

                <template v-for="item in route.meta.nav" key="item.path">

                    <el-breadcrumb-item  v-if="item.path"  :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
                    <el-breadcrumb-item v-if="!item.path">{{item.name}}</el-breadcrumb-item>

                </template>
            </el-breadcrumb>
        </div>

    </div>
</template>

<script setup lang="ts">
import { Fold, ArrowRight, Expand } from '@element-plus/icons-vue'
import useLayout from '@s/layout'


import { useRoute, useRouter } from 'vue-router'

const route = useRoute()


const LayoutStore = useLayout()

const changeCollapse = () => {
    LayoutStore.$patch({
        collapse: !LayoutStore.collapse
    })
}


</script>

<style lang="less" scoped>
.leftBar {
    display: flex;
    align-items: center;
    margin-left: 10px;

    .el-icon {
        margin-right: 10px;
        font-size: 25px;
        position: relative;
        top: 4px;

    }

    .el-breadcrumb {
        font-size: 18px;

    }

}
</style>