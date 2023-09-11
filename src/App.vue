<template>
    <keep-alive>
        <Router-view v-if="route.meta.keepAlive"></Router-view>
    </keep-alive>
    <Router-view v-if="!route.meta.keepAlive"></Router-view>
</template>

<script setup lang="ts">
import  {useRoute} from "vue-router";
const route= useRoute();

</script>

<style lang="less" scoped>


</style>