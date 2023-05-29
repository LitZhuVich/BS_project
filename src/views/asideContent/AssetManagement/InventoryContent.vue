<template>
  <div class="Inventory">
    <div class="Inventory_box">
      <!-- 头部标题 -->
      <span><b>客户资产</b></span>
      <span class="Inventory_box_title">
        <el-tag type="info" plain>查看和管理用户资产</el-tag>
      </span>
      <!-- 内容 -->
      <div class="Inventory_contern" v-show="showAdvancedSearch">
        <el-form :model="searchForm" label-width="auto" :inline="true">
          <!-- 资产模板 -->
          <el-form-item label="资产模板">
            <el-select v-model="searchForm.module_id" placeholder="桌面电脑">
              <el-option label="桌面电脑" value="1" />
              <el-option label="智能手机" value="2" />
              <el-option label="其他" value="3" />
            </el-select>
          </el-form-item>
          <!-- 资产名称 -->
          <el-form-item label="资产名称" class="form_sb">
            <el-input v-model="searchForm.asset_name" placeholder="请输入资产名称" />
          </el-form-item>
          <!-- 序列号 -->
          <el-form-item label="序列号" class="form_sb">
            <el-input v-model="searchForm.asset_serial" placeholder="请输入序列号" />
          </el-form-item>
          <!-- 客户 -->
          <el-form-item label="客户" class="form_sb">
            <el-input v-model="searchForm.user_id" placeholder="请输入客户名称" />
          </el-form-item>
          <!-- 设备型号 -->
          <el-form-item label="设备型号" class="form_sb">
            <el-input v-model="searchForm.model_id" placeholder="请输入设备型号" />
          </el-form-item>
          <!-- 来源 -->
          <el-form-item label="来源">
            <el-select v-model="searchForm.source_id" placeholder="请选择来源">
              <el-option label="白云" value="1" />
              <el-option label="其他" value="2" />
            </el-select>
          </el-form-item>
          <!-- 保修日期 -->
          <el-form-item label="保修日期">
            <el-input v-model="searchForm.asset_warranty" min="0" type="number" placeholder="请输入保修日期"></el-input>
          </el-form-item>
          <!-- 资产地址 -->
          <el-form-item label="资产地址" class="form_sb">
            <el-input v-model="searchForm.asset_address" placeholder="资产地址" />
          </el-form-item>
          <!-- 资产类别 -->
          <el-form-item label="资产类别">
            <el-select v-model="searchForm.asset_categorie_id" placeholder="请选择资产类别">
              <el-option label="电脑周边" value="1" />
              <el-option label="普通家电" value="2" />
              <el-option label="其他" value="3" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <!-- 按钮 -->
      <div class="Inventory_box_btn">
        <el-input v-model="searchForm.asset_name" class="searchBox" placeholder="请输入要查询的资产名称"
          v-show="!showAdvancedSearch"></el-input>
        <el-button :icon="Search" @click="toggleShowAdvancedSearch">高级查询</el-button>
        <el-button type="primary" @click="search">查询</el-button>
      </div>
      <!-- 下表 -->
      <div>
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
          <el-table-column prop="username" label="客户" />
          <el-table-column prop="source" label="来源" />
          <el-table-column prop="asset_serial" label="序列号" />
          <el-table-column prop="categorie" label="分类" w />
          <el-table-column prop="asset_warranty" label="保修时间（月）" />
          <el-table-column prop="model_id" label="资产型号" />
          <el-table-column prop="module" label="资产模板" />
          <el-table-column prop="created_at" label="创建时间" />
        </el-table>
        <div class="demo-pagination-block">
          <el-config-provider :locale="zhCn">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 40]"
              layout="sizes, prev, pager, next, jumper" :total="pageTotal" @size-change="handleSizeChange"
              @current-change="handleCurrentChange" /></el-config-provider>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, computed, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
// 引入中文包
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import ApiClient from "../../../request/request";
import { filter } from "lodash";

const apiClient = ApiClient.getInstance();

onMounted(() => {
  getAsset()
})
const pageTotal = ref<number>(0); // 表单总数
// 表单渲染时的加载动画
const loading = ref<boolean>(true);
// 表单数据
let tableData: any = ref([]);
// 获取工单数据
const getAsset = async () => {
  loading.value = true;
  const res: any = await apiClient.get<any>(
    `/asset/assetPage?pageSize=${pageSize.value}&page=${currentPage.value}`
  )
  tableData.value = res.data.data
  // console.log('tableData.value', tableData.value)
  // 页面数据长度
  pageTotal.value = res!.data.total;
  // 渲染成功，加载动画消失
  loading.value = false;
};
// 过滤显示
let filterTableData = computed(() =>
  tableData.value.filter((data: any) => searchOption(data))
);

// 显示高级查询（默认：false）
let showAdvancedSearch = ref(false);
// 切换高级查询显示
const toggleShowAdvancedSearch = () => {
  showAdvancedSearch.value = !showAdvancedSearch.value
}
// 搜索框
const searchValue = ref("");
// 选择的搜索方式
const searchOptionChoosed = ref("status");
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

// 查询
const searchForm = reactive({
  module_id: "",
  asset_name: "",
  asset_serial: "",
  user_id: "",
  model_id: "",
  source_id: '',
  asset_warranty: '',
  asset_address: '',
  asset_categorie_id: '',
});
// 查询方法
const search = async () => {
  const res: any = await apiClient.post<any>(
    `/asset/query?pageSize=${pageSize.value}&page=${currentPage.value}`,
    searchForm
  )
  tableData.value = res.data.data
  filterTableData = computed(() =>
    tableData.value.filter((data: any) => searchOption(data))
  );
  // 页面数据长度
  pageTotal.value = res!.data.total;
  // 渲染成功，加载动画消失
  loading.value = false;
}
//分页框
const currentPage = ref(1); // 当前页面
const pageSize = ref(10); // 一页多少数据
const handleSizeChange = (val: number) => {
  search();
};
const handleCurrentChange = (val: number) => {
  search();
};  
</script>
<style lang="scss" scoped>
.Inventory {
  padding: 10px;
  box-sizing: border-box;
  height: calc(100% - 120px);
  background-color: white;
  margin: 10px;

  .Inventory_box {
    background: white;
    padding: 10px;
    overflow: auto;

    .Inventory_box_title {
      padding-left: 20px;
    }

    .Inventory_contern {
      padding: 20px;
      margin-top: 15px;
      background: rgb(242, 248, 249);

      .form_sb {
        .el-input {
          width: 220px;
        }
      }
    }

    .Inventory_box_btn {
      display: flex;
      margin: 10px 0;
      float: right;

      .el-input {
        width: 220px;
        margin-right: 20px;
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
}
</style>
