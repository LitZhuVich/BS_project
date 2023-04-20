<template>
  <div class="whole">
    <div class="top-operation">
      <h5>待办工单</h5>
      <div style="display: flex;">
        <el-select v-model="searchOptionChoosed">
          <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input v-model="search" class="search-box" placeholder="请输入编号" :suffix-icon="Search" />
      </div>
    </div>
    <el-table :data="filterTableData" stripe style="width: 100%">
      <el-table-column type="selection" />
      <el-table-column prop="code" label="编码" />
      <el-table-column prop="orderStatus" label="工单状态">
        <template #default="scope">
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
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-tag :type="tagSituationsType(scope.row.priority)" effect="plain">
              {{ scope.row.priority }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="founder" label="创建人" />
      <el-table-column prop="type" label="工单类型" />
      <el-table-column prop="source" label="工单来源" />
      <el-table-column prop="target" label="SLA服务目标" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column prop="description" label="工单描述" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
// 引入图标
import { Search } from '@element-plus/icons-vue'
const as = (index: number) => {
  console.log(index);
};
// 选择的搜索方式：默认以编号搜索
const searchOptionChoosed = ref('code')
// 搜索方式
const searchOptions = [
  {
    value: 'code',
    label: '编号',
  },
  {
    value: 'customerService',
    label: '客服姓名',
  },
  {
    value: 'orderStatus',
    label: '工单状态',
  },
  {
    value: 'priority',
    label: '优先级',
  },
  {
    value: 'founder',
    label: '创建人',
  },
  {
    value: 'type',
    label: '工单类型',
  },
  {
    value: 'source',
    label: '工单来源',
  },
  {
    value: 'target',
    label: 'SLA服务目标',
  }
]
// 搜索框的值
const search = ref('')

// 表单数据
const tableData = [
  {
    code: "25972567",
    orderStatus: "已开启",
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
    code: "25972567",
    orderStatus: "已开启",
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
    code: "25972567",
    orderStatus: "已开启",
    title: "服务器故障",
    customerService: "张晶晶",
    priority: "一般",
    createTime: "2022-12-06 14:58:14",
    target: "按时解决",
    updateTime: "2022-12-06 15:01:57",
    description: "测试",
  },
  {
    code: "25972567",
    orderStatus: "已开启",
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
// 过滤显示
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      searchOption(data)
  )
);
// 判断搜索条件
const searchOption = (data: any) => {
  switch (searchOptionChoosed.value) {
    case 'code':
      return !search.value || data.code.toLowerCase().includes(search.value.toLowerCase())
    case 'customerService':
      return !search.value || data.customerService.toLowerCase().includes(search.value.toLowerCase())
    case 'orderStatus':
      return !search.value || data.orderStatus.toLowerCase().includes(search.value.toLowerCase())
    case 'priority':
      return !search.value || data.priority.toLowerCase().includes(search.value.toLowerCase())
    case 'founder':
      return !search.value || data.founder.toLowerCase().includes(search.value.toLowerCase())
    case 'type':
      return !search.value || data.type.toLowerCase().includes(search.value.toLowerCase())
    case 'source':
      return !search.value || data.source.toLowerCase().includes(search.value.toLowerCase())
    case 'target':
      return !search.value || data.target.toLowerCase().includes(search.value.toLowerCase())
    // default:
    //   return !search.value || data.code.toLowerCase().includes(search.value.toLowerCase())
  }
}
// 接收接收状态标签内容
const tagStatusType = (value: string): string => {
  switch (value) {
    case "待处理":
      return "success";
    case "待确认":
      return "danger";
    case "已开启":
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

<style scoped lang="scss">
.whole {
  margin-top: 10px;
  padding: 0 10px;
  height: calc(100% - 140px);
  background-color: white;

  .top-operation {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-select {
      width: 100px;
      height: 80%;
      margin-right: 10px;
    }

    .search-box {
      width: 180px;
      font-size: 14px;
      margin-right: 10px;
    }
  }

  .el-table {
    height: calc(100%);
  }
}
</style>
