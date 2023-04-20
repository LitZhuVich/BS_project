<template>
  <div class="AddContentbox">
    <div class="AddContentbox_center">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="资产模板" class="scp_btn" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="资产名称" class="scp_btn" prop="nametwo">
          <el-input v-model="ruleForm.nametwo" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="资产型号" class="scp_btn" prop="namethree">
          <el-input v-model="ruleForm.namethree" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="序列号" prop="regiontwo">
          <el-select v-model="ruleForm.regiontwo" placeholder="01111">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="生产日期">
          <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="2023-04-02 00:00:00"
          />
        </el-form-item>
        <el-form-item label="保修时效" class="scp_btn">
          <el-input v-model="input" disabled placeholder="3" />
        </el-form-item>
        <el-form-item label="保修日期">
          <el-date-picker
            v-model="value2"
            type="datetime"
            placeholder="2026-04-02 00:00:00"
          />
        </el-form-item>
        <el-form-item label="资产类别" prop="region">
          <el-select v-model="ruleForm.region" placeholder="机器">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="资产详情" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            添加
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: "",
  nametwo: "",
  namethree: "",
  region: "",
  laiyuan: "",
  regiontwo: "",
  count: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});
const value1 = ref("");
const value2 = ref("");
const input = ref("");
const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: "请输入资产模板",
      trigger: "target",
    },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "target" },
  ],
  nametwo: [
    {
      required: true,
      message: "请输入资产名称",
      trigger: "target",
    },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "target" },
  ],
  namethree: [
    {
      required: true,
      message: "请输入资产型号",
      trigger: "target",
    },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "target" },
  ],
  region: [
    {
      required: true,
      message: "请输入资产类别",
      trigger: "change",
    },
  ],
  regiontwo: [
    {
      required: true,
      message: "请输入序列号",
      trigger: "change",
    },
  ],
  desc: [
    {
      required: true,
      message: "请输入资产详情",
      trigger: "target",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
<style scoped lang="scss">
.AddContentbox {
  padding: 10px;
  box-sizing: border-box;
  .scp_btn {
    width: 340px;
  }
  .AddContentbox_center {
    padding: 20px;
    background-color: white;
    height: 600px;
  }
}
</style>
