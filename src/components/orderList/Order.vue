<template>
    <div>
        <h6>所有工单</h6>
        <div></div>
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
</template>

<script lang="ts" setup>
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

<style scoped lang="scss"></style>
