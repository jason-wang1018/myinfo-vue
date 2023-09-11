<template>
    <el-tabs v-model="tableStore.tableIndex" @tab-click="tabClick" type="card" editable class="demo-tabs"
        @edit="handleTabsEdit">

        <el-tab-pane v-for="item in tableStore.editableTabs"  :closable="false" :key="item.name" :label="item.title"
            :name="item.name">
        </el-tab-pane>

    </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabPaneName } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()

import useTable from '@s/table'
const tableStore = useTable()


const tabClick = (pane: any) => {
    const matching = tableStore.editableTabs.find(item => item.title == pane.props.label)
    router.push(matching!.path)

}

const handleTabsEdit = (
    targetName: TabPaneName | undefined,
    action: 'remove' | 'add'
) => {
    if (action === 'remove') {
        if (!(targetName === '1')) {
            const index = tableStore.editableTabs.findIndex(item => item.name === targetName)
            console.log(index);

            //判断删除的是不是最后一项
            if (index == tableStore.editableTabs.length - 1 ) {
                //最后一项让tableIndex为数组里面倒数第二相的name的值
                tableStore.tableIndex = tableStore.editableTabs[index - 1].name
                //删除当前项
                tableStore.editableTabs.splice(index, 1)
                //跳到当前前一页
                router.replace(tableStore.editableTabs[index - 1].path)
            } else {
                //不是最后一页并且 当前的下标就是当前
                if (index+1 == Number(tableStore.tableIndex) || targetName==Number(tableStore.tableIndex)) {
                    console.log('+++++');
                    //不是最后一项 显示后一项
                    tableStore.tableIndex = tableStore.editableTabs[index + 1].name
                    //删除当前项
                    tableStore.editableTabs.splice(index, 1)
                    //跳到当前后一页
                    router.replace(tableStore.editableTabs[index].path)
                }else{
                    //不是最后一页 并且当前的下标不是当前 直接删掉就好不用跳转
                    tableStore.editableTabs.splice(index, 1)
                }
            }
            // tableStore.tableIndex=String(Number(tableStore.tableIndex)-1) 
        }
    }
}
</script>

<style>
.demo-tabs>.el-tabs__content {
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
    height: 0px;

}

.el-tabs__header {
    margin: 0px;
}
</style>
