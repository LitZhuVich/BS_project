<template>
  <div class="OrganBox">
    <div class="OrganBoxCenter">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <!-- 部门管理 -->
        <el-tab-pane label="部门管理" name="sectional">
          <div class="function_input">
            <el-input
              v-model="searchName"
              placeholder="查找部门"
              :prefix-icon="Search"
              class="search-input"
            />
          </div>
          <el-table
            :data="filterTableData"
            style="width: 100%"
            height="600"
            border
          >
            <el-table-column
              type="selection"
              width="55"
              show-overflow-tooltip
            />
            <el-table-column label="部门名" prop="date" show-overflow-tooltip />
            <el-table-column
              label="部门编号"
              prop="name"
              show-overflow-tooltip
            />
            <el-table-column
              label="部门人数"
              prop="date"
              show-overflow-tooltip
            />
            <el-table-column
              label="部门负责人"
              prop="date"
              show-overflow-tooltip
            />
            <el-table-column
              label="负责模块"
              prop="date"
              show-overflow-tooltip
            />
            <el-table-column label="备注" prop="date" show-overflow-tooltip />
            <el-table-column label="操作" prop="name">
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
            </el-table-column>
          </el-table>
          <div class="demo-pagination-block">
            <el-config-provider :locale="zhCn">
              <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30, 40]"
                layout="sizes, prev, pager, next, jumper"
                :total="40"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            /></el-config-provider>
          </div>
        </el-tab-pane>
        <!-- 技能管理 -->
        <el-tab-pane label="技能管理" name="skill">
          <el-dialog v-model="dialogTableVisible" title="技能介绍">
            <el-table :data="gridData">
              <el-table-column property="date" label="技能" width="150" />
              <el-table-column property="name" label="使用语言" width="200" />
              <el-table-column property="address" label="技能详解" />
            </el-table>
          </el-dialog>
          <div class="function_input">
            <el-input
              v-model="searchName2"
              placeholder="查找技能"
              :prefix-icon="Search"
              class="search-input"
            />
          </div>
          <el-table
            :data="filterTableData2"
            style="width: 100%"
            height="600"
            border
          >
            <el-table-column
              type="selection"
              width="55"
              show-overflow-tooltip
            />
            <el-table-column
              label="技能编号"
              prop="date"
              show-overflow-tooltip
            />
            <el-table-column label="技能" prop="name" show-overflow-tooltip />
            <el-table-column
              label="技能等级"
              prop="date"
              show-overflow-tooltip
            />
            <el-table-column label="推荐指数" prop="date" show-overflow-tooltip>
              <el-rate v-model="value" allow-half />
            </el-table-column>
            <el-table-column label="描述" prop="date" show-overflow-tooltip>
              <template #default="scope">
                <el-button text @click="dialogTableVisible = true">
                  查看
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="详细操作" prop="name">
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
            </el-table-column>
          </el-table>
          <div class="demo-pagination-block">
            <el-config-provider :locale="zhCn">
              <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30, 40]"
                layout="sizes, prev, pager, next, jumper"
                :total="40"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            /></el-config-provider>
          </div>
        </el-tab-pane>
        <!-- 工程师管理 -->
        <el-tab-pane label="工程师管理" name="engineer">
          <div class="function_input">
            <el-input
              v-model="searchName3"
              placeholder="查找工程师"
              :prefix-icon="Search"
              class="search-input"
            />
          </div>
          <el-dialog v-model="dialogFormVisible" title="添加工程师">
            <el-form :model="form">
              <el-form-item label="工程师编号" :label-width="formLabelWidth">
                <el-input v-model="form.id" style="width: 220px" />
              </el-form-item>
              <el-form-item label="工程师姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name" style="width: 220px" />
              </el-form-item>
              <el-form-item label="所属部门" :label-width="formLabelWidth">
                <el-input v-model="form.bumen" style="width: 220px" />
              </el-form-item>
              <el-form-item label="技能" :label-width="formLabelWidth">
                <el-select v-model="form.jineng" placeholder="输入技能">
                  <el-option label="JAVA" value="JAVA" />
                  <el-option label="C++" value="C++" />
                </el-select>
              </el-form-item>
              <el-form-item label="技能熟练度" :label-width="formLabelWidth">
                <el-input v-model="form.jinengsld" style="width: 220px" />
              </el-form-item>
              <el-form-item label="联系电话" :label-width="formLabelWidth">
                <el-input v-model="form.phone" style="width: 220px" />
              </el-form-item>
              <el-form-item label="状态" :label-width="formLabelWidth">
                <el-input v-model="form.zt" style="width: 220px" />
              </el-form-item>
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="form.bz" style="width: 220px" />
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">
                  添加
                </el-button>
              </span>
            </template>
          </el-dialog>
          <div class="function_input2">
            <el-button type="primary" @click="dialogFormVisible = true"
              >添加</el-button
            >
          </div>
          <el-table
            :data="filterTableData3"
            style="width: 100%"
            height="600"
            border
          >
            <el-table-column
              type="selection"
              width="55"
              show-overflow-tooltip
            />
            <el-table-column
              label="工程师编号"
              prop="date"
              show-overflow-tooltip
            />
            <el-table-column
              label="名字"
              prop="name"
              show-overflow-tooltip
              width="150px"
            />
            <el-table-column
              label="所属部门"
              prop="date"
              show-overflow-tooltip
            />
            <el-table-column
              label="技能"
              prop="date"
              show-overflow-tooltip
              width="120px"
            />
            <el-table-column
              label="技能熟练度"
              prop="date"
              show-overflow-tooltip
              width="120px"
            />
            <el-table-column
              label="联系电话"
              prop="date"
              show-overflow-tooltip
            />
            <el-table-column label="状态" prop="date" show-overflow-tooltip>
              <el-progress
                :text-inside="true"
                :stroke-width="26"
                :percentage="70"
              />
            </el-table-column>
            <el-table-column label="备注" prop="date" show-overflow-tooltip />
            <el-table-column label="操作" prop="name">
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
            </el-table-column>
          </el-table>
          <div class="demo-pagination-block">
            <el-config-provider :locale="zhCn">
              <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30, 40]"
                layout="sizes, prev, pager, next, jumper"
                :total="40"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            /></el-config-provider></div
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, reactive, onMounted } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { EditPen, CloseBold } from "@element-plus/icons-vue";
import { Search } from "@element-plus/icons-vue";
import ApiClient from "../../request/request";
const apiClient = ApiClient.getInstance();

const getGroupEngineer = async () => {
  const engineer = await apiClient.get<any>("/group/engineer");
  console.log(engineer.data);
};

onMounted(() => {
  getGroupEngineer();
});
const dialogTableVisible = ref(false);
const dialogFormVisible = ref(false);
const formLabelWidth = "100px";
const form = reactive({
  id: "",
  name: "",
  bumen: "",
  jineng: "",
  jinengsld: "",
  phone: "",
  zt: "",
  bz: "",
  desc: "",
});
const currentPage = ref(1); // 当前页面
const pageSize = ref(10); // 一页多少数据
const value = ref(3);
const handleSizeChange = (val: number) => {
  console.log(`每页${val}个数据`);
};
const handleCurrentChange = (val: number) => {
  console.log(`当前在第${val}页`);
};
const search = ref("");
// 部门
const searchName = ref("");
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
interface User {
  date: string;
  name: string;
  address: string;
}
// 技能
const searchName2 = ref("");
const filterTableData2 = computed(() =>
  tableData2.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
interface User2 {
  date: string;
  name: string;
  address: string;
}
// 工程师
const searchName3 = ref("");
const filterTableData3 = computed(() =>
  tableData3.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
interface User3 {
  date: string;
  name: string;
  address: string;
}
// 修改
const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
// 删除
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

const tableData: User[] = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "John",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Morgan",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
];
const tableData2: User2[] = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "John",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Morgan",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
];
const tableData3: User3[] = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "John",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Morgan",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
];
const gridData = [
  {
    date: "2016-05-02",
    name: "John Smith",
    address: "No.1518,  Jinshajiang Road, Putuo District",
  },
];
import type { TabsPaneContext } from "element-plus";
const activeName = ref("sectional");
// 标签点击事件
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
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
