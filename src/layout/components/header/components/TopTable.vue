<template>
    <el-tabs v-model="tableStore.tableIndex" @tab-click="tabClick" type="card" editable class="demo-tabs"
        @edit="handleTabsEdit">

        <el-tab-pane v-for="item in tableStore.editableTabs" :closable="false" :key="item.name" :label="item.title"
            :name="item.name">
        </el-tab-pane>

    </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabPaneName } from 'element-plus'
import {useRouter} from  'vue-router'
const router=useRouter()

import useTable from '@s/table'
const tableStore = useTable()


const tabClick = (pane: any) => {

    console.log(pane.props);
    const matching = tableStore.editableTabs.find(item => item.title == pane.props.label)
    router.push(matching!.path )

}

const handleTabsEdit = (
    targetName: TabPaneName | undefined,
    action: 'remove' | 'add'
) => {
    if (action === 'remove') {
        if (!(targetName === '1')) {
            const index = tableStore.editableTabs.findIndex(item => item.name === targetName)

            // 最后一项 跳转到前一项
            if(index==tableStore.editableTabs.length-1){
                router.replace(tableStore.editableTabs[index-1].path)
            }else{
                //不是最后一项 显示后一项
                router.replace(tableStore.editableTabs[index+1].path)
            }

            tableStore.editableTabs.splice(index, 1)

            tableStore.tableIndex=String(Number(tableStore.tableIndex)-1)
            
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
