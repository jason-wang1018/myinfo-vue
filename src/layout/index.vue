<template>
    <div class="common-layout indexTheme">
        <el-container>
            <el-aside  :width="layoutStore.collapse? 'auto':'200px' ">
                <Menu></Menu>
            </el-aside>
            <el-container>
                <el-header>
                    <HeaderTop></HeaderTop>
                </el-header>
                <el-main><Router-view></Router-view></el-main>
                <el-footer>
                    <Footer></Footer>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import HeaderTop from './components/header/HeaderTop.vue'
import Menu from './components/menu/Menu.vue'
import Footer from './components/footer/Footer.vue'

import useLayout from  '@s/layout'

const layoutStore=useLayout()
</script>

<style lang="less" scoped>
.indexTheme {
    height: 100vh;
    min-width: 600px;

    .el-container {
        height: 100vh;
    }
    .el-header{
        height: 95px;
        padding: 0px;
        overflow: hidden !important;
    }
}
.el-main{
    background-color: #f0f2f5;
}
</style>