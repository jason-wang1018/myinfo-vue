<template>
    <div class="topSearchBar">
        <!-- 顶部标题 -->
        <div class="topTitle">
            <h2>课程管理</h2><el-button type="primary" class="addBtn">+添加课程</el-button>
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
                        <el-option label="下架" value="0" />
                        <el-option label="上架" value="1" />
                        <el-option label="审核中" value="2" />
                        <el-option label="暂停中" value="3" />
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
</template>

<script setup lang="ts">
import { reactive,ref} from 'vue'

const formName =ref()

const formInline = ref({
    courseName:'',
    lecturerName: '',
    courseStatus:''
})

const onSubmit = () => {
    console.log('submit!')
}
//变单重置
const resetForm=()=>{
    formName.value.resetFields()
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
        padding:10px 0px ;
    
    }
    .addBtn{
        margin-left: 10px;
    }
    .searchInput{
        

    }
}
</style>