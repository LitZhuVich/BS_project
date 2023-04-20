<template>
  <div class="customerBox">
    <div class="function">
      <!-- 按钮搜索框 -->
      <div class="function_input">
        <el-input
          v-model="searchName"
          placeholder="输入编码查找资产"
          :prefix-icon="Search"
          class="search-input"
        />
        <el-input
          v-model="searchPhone"
          placeholder="输入客服姓名查找资产"
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
        <el-table-column prop="orderStatus" label="资产模板" />
        <el-table-column prop="title" label="资产名称" sortable />
        <el-table-column prop="customerService" label="序列号" sortable />
        <el-table-column prop="priority" label="客户" />
        <el-table-column prop="createTime" label="设备型号" />
        <el-table-column prop="founder" label="来源" />
        <el-table-column prop="type" label="保修日期" />
        <el-table-column prop="source" label="资产地址" />
        <el-table-column prop="target" label="固定维修周期" />
        <el-table-column prop="updateTime" label="资产类别" />
        <el-table-column prop="remainder" label="保内维护人员" />
        <el-table-column prop="description" label="保外维护人员" />
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
    orderStatus: "桌面电脑",
    title: "小智电脑",
    customerService: "01111",
    priority: "张晶晶",
    createTime: "VZLPHA050607",
    founder: "白云",
    type: "2023-11-10 10:10:00",
    source: "珠江公寓",
    target: "星期天",
    updateTime: "机器",
    description: "小晶晶",
    remainder: "小杰杰",
  },
  {
    code: "25972567",
    orderStatus: "桌面电脑",
    title: "小智电脑",
    customerService: "01111",
    priority: "张晶晶",
    createTime: "VZLPHA050607",
    founder: "白云",
    type: "2023-11-10 10:10:00",
    source: "珠江公寓",
    target: "星期天",
    updateTime: "机器",
    description: "小晶晶",
    remainder: "小杰杰",
  },
  {
    code: "25972567",
    orderStatus: "桌面电脑",
    title: "小智电脑",
    customerService: "01111",
    priority: "张晶晶",
    createTime: "VZLPHA050607",
    founder: "白云",
    type: "",
    source: "珠江公寓",
    target: "星期天",
    updateTime: "机器",
    description: "小晶晶",
    remainder: "小杰杰",
  },
  {
    code: "25972567",
    orderStatus: "桌面电脑",
    title: "小智电脑",
    customerService: "01111",
    priority: "张晶晶",
    createTime: "VZLPHA050607",
    founder: "白云",
    type: "",
    source: "珠江公寓",
    target: "星期天",
    updateTime: "机器",
    description: "小晶晶",
    remainder: "小杰杰",
  },
  {
    code: "25972567",
    orderStatus: "桌面电脑",
    title: "小智电脑",
    customerService: "01111",
    priority: "张晶晶",
    createTime: "VZLPHA050607",
    founder: "白云",
    type: "",
    source: "珠江公寓",
    target: "星期天",
    updateTime: "机器",
    description: "小晶晶",
    remainder: "小杰杰",
  },
];
const value = ref("");
const options = [
  {
    value: "编码",
    label: "编码",
  },
  {
    value: "序列号",
    label: "序列号",
  },
  {
    value: "资产模板",
    label: "资产模板",
  },
  {
    value: "资产名称",
    label: "资产名称",
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
