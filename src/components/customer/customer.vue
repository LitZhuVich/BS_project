<template>
  
</template>

<script lang="ts" setup>
import { ref } from "vue";
// ElConfigProvider 组件
import { ElConfigProvider } from "element-plus";
// 引入中文包
import zhCn from "element-plus/lib/locale/lang/zh-cn";
// 引入图标
import { Search, Plus, EditPen, CloseBold } from "@element-plus/icons-vue";

// 选择的搜索方式
const searchOptionChoosed = ref("按公司名称搜");
// 搜索方式
const searchOptions = [
  {
    value: "按公司名称搜",
    label: "按公司名称搜",
  },
  {
    value: "按联系人搜",
    label: "按联系人搜",
  },
  {
    value: "按9位ID搜",
    label: "按9位ID搜",
  },
];
// 搜索框
const searchValue = ref("");

// 表单数据
const tableData = [
  {
    companyName: "A客户",
    createTime: "2023-02-27 15:29:55",
    lastUpdater: "盛军测试",
    lastUpdateTime: "2023-02-27 15:30:56",
    serviceBalance: "0.00",
    customerSource: "客户管理单独",
    companyAddress: "历下区盛福花园",
    phone: "15272235226",
    remark: "1212",
    classification: "票据",
  },
  {
    companyName: "A客户",
    createTime: "2023-02-27 15:29:55",
    lastUpdater: "盛军测试",
    lastUpdateTime: "2023-02-27 15:30:56",
    serviceBalance: "0.00",
    customerSource: "客户管理单独",
    companyAddress: "历下区盛福花园",
    phone: "15272235226",
    remark: "1212",
    classification: "票据",
  },
  {
    companyName: "A客户",
    createTime: "2023-02-27 15:29:55",
    lastUpdater: "盛军测试",
    lastUpdateTime: "2023-02-27 15:30:56",
    serviceBalance: "0.00",
    customerSource: "客户管理单独",
    companyAddress: "历下区盛福花园",
    phone: "15272235226",
    remark: "1212",
    classification: "票据",
  },
  {
    companyName: "A客户",
    createTime: "2023-02-27 15:29:55",
    lastUpdater: "盛军测试",
    lastUpdateTime: "2023-02-27 15:30:56",
    serviceBalance: "0.00",
    customerSource: "客户管理单独",
    companyAddress: "历下区盛福花园",
    phone: "15272235226",
    remark: "1212",
    classification: "票据",
  },
  {
    companyName: "A客户",
    createTime: "2023-02-27 15:29:55",
    lastUpdater: "盛军测试",
    lastUpdateTime: "2023-02-27 15:30:56",
    serviceBalance: "0.00",
    customerSource: "客户管理单独",
    companyAddress: "历下区盛福花园",
    phone: "15272235226",
    remark: "1212",
    classification: "票据",
  },
];
//分页框
const currentPage = ref(1);
const pageSize = ref(10);
const handleSizeChange = (val: number) => {
  console.log(`每页${val}条数据`);
};
const handleCurrentChange = (val: number) => {
  console.log(`当前在第${val}页`);
};
</script>

<style scoped lang="scss">
.top-operation {
  padding-top: 10px;
  height: 80px;
  line-height: 40px;
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

.demo-pagination-block {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  line-height: 50px;
}
</style>
