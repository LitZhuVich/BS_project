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
const axios = new ApiClient();
const registerdata = {
  username: "test3",
  password: "test3",
  password_confirmation: "test3",
};
const logindata = {
  username: "litzhu",
  password: "litzhu",
};
interface tokenType {
  token: string;
}

await axios
  .post("/login", logindata)
  .then((response: any) => {
    console.log(response.token);
    localStorage.setItem("token", response.token);
  })
  .catch((error) => {
    console.log(error.message);
  });

await axios
  .get("/user")
  .then((response: any) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error.message);
  });
const item = {
  date: "2016-05-02",
  name: "Tom",
  address: "No. 189, Grove St, Los Angeles",
};
const tableData = ref(Array.from({ length: 20 }).fill(item));
</script>

<style scoped lang="scss">
// 引入全局样式文件
@import "../GlobalStyle.scss";

.layout-container-demo .el-header {
  position: relative;
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  /* 侧边栏高度撑满 */
  height: 100vh;
  /* 背景颜色 */
  background-color: $AsideBg;
}
</style>
