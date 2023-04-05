<template>
  <div id="loginBody">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="90px"
      label-suffix="："
      class="demo-ruleForm"
    >
      <h2 class="title">登录</h2>
      <el-form-item label="账号" prop="name">
        <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          登录
        </el-button>
        <el-button @click="resetForm(ruleFormRef)"> 重置 </el-button>
        <el-checkbox
          v-model="rememberMe"
          label="记住我"
          style="margin-left: 10px"
        />
      </el-form-item>
      <hr />
      <el-form-item>
        <el-text> 没有账号？前往 </el-text>
        <el-link
          href="register"
          type="primary"
          :underline="false"
          style="margin-left: 5px"
        >
          注册
        </el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const ruleFormRef = ref<FormInstance>();
// 存储是否记住我
const rememberMe = ref<boolean>(false);
// 检测用户名
const validateName = (rule: any, value: any, callback: any): void => {
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else {
    if (ruleForm.name !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("name", () => null);
    }
    callback();
  }
};
// 检测密码
const validatePass = (rule: any, value: any, callback: any): void => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (ruleForm.name !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};

// 验证表单对象
const ruleForm = reactive({
  name: "",
  pass: "",
});
// 认证规则
const rules = reactive<FormRules>({
  name: [{ validator: validateName, trigger: "change" }],
  pass: [{ validator: validatePass, trigger: "change" }],
});
// 提交表单
const submitForm = (formEl: FormInstance | undefined): void => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // 提交成功
      console.log("submit!");
    } else {
      // 提交失败
      console.log("error submit!");
      return false;
    }
  });
};
// 重置方法
const resetForm = (formEl: FormInstance | undefined): void => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped lang="scss">
#loginBody {
  width: 100vw;
  height: 100vh;
  background: url(../../public/image/authBackImage.jpg) no-repeat center center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .demo-ruleForm {
    width: 350px;
    padding: 15px;
    padding-left: 10px;
    background-color: white;
    box-shadow: 5px 5px 20px 5px #444;
    border: 1px solid var(--el-border-color);
    border-radius: 10px;
    .title {
      text-align: center;
      margin-bottom: 20px;
    }
  }
}
</style>
