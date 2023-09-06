<template>
    <!-- dialog对话框 -->
    <el-dialog v-model="props.dialogVisible" show-message title="新增课程" width="30%" center :before-close="handleClose"
        draggable destroy-on-close>

        <el-form :model="addSource" label-width="120px" size="large" ref="ruleForm" :rules="rules">
            <el-form-item label="课程名称" prop="sourceName">
                <el-input v-model="addSource.sourceName" />
            </el-form-item>
            <el-form-item label="讲师" prop="lecturer">
                <el-input v-model="addSource.lecturer" />
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input-number v-model="addSource.price" :min="1" />
            </el-form-item>
            <el-form-item label="是否上架" prop="sourceStatus">
                <el-switch v-model="addSource.sourceStatus" :active-value="1" :inactive-value="0" inline-prompt
                    active-text="上架" inactive-text="下架" />
            </el-form-item>
            <el-form-item class="">
                <el-button type="primary" @click="onSubmit">创建</el-button>
                <el-button type="primary" @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>

    </el-dialog>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue';
import { addSourceAPI } from '@a/sourceList'
import {useRouter} from 'vue-router'
import { ElMessage } from 'element-plus';
const router =useRouter()


const props = defineProps({
    dialogVisible: {
        type: Boolean,
    }
})
const emit = defineEmits(['updatedVisible'])

//定义对话框信息
const addSource = ref({
    sourceName: '',
    lecturer: '',
    price: '',
    sourceStatus: ''
})



const handleClose = (done: () => void) => {
    ElMessageBox.confirm('你确定关闭对话框?')
        .then(() => {
            emit('updatedVisible', false)
            done()
        })
        .catch(() => {
            // catch error
        })
}

const ruleForm = ref()
const resetForm = () => {
    ruleForm.value.resetFields()

}

const onSubmit = () => {
    ruleForm.value.validate().
        then(() => {
            addSourceAPI(addSource.value).then((res) => {
                if (res.data.code == 200) {
                    ElMessage({
                        message: res.data.msg,
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            router.go(0)
                        }
                    })
                }
            })
        })
}

// 验证规则
const rules = {
    sourceName: [
        {
            required: true,
            // 错误提示
            message: "必须传递中文3-6位",
            //校验方式 
            //中文3到5位
            trigger: 'blur',
            pattern: /^[\u4e00-\u9fa5]{3,6}$/
        }
    ],
    lecturer: [
        {
            required: true,
            // 错误提示
            message: "必须传递且2-4位中文",
            //校验方式 
            trigger: 'blur',
            pattern: /^[\u4e00-\u9fa5]{2,4}$/
        }
    ],
}
</script>

<style lang="less" scoped></style>