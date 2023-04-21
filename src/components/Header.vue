<template>
  <el-page-header @back="onBack" class="header">
    <template #breadcrumb>
      <el-breadcrumb :separator-icon="ArrowRight" class="breadcrumb">
        <el-breadcrumb-item :to="{ name: 'index' }" @click="BreadcrumbListReset">
          微工单管理系统
        </el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) of list" :to="item.url" :key="index">
          {{ item.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template #content>
      <div class="flex items-center">
        <el-avatar class="mr-3" :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <span class="text-large font-600 mr-3"> Cly </span>
        <el-tag type="info" plain>admin</el-tag>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button type="danger" class="ml-2" @click="logout">登出</el-button>
      </div>
    </template>
  </el-page-header>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import { ElNotification as notify } from "element-plus";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { useBreadcrumbStore } from "../store/breadcrumb";
import { storeToRefs } from "pinia";
import ApiClient from "../request/request";
const apiClient = new ApiClient();
const route = useRoute();
const router = useRouter();
const breadcrumb = useBreadcrumbStore();
const { list }: any = storeToRefs(breadcrumb);
// 监听路由变化
onBeforeRouteUpdate((to: any, from: any, next) => {
  breadcrumb.list = to.meta.breadcrumb;
  next();
});
// 返回上一级路由
const onBack = () => {
  // notify("点击了Back");
  router.go(-1);
};
interface breadcrumbListType {
  title: string;
  url: string;
}
const breadcrumbList = ref<breadcrumbListType[]>([]);
const getBreadcrumbList = () => {
  const matched = route.matched;
  //  清空面包屑
  breadcrumbList.value = [];
  matched.forEach((item: any) => {
    if (item.meta && item.meta.breadcrumb) {
      breadcrumbList.value.push({
        title: item.meta.breadcrumb[0].title,
        url: item.meta.breadcrumb[0].url,
      });
    }
  });
  breadcrumb.list = breadcrumbList.value;
};
// 默认显示面包屑
getBreadcrumbList();
// 重置 breadcrumb
const BreadcrumbListReset = () => {
  breadcrumb.$reset();
};
// 登出
const logout = async (): Promise<void> => {
  const response = await apiClient.post("/logout");
  console.log(response);
  localStorage.removeItem("token");
  notify("登出成功");
  router.push({
    name: "login",
  });
};
</script>
<style scoped lang="scss">
.header {
  padding: 10px;
  box-sizing: border-box;
  background-color: white;
  border-bottom: 1px solid var(--el-border-color);
}
</style>
