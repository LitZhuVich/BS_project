<template>
    <div class="top-operation">
        <div style="display: flex;">
            <el-select v-model="searchOptionChoosed">
                <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-input v-model="searchValue" class="search-box" size="small" placeholder="请输入公司名称" :suffix-icon="Search" />
            <el-button :icon="Search">高级查询</el-button>
        </div>
    </div>
    <el-table :data="tableData" stripe style="width: 100%" size="small">
        <el-table-column type="selection" />
        <el-table-column prop="companyName" label="公司名称" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="lastUpdater" label="最后更新人" />
        <el-table-column prop="lastUpdateTime" label="最后更新时间" />
        <el-table-column prop="serviceBalance" label="服务余额" />
        <el-table-column prop="customerSource" label="客户来源" />
        <el-table-column prop="receptionTeam" label="受理客服组" />
        <el-table-column prop="companyAddress" label="公司地址" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="classification" label="产品分类" />
    </el-table>
</template>

<script lang="ts" setup>
import { ref } from "vue";
// 引入图标
import { Search } from '@element-plus/icons-vue'

// 选择的搜索方式
const searchOptionChoosed = ref('按公司名称搜')
// 搜索方式
const searchOptions = [
    {
        value: '按公司名称搜',
        label: '按公司名称搜',
    },
    {
        value: '按联系人搜',
        label: '按联系人搜',
    },
    {
        value: '按9位ID搜',
        label: '按9位ID搜',
    }
]
// 搜索框
const searchValue = ref('')

// 表单数据
const tableData = [
    {
        companyName: "A客户",
        createTime: "2023-02-27 15:29:55",
        lastUpdater: "盛军测试",
        lastUpdateTime: "2023-02-27 15:30:56",
        serviceBalance: "0.00",
        customerSource: "客户管理单独",
        receptionTeam: "服务工程师组,客服",
        companyAddress: "历下区盛福花园",
        remark: "1212",
        classification: "票据",
    }, {
        companyName: "A客户",
        createTime: "2023-02-27 15:29:55",
        lastUpdater: "盛军测试",
        lastUpdateTime: "2023-02-27 15:30:56",
        serviceBalance: "0.00",
        customerSource: "客户管理单独",
        receptionTeam: "服务工程师组,客服",
        companyAddress: "历下区盛福花园",
        remark: "1212",
        classification: "票据",
    }, {
        companyName: "A客户",
        createTime: "2023-02-27 15:29:55",
        lastUpdater: "盛军测试",
        lastUpdateTime: "2023-02-27 15:30:56",
        serviceBalance: "0.00",
        customerSource: "客户管理单独",
        receptionTeam: "服务工程师组,客服",
        companyAddress: "历下区盛福花园",
        remark: "1212",
        classification: "票据",
    }, {
        companyName: "A客户",
        createTime: "2023-02-27 15:29:55",
        lastUpdater: "盛军测试",
        lastUpdateTime: "2023-02-27 15:30:56",
        serviceBalance: "0.00",
        customerSource: "客户管理单独",
        receptionTeam: "服务工程师组,客服",
        companyAddress: "历下区盛福花园",
        remark: "1212",
        classification: "票据",
    }, {
        companyName: "A客户",
        createTime: "2023-02-27 15:29:55",
        lastUpdater: "盛军测试",
        lastUpdateTime: "2023-02-27 15:30:56",
        serviceBalance: "0.00",
        customerSource: "客户管理单独",
        receptionTeam: "服务工程师组,客服",
        companyAddress: "历下区盛福花园",
        remark: "1212",
        classification: "票据",
    },
];
</script>

<style scoped lang="scss">
.top-operation {
    padding-top: 10px;
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;

    .el-select {
        width: 150px;
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
