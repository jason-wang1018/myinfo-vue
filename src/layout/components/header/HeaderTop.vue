<template>
    <div class="HeadBar">
        <LeftBar></LeftBar>
        <RightBar></RightBar>
    </div>
</template>

<script setup lang="ts">
import LeftBar from  './components/LeftBar.vue'
import RightBar from './components/RightBar.vue';
</script>

<style lang="less" scoped>
.HeadBar{
    display: flex;
    height: 100%;
    align-items: center;
    align-content: space-between;
    border-bottom: 2px solid #e6e6e6;
}
</style>