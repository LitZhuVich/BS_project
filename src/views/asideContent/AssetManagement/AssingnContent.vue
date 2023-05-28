<template>
  <!-- 分派管理 -->
  <div class="customerBox">
    <div class="function">
      <!-- 按钮搜索框 -->
      <div class="function_input">
        <el-select v-model="value" clearable placeholder="请选择搜索方式">
          <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input v-model="searchValue" placeholder="请输入查询内容" :prefix-icon="Search" class="search-input" />
      </div>
    </div>
    <!-- 显示客户页 -->
    <div class="content">
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
        <el-table-column prop="id" label="编号" width="70" />
        <el-table-column prop="asset_name" label="资产名称" />
        <el-table-column prop="username" label="客户" />
        <el-table-column prop="source" label="来源" />
        <el-table-column prop="asset_serial" label="序列号" />
        <el-table-column prop="categorie" label="分类" width="100" />
        <el-table-column prop="asset_warranty" label="保修时间(月)" width="120" />
        <el-table-column prop="model_id" label="资产型号" />
        <el-table-column prop="module" label="资产模板" />
        <el-table-column prop="created_at" label="创建时间" />
        <el-table-column prop="engineer_id" label="负责工程师">
          <template #default="scope">
            <el-tag v-if="scope.row.engineer_id == 0" type="danger">无</el-tag>
            <el-tag v-else type="primary">{{ scope.row.engineer_id }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template #default="scope: any ">
            <el-button type="primary" @click=" getEngineer ">分派</el-button>
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="demo-pagination-block">
        <el-config-provider :locale=" zhCn ">
          <el-pagination v-model:current-page=" currentPage " v-model:page-size=" pageSize "
            :page-sizes=" [5, 10, 20, 40] " layout="sizes, prev, pager, next, jumper" :total=" pageTotal "
            @size-change=" handleSizeChange " @current-change=" handleCurrentChange " /></el-config-provider>
      </div>
      <!-- 分派表单 -->
      <el-dialog v-model=" dialogFormVisible " title="分派资产">
        <el-table :data=" engineerList " stripe style="width: 100%" border>
          <el-table-column prop="id" label="工程师编号" sortable />
          <el-table-column prop="username" label="工程师名字" />
          <el-table-column prop="priority" label="目前的状态">
            <template #default=" scope: any ">
              <div style="display: flex; align-items: center">
                <!-- TODO: -->
                <el-tag type="primary">{{ }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <!-- TODO: -->
          <el-table-column prop="" label="工程师技能" />
        </el-table>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from "vue";
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
let engineerList = ref([])
// 获取工程师信息
const getEngineer = async () => {
  dialogFormVisible.value = !dialogFormVisible.value
  const res: any = await apiClient.get<any>(
    `/CustomerRepresentative/getAllEngineers`
  )
  engineerList.value = res.data
  console.log('engineerList.value', engineerList.value)
}
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
</script>

<style scoped lang="scss">
.customerBox {
  padding: 10px;
  box-sizing: border-box;
  min-height: calc(100% - 120px);
  background-color: white;
  margin: 10px;

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
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;

    .demo-pagination-block {
      margin-top: 20px;
    }
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

.demo-pagination-block+.demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
