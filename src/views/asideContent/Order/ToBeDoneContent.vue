<template>
  <div class="customerBox">
    <div class="function">
      <!-- 按钮搜索框 -->
      <div class="function_input">
        <el-input
          v-model="searchName"
          placeholder="输入编码查找工单"
          :prefix-icon="Search"
          class="search-input"
        />
        <el-input
          v-model="searchPhone"
          placeholder="输入客服姓名查找工单"
          :prefix-icon="Search"
          class="search-input"
        />
        <el-select v-model="value" clearable placeholder="分类查找">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <!-- 显示客户页 -->
    <div class="content">
      <el-table
        :data="filterTableData"
        stripe
        style="width: 100%"
        border
        height="450"
      >
        <el-table-column type="selection" width="60" align="center" fiexd />
        <el-table-column prop="code" label="编码" sortable />
        <el-table-column prop="orderStatus" label="工单状态" />
        <el-table-column prop="title" label="标题" sortable />
        <el-table-column prop="customerService" label="客服姓名" sortable />
        <el-table-column prop="priority" label="工单优先级" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="founder" label="创建人" />
        <el-table-column prop="type" label="工单类型" />
        <el-table-column prop="source" label="工单来源" />
        <el-table-column prop="target" label="SLA服务目标" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column prop="remainder" label="剩余时间(分钟)" />
        <el-table-column prop="description" label="工单描述" />
      </el-table>
      <div>
        <div class="demo-pagination-block">
          <el-config-provider :locale="zhCn">
            <el-pagination
              v-model:current-page="currentPage4"
              v-model:page-size="pageSize4"
              :page-sizes="[10, 20, 30, 40]"
              :small="small"
              :disabled="disabled"
              :background="background"
              layout="sizes, prev, pager, next, jumper"
              :total="40"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          /></el-config-provider>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { Search, Plus, CloseBold, EditPen } from "@element-plus/icons-vue";
// ElConfigProvider 组件
import { ElConfigProvider } from "element-plus";
// 引入中文包
import zhCn from "element-plus/lib/locale/lang/zh-cn";

const tableData = [
  {
    code: "25972567",
    orderStatus: "待回应",
    title: "服务器故障",
    customerService: "张晶晶",
    priority: "高",
    createTime: "2022-12-06 14:58:14",
    founder: "管理组|盛军测试",
    type: "故障",
    source: "工单工作台",
    target: "按时解决",
    updateTime: "2022-12-06 15:01:57",
    description: "测试",
    remainder: "20",
  },
  {
    code: "25972567",
    orderStatus: "待回应",
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
    remainder: "20",
  },
  {
    code: "25972567",
    orderStatus: "待回应",
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
    remainder: "20",
  },
  {
    code: "25972567",
    orderStatus: "待回应",
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
    remainder: "20",
  },
  {
    code: "25972567",
    orderStatus: "待回应",
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
    remainder: "20",
  },
];
const value = ref("");
const options = [
  {
    value: "编码",
    label: "公司名称",
  },
  {
    value: "工单状态",
    label: "手机号",
  },
  {
    value: "标题",
    label: "最后更新人",
  },
  {
    value: "客服姓名",
    label: "备注",
  },
];
//分页框
const currentPage4 = ref(1);
const pageSize4 = ref(10);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
//搜索框
const searchName = ref("");
const searchPhone = ref("");
const filterTableData = computed(() =>
  tableData.filter((data) => {
    return (
      !searchName.value ||
      data.customerService
        .toLowerCase()
        .includes(searchName.value.toLowerCase())
    );
  })
);
</script>

<style scoped lang="scss">
.customerBox {
  padding: 10px;
  box-sizing: border-box;
  .function {
    background-color: white;
    padding: 10px;
    box-sizing: border-box;
    .function_input {
      display: flex;
      .search-input {
        width: 200px;
        margin-right: 10px;
      }
    }
  }
  .content {
    height: 545px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    padding: 10px;
    box-sizing: border-box;
  }
}
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
