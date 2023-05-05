<template>
  <div class="content">
    <div class="top-operation">
      <h4>我的工单</h4>
      <div style="display: flex">
        <el-select v-model="searchOptionChoosed">
          <el-option
            v-for="item in searchOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input
          v-model="search"
          placeholder="输入情况说明内容查找对应的工单"
          :prefix-icon="Search"
          autosize
          maxlength="50"
          class="search-box"
          show-word-limit
        />
        <el-button :icon="Search">高级查询</el-button>
      </div>
    </div>
    <el-table :data="filterTableData" stripe style="width: 100%" height="400">
      <el-table-column type="selection" />
      <el-table-column prop="code" label="编码" />
      <el-table-column prop="orderStatus" label="工单状态">
        <template #default="scope: any">
          <div style="display: flex; align-items: center">
            <el-tag :type="tagStatusType(scope.row.orderStatus)">
              {{ scope.row.orderStatus }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="customerService" label="客服姓名" />
      <el-table-column prop="priority" label="工单优先级">
        <template #default="scope: any">
          <div style="display: flex; align-items: center">
            <el-tag :type="tagSituationsType(scope.row.priority)">
              {{ scope.row.priority }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="founder" label="创建人" />
      <el-table-column prop="type" label="工单类型" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column prop="source" label="工单来源" />
      <el-table-column prop="target" label="SLA服务目标" />
      <el-table-column prop="timeLeft" label="剩余时间" />
      <el-table-column prop="description" label="工单描述" />
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { Search } from "@element-plus/icons-vue";
// 表单数据
const tableData = [
  {
    code: "21231",
    orderStatus: "处理中",
    title: "服务器故障",
    customerService: "张晶晶",
    priority: "一般",
    createTime: "2022-12-06 14:58:14",
    founder: "管理组|盛军测试",
    type: "",
    source: "工单工作台",
    target: "按时解决",
    updateTime: "2022-12-06 15:01:57",
    description: "测试",
  },
  {
    code: "432543534",
    orderStatus: "处理中",
    title: "服务器故障",
    customerService: "张晶晶",
    priority: "紧急",
    createTime: "2022-12-06 14:58:14",
    founder: "管理组|盛军测试",
    type: "",
    source: "工单工作台",
    target: "按时解决",
    updateTime: "2022-12-06 15:01:57",
    description: "测试",
  },
  {
    code: "23423324",
    orderStatus: "处理中",
    title: "服务器故障",
    customerService: "张晶晶",
    priority: "一般",
    createTime: "2022-12-06 14:58:14",
    founder: "管理组|盛军测试",
    type: "",
    source: "工单工作台",
    target: "按时解决",
    updateTime: "2022-12-06 15:01:57",
    description: "测试",
  },
  {
    code: "7865",
    orderStatus: "待处理",
    title: "服务器故障",
    customerService: "张晶晶",
    priority: "紧急",
    createTime: "2022-12-06 14:58:14",
    founder: "管理组|盛军测试",
    type: "",
    source: "工单工作台",
    target: "按时解决",
    updateTime: "2022-12-06 15:01:57",
    description: "测试",
  },
  {
    code: "34543",
    orderStatus: "待处理",
    title: "服务器故障",
    customerService: "张晶晶",
    priority: "一般",
    createTime: "2022-12-06 14:58:14",
    founder: "管理组|盛军测试",
    type: "",
    source: "工单工作台",
    target: "按时解决",
    updateTime: "2022-12-06 15:01:57",
    description: "测试",
  },
];
const as = (index: number) => {
  console.log(index);
};
// 选择的搜索方式
const searchOptionChoosed = ref("code");
// 搜索方式
const searchOptions = [
  {
    value: "code",
    label: "编码",
  },
  {
    value: "customerService",
    label: "客服姓名",
  },
  {
    value: "status",
    label: "工单状态",
  },
  {
    value: "priority",
    label: "优先级",
  },
  {
    value: "founder",
    label: "创建人",
  },
  {
    value: "type",
    label: "工单类型",
  },
  {
    value: "source",
    label: "工单来源",
  },
  {
    value: "target",
    label: "SLA服务目标",
  },
];
// 接收输入框的值
const search = ref("");
// 过滤显示
const filterTableData = computed(() =>
  tableData.filter((data) => searchOption(data))
);
// 查询方法
const searchOption = (data: any) => {
  switch (searchOptionChoosed.value) {
    case "code":
      return (
        !search.value ||
        data.code.toLowerCase().includes(search.value.toLowerCase())
      );
    case "status":
      return (
        !search.value ||
        data.orderStatus.toLowerCase().includes(search.value.toLowerCase())
      );
    case "customerService":
      return (
        !search.value ||
        data.customerService.toLowerCase().includes(search.value.toLowerCase())
      );
    case "priority":
      return (
        !search.value ||
        data.priority.toLowerCase().includes(search.value.toLowerCase())
      );
    case "founder":
      return (
        !search.value ||
        data.founder.toLowerCase().includes(search.value.toLowerCase())
      );
    case "type":
      return (
        !search.value ||
        data.type.toLowerCase().includes(search.value.toLowerCase())
      );
    case "source":
      return (
        !search.value ||
        data.source.toLowerCase().includes(search.value.toLowerCase())
      );
    case "target":
      return (
        !search.value ||
        data.target.toLowerCase().includes(search.value.toLowerCase())
      );
  }
};
// 接收接收状态标签内容
const tagStatusType = (value: string): string => {
  switch (value) {
    case "待处理":
      return "success";
    case "待确认":
      return "danger";
    case "处理中":
      return "";
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
.content {
  height: calc(100% - 140px);
  background-color: white;
  margin: 10px;
  padding: 10px;

  .top-operation {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-select {
      width: 150px;
      height: 80%;
      margin-right: 10px;
    }

    .search-box {
      width: 500px;
      font-size: 14px;
      margin-right: 10px;
    }
  }

  .el-tag {
    margin: 3px;
    cursor: pointer;
  }
}
</style>
