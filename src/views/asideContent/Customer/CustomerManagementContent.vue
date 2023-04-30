<template>
  <div id="Order">
    <div class="OrderList">
      <div class="top-operation">
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
            v-model="searchValue"
            class="search-box"
            size="small"
            placeholder="请输入公司名称"
            :suffix-icon="Search"
          />
        </div>
        <div>
          <!-- 按钮 -->
          <div class="function_button">
            <el-button type="success" plain :icon="Plus">新增客户</el-button>
            <el-button type="info" plain :icon="EditPen">编辑</el-button>
            <el-button type="danger" plain :icon="CloseBold"
              >批量删除</el-button
            >
            <el-button type="success" plain :icon="Plus"
              >添加客户到分组</el-button
            >
          </div>
        </div>
      </div>
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column type="selection" width="60" align="center" />
        <el-table-column prop="companyName" label="公司名称" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="lastUpdater" label="最后更新人" />
        <el-table-column prop="lastUpdateTime" label="最后更新时间" />
        <el-table-column prop="serviceBalance" label="服务余额" />
        <el-table-column prop="customerSource" label="客户来源" />
        <el-table-column prop="companyAddress" label="公司地址" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="classification" label="产品分类" />
        <el-table-column prop="createTime" label="操作" width="160">
          <template #default="scope">
            <el-button type="primary">修改</el-button>
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="demo-pagination-block">
        <el-config-provider :locale="zhCn">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            layout="sizes, prev, pager, next, jumper"
            :total="40"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-config-provider>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Refresh } from "@element-plus/icons-vue";
// 引入组件
// TODO: 工单和新建工单页写完后，替换下面的TEST.vue
// import Order from "../../../components/orderlist/Order";
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
interface TabType {
  title: string; // 标签页显示名称
  componentName: string; // 动态组件名
  data: any; // 动态组件传参
}
interface TabListType extends TabType {
  name: string; //标签页唯一标识，添加标签页时根据componentName自动生成
}

// 存放标签页数组
const tabList = ref<TabListType[]>([]);
// 默认显示工单页面
const tabValue = ref("1");
</script>

<style scoped lang="scss">
$views-li: 40px;

#Order {
  column-gap: 10px;
  height: 100%;

  .OrderList {
    width: 100%;
    height: 100%;
    background-color: white;
    padding: 0 10px;
    box-sizing: border-box;

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
  }
}
</style>
