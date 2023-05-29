<template>
  <div class="content">
    <div class="top-operation">
      <h5>资产分类</h5>
      <div style="display: flex">
        <el-select v-model="searchOptionChoosed">
          <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input v-model="searchValue" class="search-box" placeholder="请输入编号" :suffix-icon="Search" />
      </div>
    </div>
    <el-table v-loading="loading" :data="filterTableData" stripe border>
      <el-table-column type="expand">
        <template #default="scope">
          <div class="column-expand">
            <div class="top">
              <span>资产地址:
                {{ scope.row.asset_address || "空" }}</span>
              <span>修改时间:
                {{ timeToString(scope.row.updated_at) || "空" }}</span>
            </div>
            <div>
              <p>详细描述: {{ scope.row.description || "空" }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="asset_name" label="资产名称" />
      <el-table-column prop="user_id" label="客户" />
      <el-table-column prop="source_id" label="来源" />
      <el-table-column prop="asset_serial" label="序列号" />
      <el-table-column prop="asset_categorie_id" label="分类" w />
      <el-table-column prop="asset_warranty" label="保修时间（月）" />
      <el-table-column prop="model_id" label="资产型号" />
      <el-table-column prop="module_id" label="资产模板" />
      <el-table-column prop="created_at" label="创建时间" />
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
import { ref, computed, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
// ElConfigProvider 组件
import { ElConfigProvider } from "element-plus";
// 引入中文包
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import ApiClient from "../../../request/request";

const apiClient = ApiClient.getInstance();

onMounted(() => {
  getAsset()
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
    label: "用户",
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
const getAsset = async () => {
  loading.value = true;
  const res: any = await apiClient.get<any>(
    `/asset/assetPage?pageSize=${pageSize.value}&page=${currentPage.value}`
  )
  console.log(res.data)
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
    case "id":
      return (
        !searchValue.value || data.id.includes(searchValue.value.toLowerCase())
      );
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
    case "isOnLine":
      return (
        !searchValue.value ||
        data.isOnLine.includes(searchValue.value.toLowerCase())
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

//分页框
const currentPage = ref(1); // 当前页面
const pageSize = ref(10); // 一页多少数据
const handleSizeChange = (val: number) => {
  getAsset();
};
const handleCurrentChange = (val: number) => {
  getAsset();
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
