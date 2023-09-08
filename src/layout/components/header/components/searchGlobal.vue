<template>
    <el-autocomplete class="search" v-model="state" clearable :fetch-suggestions="querySearch"
        popper-class="my-autocomplete" placeholder="请搜索菜单" @select="handleSelect">

        <template #default="{ item }">
            <div class="value">{{ item.value }}</div>
            <!-- <span class="link">{{ item.link }}</span> -->
        </template>
    </el-autocomplete>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Edit } from '@element-plus/icons-vue'
import { routes } from '@r/index'
import { useRouter } from 'vue-router'
const router = useRouter()


interface LinkItem {
    value: string
    link: string
}

const state = ref('')
const links = ref<LinkItem[]>([])

const querySearch = (queryString: string, cb) => {
    const results = queryString ? links.value.filter(createFilter(queryString)) : links.value
    // call callback function to return suggestion objects
    cb(results)
}
const createFilter = (queryString) => {
    return (restaurant) => {
        return (
            restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
    }
}


const searchList = routes[0].children.map(item => {
    return { value: item.meta.table.title }
})




const loadAll = () => {
    return searchList
}
const handleSelect = (obj: LinkItem) => {
    //遍历获取
    routes[0].children.forEach(element => {

        if (element.meta.table.title === obj.value) {
            router.push(element.meta.table.path)

        }
    });
}



onMounted(() => {
    links.value = loadAll()
})



</script>


<style lang="less" scoped>
.my-autocomplete li {
    line-height: normal;
    padding: 7px;
}

.my-autocomplete li .name {
    text-overflow: ellipsis;
    overflow: hidden;
}

.my-autocomplete li .addr {
    font-size: 12px;
    color: #b4b4b4;
}

.my-autocomplete li .highlighted .addr {
    color: #ddd;
}

.el-autocomplete {
    position: fixed !important;
    top: 200px;
}

.search {
    position: fixed;
    top: 200px;
}
</style>