<template>
    <div>
    <div class="HeadBar">
        <LeftBar></LeftBar>
        <RightBar></RightBar>
    </div>
    <div>
        <TopTable></TopTable>
    </div>
</div>
</template>

<script setup lang="ts">
import LeftBar from  './components/LeftBar.vue'
import RightBar from './components/RightBar.vue';
import TopTable from './components/TopTable.vue';
</script>

<style lang="less" scoped>
.HeadBar{
    display: flex;
    height: 55px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #e6e6e6;
}
</style>