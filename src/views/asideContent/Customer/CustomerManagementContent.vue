<template>
  <!-- TODO:2023-5-9 这一天请你个给前端github远程分支添加dev -->
  <div id="Order">
    <div class="OrderList">
      <div class="top-operation">
        <div style="display: flex">
          <el-select v-model="searchOptionChoosed">
            <el-option
              v-for="(option, index) in searchOptions"
              :key="index"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
          <el-input
            v-model="searchValue"
            class="search-box"
            size="small"
            placeholder="输入关键字搜索"
            :suffix-icon="Search"
          />
        </div>
        <div>
          <!-- 按钮组 -->
          <div class="function_button">
            <el-button
              type="info"
              plain
              :icon="Refresh"
              @click="getTableData()"
            >
              刷新
            </el-button>
            <el-button type="success" plain :icon="Plus" @click="add()">
              新增客户
            </el-button>
            <el-button
              type="danger"
              plain
              :icon="CloseBold"
              @click="deleteMany()"
            >
              批量删除
            </el-button>
          </div>
        </div>
      </div>
      <div class="table">
        <el-table
          ref="multipleTableRef"
          :data="filterData"
          stripe
          style="width: 100%"
          border
          height="545px"
          v-loading="loading"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column prop="companyname" label="公司名称" />
          <el-table-column prop="lastUpdater" label="最后更新人" />
          <el-table-column prop="companyAddress" label="公司地址" />
          <el-table-column prop="phone" label="手机号" />
          <el-table-column prop="remark" label="备注" />
          <el-table-column prop="classification" label="分类" />
          <el-table-column prop="createTime" label="创建时间" />
          <el-table-column prop="lastUpdateTime" label="最后更新时间" />
          <el-table-column prop="operation" label="操作" width="200">
            <template #default="scope">
              <el-button
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
                :icon="EditPen"
                :loading="btnLoading"
                >修改
              </el-button>
              <el-button
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                :icon="CloseBold"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="demo-pagination-block">
        <el-config-provider :locale="zhCn">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 20, 50]"
            layout="sizes, prev, pager, next, jumper"
            :total="pageTotal"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-config-provider>
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogInfo.isShow" :title="dialogInfo.title">
    <CustomerManagementDialog :updateData="getTableData" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect, reactive } from "vue";
import { debounce } from "lodash"; // 引入防抖方法
import type { Action } from "element-plus";
import { Refresh, User } from "@element-plus/icons-vue";
import {
  ElConfigProvider,
  ElTable,
  ElNotification,
  ElMessage,
  ElMessageBox,
} from "element-plus";
import { useDialogStore } from "../../../store/store";
import { storeToRefs } from "pinia";
import zhCn from "element-plus/lib/locale/lang/zh-cn"; // 引入中文包
import { Search, Plus, EditPen, CloseBold } from "@element-plus/icons-vue";
import ApiClient from "../../../request/request";
import CustomerManagementDialog from "../../../components/formContent/CustomerManagement.vue";
import type {
  apiResponseCustomerRepresentative,
  apiResponseData,
  apiResponseUser,
} from "../../../model/interface";
import type { CustomerRepresentativeInfo } from "../../../model/users";
const emit = defineEmits(["updateData"]);
const apiClient = ApiClient.getInstance();
const dialogStore = useDialogStore();
const { dialogInfo }: any = storeToRefs(dialogStore);
// 搜索方式接口
interface options {
  value: string;
  label: string;
}
// 选择的搜索方式
const searchOptionChoosed = ref<string>("companyname");
// 搜索方式
const searchOptions = ref<options[]>([
  {
    value: "companyname",
    label: "按公司名称搜",
  },
  {
    value: "username",
    label: "按联系人搜",
  },
  {
    value: "phone",
    label: "按手机号搜",
  },
]);
// 表单渲染时的加载动画
const loading = ref<boolean>(true);
// 存储搜索框内容
const searchValue = ref<string>("");
// 存储表单数据
const tableData = ref<CustomerRepresentativeInfo[]>([]);
// 存储搜索关键字过滤后的数据
const filterData = ref<CustomerRepresentativeInfo[]>([]);
// 分页框 页数
const currentPage = ref<number>(1);
// 显示表单数据行数
const pageSize = ref<number>(10);
// 表单总数
const pageTotal = ref<number>(0);
// 获取表单数据
const getTableData = async (): Promise<void> => {
  try {
    searchValue.value = "";
    loading.value = true;
    // /CustomerRepresentative?pageSize=${数据大小}&page=${页数}
    const response = await apiClient.get<apiResponseCustomerRepresentative>(
      `/CustomerRepresentative?pageSize=${pageSize.value}&page=${currentPage.value}`
    );
    const responseData: any = response!.data.data;
    // 页面数据长度
    pageTotal.value = response!.data.total;
    tableData.value = responseData.map((user: CustomerRepresentativeInfo) => ({
      id: user.id,
      companyname: user.companyname,
      lastUpdater: user.username,
      companyAddress: user.address,
      createTime: user.created_at,
      phone: user.phone,
      remark: user.remark,
      lastUpdateTime: user.updated_at,
      address: user.address,
      classification: user.groups.map((group) => group.group_name),
    }));
    // 初始情况下，搜索结果和全局数据相同
    filterData.value = [...tableData.value];
    // 渲染成功，加载动画消失
    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};
// 获取过滤之后的数据
const filterTableData = async (
  searchValue: string,
  searchType: string
): Promise<void> => {
  // 如果没有输入如何关键字，则显示所有数据
  if (!searchValue) {
    filterData.value = [...tableData.value];
    return;
  }
  try {
    // /CustomerRepresentative?pageSize=${数据大小}&page=${页数}
    const response = await apiClient.post<apiResponseCustomerRepresentative>(
      `/CustomerRepresentative/filter?pageSize=${pageSize.value}&page=${currentPage.value}`,
      {
        searchValue,
        searchType,
      }
    );
    const responseData: any = response!.data.data;
    // 页面数据长度
    pageTotal.value = response!.data.total;
    filterData.value = responseData.map((user: CustomerRepresentativeInfo) => ({
      id: user.id,
      companyname: user.companyname,
      lastUpdater: user.username,
      companyAddress: user.address,
      createTime: user.created_at,
      phone: user.phone,
      remark: user.remark,
      lastUpdateTime: user.updated_at,
      address: user.address,
      classification: user.groups.map((group) => group.group_name),
    }));
    console.log(filterData);
  } catch (error) {
    console.log(error);
  }
};

// 创建一个防抖函数 在输入框输入最后一个字 500毫秒之后执行 filterTableData函数
const debouncedFunc = debounce(filterTableData, 500);
// 定义当分页大小变化时
const handleSizeChange = (val: number) => {
  // 如果有查询数据则修改查询数据的表单数据
  if (searchValue.value == "") {
    getTableData();
  } else {
    filterTableData(searchValue.value, searchOptionChoosed.value);
  }
};

// 定义当页码变化时
const handleCurrentChange = (val: number) => {
  // 如果有查询数据则修改查询数据的表单数据
  if (searchValue.value == "") {
    getTableData();
  } else {
    filterTableData(searchValue.value, searchOptionChoosed.value);
  }
};

const btnLoading = ref<boolean>(false);
// 定义编辑操作
const handleEdit = async (index: number, row: CustomerRepresentativeInfo) => {
  btnLoading.value = true;
  const userRes = await apiClient.get<apiResponseUser & apiResponseData>(
    "/CustomerRepresentative/" + row.id
  );
  const customerInfo = userRes!.data;
  console.log(customerInfo);
  // 获取组信息
  const groupRes = await apiClient.get<apiResponseData>(
    "/group/name/" + row.id
  );
  // 设置弹窗数据
  dialogInfo.value.title = "修改客户信息";
  dialogInfo.value.isShow = true;
  dialogInfo.value.id = row.id;
  dialogInfo.value.data = {
    companyname: customerInfo.companyname,
    username: customerInfo.username,
    address: customerInfo.address,
    phone: customerInfo.phone,
    remark: customerInfo.remark,
    group_name: groupRes!.data,
  };
  btnLoading.value = false;
};

// 定义删除操作
const handleDelete = async (index: number, row: CustomerRepresentativeInfo) => {
  ElMessageBox.confirm(
    `是否要删除第${index + 1}行、公司名为${row.companyname}?`,
    "是否确认删除",
    {
      distinguishCancelAndClose: true,
      confirmButtonText: "删除",
      cancelButtonText: "取消",
      type: "warning",
    }
  )
    .then(async () => {
      const response = await apiClient.delete<apiResponseData>(
        "/CustomerRepresentative/" + row.id
      );
      // 在页面上展示删除成功的提示消息
      ElMessage({
        type: "success",
        message: `删除了公司：${dialogInfo.value.data.companyname}`,
      });
      if (searchValue.value == "") {
        getTableData();
      } else {
        filterTableData(searchValue.value, searchOptionChoosed.value);
      }
    })
    .catch((action: Action) => {
      console.log(action);
      ElMessage({
        type: "info",
        message: action === "cancel" ? "取消删除" : "删除失败",
      });
    });
};

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<any>([]);
// 点击了批量删除
const deleteMany = async () => {
  ElMessageBox.confirm(`是否要执行批量删除的操作`, "是否确认删除", {
    distinguishCancelAndClose: true,
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const ids = multipleSelection.value.map((val: any) => val.id);
      const promises = ids.map((id: any) =>
        apiClient.delete<apiResponseUser & apiResponseData>(
          "/CustomerRepresentative/" + id
        )
      );
      if (searchValue.value == "") {
        getTableData();
      } else {
        filterTableData(searchValue.value, searchOptionChoosed.value);
      }
    })
    .catch((action: Action) => {
      ElMessage({
        type: "info",
        message: action === "cancel" ? "取消删除" : "删除失败",
      });
    });
};

// 获取已点击的按钮数据
const handleSelectionChange = (val: any) => {
  multipleSelection.value = val;
};

// 新增客户
const add = () => {
  dialogStore.clearInfo();
  dialogInfo.value.title = "新增客户信息";
  dialogInfo.value.isShow = true;
  dialogInfo.value.id = 0;
};

onMounted(() => {
  getTableData();
});

// 使用 watchEffect 监听搜索字段（关键字和搜索类型）变化并过滤表格数据
watchEffect(() => {
  debouncedFunc(searchValue.value, searchOptionChoosed.value);
});
</script>

<style scoped lang="scss">
$views-li: 40px;

#Order {
  column-gap: 10px;
  height: calc(100% - 120px);
  margin: 10px;

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

    .table {
      height: 600px;
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
