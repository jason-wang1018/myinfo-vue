<template>
    <div class="leftBar">
        <div>
            <el-icon @click="changeCollpse">
                <component :is="LayoutStore.collapse? Expand:Fold " />
            </el-icon>
        </div>
        <div>
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
                <el-breadcrumb-item>promotion management</el-breadcrumb-item>
                <el-breadcrumb-item>promotion list</el-breadcrumb-item>
                <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

    </div>
</template>

<script setup lang="ts">
import { Fold, ArrowRight,Expand } from '@element-plus/icons-vue'
import useLayout from '@s/layout'

const LayoutStore = useLayout()

const changeCollpse = () => {
    LayoutStore.$patch({
        collapse: ! LayoutStore.collapse
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