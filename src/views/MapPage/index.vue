<template>
    <div id="container">
        <div class="mt-1 searchBar">
            <el-input v-model="searchValue" id="searchInput" placeholder="请输入搜索关键字" class="input-with-select">
                <template #prepend>
                    <el-select v-model="SearchCity" placeholder="选择城市" style="width: 105px">
                        <el-option label="合肥" value="1" />
                        <el-option label="南京" value="2" />
                        <el-option label="芜湖" value="3" />
                    </el-select>
                </template>
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef } from '@vue/reactivity'
import { onMounted, onUnmounted } from 'vue'
import { ref } from 'vue'


const map = shallowRef(null);


//input框输入的值
const searchValue = ref('spa')
//下拉框的值city
const SearchCity = ref('合肥')


//new AMap.AutoComplete的配置实例
let searchAuto: any = null
//搜索的实例
let placeSearch:any = null


//根据搜索组件搜索到以后的地点信息
let searchHere = null

//input的id
const autoOptions = {
    input: 'searchInput' //绑定的搜索关键字的input标签ID，用这个注册
}




const initMap = () => {
    AMapLoader.load({
        key: "14c173eda4395a23da962c11f86704a3",             // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType',
            'AMap.Geolocation', 'AMap.AutoComplete', 'AMap.PlaceSearch', 'AMap.Geocoder', 'AMap.AutoComplete', 'AMap.PlaceSearch'],  // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap) => {
        map.value = new AMap.Map("container", {  //设置地图容器id
            viewMode: "3D",    //是否为3D地图模式
            zoom: 10,           //初始化地图级别
            center: [117.17, 31.52],
            mapStyle: 'amap://styles/macaron',//初始化地图中心点位置
        });
        map.value!.addControl(new AMap.Scale())
        map.value!.addControl(new AMap.ToolBar())
        map.value!.addControl(new AMap.HawkEye())
        map.value!.addControl(new AMap.MapType())
        map.value!.addControl(new AMap.Geolocation())

        // //搜索地址
        // placeSearch = new AMap.PlaceSearch({
        //     // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
        //     city: SearchCity.value
        // });
        // placeSearch.search(searchValue.value, function (status, result) {
        //     // 查询成功时，result即对应匹配的POI信息
        //     console.log(result);
        // });
        searchAuto = new AMap.AutoComplete(autoOptions)
        //
        placeSearch = new AMap.PlaceSearch({
            map: map.value
        }) //构造地点查询类
        searchAuto.on('select', select)//绑定查询事件

    }).catch(e => {
        console.log(e);
    })
}


//poi搜索 这里面的这个参数 e 就是搜索以后的地址信息 
const select = (e) => {
    // placeSearch.setCity(e.poi.adcode) //依据城市ID搜索
    placeSearch.search(e.poi.name) //关键字查询查询
    map.value!.setZoom(10, true)
    searchHere = e.poi
    // this.$message({
    //     message: '选择地点:' + this.searchHere.name,
    //     type: 'success'
    // });
}




onMounted(() => {
    initMap()
})

onUnmounted(() => {
    map.value!.destroy()
})


</script>

<style lang="less" scoped>
#container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
    position: relative;
}

.input-with-select {
    width: 470px;
}

.searchBar {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 99999999999;
    color: pink;

    .el-input__inner {
        text-align: center;
    }
}
</style>