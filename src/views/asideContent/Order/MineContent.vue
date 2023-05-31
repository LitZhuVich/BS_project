<template>
  <div class="content">
    <div class="top-operation">
      <h5>我的工单</h5>
      <div style="display: flex">
        <el-select v-model="searchOptionChoosed">
          <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input v-model="searchValue" class="search-box" placeholder="请输入搜索内容" :suffix-icon="Search" />
      </div>
    </div>
    <el-table v-loading="loading" :data="filterTableData" stripe border>
      <el-table-column type="expand">
        <template #default="scope">
          <div class="column-expand">
            <div class="top">
              <span>提交时间:
                {{ timeToString(scope.row.created_at) || "空" }}</span>
              <span>工单地址: {{ scope.row.address || "空" }}</span>
              <span>修改时间:
                {{ timeToString(scope.row.updated_at) || "空" }}</span>
            </div>
            <div>
              <p>详细描述: {{ scope.row.description || "空" }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="编号" width="60" />
      <el-table-column prop="status" label="工单状态" width="90">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-tag :type="tagStatusType(scope.row.status)">
              {{ scope.row.status }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="username" label="客户" />
      <el-table-column prop="engineer" label="工程师" />
      <el-table-column prop="priority" label="优先级" width="70">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-tag :type="tagSituationsType(scope.row.priority)" effect="plain">
              {{ scope.row.priority }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="created_at" label="提交时间" /> -->
      <el-table-column prop="time_limit" label="期限时间(天)" width="110" />
      <el-table-column prop="isOnLine" label="线上/下" width="75">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-tag type="success" v-if="scope.row.isOnLine == 1" effect="plain">线上</el-tag>
            <el-tag v-else-if="scope.row.isOnLine == 0" effect="plain">线下</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="工单类型" />
      <!-- <el-table-column prop="address" label="工单地址" /> -->
      <el-table-column prop="appointment" label="预约时间">
        <template #default="scope">
          <div>
            {{ timeToString(scope.row.appointment) }}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="updated_at" label="修改时间" /> -->
      <!-- <el-table-column prop="description" label="详细描述" /> -->
    </el-table>
    <div class="demo-pagination-block">
      <el-config-provider :locale="zhCn">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 40]"
          layout="sizes, prev, pager, next, jumper" :total="pageTotal" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" /></el-config-provider>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, computed, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
// ElConfigProvider 组件
import { ElConfigProvider } from "element-plus";
// 引入中文包
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import ApiClient from "../../../request/request";
const apiClient = ApiClient.getInstance();
let user = reactive({
  user_id: Number(sessionStorage.getItem("UID"))
})

onMounted(() => {
  getOrders()
})
// 表单总数
const pageTotal = ref<number>(0);
// 选择的搜索方式
const searchOptionChoosed = ref("status");
// 搜索方式
const searchOptions = [
  {
    value: "status",
    label: "工单状态",
  },
  {
    value: "username",
    label: "客户",
  },
  {
    value: "priority",
    label: "优先级",
  },
];
// 搜索框
const searchValue = ref("");
// 表单数据
let tableData: any = ref([]);
// 获取工单数据
const getOrders = async () => {
  loading.value = true;
  const res: any = await apiClient.post<any>(
    `/order/getOrderByUsername?pageSize=${pageSize.value}&page=${currentPage.value}`,
    user
  )
  tableData.value = res.data.data
  // 页面数据长度
  pageTotal.value = res!.data.total;
  // 渲染成功，加载动画消失
  loading.value = false;
};
// 过滤显示
const filterTableData = computed(() =>
  tableData.value.filter((data: any) => searchOption(data))
);
// 判断搜索条件
const searchOption = (data: any) => {
  switch (searchOptionChoosed.value) {
    case "status":
      return (
        !searchValue.value ||
        data.status.toLowerCase().includes(searchValue.value.toLowerCase())
      );
    case "username":
      return (
        !searchValue.value ||
        data.username.toLowerCase().includes(searchValue.value.toLowerCase())
      );
    case "priority":
      return (
        !searchValue.value ||
        data.priority.toLowerCase().includes(searchValue.value.toLowerCase())
      );
  }
};

// 表单渲染时的加载动画
const loading = ref<boolean>(true);
// 时间转字符串
const timeToString = (date: any): string => {
  let d = new Date(date);
  // TODO:把转换做得更细节一点
  let time =
    d.getFullYear() +
    "-" +
    d.getMonth() +
    "-" +
    d.getDate() +
    " " +
    d.getHours() +
    "点";
  return time;
};
// 接收接收状态标签内容
const tagStatusType = (value: string): string => {
  switch (value) {
    case "待处理":
      return "danger";
    case "已受理":
      return "";
    case "处理中":
      return "warning";
    case "已完成":
      return "success";
    case "已完结":
      return "info";
    default:
      return "状态不对";
  }
};
// 接收紧急情况标签内容
const tagSituationsType = (value: string): string => {
  switch (value) {
    case "一般":
      return "info";
    case "紧急":
      return "danger";
    default:
      return "情况不对";
  }
};

//分页框
const currentPage = ref(1); // 当前页面
const pageSize = ref(10); // 一页多少数据
const handleSizeChange = (val: number) => {
  getOrders();
};
const handleCurrentChange = (val: number) => {
  getOrders();
};
</script>
<style lang="scss" scoped>
.demo-pagination-block {
  margin-top: 10px;
}

.content {
  height: calc(100% - 140px);
  background-color: white;
  margin: 10px;
  padding: 10px;

  .top-operation {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-select {
      width: 150px;
      height: 80%;
      margin-right: 10px;
    }

    .search-box {
      width: 500px;
      font-size: 14px;
      margin-right: 10px;
    }
  }

  .el-table {
    .el-tag {
      margin: 3px;
      cursor: pointer;
    }

    .column-expand {
      padding: 10px 20px;
      font-size: 18px;

      .top {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 10px;
      }
    }
  }

  .demo-pagination-block {
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: center;
  }
}
</style>
