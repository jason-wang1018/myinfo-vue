<template>
    <el-tabs 
        v-model="editableTabsValue" 
        type="card" 
        editable 
        class="demo-tabs"
        @edit="handleTabsEdit"
       
        >

        <el-tab-pane 
        v-for="item in editableTabs"  
        :closable="true"   
        :key="item.name" 
        :label="item.title" 
        :name="item.name">

        <!-- <template #label>
             <span>哈哈</span>
        </template> -->
        
        </el-tab-pane>

    </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabPaneName } from 'element-plus'

let tabIndex = 2
const editableTabsValue = ref('3')
const editableTabs = ref([
    {
        title: '首页',
        name: '1',
    },
    {
        title: '仪表盘',
        name: '2',
    },
    {
        title: '高德地图',
        name: '3',
    },
])

const handleTabsEdit = (
    targetName: TabPaneName | undefined,
    action: 'remove' | 'add'
) => {
    if (action === 'add') {
        const newTabName = `${++tabIndex}`
        editableTabs.value.push({
            title: 'New Tab',
            name: newTabName,
            // content: 'New Tab content',
        })
        editableTabsValue.value = newTabName
    } else if (action === 'remove') {
        const tabs = editableTabs.value
        let activeName = editableTabsValue.value
        if (activeName === targetName) {
            tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        activeName = nextTab.name
                    }
                }
            })
        }

        editableTabsValue.value = activeName
        editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
    }
}
</script>
<style>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.el-tabs__header {
    margin: 0px;
}
</style>
