<template>
    <div class="rightTop">
        <el-dropdown>
            <span class="el-dropdown-link"><el-icon class="edit">
                    <EditPen />
                </el-icon></span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>默认</el-dropdown-item>
                    <el-dropdown-item>小型</el-dropdown-item>
                    <el-dropdown-item>大型</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>


        <el-tooltip class="box-item" effect="dark" content="主题设置" placement="bottom">
            <el-icon>
                <Search />
            </el-icon>
        </el-tooltip>


        <el-badge :value="3" class="item" type="primary">
            <el-icon ref="buttonRef" v-click-outside="onClickOutside"><Bell /></el-icon>

            <el-popover ref="popoverRef" :virtual-ref="buttonRef" trigger="click" width="200px" title="通知" virtual-triggering>
                <span>前往github源网站 <a href="http://www.baidu.com">点这里</a></span>
            </el-popover>
        </el-badge>

        <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom">
            <el-icon>
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
                <img class="imgTop" src="https://image-1gi.pages.dev/file/adcab20d47f56e1a2aa30.jpg" alt="">
                <span> admin</span>
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出登陆</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import {
    Check,
    CircleCheck,
    CirclePlus,
    CirclePlusFilled,
    Plus,
    EditPen,
    Search,
    Bell,
    FullScreen,
    Setting,
    ArrowDown
} from '@element-plus/icons-vue'
import { ref, unref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
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