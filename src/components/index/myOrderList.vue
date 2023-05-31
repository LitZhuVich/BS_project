<template>
  <el-input
    v-model="search"
    placeholder="输入情况说明内容查找对应的工单"
    :prefix-icon="Search"
    maxlength="50"
    show-word-limit
  />
  <el-table
    :data="filterTableData"
    style="width: 100%"
    stripe
    v-loading="loading"
    :height="TableHeight"
  >
    <el-table-column prop="status" label="工单状态" width="140" fixed>
      <template #default="scope: any">
        <div style="display: flex; align-items: center">
          <el-tag :type="tagStatusType(scope.row.state.status)">
            {{ scope.row.state.status }}
          </el-tag>
          <el-tag
            :type="tagSituationsType(scope.row.state.situations)"
            effect="plain"
          >
            {{ scope.row.state.situations }}
          </el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="content" label="工单情况说明" />
  </el-table>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import ApiClient from "../../request/request";
import type { apiResponseUser } from "../../model/interface";
import { useIndexStore } from "../../store/store";
import { storeToRefs } from "pinia";
const breadcrumb = useIndexStore();
const { TableHeight } = storeToRefs(breadcrumb);
interface tableType {
  state: {
    status: string;
    situations: string;
  };
  content: string;
}
const loading = ref<boolean>(true);
// 存储表单数据变量
const tableData = ref<tableType[]>([]);
const apiClient = ApiClient.getInstance();
// 获取表单数据
const getTableData = async () => {
  const resUserInfo = await apiClient.get<apiResponseUser>("/user");
  const res = await apiClient.get<any>("/order/user/" + resUserInfo!.data.id);
  tableData.value = res.data.map((item: any) => ({
    state: {
      status: item.status,
      situations: item.priority,
    },
    content: item.description,
  }));
  loading.value = false;
};

// 接收输入框的值
const search = ref("");
// 过滤显示
const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.content.toLowerCase().includes(search.value.toLowerCase())
  )
);

// 接收接收状态标签内容
const tagStatusType = (value: string): string => {
  switch (value) {
    case "待处理":
      return "warning";
    case "待确认":
      return "danger";
    case "处理中":
      return ""; // 默认是 primary
    case "已接收":
      return "warning";
    case "已完成":
      return "success";
    case "已超时":
      return "danger";
    default:
      return "danger";
  }
};
// 接收紧急情况标签内容
const tagSituationsType = (value: string): string => {
  switch (value) {
    case "一般":
      return "info";
    case "紧急":
      return "danger";
    default:
      return "danger";
  }
};
onMounted(() => {
  getTableData();
});
</script>
<style lang="scss" scoped>
.el-tag {
  margin: 3px;
  cursor: pointer;
}
</style>
