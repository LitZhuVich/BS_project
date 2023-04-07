<template>
  <el-container class="layout-container-demo" style="height: 500px">
    <el-aside width="70px">
      <Aside />
    </el-aside>
    <el-container style="height: 100vh">
      <el-main>
        <Tabs />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";
// 引入组件
import Aside from "../components/BackStage/Aside.vue"; // 侧边栏
import Tabs from "../components/BackStage/Tabs.vue"; // 标签页

import ApiClient from "../request/request";
const apiClient = new ApiClient();
apiClient.get("/user").then((response: any) => console.log(response.user));
</script>

<style scoped lang="scss">
// 引入全局样式文件
@import "../GlobalStyle.scss";

.layout-container-demo .el-header {
  position: relative;
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  /* 侧边栏高度撑满 */
  height: 100vh;
  /* 背景颜色 */
  background-color: $AsideBg;
}

.el-container {
  background-color: $GlobalBg;
}
</style>
