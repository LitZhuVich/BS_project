<template>
  <el-input v-model="search" placeholder="输入情况说明内容查找对应的工单" :prefix-icon="Search" autosize maxlength="50"
    show-word-limit />
  <el-table :data="filterTableData" style="width: 100%" stripe :height="index.TableHeight">
    <el-table-column prop="status" label="工单状态" width="140" fixed>
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-tag :type="tagStatusType(scope.row.state.status)">
            {{ scope.row.state.status }}
          </el-tag>
          <el-tag :type="tagSituationsType(scope.row.state.situations)" effect="plain">
            {{ scope.row.state.situations }}
          </el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="content" label="工单情况说明" />
  </el-table>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useBreadcrumbStore } from "../../store/breadcrumb";
import { storeToRefs } from "pinia";
const breadcrumb = useBreadcrumbStore();
const { index } = storeToRefs(breadcrumb);
const tableData = [
  {
    state: {
      status: "待处理",
      situations: "一般",
    },
    content: "No. 189, Grove St, Los Angeles",
  },
  {
    state: {
      status: "待确认",
      situations: "一般",
    },
    content: "No. 189, Gro22s",
  },
  {
    state: {
      status: "处理中",
      situations: "紧急",
    },
    content: "No. 189, Grove St, Los Angeles",
  },
  {
    state: {
      status: "处理中",
      situations: "一般",
    },
    content: "No. 189, Grove St, Los Angeles",
  },
  {
    state: {
      status: "已接收",
      situations: "紧急",
    },
    content: "No. 189, Grove St, Los Angeles",
  },
  {
    state: {
      status: "已接收",
      situations: "紧急",
    },
    content: "No. 189, Grove St, Los Angeles",
  },
  {
    state: {
      status: "已接收",
      situations: "紧急",
    },
    content: "No. 189, Grove St, Los Angeles",
  },
  {
    state: {
      status: "已接收",
      situations: "紧急",
    },
    content: "No. 189, Grove St, Los Angeles",
  },
  {
    state: {
      status: "已接收",
      situations: "紧急",
    },
    content: "No. 189, Grove St, Los Angeles",
  },
  {
    state: {
      status: "已接收",
      situations: "紧急",
    },
    content: "No. 189, Grove St, Los Angeles",
  },
  {
    state: {
      status: "已接收",
      situations: "紧急",
    },
    content: "No. 189, Grove St, Los Angeles",
  },
];
const as = (index: number) => {
  console.log(index);
};
// 接收输入框的值
const search = ref("");
// 过滤显示
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.content.toLowerCase().includes(search.value.toLowerCase())
  )
);
// 接收接收状态标签内容
const tagStatusType = (value: string): string => {
  switch (value) {
    case "待处理":
      return "success";
    case "待确认":
      return "danger";
    case "处理中":
      return "primary";
    case "已接收":
      return "warning";
    default:
      return "状态不对";
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
      return "情况不对";
  }
};
</script>
<style lang="scss" scoped>
.el-tag {
  margin: 3px;
  cursor: pointer;
}
</style>
