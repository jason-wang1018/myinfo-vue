<template>
    <div class="learnTimeBody">

        <div class="header">
            <div class="screen">订单搜索</div>
            <div class="searchBar">
                <el-form :inline="true" ref="formName" label-position label-width="90px" :model="searchDate"
                    class="demo-form-inline">
                    <el-form-item label="订单编号" prop="userMessage">
                        <el-input v-model="searchDate.userMessage" placeholder="编号" clearable />
                    </el-form-item>
                    <el-form-item label="用户昵称" prop="nickName">
                        <el-input v-model="searchDate.nickName" placeholder="编号" clearable />
                    </el-form-item>
                    <el-form-item label="支付方式" prop="pay">
                        <el-select v-model="searchDate.pay" placeholder="" clearable>
                            <el-option label="微信" value=0 />
                            <el-option label="支付宝" value=1 />
                            <el-option label="第三方" value=2 />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="订单日期" prop="data">
                        <el-date-picker v-model="searchDate.data" type="daterange" range-separator="到"
                            start-placeholder="开始日期" end-placeholder="结束日期" size="default" />
                    </el-form-item>

                    <el-form-item label="订单状态" prop="orderState">
                        <el-select v-model="searchDate.orderState" placeholder="" clearable>
                            <el-option label="不限" value=0 />
                            <el-option label="支付中" value=1 />
                            <el-option label="支付完毕" value=2 />
                        </el-select>
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
                <h3 style="margin:10px">订单列表:{{ total }}人</h3>
            </div>
            <div>
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="id" label="订单编号" width="180" />
                    <el-table-column prop="className" label="课程名称" width="180" />

                    <el-table-column prop="specifications" label="规格" width="180" />

                    <el-table-column prop="price" label="价格">
                        <template #default="scope">
                            {{ scope.row.price + '元' }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="teachName" label="讲师" />
                    <el-table-column prop="data" label="下单时间" />
                    <el-table-column prop="orderState" label="订单状态">
                        <template #default="scope">
                            {{ scope.row.orderState == 1 ? '支付中' : '支付完毕' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="pay" label="订单状态">
                        <template #default="scope">
                            {{ scope.row.pay == 0 ? '微信支付' : scope.row.pay == 1 ? '支付宝支付' : '第三方支付' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="teachCate" label="操作">
                        <template #default="scope">
                            <el-button type="danger" @click="deleteOrderOne(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination background layout="prev, pager, next, jumper" :total="total" class="pagination popper-class"
                    v-model:page-size="pageSize" v-model:current-page="page" @current-change=" getData()"
                    @prev-click=" getData()" @next-click=" getData()" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getTeacherList, getOrderList, deleteOrder } from "@a/teacher";
import { ElMessage, ElMessageBox } from "element-plus"


//加锁
const lock = ref(false)

//定义搜索数据
const searchDate = ref({
    userMessage: '',
    pay: '',
    nickName: '',
    data: [],
    orderState: ''
})

//定义分页数据
const pageSize = ref(8)
const page = ref(1)


const formName = ref()

//定义列表数据
const tableData: any = ref([])
const total: any = ref()

//定义获取数据
const getData = async () => {
    const res = await getOrderList(searchDate.value)
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
    if (searchDate.value.userMessage === ''
        && searchDate.value.pay === ''
        && searchDate.value.nickName === ''
        && searchDate.value.orderState === ''
        && searchDate.value.data.length === 0
    ) {
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
    if (searchDate.value.userMessage === ''
        && searchDate.value.pay === ''
        && searchDate.value.nickName === ''
        && searchDate.value.orderState === ''
        && searchDate.value.data.length === 0) {
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
        console.log("/////");

        formName.value.resetFields()
    }

}


//格式化数据
const formatter1 = (row: any, column: any) => {
    switch (row.teachCate) {
        case 0:
            return '兼职'
        case 1:
            return '全职'
        case 2:
            return '实习'
    }
}

//
const deleteOrderOne = (index) => {
    ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (value: string, action: Action) => {
            console.log(action.action);
            
            if (action.action=="confirm" ) {
                deleteOrder({ id: index }).then(() => {
                    ElMessage({
                        type: 'success',
                        message: '删除成功!',
                        showClose: true,
                        duration: 2000,
                        onClose: () => {
                            getOrderList()
                        }
                    })
                })
            }
        }
    })
}


</script>

<style lang="less" scoped>
.learnTimeBody {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .pagination {
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