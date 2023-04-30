<template>
  <!-- 分派管理 -->
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
          placeholder="输入序列号查找资产"
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
        <el-table-column prop="customerService" label="资产型号" sortable />
        <el-table-column prop="priority" label="序列号" />
        <el-table-column prop="type" label="生产日期" />
        <el-table-column prop="source" label="资产地址" />
        <el-table-column prop="target" label="固定维修周期" />
        <el-table-column prop="updateTime" label="资产类别" />
        <el-table-column prop="remainder" label="来源" />
        <el-table-column prop="description" label="资产地址" />
        <el-table-column label="操作" width="160">
          <template #default="scope: any">
            <el-button type="primary" @click="dialogFormVisible = true">{{
              scope.row.add
            }}</el-button>
            <el-button type="danger">{{ scope.row.delete }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页跳转 -->
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
        <!-- 分派表单 -->
        <el-dialog v-model="dialogFormVisible" title="分派资产">
          <el-form :model="form">
            <el-select
              v-model="value"
              clearable
              placeholder="根据名字搜索"
              :label-width="formLabelWidth"
              class="fenpai_box"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-input v-model="form.name" class="fenpai_btn" />
          </el-form>
          <el-table
            :data="filterTableData"
            stripe
            style="width: 100%"
            border
            height="200"
          >
            <el-table-column prop="no" label="工程师编号" sortable />
            <el-table-column prop="gcname" label="工程师名字" />
            <el-table-column prop="priority" label="目前的状态">
              <template #default="scope: any">
                <div style="display: flex; align-items: center">
                  <el-tag :type="tagStatusType(scope.row.orderStatus2)">
                    {{ scope.row.orderStatus2 }}
                  </el-tag>
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="gcsjn" label="工程师技能" />
          </el-table>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">
                确认
              </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
// ElConfigProvider 组件
import { ElConfigProvider } from "element-plus";
// 引入中文包
import zhCn from "element-plus/lib/locale/lang/zh-cn";

const dialogFormVisible = ref(false);
const formLabelWidth = "120px";
const tagStatusType = (value: string): string => {
  switch (value) {
    case "繁忙":
      return "success";
    case "空闲":
      return "warning";
    default:
      return "未知";
  }
};
const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});
//表单数据
const tableData = [
  {
    code: "25972567",
    orderStatus: "桌面电脑",
    title: "小智电脑",
    customerService: "VZLPHA050607",
    priority: "0111",
    founder: "白云",
    type: "2023-11-10 10:10:00",
    source: "珠江公寓",
    target: "星期天",
    updateTime: "机器",
    description: "珠江公寓",
    remainder: "白云",
    add: "分派",
    delete: "删除",
    no: "pisa01",
    gcname: "张杰晶",

    gcsjn: "精通vue",
    orderStatus2: "空闲",
  },
  {
    code: "25972567",
    orderStatus: "桌面电脑",
    title: "小智电脑",
    customerService: "VZLPHA050607",
    priority: "0111",
    founder: "白云",
    type: "2023-11-10 10:10:00",
    source: "珠江公寓",
    target: "星期天",
    updateTime: "机器",
    description: "珠江公寓",
    remainder: "白云",
    add: "分派",
    delete: "删除",
    no: "pisa01",
    gcname: "张杰晶",

    gcsjn: "精通vue",
    orderStatus2: "空闲",
  },
  {
    code: "25972567",
    orderStatus: "桌面电脑",
    title: "小智电脑",
    customerService: "VZLPHA050607",
    priority: "0111",
    createTime: "VZLPHA050607",
    type: "2023-11-10 10:10:00",
    founder: "白云",
    source: "珠江公寓",
    target: "星期天",
    updateTime: "机器",
    description: "珠江公寓",
    remainder: "白云",
    add: "分派",
    delete: "删除",
    no: "pisa01",
    gcname: "张杰晶",
    gcsjn: "精通vue",

    orderStatus2: "繁忙",
  },
  {
    code: "25972567",
    orderStatus: "桌面电脑",
    title: "小智电脑",
    customerService: "VZLPHA050607",
    priority: "0111",
    createTime: "VZLPHA050607",
    founder: "白云",
    type: "2023-11-10 10:10:00",
    source: "珠江公寓",
    target: "星期天",
    updateTime: "机器",
    description: "珠江公寓",
    remainder: "白云",
    add: "分派",
    delete: "删除",
    no: "pisa01",
    gcname: "张杰晶",
    gcsjn: "精通vue",
    orderStatus2: "繁忙",
  },
  {
    code: "25972567",
    orderStatus: "桌面电脑",
    title: "小智电脑",
    customerService: "VZLPHA050607",
    priority: "0111",
    createTime: "VZLPHA050607",
    founder: "白云",
    type: "2023-11-10 10:10:00",
    source: "珠江公寓",
    target: "星期天",
    updateTime: "机器",
    description: "珠江公寓",
    remainder: "白云",
    add: "分派",
    orderStatus2: "繁忙",

    delete: "删除",
    no: "pisa01",
    gcname: "张杰晶",
    gcsjn: "精通vue",
  },
];
const value = ref("");
const options = [
  {
    value: "pisa01 张晶晶",
    label: "pisa01 张晶晶",
  },
  {
    value: "pisa01 张晶晶",
    label: "pisa01 张晶晶",
  },
  {
    value: "pisa01 张晶晶",
    label: "pisa01 张晶晶",
  },
  {
    value: "pisa01 张晶晶",
    label: "pisa01 张晶晶",
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
.fenpai_box {
  margin-bottom: 20px;
}
.fenpai_btn {
  width: 400px;
  margin-bottom: 20px;
  margin-left: 10px;
}
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
