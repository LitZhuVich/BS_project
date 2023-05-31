<template>
  <!-- #0065f8 -->
  <el-menu
    active-text-color="#000000"
    router
    :default-active="$route.path"
    text-color="#fff"
    :unique-opened="true"
    background-color="#31c3f6"
  >
    <div class="logo-bar">
      <el-icon>
        <SetUp />
      </el-icon>
    </div>
    <!-- 首页控制台 -->
    <el-menu-item index="/index">
      <el-icon>
        <HomeFilled />
      </el-icon>
      <span>首页控制台</span>
    </el-menu-item>
    <!-- 工单管理：发起工单、我的工单、代办工单池、工单列表 -->
    <el-sub-menu index="/order">
      <template #title>
        <el-icon>
          <document />
        </el-icon>
        <span>工单管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          index="/order/post"
          v-if="userInfo.role_name != 'engineer'"
        >
          发起工单
        </el-menu-item>
        <el-menu-item index="/order/mine">我的工单</el-menu-item>
        <el-menu-item
          index="/order/toBeDone"
          v-if="userInfo.role_name != 'customer_representative'"
        >
          代办工单池
        </el-menu-item>
        <el-menu-item
          index="/order/list"
          v-if="userInfo.role_name != 'customer_representative'"
        >
          工单列表
        </el-menu-item>
        <!-- 工单设置：工单模板、分派路由 -->
        <el-menu-item
          index="/order/setting"
          v-if="userInfo.role_name == 'admin'"
        >
          工单设置
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <!-- 组织架构：部门管理、技能管理、工程师管理 -->
    <el-menu-item index="/organization" v-if="userInfo.role_name == 'admin'">
      <el-icon>
        <IconMenu />
      </el-icon>
      <span>组织架构</span>
    </el-menu-item>
    <!-- 工程师日历 -->
    <el-menu-item
      index="/engineerCalendar"
      v-if="userInfo.role_name == 'admin'"
    >
      <el-icon>
        <Calendar />
      </el-icon>
      <span>工程师日历</span>
    </el-menu-item>
    <!-- 客户管理：客户列表、添加会员 -->
    <el-menu-item
      index="/customerManagement"
      v-if="userInfo.role_name == 'admin'"
    >
      <el-icon>
        <User />
      </el-icon>
      <span>客户管理</span>
    </el-menu-item>
    <!-- 资产管理：资产清单、资产分类、添加资产、分派资产 -->
    <el-sub-menu index="/asset" v-if="userInfo.role_name == 'admin'">
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
      <span> 个人信息 </span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import {
  SetUp,
  Document,
  Menu as IconMenu,
  Setting,
  HomeFilled,
  Discount,
  User,
  Calendar,
} from "@element-plus/icons-vue";
// 接收父元素的数据
const props = defineProps(["userInfo"]);
</script>

<style scoped lang="scss">
// 引入全局样式文件
@import "../GlobalStyle.scss";

.el-menu {
  // 高度撑满
  height: 100vh;

  .logo-bar {
    font-size: 36px;
    text-align: center;
    color: white;
    height: 80px;
    line-height: 80px;
  }
}
</style>
