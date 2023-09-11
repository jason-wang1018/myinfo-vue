

<template>
    <vue-esign ref="esign" style="border: 2px solid pink;" :width="1920" :height="500"
        :lineWidth="lineWidth" :lineColor="lineColor" />

    <div class="bottomTool">
        <el-button type="warning" @click="handleReset">清空画板</el-button>
        <el-button type="danger" @click="handleGenerate">生成预览图片</el-button>
        <el-button type="success" @click="downPicture">下载本地图片</el-button>
        字体粗细 <el-select v-model="lineWidth" :style="{width:'100px'}" class="m-2" placeholder="Select" size="large">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        选择颜色<input style="width: 88px;height:32px;margin:20px" type="color" v-model="lineColor">
    </div>

    <img :src="resultImg" ref="prevImg" style="width:500px;height:300px" onerror="this.style.display='none'" alt="">
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus'

const lineWidth = ref(6)
const lineColor = ref('')
const resultImg = ref('')
const esign = ref()
const prevImg = ref()

const handleReset = () => {
    esign.value!.reset()
    resultImg.value = ''
    prevImg.value.style.display = 'none'
}
const handleGenerate = () => {
    esign.value.generate({ format: 'image/jpeg', quality: 0.5 }).then(res => {
        resultImg.value = res
        prevImg.value.onerror = null
        prevImg.value.style.display = 'block'

    }).catch(err => {

        ElMessage.error('空白画布无法生成')
    })
}
const downPicture = () => {
    console.log(resultImg.value);

    esign.value.generate({ format: 'image/jpeg', quality: 1 }).then(res => {

        // 去掉开头的data:image/jpeg;base64,
        let base64 = res.replace(/^data:image\/[a-z]+;base64,/, "");

        // 新建一个Blob对象,构造函数的参数是包含文件内容数据的数组
        let blob = new Blob([Uint8Array.from(atob(base64), c => c.charCodeAt(0))], { type: "image/jpeg" });

        // 使用URL.createObjectURL()方法生成blob URI
        let blobUrl = URL.createObjectURL(blob);

        // 可以把blob数据下载为一个文件
        let link = document.createElement("a");
        link.download = "image.jpg";
        link.href = blobUrl;
        link.click();



    }).catch(err => {
        ElMessage.error('空白画布无法生成')
    })


}

const options = [
    {
        value: 6,
        label: 6,
    },
    {
        value: 7,
        label: 7,
    },
    {
        value: 8,
        label: 8,
    },
    {
        value: 9,
        label: 9,
    },
    {
        value: 10,
        label: 10,
    },
    {
        value:11,
        label: 11,
    },
    {
        value: 12,
        label: 12,
    },
    {
        value: 13,
        label: 13,
    },


]

</script>

<style lang="less" scoped>
.bottomTool {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
}
</style>



