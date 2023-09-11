<template>
    <router-view v-slot="{ Component }">
        <keep-alive :include="['Map']">
            <component :is="Component" />
        </keep-alive>
      </router-view>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const Route = useRoute();

</script>

<style lang="less" scoped></style>