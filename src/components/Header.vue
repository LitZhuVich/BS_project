<template>
  <el-page-header @back="onBack" class="header">
    <template #breadcrumb>
      <el-breadcrumb :separator-icon="ArrowRight" class="breadcrumb">
        <el-breadcrumb-item :to="{ name: 'index' }" @click="BreadcrumbListReset">
          微工单管理系统
        </el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) of list" :to="(item as any).url" :key="index">
          {{ (item as any).title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template #content>
      <div class="flex items-center">
        <el-avatar class="mr-3" :size="32" :src="userInfo.avator" />
        <span class="text-large font-600 mr-3"> {{ userInfo.username }} </span>
        <el-tag type="info" plain class="permissions">
          {{ roleNamae }}
        </el-tag>
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
import { computed, ref } from "vue";

import { ArrowRight } from "@element-plus/icons-vue";
import { ElNotification as notify } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import type { apiResponseData } from "../model/interface";
import { useBreadcrumbStore, useUserStore } from "../store/store";
import { storeToRefs } from "pinia";
import ApiClient from "../request/request";
const apiClient = ApiClient.getInstance();
const route = useRoute();
const router = useRouter();
// 接收父元素的数据
const props = defineProps(["userInfo"]);

// 实例化
const breadcrumbStore = useBreadcrumbStore();
const UserStore = useUserStore();
// 执行方法
breadcrumbStore.getBreadcrumbList(route);
breadcrumbStore.updateBreadcrumb();
// 响应式 数据
const { list }: any = storeToRefs(breadcrumbStore);
// 返回上一级路由
const onBack = () => {
  // notify("点击了Back");
  router.go(-1);
};
// 计算客户角色转换为中文
let roleNamae = computed(() => {
  switch (props.userInfo.role_name) {
    case "admin":
      return "管理员";
    case "engineer":
      return "工程师";
    case "customer_representative":
      return "客户";
    default:
      return "你是？";
  }
});
// 重置 breadcrumbStore
const BreadcrumbListReset = () => {
  breadcrumbStore.ResertBreadcrumb();
  // breadcrumbStore.$reset();
};
// 登出
const logout = async (): Promise<void> => {
  try {
    const response: apiResponseData = await apiClient.post<apiResponseData>(
      "/logout"
    );
    localStorage.removeItem("token");
    UserStore.clearUserInfo();
    notify(response!.data);
    router.push({
      name: "login",
    });
  } catch (error) {
    console.log(error);
  }
};
</script>
<style scoped lang="scss">
.header {
  padding: 10px;
  box-sizing: border-box;
  background-color: white;
  border-bottom: 1px solid var(--el-border-color);

  .permissions {
    margin-left: 1rem;
  }
}
</style>
