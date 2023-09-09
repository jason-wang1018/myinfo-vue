<template>
    <div class="rightTop">
        <el-dropdown>
            <span class="el-dropdown-link"><el-icon class="edit" @click="edit">
                    <EditPen />
                </el-icon></span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="edit('default')">默认</el-dropdown-item>
                    <el-dropdown-item @click="edit('small')">小型</el-dropdown-item>
                    <el-dropdown-item @click="edit('big')">大型</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>


        <el-tooltip class="box-item" effect="dark" @click="selectBar" content="全局搜索" placement="bottom">
            <el-icon @click="changeGlobalSearch">
                <Search />
            </el-icon>
        </el-tooltip>

        <GlobalSearch v-if="openGlobalSearch"></GlobalSearch>

        <el-switch v-model="value1" size="large" :active-action-icon="Moon" :inactive-action-icon="Sunny" active-text="夜晚"
            inactive-text="白天" inline-prompt />

        <el-badge :value="3" class="item" type="primary">
            <el-icon ref="buttonRef" v-click-outside="onClickOutside">
                <Bell />
            </el-icon>

            <el-popover ref="popoverRef" :virtual-ref="buttonRef" trigger="click" width="200px" title="通知"
                virtual-triggering>
                <span>前往github源网站 <a href="http://www.baidu.com">点这里</a></span>
            </el-popover>
        </el-badge>

        <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom">
            <el-icon @click="fullScreen">
                <FullScreen />
            </el-icon>
        </el-tooltip>



        <el-tooltip class="box-item" effect="dark" content="主题设置" placement="bottom">
            <el-icon>
                <Setting />
            </el-icon>
        </el-tooltip>


        <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link avatarTop">
                <img class="imgTop" :src="userInfoStore.avatar" alt="">
                <span>{{userInfoStore.username}}</span>
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click="clearUserInfoAll">退出登陆</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import {
    EditPen,
    Search,
    Bell,
    FullScreen,
    Setting,
    ArrowDown,
    Sunny,
    Moon
} from '@element-plus/icons-vue'
import { ref, unref, watch } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
const buttonRef = ref()
const popoverRef = ref()
import userUserInfo from '@/stores/user'
const  userInfoStore = userUserInfo()
import {clearUserInfo} from '@u/user'
import {useRouter} from 'vue-router'
const router = useRouter()

const clearUserInfoAll = () => {
    clearUserInfo()
    router.go(0)
}

const onClickOutside = () => {
    unref(popoverRef).popperRef?.delayHide?.()
}

const value1 = ref(false)

watch(value1, (newValue) => {

    if (newValue == true) {
        //黑夜
        document.documentElement.classList.add('dark') // 添加暗黑主题

    } else {
        document.documentElement.classList.remove('dark') // 添加暗黑主题
    }
}
)

const selectBar = () => {

}

//点击按钮实现全屏
const fullScreen = () => {
    console.log("///");


    //DOM对象的一个属性：可以用来判断当前是不是全屏模式（全屏： true  不是全屏：false）
    let full = document.fullscreenElement

    //切换为全屏
    if (!full) {
        //利用requestFullscreen方法实现全屏
        document.documentElement.requestFullscreen()

    } else {
        //退出全屏
        document.exitFullscreen()
    }

}
const openGlobalSearch = ref(false)//全局搜索
import GlobalSearch from './searchGlobal.vue'

const  changeGlobalSearch=()=>{
    openGlobalSearch.value=!openGlobalSearch.value
}

const edit=(font:string)=>{
    if(font=='default'){
        //设置body字体
        document.body.style.fontSize='16px'
    }else if(font=='small'){
        //设置body字体
        document.body.style.fontSize='14px'
    }else if(font=='bog'){
        //设置body字体
        document.body.style.fontSize='18px'
    }
}

</script>

<style lang="less" scoped>
.block-col-2 .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}

.imgTop {
    width: 40px;
    border-radius: 50%;
    margin: 0px 5px;
}

.rightTop {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-size: 22px;

    .avatarTop {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        margin: 0px 20px
    }

    & .el-icon {
        margin: 0px 8px;
    }
}

.el-dropdown-link:focus {
    outline: none;
}


.edit {
    font-size: 22px;
}
</style>