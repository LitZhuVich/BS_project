<template>
  <div class="AddContentbox">
    <div class="AddContentbox_center">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
        :size="formSize" status-icon>
        <p>
          <el-form-item label="资产模板" class="scp_btn">
            <el-select v-model="ruleForm.module_id" class="m-2" placeholder="请选择模板">
              <el-option v-for="item in asset_module" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="资产名称" class="scp_btn" prop="asset_name">
            <el-input v-model="ruleForm.asset_name" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="设备型号">
            <el-input v-model="ruleForm.model_id" placeholder="请输入资产型号" />
          </el-form-item>
        </p>
        <p>
          <el-form-item label="来源" class="scp_btn">
            <el-select v-model="ruleForm.source_id" class="m-2" placeholder="请选择来源">
              <el-option v-for="item in asset_source" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="保修时间" prop="asset_warranty">
            <el-input v-model="ruleForm.asset_warranty" type="number" min="0" />
          </el-form-item>
        </p>
        <p>
          <el-form-item label="资产地址" prop="asset_address">
            <el-input v-model="ruleForm.asset_address" placeholder="请输入资产地址" />
          </el-form-item>
          <el-form-item label="资产类别" prop="asset_categorie_id">
            <el-select v-model="ruleForm.asset_categorie_id" class="m-2" placeholder="请选择分类">
              <el-option v-for="item in asset_categorie" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </p>
        <el-form-item label="资产详情" prop="desc">
          <el-input v-model="ruleForm.description" type="textarea" />
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
import { FormInstance, FormRules, ElNotification } from "element-plus";
import ApiClient from "../../../request/request";

const apiClient = ApiClient.getInstance();

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  module_id: "", // 资产模板
  asset_name: "", // 资产名称
  user_id: "",  // 客户 TODO: 自动获取当前用户
  model_id: "",  // 型号
  source_id: "", // 来源
  asset_warranty: 0, // 保修时间
  asset_address: "",  // 资产地址
  asset_categorie_id: '',  // 资产类别
  description: "" // 详情
});

// 资产模板
const asset_module = [
  {
    value: 1,
    label: '桌面电脑'
  },
  {
    value: 2,
    label: '其他'
  }
]
// 来源
const asset_source = [
  {
    value: 1,
    label: '白云'
  }, {
    value: 2,
    label: '其他'
  }
]
// 资产类别
const asset_categorie = [
  {
    value: 1,
    label: '电脑周边',
  },
  {

    value: 2,
    label: '普通家电',
  },
  {
    value: 3,
    label: '其他'
  }
]
// 表单规则
const rules = reactive<FormRules>({
  asset_name: [
    {
      required: true,
      message: "请输入资产名称",
      trigger: "target",
    },
  ],
  asset_warranty: [
    {
      required: true,
      message: "请输入保修时间",
      trigger: "target",
    },
  ],
  asset_categorie_id: [
    {
      required: true,
      message: "请输入资产分类",
      trigger: "target",
    },
  ],
});

// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await apiClient.post<any>("/asset/add", ruleForm);
      console.log('res', res)
      ElNotification({
        title: '提交状态',
        message: res.data
      })
      formEl.resetFields();
    }
  });
};
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
<style scoped lang="scss">
.AddContentbox {
  padding: 10px;
  box-sizing: border-box;
  height: calc(100% - 120px);
  background-color: white;
  margin: 10px;

  .AddContentbox_center {
    padding: 20px;
    background-color: white;
    height: 600px;

    .el-form {
      p {
        display: flex;
        margin: 50px 0;

        .el-form-item {

          .scp_btn {
            width: 340px;
          }
        }
      }

    }
  }
}
</style>
