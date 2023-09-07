<template>
    <div class="MessagePostBody">
        <div class="MessagePostBody-content">
            <div style="margin: 30px 0px ;">
                <h3>课程通知</h3>
            </div>
            <div class="searchBar">
                <el-form label-position="right" :model="selectData" label-width="80px" ref="formName"
                    class="demo-form-inline">
                    <div class="TopSearch">
                        <el-form-item label="选择课程" prop="selectValue">
                            <el-select v-model="selectData.selectValue" placeholder="请选择课程">
                                <el-option v-for="item in sourceListData" :key="item.id" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="top">
                        <el-form-item label="发送对象" prop="userRole">
                            <el-checkbox-group v-model="selectData.userRole">
                                <el-checkbox label="普通用户" value="0" />
                                <el-checkbox label="vip用户" value="1" />
                                <el-checkbox label="全部用户" value="2" />
                            </el-checkbox-group>
                        </el-form-item>
                    </div>
                </el-form>
            </div>

        </div>
        <div class="MessagePostBody-actions">
            <div style="margin: 20px 0px ;">
                <h3>消息模板设置</h3>
            </div>
            <div class="templateBody">
                <el-form label-position="right" label-width="80px" ref="formTemplate" :rules="rules" :model="templateTable"
                    class="demo-form-inline">
                    <el-form-item label="开头语" prop="openingRemarks">
                        <el-input v-model="templateTable.openingRemarks" />
                    </el-form-item>
                    <el-form-item label="地点" prop="place">
                        <el-input v-model="templateTable.place" />
                    </el-form-item>
                    <el-form-item label="讲师" prop="lecturer">
                        <el-input v-model="templateTable.lecturer" />
                    </el-form-item>
                    <el-form-item label="时间" prop="time">
                        <el-date-picker v-model="templateTable.time" type="daterange" range-separator="至"
                            start-placeholder="开始日期" end-placeholder="结束日期" size="large" />
                    </el-form-item>
                    <el-form-item label="备注" prop="remarks">
                        <el-input v-model="templateTable.remarks" />
                    </el-form-item>
                    <el-form-item label="链接" prop="link">
                        <el-input v-model="templateTable.link" />
                    </el-form-item>
                    <div style="display:flex">
                        <el-form-item>
                            <el-button type="danger" :disabled="lock" @click="onSubmit">发布</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="info" :disabled="lock" @click="resetForm">重置</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref, reactive, onMounted, watch, watchEffect } from 'vue';
import { getSourceList } from '@a/sourceList'
import { ElMessage } from "element-plus";
import { messageRelease } from '@a/sourceList'

//定义选择数据
const selectData = reactive({
    selectValue: '',
    userRole: []
})

//定义锁
const lock = ref(false)

const sourceListData: any = ref([])


const formTemplate = ref()


const getSourceListData = async () => {
    const res = await getSourceList()
    let arr = res.data.data.list

    //洗数据
    arr.forEach((item: any, index: any) => {
        let obj: any = {}
        obj.label = item.sourceName
        obj.value = item.id
        sourceListData.value.push(obj)
    })
}
onMounted(() => {
    getSourceListData()
})


//定义模板表格
const templateTable = reactive<any>({
    openingRemarks: '',
    place: '',
    lecturer: '',
    remarks: '',
    link: '',
    time: []
})

const onSubmit = () => {
    lock.value = true
    //先校验上面的
    if (selectData.selectValue == '') {
        ElMessage({
            message: '请选择课程!',
            type: 'error',
            duration: 1000,
            onClose: () => {
                lock.value = false
            }
        })
        return
    }
    if (selectData.userRole.length == 0) {
        ElMessage({
            message: '请选则发送对象!',
            type: 'error',
            duration: 1000,
            onClose: () => {
                lock.value = false
            }
        })
        return
    }

    formTemplate.value.validate().
        then(() => {
            messageRelease({ ...templateTable, ...selectData }).then((res) => {
                if (res.data.code == 200) {
                    ElMessage({
                        message: res.data.msg,
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            lock.value = false
                            //清空表單
                            formTemplate.value.resetFields()
                        }
                    })
                }
            })
        }).catch(() => {
            ElMessage({
                message: '请注意校验失败位置',
                type: 'error',
                duration: 1000,
                onClose: () => {
                    lock.value = false
                }
            })

        })
}

const formName = ref()
//变单重置
const resetForm = () => {
    ElMessage({
        message: '全部重置成功',
        type: 'success',
        duration: 1000,
        onClose: () => {
            lock.value = false
            formName.value.resetFields()
            formTemplate.value.resetFields()
        }
    })



}

// 验证规则
const rules = {
    openingRemarks: [
        {
            required: true,
            // 错误提示
            message: "必须传递",
        }
    ],
    place: [
        {
            required: true,
            // 错误提示
            message: "必须传递",
        }
    ],
    lecturer: [
        {
            required: true,
            // 错误提示
            message: "必须传递",
        }
    ],
    time: [
        {
            required: true,
            // 错误提示
            message: "必须传递",
        }
    ],
}


</script>

<style lang="less" scoped>
.MessagePostBody {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    background-color: rgb(255, 255, 255);
    border: 1px solid #e0e0e0;

    .templateBody {
        width: 60%;
    }


    .TopSearch {
        width: 100%;
    }

    .MessagePostBody-content {
        width: 60%;



        .el-form--default {
            display: flex;
            width: 600px;
            flex-direction: column;
        }

        .top {
            display: flex;
        }
    }

    .MessagePostBody-actions {
        width: 60%;
    }
}
</style>