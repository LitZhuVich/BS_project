<template>
  <div class="Inventory">
    <div class="Inventory_box">
      <!-- 头部标题 -->
      <span><b>客户资产</b></span>
      <span class="Inventory_box_title">
        <el-tag type="info" plain>查看和管理用户资产</el-tag>
      </span>
      <!-- 内容 -->
      <div class="Inventory_contern">
        <el-form
          ref="form"
          :model="sizeForm"
          label-width="auto"
          :label-position="labelPosition"
          :size="size"
          :inline="true"
        >
          <!-- 资产模板 -->
          <el-form-item label="资产模板">
            <el-select v-model="sizeForm.region" placeholder="桌面电脑">
              <el-option label="桌面电脑" value="桌面电脑" />
              <el-option label="智能手机" value="智能手机" />
            </el-select>
          </el-form-item>
          <!-- 资产名称 -->
          <el-form-item label="资产名称" class="form_sb">
            <el-input
              v-model="sizeForm.firstName"
              placeholder="请输入"
              size="default"
            />
          </el-form-item>
          <!-- 序列号 -->
          <el-form-item label="序列号" class="form_sb">
            <el-input
              v-model="sizeForm.firstName"
              placeholder="请输入"
              size="default"
            />
          </el-form-item>
          <!-- 客户 -->
          <el-form-item label="客户" class="form_sb">
            <el-input
              v-model="sizeForm.firstName"
              placeholder="请输入"
              size="default"
            />
          </el-form-item>
          <!-- 设备型号 -->
          <el-form-item label="设备型号" class="form_sb">
            <el-input
              v-model="sizeForm.firstName"
              placeholder="请输入"
              size="default"
            />
          </el-form-item>
          <!-- 来源 -->
          <el-form-item label="来源">
            <el-select v-model="sizeForm.region2" placeholder="请选择">
              <el-option label="小黄" value="小黄" />
              <el-option label="小红" value="小红" />
            </el-select>
          </el-form-item>
          <!-- 保修日期 -->
          <el-form-item label="保修日期">
            <el-date-picker
              v-model="value2"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :shortcuts="shortcuts"
              :size="size"
            />
          </el-form-item>
          <!-- 资产地址 -->
          <el-form-item label="资产地址" class="form_sb">
            <el-input
              v-model="sizeForm.firstName"
              placeholder="请输入"
              size="default"
            />
          </el-form-item>
          <!-- 固定维修周期 -->
          <el-form-item label="固定维修周期" class="form_sb">
            <el-input
              v-model="sizeForm.firstName"
              placeholder="请输入"
              size="default"
            />
          </el-form-item>
          <!-- 资产类别 -->
          <el-form-item label="资产类别">
            <el-select v-model="sizeForm.region2" placeholder="请选择">
              <el-option label="小黄" value="小黄" />
              <el-option label="小红" value="小红" />
            </el-select>
          </el-form-item>
          <!-- 保内维护人员 -->
          <el-form-item label="保内维护人员">
            <el-select v-model="sizeForm.region2" placeholder="请选择">
              <el-option label="小黄" value="小黄" />
              <el-option label="小红" value="小红" />
            </el-select>
          </el-form-item>
          <!-- 保外维护人员 -->
          <el-form-item label="保外维护人员">
            <el-select v-model="sizeForm.region2" placeholder="请选择">
              <el-option label="小黄" value="小黄" />
              <el-option label="小红" value="小红" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <!-- 按钮 -->
      <div class="Inventory_box_btn">
        <el-button :icon="Search">高级查询</el-button>
        <el-button type="primary">查询</el-button>
        <el-button type="info">重置</el-button>
      </div>
      <!-- 下表 -->
      <div>
        <el-table :data="tableData" style="width: 100%" height="320">
          <el-table-column fixed prop="code" label="序列号" width="200" />
          <el-table-column prop="name" label="资产模板" width="150" />
          <el-table-column prop="state" label="资产名称" width="150" />
          <el-table-column prop="city" label="资产类别" width="150" />
          <el-table-column prop="address" label="保修开始日期" width="250" />
          <el-table-column prop="zip" label="保修截止日期" width="250" />
          <el-table-column prop="zip2" label="客户" width="150" />
        </el-table>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
const size = ref("default");
const labelPosition = ref("right");
const value2 = ref("");
const shortcuts = [
  {
    text: "上个周",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "上个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "上个三月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];
const sizeForm = reactive({
  region: "",
  region2: "",
  fullName: "",
  firstName: "",
  lastName: "",
});

const tableData = [
  {
    code: "0111",
    name: "0111",
    state: "0111",
    city: "0111",
    address: "0111",
    zip: "0111",
    zip2: "0111",
  },
  {
    code: "0111",
    name: "0111",
    state: "0111",
    city: "0111",
    address: "0111",
    zip: "0111",
    zip2: "0111",
  },
];
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
      height: 180px;
      background: rgb(242, 248, 249);
      .form_sb {
        .el-input {
          width: 220px;
        }
      }
    }
    .Inventory_box_btn {
      margin-top: 10px;
      float: right;
    }
  }
}
</style>
