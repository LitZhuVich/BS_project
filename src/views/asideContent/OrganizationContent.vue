<template>
  <div class="OrganBox">
    <div class="OrganBoxCenter">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <!-- 部门管理 -->
        <el-tab-pane label="部门管理" name="sectional">
          <div class="function_input">
            <el-input
              v-model="groupSearch"
              placeholder="查找部门"
              :prefix-icon="Search"
              class="search-input"
            />
          </div>
          <el-table
            :data="groupTableData"
            style="width: 100%"
            height="600"
            border
            v-loading="groupLoading"
          >
            <el-table-column
              type="selection"
              width="55"
              show-overflow-tooltip
            />
            <el-table-column
              label="部门名"
              prop="group_name"
              show-overflow-tooltip
            />
            <el-table-column label="部门编号" prop="id" show-overflow-tooltip />
            <el-table-column
              label="部门人数"
              prop="users_count"
              show-overflow-tooltip
            />
            <el-table-column
              label="部门负责人"
              prop="group_principal"
              show-overflow-tooltip
            />
            <!-- <el-table-column
              label="负责模块"
              prop="date"
              show-overflow-tooltip
            /> -->
            <el-table-column
              label="备注"
              prop="group_remark"
              show-overflow-tooltip
            />
            <!-- <el-table-column label="操作" prop="name" width="200">
              <template #default="scope">
                <el-button
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)"
                  :icon="EditPen"
                  >修改</el-button
                >
                <el-button
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  :icon="CloseBold"
                  >删除</el-button
                >
              </template>
            </el-table-column> -->
          </el-table>
          <div class="demo-pagination-block">
            <el-config-provider :locale="zhCn">
              <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30, 40]"
                layout="sizes, prev, pager, next, jumper"
                :total="pageTotal"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            /></el-config-provider>
          </div>
        </el-tab-pane>
        <!-- 技能管理 -->
        <el-tab-pane label="技能管理" name="skill">
          <el-dialog v-model="dialogTableVisible" title="技能介绍">
            <el-table :data="gridData">
              <el-table-column property="skill_name" label="技能" width="150" />
              <el-table-column
                property="skill_name"
                label="使用语言"
                width="200"
              />
              <el-table-column property="skill_description" label="技能详解" />
            </el-table>
          </el-dialog>
          <div class="function_input">
            <el-input
              v-model="skillSearch"
              placeholder="查找技能"
              :prefix-icon="Search"
              class="search-input"
            />
          </div>
          <el-table
            :data="skillTableData"
            style="width: 100%"
            height="600"
            border
            v-loading="skillLoading"
          >
            <el-table-column
              type="selection"
              width="55"
              show-overflow-tooltip
            />
            <el-table-column label="技能编号" prop="id" show-overflow-tooltip />
            <el-table-column
              label="技能"
              prop="skill_name"
              show-overflow-tooltip
            />
            <el-table-column label="推荐指数" show-overflow-tooltip>
              <template #default="scope">
                <el-rate v-model="scope.row.skill_recommend" :disabled="true" />
              </template>
            </el-table-column>
            <el-table-column label="描述" show-overflow-tooltip>
              <template #default="scope">
                <el-button text @click="getGridData(scope.row.id)">
                  查看
                </el-button>
              </template>
            </el-table-column>
            <!-- <el-table-column label="详细操作" prop="name" width="200">
              <template #default="scope">
                <el-button
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)"
                  :icon="EditPen"
                  >修改</el-button
                >
                <el-button
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  :icon="CloseBold"
                  >删除</el-button
                >
              </template>
            </el-table-column> -->
          </el-table>
          <div class="demo-pagination-block">
            <el-config-provider :locale="zhCn">
              <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30, 40]"
                layout="sizes, prev, pager, next, jumper"
                :total="pageTotal"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            /></el-config-provider>
          </div>
        </el-tab-pane>
        <!-- 工程师管理 -->
        <el-tab-pane label="工程师管理" name="engineer">
          <div class="function_input">
            <el-input
              v-model="engineersSearch"
              placeholder="查找工程师"
              :prefix-icon="Search"
              class="search-input"
            />
          </div>
          <div class="function_input2">
            <el-button type="primary" @click="add()">添加</el-button>
            <el-button type="primary" @click="getengineersEngineer()">
              刷新
            </el-button>
          </div>
          <el-table
            :data="engineersTableData"
            style="width: 100%"
            height="600"
            border
            v-loading="engineersLoading"
          >
            <el-table-column
              type="selection"
              width="55"
              show-overflow-tooltip
            />
            <el-table-column
              label="工程师编号"
              prop="id"
              show-overflow-tooltip
            />
            <el-table-column
              label="名字"
              prop="username"
              show-overflow-tooltip
              width="150px"
            />
            <el-table-column
              label="所属部门"
              prop="groups"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="技能"
              prop="skills"
              show-overflow-tooltip
              width="120px"
            >
            </el-table-column>
            <!-- <el-table-column
              label="技能熟练度"
              prop="skill_proficiency"
              show-overflow-tooltip
              width="120px"
            /> -->
            <el-table-column
              label="联系电话"
              prop="phone"
              show-overflow-tooltip
            />
            <el-table-column
              label="技能熟练度"
              prop="skill_proficiency"
              show-overflow-tooltip
            >
              <template #default="scope">
                <el-progress
                  :text-inside="true"
                  :stroke-width="26"
                  :percentage="scope.row.sk.length * 10"
                />
              </template>
            </el-table-column>
            <el-table-column label="备注" prop="remark" show-overflow-tooltip />
            <el-table-column label="操作" prop="name" width="200">
              <template #default="scope">
                <el-button
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)"
                  :icon="EditPen"
                  :loading="btnLoading"
                  >修改</el-button
                >
                <el-button
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  :icon="CloseBold"
                  >删除</el-button
                >
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
                :total="pageTotal"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            /></el-config-provider>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

  <el-dialog v-model="dialogInfo.isShow" :title="dialogInfo.title">
    <EngineerDialog />
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, onMounted, watchEffect } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { EditPen, CloseBold } from "@element-plus/icons-vue";
import { Search } from "@element-plus/icons-vue";
import ApiClient from "../../request/request";
import { storeToRefs } from "pinia";
import { useDialogStore } from "../../store/store";
import EngineerDialog from "../../components/formContent/Engineer.vue";
const emit = defineEmits(["updateData"]);
const dialogStore = useDialogStore();
const { dialogInfo }: any = storeToRefs(dialogStore);
const apiClient = ApiClient.getInstance();
// 分页框 页数
const currentPage = ref<number>(1);
// 显示表单数据行数
const pageSize = ref<number>(10);
// 表单总数
const pageTotal = ref<number>(0);
// 加载
const groupLoading = ref<boolean>(true);
// 接收输入框的值
const groupSearch = ref("");
const groupTableData = ref<any[]>([]);
// 部门管理
const getGroupEngineer = async () => {
  const engineer = await apiClient.get<any>(
    `/group/engineerPaginate?pageSize=${pageSize.value}&page=${currentPage.value}`
  );
  pageTotal.value = engineer.data.total;
  groupTableData.value = [...engineer.data.data];
  groupLoading.value = false;
};
// 查找部门
const filterGroupEngineer = async () => {
  const engineer = await apiClient.get<any>(
    `/group/engineerFilter?pageSize=${pageSize.value}&page=${currentPage.value}&searchValue=${groupSearch.value}`
  );
  pageTotal.value = engineer.data.total;
  groupTableData.value = [...engineer.data.data];
};
// 加载
const skillLoading = ref<boolean>(true);
// 接收输入框的值
const skillSearch = ref("");
const skillTableData = ref<any[]>([]);
// 技能管理
const getSkillEngineer = async () => {
  const skill = await apiClient.get<any>(
    `/skill/paginate?pageSize=${pageSize.value}&page=${currentPage.value}`
  );
  skillTableData.value = [...skill.data.data];
  skillLoading.value = false;
};
// 查找技能
const filterSkillEngineer = async () => {
  const engineer = await apiClient.get<any>(
    `/skill/showFilter?pageSize=${pageSize.value}&page=${currentPage.value}&searchValue=${skillSearch.value}`
  );
  pageTotal.value = engineer.data.total;
  skillTableData.value = [...engineer.data.data];
};
const gridData = ref<any>([]);
const getGridData = async (id: number) => {
  const data = await apiClient.get<any>("/skill/" + id);
  gridData.value = [...data.data];
  dialogTableVisible.value = true;
};
// 加载
const engineersLoading = ref<boolean>(true);
// 接收输入框的值
const engineersSearch = ref("");
const engineersTableData = ref<any>([]);
// 工程师管理
const getengineersEngineer = async () => {
  engineersLoading.value = true;
  const engineers = await apiClient.get<any>(
    `/engineerPaginate?pageSize=${pageSize.value}&page=${currentPage.value}`
  );
  engineersTableData.value = engineers.data.data.map((data: any) => ({
    ...data,
    groups: data.groups.map((group: any) => group.group_name ?? ""),
    skills: data.skills.map((skill: any) => skill.skill_name ?? ""),
    sk: data.skills,
  }));
  engineersLoading.value = false;
};
// 查找工程师
const filterEngineerslEngineer = async () => {
  const engineers = await apiClient.get<any>(
    `/engineerFilter?pageSize=${pageSize.value}&page=${currentPage.value}&searchValue=${engineersSearch.value}`
  );
  pageTotal.value = engineers.data.total;
  engineersTableData.value = engineers.data.data.map((data: any) => ({
    ...data,
    groups: data.groups.map((group: any) => group.group_name),
    skills: data.skills.map((skill: any) => skill.skill_name),
  }));
};

onMounted(() => {
  getGroupEngineer();
  getSkillEngineer();
  getengineersEngineer();
});
// 使用 watchEffect 监听搜索字段（关键字和搜索类型）变化并过滤表格数据
watchEffect(() => {
  filterGroupEngineer();
  filterSkillEngineer();
  filterEngineerslEngineer();
});

// 新增工程师
const add = () => {
  dialogStore.clearInfo();
  dialogInfo.value.title = "新增工程师信息";
  dialogInfo.value.isShow = true;
  dialogInfo.value.id = 0;
};

const dialogTableVisible = ref(false);
// 定义当分页大小变化时
const handleSizeChange = (val: number) => {
  // 如果有查询数据则修改查询数据的表单数据
  if (groupSearch.value == "") {
    getGroupEngineer();
  } else {
    filterGroupEngineer();
  }
};
// 定义当页码变化时
const handleCurrentChange = (val: number) => {
  if (groupSearch.value == "") {
    getGroupEngineer();
  } else {
    filterGroupEngineer();
  }
};
const btnLoading = ref<boolean>(false);
// 修改
const handleEdit = async (index: number, row: any) => {
  btnLoading.value = true;
  const userRes = await apiClient.get<any>("/CustomerRepresentative/" + row.id);
  const customerInfo = userRes!.data;
  // 获取组信息
  const groupRes = await apiClient.get<any>("/group/name/" + row.id);
  // 设置弹窗数据
  dialogInfo.value.title = "修改工程师信息";
  dialogInfo.value.isShow = true;
  dialogInfo.value.id = row.id;
  dialogInfo.value.data = {
    username: customerInfo.username,
    address: customerInfo.address,
    phone: customerInfo.phone,
    remark: customerInfo.remark,
    group_name: groupRes!.data,
  };
  btnLoading.value = false;
};

// 删除
const handleDelete = (index: number, row: any) => {
  ElMessageBox.confirm(`是否要删除？`, "是否确认删除", {
    distinguishCancelAndClose: true,
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      if (row.group_role != null) {
        const response = await apiClient.delete<any>("/group/" + row.id);
        // 在页面上展示删除成功的提示消息
        ElMessage({
          type: "success",
          message: `删除成功`,
        });
        if (groupSearch.value == "") {
          getGroupEngineer();
        } else {
          filterGroupEngineer();
        }
      }
      // if (row.) {
      // }
    })
    .catch((action: any) => {
      ElMessage({
        type: "info",
        message: action === "cancel" ? "取消删除" : "删除失败",
      });
    });
};

import type { TabsPaneContext } from "element-plus";
const activeName = ref("sectional");
// 标签点击事件
const handleClick = (tab: TabsPaneContext, event: Event) => {};
</script>
<style lang="scss">
.OrganBox {
  margin: 10px !important;
  padding: 10px !important;
  box-sizing: border-box;
  height: calc(100% - 120px);
  background-color: white;
  .function_input {
    display: flex;
    float: left;
    width: 200px;
    padding-bottom: 10px;
  }
  .function_input2 {
    display: flex;
    float: left;
    width: 200px;
    padding-bottom: 10px;
    padding-left: 20px;
  }
  .demo-pagination-block {
    line-height: 50px;
    padding-left: 10px;
    padding-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
