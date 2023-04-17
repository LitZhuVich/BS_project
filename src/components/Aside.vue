<template>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu active-text-color="#0065f8" router default-active="/index" text-color="#fff" unique-opened="true"
                background-color="#31c3f6">
                <!-- 首页控制台 -->
                <el-menu-item index="/index">
                    <el-icon>
                        <HomeFilled />
                    </el-icon>
                    <span>首页控制台</span>
                </el-menu-item>
                <!-- 工单管理：发起工单、我的工单、代办工单池、工单列表 -->
                <el-sub-menu>
                    <template #title>
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>工单管理</span>
                    </template>
                    <el-menu-item-group title="">
                        <el-menu-item index="/order/post">发起工单</el-menu-item>
                        <el-menu-item index="/order/mine">我的工单</el-menu-item>
                        <el-menu-item index="/order/toBeDone">代办工单池</el-menu-item>
                        <el-menu-item index="/order/list">工单列表</el-menu-item>
                        <!-- 工单设置：工单模板、分派路由 -->
                        <el-menu-item index="/order/setting">工单设置</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                <!-- 组织架构：部门管理、技能管理、工程师管理 -->
                <el-menu-item index="/organization">
                    <el-icon>
                        <Menu />
                    </el-icon>
                    <span>组织架构</span>
                </el-menu-item>
                <!-- 工程师日历 -->
                <el-menu-item index="/engineerCalendar">
                    <el-icon>
                        <Calendar />
                    </el-icon>
                    <span>工程师日历</span>
                </el-menu-item>
                <!-- 客户管理：客户列表、添加会员 -->
                <el-menu-item index="/customerManagement">
                    <el-icon>
                        <User />
                    </el-icon>
                    <span>客户管理</span>
                </el-menu-item>
                <!-- 资产管理：资产清单、资产分类、添加资产、分派资产 -->
                <el-sub-menu index="/asset">
                    <template #title>
                        <el-icon>
                            <Discount />
                        </el-icon>
                        <span>资产管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/asset/inventory">资产清单</el-menu-item>
                        <el-menu-item index="/asset/catefory">资产分类</el-menu-item>
                        <el-menu-item index="/asset/add">添加资产</el-menu-item>
                        <el-menu-item index="/asset/assingn">分派资产</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                <!-- 系统设置：个人中心、公司设置 -->
                <el-menu-item index="/setting">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>系统设置</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
    Document,
    Menu as IconMenu,
    Setting,
    HomeFilled,
    Discount,
    User,
    Calendar,
    Menu,
} from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { useBreadcrumbStore } from "../store/breadcrumb";
import { storeToRefs } from "pinia";

const route = useRoute();
const breadcrumb = useBreadcrumbStore();

</script>

<style scoped lang="scss">
// 引入全局样式文件
@import "../GlobalStyle.scss";

.el-menu {
    // 高度撑满
    height: 100vh;
}
</style>
