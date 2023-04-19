<template>
<<<<<<< HEAD
  <div>
    <h6>所有工单</h6>
    <div></div>
  </div>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="code" label="编码" />
    <el-table-column prop="orderStatus" label="工单状态" />
    <el-table-column prop="title" label="标题" />
    <el-table-column prop="customerService" label="客服姓名" />
    <el-table-column prop="priority" label="工单优先级" />
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column prop="founder" label="创建人" />
    <el-table-column prop="type" label="工单类型" />
    <el-table-column prop="source" label="工单来源" />
    <el-table-column prop="target" label="SLA服务目标" />
    <el-table-column prop="updateTime" label="更新时间" />
    <el-table-column prop="description" label="工单描述" />
  </el-table>
=======
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
        <el-table-column prop="code" label="编码" />
        <el-table-column prop="orderStatus" label="工单状态" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="customerService" label="客服姓名" />
        <el-table-column prop="priority" label="工单优先级" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="founder" label="创建人" />
        <el-table-column prop="type" label="工单类型" />
        <el-table-column prop="source" label="工单来源" />
        <el-table-column prop="target" label="SLA服务目标" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column prop="description" label="工单描述" />
    </el-table>
>>>>>>> 6e7d8189f33c89afdeb6c6f0f1fb6da7e070693b
</template>

<script lang="ts" setup>
import { ref } from "vue";
// 引入图标
import { Search } from '@element-plus/icons-vue'

// 选择的搜索方式
const searchOptionChoosed = ref('')
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
const searchValue = ref('')

// 表单数据
const tableData = [
  {
    code: "25972567",
    orderStatus: "已关闭",
    title: "服务器故障",
    customerService: "张晶晶",
    priority: "高",
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
    orderStatus: "已关闭",
    title: "服务器故障",
    customerService: "张晶晶",
    priority: "高",
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
    orderStatus: "已关闭",
    title: "服务器故障",
    customerService: "张晶晶",
    priority: "高",
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
    orderStatus: "已关闭",
    title: "服务器故障",
    customerService: "张晶晶",
    priority: "高",
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
    orderStatus: "已关闭",
    title: "服务器故障",
    customerService: "张晶晶",
    priority: "高",
    createTime: "2022-12-06 14:58:14",
    founder: "管理组|盛军测试",
    type: "",
    source: "工单工作台",
    target: "按时解决",
    updateTime: "2022-12-06 15:01:57",
    description: "测试",
  },
];
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
