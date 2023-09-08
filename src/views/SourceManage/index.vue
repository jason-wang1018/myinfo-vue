<template>
    <div>
        <SearchBar @searchMessage="searchMessage"></SearchBar>
        <div id="printArea">
            <el-table row-key="id" ref="multipleTableRef" :data="tableData" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" />
                <el-table-column label="课程名称" width="360">
                    <template #default="scope">{{ scope.row.sourceName }}</template>
                </el-table-column>
                <el-table-column prop="lecturer" label="讲师" width="160" />
                <el-table-column prop="price" label="价格" width="160" />
                <el-table-column label="销量/库存" width="180">
                    <template #default="scope">{{ scope.row.salesVolume + '/' + scope.row.inventory }}</template>
                </el-table-column>
                <el-table-column prop="visits" label="总访问量" width="180">
                    <template #default="scope">
                        <el-tag class="ml-2"
                            :type="scope.row.visits < 100 ? 'info' : scope.row.visits > 500 ? 'danger' : 'warning'">{{
                                scope.row.visits }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="sourceCate" label="课程状态" width="180">
                    <template #default="scope">
                        <button :disabled="lockBtn"
                            @click="SourceStatus({ id: scope.row.id, state: scope.row.sourceStatus })"
                            :style="{ width: '60px', backgroundColor: scope.row.sourceStatus === 1 ? 'red' : 'green' }">{{
                                scope.row.sourceStatus === 1 ? '上架' : '下架' }}</button>
                    </template>
                </el-table-column>
                <el-table-column prop="processStatus" label="进行状态" width="">
                    <template #default="scope">
                        {{ scope.row.processStatus === 0 ? '完结' : scope.row.processStatus === 1 ? '进行中' : '未开始' }}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="oneClickModification">
            <el-button type="primary" :disabled="lockBtn" @click="changeAllStatus({ state: 1 })">一键上架</el-button>
            <el-button type="success" :disabled="lockBtn" @click="changeAllStatus({ state: 0 })">一键下架</el-button>
            <el-button type="warning" @click="printDetail">打印成pdf</el-button>
            <el-button type="danger" @click="exportFile">导出excel模板</el-button>

            <div class="batch">
                <el-upload action="#" accept=".xlsx,.xls" :before-upload="blockFileUpload">
                    <el-button type="info">批量导入excel</el-button>
                </el-upload>
            </div>

        </div>
        <el-pagination background layout="prev, pager, next, jumper, sizes" :total="total" class="pagination popper-class"
            v-model:page-size="pageSize" v-model:current-page="page" :page-sizes="[10, 20, 30, 40]"
            @current-change="getList({})" @prev-click="getList({})" @next-click="getList({})" @size-change="getList({})" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SearchBar from './components/searchBar.vue'
import { getSourceList, changeSourceStatus, batchUploadFiles } from '@a/sourceList'
import { ElMessage } from 'element-plus'
import print from 'print-js'
import FileSaver from "file-saver";
import { utils, read, writeFileXLSX } from "xlsx";


interface User {
    id: number
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
let multipleSelection = ref<User[]>([])
const toggleSelection = (rows?: User[]) => {
    if (rows) {
        rows.forEach((row) => {
            multipleTableRef.value!.toggleRowSelection(row, undefined)
        })
    } else {
        multipleTableRef.value!.clearSelection()
    }
}
const handleSelectionChange = (val: User[]) => {

    multipleSelection.value = val.map(item => item.id)

}


//按钮加锁
let lockBtn = ref(false)

//点击修改全部状态
const changeAllStatus = (params = {}) => {
    lockBtn.value = true
    if (multipleSelection.value.length == 0) {
        ElMessage({
            message: '请选择至少一条数据',
            duration: 1000,
            onClose: () => {
                lockBtn.value = false
            }
        }
        )
        return
    }
    changeSourceStatus({ id: multipleSelection.value, ...params }).then(res => {
        ElMessage({
            message: "更改状态成功",
            type: 'success',
            duration: 1000,
            onClose: () => {
                lockBtn.value = false
                getList({})
            }
        })
    })
}

//搜索内容
const searchMessage = (params: {}) => {
    getList(params)
}


//改变状态
const SourceStatus = (params: {}) => {
    lockBtn.value = true
    changeSourceStatus(params).then(res => {
        if (res.data.code === 200) {
            ElMessage({
                message: res.data.msg,
                type: 'success',
                duration: 1000,
                onClose: () => {
                    lockBtn.value = false
                    getList({})
                }
            })
        }
    })
}

//定义列表的数据
type list = {
    readonly id: number,
    lecturer: string,
    sourceName: string,
    price: number,
    visits: number,
    salesVolume: number,
    inventory: number,
    courseStatus: number
    sourceCate: string,
}
let tableData: list[] = ref([])
let total = ref(null)

//请求列表数据
const getList = (params: {}) => {
    getSourceList(params).then((res) => {
        if (res.data.code === 200) {
            tableData.value = res.data.data.list
            total.value = res.data.data.total
        }
    })
}

//定义分页
const pageSize = ref(8)
const page = ref(1)

onMounted(() => {
    getList({})
})



//定义打印方法
const printDetail = () => {
    print({
        printable: "printArea", // 'printFrom', // 标签元素id
        type: "html",
        targetStyles: ['*'],
        scanStyles: false,
        documentTitle: '课程管理清单',
        header: '<h2 style>课程管理清单</h2>',
    })
}


//文件导出
const exportFile = () => {

    //导出文件的字段名
    const tableTemplate = [
        {
            课程名称: '课程名',
            讲师: "名字",
            价格: "价格",
            销量: "数字",
            库存: '数量',
            课程状态: "1上架/0下架",
            进行状态: "0完结/1进行中/2未开始",
        }

    ]
    const ws = utils.json_to_sheet(tableTemplate);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "课程列表管理导入模板.xlsx");
}


//文件导入
const blockFileUpload = (file: any) => {
    const fd = new FileReader()
    fd.readAsArrayBuffer(file)
    fd.onload = () => {
        const wb = read(fd.result);
        const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        const newData = data.map(item => {
            return {
                sourceName: item.课程名称,
                lecturer: item.讲师,
                price: item.价格,
                processStatus: item.课程状态,
                inventory: item.库存,
                salesVolume: item.销量,
            }
        })
        batchUploadFiles(newData[0]).then(res => {
            if (res.data.code === 200) {
                ElMessage.success('批量上传成功')
            }
        })
        return false
    }
}

</script>

<style lang="less" scoped>
.el-pagination {
    margin-top: 30px;
}

.oneClickModification {
    margin: 20px 10px 10px 10px;
    display: flex;

    .batch {
        margin: 0px 10px;
    }
}
</style>