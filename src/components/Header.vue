<template>
  <el-page-header @back="onBack" class="header">
    <template #breadcrumb>
      <el-breadcrumb :separator-icon="ArrowRight" class="breadcrumb">
        <el-breadcrumb-item
          :to="{ name: 'index' }"
          @click="BreadcrumbListReset"
        >
          微工单管理系统
        </el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="(item, index) of list"
          :key="index"
          :to="item.path"
        >
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template #content>
      <div class="flex items-center">
        <el-avatar
          class="mr-3"
          :size="32"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span class="text-large font-600 mr-3"> litzhu </span>
        <el-tag type="info" plain>admin</el-tag>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button type="danger" class="ml-2">登出</el-button>
      </div>
    </template>
  </el-page-header>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import { ElNotification as notify } from "element-plus";
import { useRoute } from "vue-router";
import { useBreadcrumbStore } from "../store/breadcrumb";
import { storeToRefs } from "pinia";
const route = useRoute();
const breadcrumb = useBreadcrumbStore();
const { list }: any = storeToRefs(breadcrumb);
// console.log(breadcrumb.list);

const emit = defineEmits(["getBreadcrumbList"]);
const onBack = () => {
  notify("点击了Back");
};
interface breadcrumbListType {
  name: {
    breadcrumb?: string;
  };
  path: string;
}
const breadcrumbList = ref<breadcrumbListType[]>([]);
const getBreadcrumbList = () => {
  const matched = route.matched;
  //  清空面包屑
  breadcrumbList.value = [];
  matched.forEach((item) => {
    if (item.meta.breadcrumb) {
      breadcrumbList.value.push({
        name: item.meta.breadcrumb,
        path: item.path,
      });
    }
  });
  breadcrumb.list = breadcrumbList.value;
  emit("getBreadcrumbList", list);
};

getBreadcrumbList();
// 重置 breadcrumb
const BreadcrumbListReset = () => {
  breadcrumb.$reset();
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
