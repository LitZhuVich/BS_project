<script setup lang="ts">
import Loading from "./views/Loading.vue";
import { ref } from "vue";
const loading = ref<boolean>(false);
// 显示加载动画
const showLoading = () => {
  loading.value = true;
  // 加载时间
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};

showLoading();
</script>

<template>
  <Loading :loading="loading" text="加载中..."></Loading>
  <router-view name="main"></router-view>
</template>

<style scoped lang="scss"></style>
