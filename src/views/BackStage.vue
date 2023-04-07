<template>
  <el-container class="layout-container-demo">
    <el-aside width="70px">
      <Aside />
    </el-aside>
<<<<<<< HEAD

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px">
              <setting />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>

=======
    <el-container style="height: 100vh">
>>>>>>> 4599645dc971e843bd4f76a8cc136be2c471ca06
      <el-main>
        <Tabs />
      </el-main>
<<<<<<< HEAD
      <el-container style="height: 100vh">
        <el-main>
          <Tabs />
        </el-main>
      </el-container>
=======
>>>>>>> 4599645dc971e843bd4f76a8cc136be2c471ca06
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
.layout-container-demo {
  height: 100vh;
  overflow: hidden;
}
.layout-container-demo .el-header {
  position: relative;
  color: var(--el-text-color-primary);
<<<<<<< HEAD
  position: relative;
  color: var(--el-text-color-primary);
=======
>>>>>>> 4599645dc971e843bd4f76a8cc136be2c471ca06
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
<<<<<<< HEAD

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
=======
>>>>>>> 4599645dc971e843bd4f76a8cc136be2c471ca06
</style>
