<template>
    <div class="topSearchBar">
        <!-- 顶部标题 -->
        <div class="topTitle">
            <h2>课程管理</h2><el-button type="primary" class="addBtn" @click="changeDia">+添加课程</el-button>
        </div>
        <div class="searchInput">
            <el-form :inline="true" ref="formName" :model="formInline" class="demo-form-inline">
                <el-form-item label="课程名称" prop="courseName">
                    <el-input v-model="formInline.courseName" placeholder="" clearable />
                </el-form-item>
                <el-form-item label="讲师名称" prop="lecturerName">
                    <el-input v-model="formInline.lecturerName" placeholder="" clearable />
                </el-form-item>
                <el-form-item label="课程状态" prop="courseStatus">
                    <el-select v-model="formInline.courseStatus" placeholder="" clearable>
                        <el-option label="下架" value=0 />
                        <el-option label="上架" value=1 />
                    </el-select>
                </el-form-item>
                <el-form-item label="课程进度" prop="courseType">
                    <el-select v-model="formInline.courseType" placeholder="" clearable>
                        <el-option label="完结" value=0 />
                        <el-option label="未开始" value=2 />
                        <el-option label="进行中" value=1 />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="onSubmit">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    <DialogPage :dialogVisible="dialogVisible" @updatedVisible="updatedVisible" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import DialogPage from './DialogPage.vue';
import { ElMessage } from 'element-plus'

const emit = defineEmits(['searchMessage'])

const formName = ref()


//定义对话框显示
const dialogVisible = ref(false)

const changeDia = () => {
    dialogVisible.value = !dialogVisible.value
}
const updatedVisible = (bool: boolean) => {
    dialogVisible.value = bool
}

const formInline = ref({
    courseName: '',
    lecturerName: '',
    courseStatus: '',
    courseType: ''
})



const onSubmit = () => {
    //判断是否为空
    if (formInline.value.courseName === '' && formInline.value.lecturerName === '' && formInline.value.courseStatus === '' && formInline.value.courseType === '') {
        ElMessage({
            type: 'warning',
            message: '请输入搜索条件',
            showClose: true,
            duration: 2000,
            onClose: () => {
            }
        }
        )
    }else{
        emit('searchMessage', formInline.value)
    }
}
//变单重置
const resetForm = () => {
    if (formInline.value.courseName === '' && formInline.value.lecturerName === '' && formInline.value.courseStatus === '' && formInline.value.courseType === '') {
        ElMessage({
            type: 'warning',
            message: '已经重置了',
            showClose: true,
            duration: 2000,
            onClose: () => {
            }
        })
    }
    else{
        formName.value.resetFields()
    }
    
}







</script>

<style lang="less" scoped>
.demo-form-inline .el-input {
    --el-input-width: 220px;
}

.topSearchBar {
    height: 100px;

    .topTitle {
        display: flex;
        align-items: center;
        padding: 10px 0px;

    }

    .addBtn {
        margin-left: 10px;
    }

    .searchInput {}
}
</style>