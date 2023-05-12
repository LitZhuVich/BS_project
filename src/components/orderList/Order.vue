<template>
  <div class="top-operation">
    <h5>所有工单</h5>
    <div style="display: flex;">
      <el-select v-model="searchOptionChoosed" placeholder="搜索方式">
        <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-model="searchValue" class="search-box" size="small" placeholder="请输入编号" :suffix-icon="Search" />
      <el-button :icon="Search">高级查询</el-button>
    </div>
  </div>
  <el-table :data="tableData" stripe style="width: 100%" size="small">
    <el-table-column type="selection" />
    <el-table-column prop="id" label="工单ID" />
    <el-table-column prop="status_id" label="工单状态" />
    <el-table-column prop="title" label="标题" />
    <el-table-column prop="user_id" label="用户" />
    <el-table-column prop="priority_id" label="优先级" />
    <el-table-column prop="created_at" label="提交时间" />
    <el-table-column prop="time_limit" label="期限时间" />
    <el-table-column prop="isOnLine" label="线上/下" />
    <el-table-column prop="type" label="工单类型" />
    <el-table-column prop="address" label="工单地址" />
    <el-table-column prop="appointment" label="预约时间" />
    <el-table-column prop="updated_at" label="修改时间" />
    <el-table-column prop="description" label="详细描述" />
  </el-table>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
// 引入图标
import { Search } from "@element-plus/icons-vue";
import ApiClient from "../../request/request";
const apiClient = ApiClient.getInstance();

onMounted(() => {
  getOrders()
})

// 表单数据
let tableData: any = ref([
  {
    id: "25972567",
    status_id: "已关闭",
    title: "服务器故障",
    user_id: "张晶晶",
    priority_id: "高",
    created_at: "2022-12-06 14:58:14",
    time_limit: "管理组|盛军测试",
    isOnLine: "",
    type: "工单工作台",
    address: "按时解决",
    appointment: "2022-12-06 15:01:57",
    updated_at: "2022-12-06 15:01:57",
    description: "测试",
  },
  {
    id: "25972567",
    status_id: "已关闭",
    title: "服务器故障",
    user_id: "张晶晶",
    priority_id: "高",
    created_at: "2022-12-06 14:58:14",
    time_limit: "管理组|盛军测试",
    isOnLine: "",
    type: "工单工作台",
    address: "按时解决",
    appointment: "2022-12-06 15:01:57",
    updated_at: "2022-12-06 15:01:57",
    description: "测试",
  }, {
    id: "25972567",
    status_id: "已关闭",
    title: "服务器故障",
    user_id: "张晶晶",
    priority_id: "高",
    created_at: "2022-12-06 14:58:14",
    time_limit: "管理组|盛军测试",
    isOnLine: "",
    type: "工单工作台",
    address: "按时解决",
    appointment: "2022-12-06 15:01:57",
    updated_at: "2022-12-06 15:01:57",
    description: "测试",
  }, {
    id: "25972567",
    status_id: "已关闭",
    title: "服务器故障",
    user_id: "张晶晶",
    priority_id: "高",
    created_at: "2022-12-06 14:58:14",
    time_limit: "管理组|盛军测试",
    isOnLine: "",
    type: "工单工作台",
    address: "按时解决",
    appointment: "2022-12-06 15:01:57",
    updated_at: "2022-12-06 15:01:57",
    description: "测试",
  }, {
    id: "25972567",
    status_id: "已关闭",
    title: "服务器故障",
    user_id: "张晶晶",
    priority_id: "高",
    created_at: "2022-12-06 14:58:14",
    time_limit: "管理组|盛军测试",
    isOnLine: "",
    type: "工单工作台",
    address: "按时解决",
    appointment: "2022-12-06 15:01:57",
    updated_at: "2022-12-06 15:01:57",
    description: "测试",
  }, {
    id: "25972567",
    status_id: "已关闭",
    title: "服务器故障",
    user_id: "张晶晶",
    priority_id: "高",
    created_at: "2022-12-06 14:58:14",
    time_limit: "管理组|盛军测试",
    isOnLine: "",
    type: "工单工作台",
    address: "按时解决",
    appointment: "2022-12-06 15:01:57",
    updated_at: "2022-12-06 15:01:57",
    description: "测试",
  },
]);

const getOrders = async () => {
  console.log('tableData', tableData)
  const res: any = await apiClient.get<any>('/order')
  tableData.value = res.data
  console.log('tableData', tableData)
}

// 选择的搜索方式
const searchOptionChoosed = ref("");
// 搜索方式
const searchOptions = [
  {
    value: '编号',
    label: '编号',
  },
  {
    value: '客服姓名',
    label: '客服姓名',
  },
  {
    value: '工单状态',
    label: '工单状态',
  },
  {
    value: '优先级',
    label: '优先级',
  },
  {
    value: '创建人',
    label: '创建人',
  },
  {
    value: '工单类型',
    label: '工单类型',
  },
  {
    value: '工单来源',
    label: '工单来源',
  },
  {
    value: 'SLA服务目标',
    label: 'SLA服务目标',
  }
]
// 搜索框
const searchValue = ref("");
</script>

<style scoped lang="scss">
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
</style>
