<template>
    <div class="learnTimeBody">

        <div class="header">
            <div class="screen">讲师搜索</div>
            <div class="searchBar">
                <el-form :inline="true" ref="formName"  label-position label-width="90px" :model="searchDate" class="demo-form-inline">
                    <el-form-item label="讲师信息" prop="userMessage">
                        <el-input v-model="searchDate.userMessage" placeholder="ID/手机号" clearable />
                    </el-form-item>
                    <el-form-item label="讲师ID" prop="userID">
                        <el-input v-model="searchDate.userID" placeholder="" clearable />
                    </el-form-item>
                    <el-form-item label="讲师状态" prop="userID">
                        <el-input v-model="searchDate.userID" placeholder="" clearable />
                    </el-form-item>
                    <el-form-item label="讲师类型" prop="userID">
                        <el-input v-model="searchDate.userID" placeholder="" clearable />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" :disabled="lock" @click="onSubmit">搜索</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" :disabled="lock" @click="resetForm">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="subjectInformation">
            <div>
                <h3 style="margin:10px">讲师列表:{{ total }}</h3>
            </div>
            <div>
                <el-table :data="tableData" border :default-sort="{ prop: 'date', order: 'descending' }" @sort-change=""
                    style="width: 100%">
                    <el-table-column prop="id" label="用户ID" width="180" />
                    <el-table-column prop="nickName" label="用户昵称" width="180" />
                    <el-table-column prop="phone" label="手机号" />
                    <el-table-column prop="videTime" label="视屏时长" sortable :formatter="formatter1" />
                    <el-table-column prop="textTime" label="图文时长" sortable :formatter="formatter2" />
                    <el-table-column prop="textTime" label="总时长" sortable :formatter="formatter3" />

                </el-table>
            </div>
            <div class="pagination">
            <el-pagination background layout="prev, pager, next, jumper" :total="total" class="pagination popper-class"
            v-model:page-size="pageSize" v-model:current-page="page" 
            @current-change=" getData()" @prev-click=" getData()" @next-click=" getData()"  />
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getStudyInfo } from "@a/sourceList";
import { ElMessage } from "element-plus"


//加锁
const lock = ref(false)

//定义搜索数据
const searchDate = ref({
    userMessage: '',
    userID: ''
})

//定义分页数据
const pageSize= ref(8)
const page = ref(1)


const formName = ref()

//定义列表数据
const tableData: any = ref([])
const total: any = ref()

//定义获取数据
const getData = async () => {
    const res = await getStudyInfo(searchDate.value)
    tableData.value = res.data.data.studyInfo
    total.value = res.data.data.total
    lock.value = false
    formName.value.resetFields()
}

onMounted(() => {
    getData()
})

const onSubmit = () => {
    lock.value = true
    //判断是否为空
    if (searchDate.value.userMessage === '' && searchDate.value.userID === '') {
        ElMessage({
            type: 'warning',
            message: '请输入搜索条件',
            showClose: true,
            duration: 2000,
            onClose: () => {
                lock.value = false
            }
        }
        )
    } else {
        getData()
    }
}

//表单重置
const resetForm = () => {
    lock.value = true
    if (searchDate.value.userMessage === '' && searchDate.value.userID === '') {
        ElMessage({
            type: 'warning',
            message: '为空不需要重置',
            showClose: true,
            duration: 2000,
            onClose: () => {
                lock.value = false

            }
        })
    }
    else {
        formName.value.resetFields()
    }

}


//格式化数据
const formatter1 = (row: any, column: any) => {

    //单位为min
    //计算小时
    let hour = Math.floor(row.videTime / 60)
    //计算分钟
    let min = row.videTime % 60
    return `${hour}小时${min}分钟`
}
//格式化数据
const formatter2 = (row: any, column: any) => {

    //单位为min
    //计算小时
    let hour = Math.floor(row.videTime / 60)
    //计算分钟
    let min = row.videTime % 60
    return `${hour}小时${min}分钟`
}
//格式化数据
const formatter3 = (row: any, column: any) => {
    //单位为min
    //计算小时
    let hour = Math.floor((row.videTime+row.textTime) / 60)
    //计算分钟
    let min =( row.videTime+row.textTime) % 60
    return `${hour}小时${min}分钟`
}


</script>

<style lang="less" scoped>
.learnTimeBody {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .pagination{
        margin-top: 20px;
    }
    .header {
        border: 2px solid #c7ecf3;
    }

    .screen {
        width: 100%;
        height: 40px;
        background-color: #d9edf7;
        color: #31708f;
        font-size: 18px;
        font-weight: 700;
        display: flex;
        align-items: center;
        padding-left: 10px;

    }

    .searchBar {
        height: auto;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px 20px;

        .el-input {
            width: 300px;
            font-size: 18px;
        }

        .el-form-item__label {
            font-size: 18px;
        }
    }

    .subjectInformation {
        flex: 1;
        margin-top: 10px;
        border: 2px solid #fcf0da;
        background-color: white;
    }
}
</style>