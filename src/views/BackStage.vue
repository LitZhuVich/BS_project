<template>
  <el-container class="layout-container-demo">
    <el-aside width="180px">
      <AsideBar :userInfo="userInfo" />
    </el-aside>
    <el-container style="height: 100vh">
      <el-main>
        <HeaderBar :userInfo="userInfo" />
        <router-view name="Content" />
        <!-- 当前页面的子路由会在 router-view 里面展示 -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
// 引入组件
import AsideBar from "../components/Aside.vue"; // 侧边栏
import HeaderBar from "../components/Header.vue";
import { useUserStore } from "../store/store";
import { storeToRefs } from "pinia";
const userStore = useUserStore();
// 获取用户信息 保存到数据缓存中
userStore.fetchUserInfo();
const { userInfo }: any = storeToRefs(userStore);
</script>

<style scoped lang="scss">
// 引入全局样式文件
@import "../GlobalStyle.scss";

.layout-container-demo {
  height: 100vh;
  overflow: hidden;
}

.layout-container-demo .el-header {
  position: relative;
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  /* 侧边栏高度撑满 */
  height: 100vh;
  overflow: hidden !important;
}

.el-container {
  background-color: $GlobalBg;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
