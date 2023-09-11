

<template>
    <vue-esign ref="esign" :width="1920" :height="500" :isCrop="isCrop" :lineWidth="lineWidth" :lineColor="lineColor"
        v-model:bgColor="bgColor" />
    <button @click="handleReset">清空画板</button>
    <button @click="handleGenerate">生成图片</button>
    <img :src="resultImg" alt="">
</template>

<script setup lang="ts">
import { ref } from 'vue';

const lineWidth = ref(6)
const lineColor = ref('pink')
const bgColor = ref('')
const resultImg = ref('')
const isCrop = ref(false)
const esign = ref()

const handleReset = () => {
    esign.value!.reset()
}
const handleGenerate = () => {
    esign.value.generate({format:'image/jpeg', quality: 0.5}).then(res => {
        resultImg.value = res
        
    }).catch(err => {
        alert(err) // 画布没有签字时会执行这里 'Not Signned'
    })
}




</script>

<style lang="less" scoped></style>



