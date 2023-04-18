<template>
  <el-container class="layout-container-demo">
    <el-aside width="180px">
      <AsideBar />
    </el-aside>
    <el-container style="height: 100vh">
      <el-main>
        <HeaderBar />
        <router-view name="Content" />
        <!-- 当前页面的子路由会在 router-view 里面展示 -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
import { useRoute } from "vue-router";
// import { useBreadcrumbStore } from "../store/breadcrumb";
// import { storeToRefs } from "pinia";
// 引入组件
import AsideBar from "../components/Aside.vue"; // 侧边栏
import ApiClient from "../request/request";
import HeaderBar from "../components/Header.vue";
const route = useRoute();

// TODO:测试用户登录之后的功能
const apiClient = new ApiClient();
apiClient.get("/user").then((response: any) => console.log(response.user));
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
  display: grid;
  grid-template-rows: 1fr 5fr;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
