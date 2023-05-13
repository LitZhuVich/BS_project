<template>
  <div class="customerBox">
    <div class="function">
      <span><b>工单模板</b></span>
      <!-- 按钮 -->
      <div class="function_button">
        <el-dialog v-model="dialogFormVisible" title="工单模板">
          <el-form :model="form">
            <el-form-item label="模板名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="模板类别" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请输入">
                <el-option label="Zone No.1" value="shanghai" />
                <el-option label="Zone No.2" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="模板描述" :label-width="formLabelWidth">
              <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-form-item label="可见范围" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请输入">
                <el-option label="Zone No.1" value="shanghai" />
                <el-option label="Zone No.2" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <el-switch
                v-model="value1"
                class="mb-2"
                active-text="自动分派"
                inactive-text="不自动分派"
              />
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <el-switch
                v-model="value2"
                class="mb-2"
                active-text="自动分派路由"
                inactive-text="不自动分派路由"
              />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">
                确认
              </el-button>
            </span>
          </template>
        </el-dialog>
        <el-button type="success" plain :icon="Plus">添加</el-button>
        <el-button @click="dialogFormVisible = true" plain type="info"
          >更多</el-button
        >
      </div>
    </div>
    <!-- 显示客户页 -->
    <div class="content">
      <el-table :data="filterTableData" stripe style="width: 100%" height="450">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="customerService" label="模板名称" sortable />
        <el-table-column prop="source" label="模板描述" />
        <el-table-column prop="phone" label="可见范围" sortable />
        <el-table-column prop="creattime" label="创建时间" />
        <el-table-column prop="notes" label="备注" />
        <el-table-column prop="createTime" label="操作" width="160">
          <template #default="scope: any">
            <el-button type="primary">{{ scope.row.add }}</el-button>
            <el-button type="danger">{{ scope.row.delete }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from "vue";
import { Plus } from "@element-plus/icons-vue";

const dialogFormVisible = ref(false);
const formLabelWidth = "140px";

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
const value1 = ref(true);
const value2 = ref(true);

const tableData = [
  {
    customerService: "张杰杰",
    creattime: "2023-02-27 15:29:55",
    phone: "所有客服",
    source: "售后设备维修模板",
    add: "编辑",
    delete: "删除",
    notes: "无",
  },
  {
    customerService: "张杰杰",
    creattime: "2023-02-27 15:29:55",
    phone: "所有客服",
    source: "售后设备维修模板",
    add: "编辑",
    notes: "无",
    delete: "删除",
  },
  {
    customerService: "张杰杰",
    creattime: "2023-02-27 15:29:55",
    phone: "所有客服",
    source: "售后设备维修模板",
    add: "编辑",
    notes: "无",
    delete: "删除",
  },
  {
    customerService: "张杰杰",
    creattime: "2023-02-27 15:29:55",
    phone: "所有客服",
    source: "售后设备维修模板",
    add: "编辑",
    notes: "无",
    delete: "删除",
  },
  {
    customerService: "张杰杰",
    creattime: "2023-02-27 15:29:55",
    phone: "所有客服",
    source: "售后设备维修模板",
    add: "编辑",
    notes: "无",
    delete: "删除",
  },
];

//搜索框
const searchName = ref("");
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
  margin: 10px;
  padding: 10px;
  box-sizing: border-box;
  height: calc(100% - 120px);
  background-color: white;

  .function {
    padding: 15px;
    box-sizing: border-box;
    overflow: auto;

    .function_button {
      float: right;
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
