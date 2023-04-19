<template>
  <div class="customerBox">
    <div class="function">
      <!-- 按钮搜索框 -->
      <div class="function_input">
        <el-input
          v-model="searchName"
          placeholder="输入公司名查找客户"
          :prefix-icon="Search"
          class="search-input"
        />
        <el-input
          v-model="searchPhone"
          placeholder="输入手机号查找客户"
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
      <!-- 按钮 -->
      <div class="function_button">
        <el-button type="success" plain :icon="Plus">新增客户</el-button>
        <el-button type="info" plain :icon="EditPen">编辑</el-button>
        <el-button type="danger" plain :icon="CloseBold">批量删除</el-button>
        <el-button type="success" plain :icon="Plus">添加客户到分组</el-button>
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
        <el-table-column prop="customerService" label="公司名称" sortable />
        <el-table-column prop="source" label="客户来源" />
        <el-table-column prop="phone" label="手机号" sortable />
        <el-table-column prop="creattime" label="创建时间" />
        <el-table-column prop="creatpeople" label="最后更新人" sortable />

        <el-table-column prop="lastcreattime" label="最后更新时间" />

        <el-table-column prop="address" label="公司地址" />
        <el-table-column prop="notes" label="备注" />
        <el-table-column prop="createTime" label="操作" width="160">
          <template #default="scope">
            <el-button type="primary">{{ scope.row.add }}</el-button>
            <el-button type="danger">{{ scope.row.delete }}</el-button>
          </template>
        </el-table-column>
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
    customerService: "张杰杰",
    creattime: "2023-02-27 15:29:55",
    creatpeople: "白云测试",
    phone: "15164443169",
    lastcreattime: "2023-04-18 15:29:55",
    source: "客户管理单独",
    address: "广东省广州市白云区珠江广场",
    notes: "无",
    add: "添加",
    delete: "删除",
  },
  {
    customerService: "张晶晶",
    creattime: "2023-02-27 15:29:55",
    creatpeople: "白云测试",
    phone: "15164443169",
    lastcreattime: "2023-04-18 15:29:55",
    source: "客户管理单独",
    address: "广东省广州市白云区珠江广场",
    notes: "无",
    add: "添加",
    delete: "删除",
  },
  {
    customerService: "张晶晶",
    creattime: "2023-02-27 15:29:55",
    creatpeople: "白云测试",
    phone: "15164443169",
    lastcreattime: "2023-04-18 15:29:55",
    source: "客户管理单独",
    address: "广东省广州市白云区珠江广场",
    add: "添加",
    notes: "无",
    delete: "删除",
  },
  {
    customerService: "张晶晶",
    creattime: "2023-02-27 15:29:55",
    creatpeople: "白云测试",
    phone: "15164443169",
    lastcreattime: "2023-04-18 15:29:55",
    source: "客户管理单独",
    address: "广东省广州市白云区珠江广场",
    add: "添加",
    notes: "无",
    delete: "删除",
  },
  {
    customerService: "张晶晶",
    creattime: "2023-02-27 15:29:55",
    creatpeople: "白云测试",
    phone: "15164443169",
    lastcreattime: "2023-04-18 15:29:55",
    source: "客户管理单独",
    address: "广东省广州市白云区珠江广场",
    add: "添加",
    notes: "无",
    delete: "删除",
  },
  {
    customerService: "张晶晶",
    creattime: "2023-02-27 15:29:55",
    creatpeople: "白云测试",
    phone: "15164443169",
    lastcreattime: "2023-04-18 15:29:55",
    source: "客户管理单独",
    address: "广东省广州市白云区珠江广场",
    add: "添加",
    notes: "无",
    delete: "删除",
  },
  {
    customerService: "张晶晶",
    creattime: "2023-02-27 15:29:55",
    creatpeople: "白云测试",
    phone: "15164443169",
    lastcreattime: "2023-04-18 15:29:55",
    source: "客户管理单独",
    address: "广东省广州市白云区珠江广场",
    add: "添加",
    notes: "无",
    delete: "删除",
  },
  {
    customerService: "张晶晶",
    creattime: "2023-02-27 15:29:55",
    creatpeople: "白云测试",
    phone: "15164443169",
    lastcreattime: "2023-04-18 15:29:55",
    source: "客户管理单独",
    address: "广东省广州市白云区珠江广场",
    add: "添加",
    notes: "无",
    delete: "删除",
  },
  {
    customerService: "张晶晶",
    creattime: "2023-02-27 15:29:55",
    creatpeople: "白云测试",
    phone: "15164443169",
    lastcreattime: "2023-04-18 15:29:55",
    source: "客户管理单独",
    address: "广东省广州市白云区珠江广场",
    add: "添加",
    notes: "无",
    delete: "删除",
  },
  {
    customerService: "张晶晶",
    creattime: "2023-02-27 15:29:55",
    creatpeople: "白云测试",
    phone: "15164443169",
    lastcreattime: "2023-04-18 15:29:55",
    source: "客户管理单独",
    address: "广东省广州市白云区珠江广场",
    add: "添加",
    notes: "无",
    delete: "删除",
  },
  {
    customerService: "张晶晶",
    creattime: "2023-02-27 15:29:55",
    creatpeople: "白云测试",
    phone: "15164443169",
    lastcreattime: "2023-04-18 15:29:55",
    source: "客户管理单独",
    address: "广东省广州市白云区珠江广场",
    add: "添加",
    notes: "无",
    delete: "删除",
  },
  {
    customerService: "张晶晶",
    creattime: "2023-02-27 15:29:55",
    creatpeople: "白云测试",
    phone: "15164443169",
    lastcreattime: "2023-04-18 15:29:55",
    source: "客户管理单独",
    address: "广东省广州市白云区珠江广场",
    add: "添加",
    notes: "无",
    delete: "删除",
  },
  {
    customerService: "张晶晶",
    creattime: "2023-02-27 15:29:55",
    creatpeople: "白云测试",
    phone: "15164443169",
    lastcreattime: "2023-04-18 15:29:55",
    source: "客户管理单独",
    address: "广东省广州市白云区珠江广场",
    add: "添加",
    notes: "无",
    delete: "删除",
  },
  {
    customerService: "张晶晶",
    creattime: "2023-02-27 15:29:55",
    creatpeople: "白云测试",
    phone: "15164443169",
    lastcreattime: "2023-04-18 15:29:55",
    source: "客户管理单独",
    address: "广东省广州市白云区珠江广场",
    add: "添加",
    notes: "无",
    delete: "删除",
  },
  {
    customerService: "张晶晶",
    creattime: "2023-02-27 15:29:55",
    creatpeople: "白云测试",
    phone: "15164443169",
    lastcreattime: "2023-04-18 15:29:55",
    source: "客户管理单独",
    address: "广东省广州市白云区珠江广场",
    add: "添加",
    notes: "无",
    delete: "删除",
  },
];
const value = ref("");
const options = [
  {
    value: "公司名称",
    label: "公司名称",
  },
  {
    value: "手机号",
    label: "手机号",
  },
  {
    value: "最后更新人",
    label: "最后更新人",
  },
  {
    value: "备注",
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
        margin-bottom: 10px;
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
