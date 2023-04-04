<template>
    <div>
        <el-scrollbar>
            <!-- TODO: 有LOGO后把h1替换成LOGO -->
            <h1>8</h1>
            <el-menu :default-openeds="['1', '3']">
                <el-menu-item-group>
                    <el-menu-item index="1-1">
                        <el-icon>
                            <HomeFilled />
                        </el-icon>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                        <el-icon>
                            <Message />
                        </el-icon>
                    </el-menu-item>
                    <el-menu-item index="1-3">
                        <el-icon>
                            <Phone />
                        </el-icon>
                    </el-menu-item>
                    <el-menu-item index="1-4">
                        <el-icon>
                            <ChatDotRound />
                        </el-icon>
                    </el-menu-item>
                    <el-menu-item index="1-5">5</el-menu-item>
                    <el-menu-item index="1-6">6</el-menu-item>
                    <el-menu-item index="1-7">7</el-menu-item>
                    <el-menu-item index="1-8">
                        <el-icon>
                            <Operation />
                        </el-icon>
                    </el-menu-item>
                    <el-menu-item index="1-9">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-menu-item>
                </el-menu-item-group>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import {
    HomeFilled,
    Message,
    Phone,
    ChatDotRound,
    Operation,
    Plus,
} from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
// 引入全局样式文件
@import "../../GlobalStyle.scss";

.el-menu {
    background-color: $AsideBg;
}</style>