<template>
  <div id="loginBody">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="90px"
      label-suffix="："
      class="demo-ruleForm"
    >
      <h2 class="title">注册</h2>
      <el-form-item label="账号" prop="username">
        <el-input
          v-model="ruleForm.username"
          type="text"
          autocomplete="off"
          :prefix-icon="User"
          maxlength="20"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
          show-password
          :prefix-icon="Lock"
          maxlength="20"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="password_confirmation">
        <el-input
          v-model="ruleForm.password_confirmation"
          type="password"
          autocomplete="off"
          show-password
          :prefix-icon="Lock"
          maxlength="20"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm(ruleFormRef)"
          @keyup.enter="submitForm(ruleFormRef)"
          :loading="loading"
        >
          注册
        </el-button>
        <el-button @click="resetForm(ruleFormRef)"> 重置 </el-button>
      </el-form-item>
      <hr />
      <el-form-item>
        <el-text> 已有账号？前往 </el-text>
        <el-link
          href="login"
          type="primary"
          :underline="false"
          style="margin-left: 5px"
        >
          登录
        </el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElNotification } from "element-plus";
import { User, Lock } from "@element-plus/icons-vue";
import type { apiResponseTokenType } from "../../model/interface";
import ApiClient from "../../request/request";
import { useRouter } from "vue-router";

const apiClient = ApiClient.getInstance();
const router = useRouter();
const ruleFormRef = ref<FormInstance>();

// 检测用户名
const validateName = (rule: any, value: any, callback: any): void => {
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else {
    if (ruleForm.username !== "") {
      if (!ruleFormRef.value) return;
    }
    callback();
  }
};
// 检测密码
const validatePass = (rule: any, value: any, callback: any): void => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (ruleForm.username !== "") {
      if (!ruleFormRef.value) return;
    }
    callback();
  }
};
// 检测确认密码
const validatePass2 = (rule: any, value: any, callback: any): void => {
  if (value === "") {
    callback(new Error("请输入确认密码"));
  } else if (value !== ruleForm.password) {
    callback(new Error("与输入的密码不一致"));
  } else {
    callback();
  }
};
// 验证表单对象
const ruleForm = reactive({
  username: "",
  password: "",
  password_confirmation: "",
});
// 认证规则
const rules = reactive<FormRules>({
  username: [{ validator: validateName, trigger: "change" }],
  password: [{ validator: validatePass, trigger: "change" }],
  password_confirmation: [{ validator: validatePass2, trigger: "change" }],
});
// 加载
const loading = ref<boolean>(false);
// 提交表单
const submitForm = (formEl: FormInstance | undefined): void => {
  if (!formEl) return;
  loading.value = true;
  formEl.validate(async (valid) => {
    if (valid) {
      // 提交成功
      const response = await apiClient.post<apiResponseTokenType>(
        "/register",
        ruleForm
      );
      if (response!.data.access_token != null) {
        // 注册成功 表单信息清空
        formEl.resetFields();
        ElNotification({
          title: "Success",
          message: "注册成功",
          type: "success",
        });
        // 前往登录页
        router.push({
          name: "login",
        });
        loading.value = false;
      } else {
        // 提交失败
        ElNotification({
          title: "Error",
          message: "注册失败",
          type: "error",
        });
        loading.value = false;
      }
    } else {
      loading.value = false;
      // 账号密码输入为空
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
  background: url("/image/authBackImage.jpg") center center;
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
