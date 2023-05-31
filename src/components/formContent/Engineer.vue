<template>
  <!-- 弹出窗 -->
  <el-form
    ref="ruleFormRef"
    :model="dialogInfo.data"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    label-suffix="："
  >
    <el-form-item label="工程师姓名" prop="username">
      <el-input
        v-model="dialogInfo.data.username"
        autocomplete="off"
        type="text"
        placeholder="工程师姓名"
      />
    </el-form-item>
    <el-form-item label="工程师地址">
      <el-input
        v-model="dialogInfo.data.address"
        autocomplete="off"
        placeholder="工程师地址"
        type="text"
      />
    </el-form-item>
    <el-form-item label="联系电话" prop="phone">
      <el-input
        v-model="dialogInfo.data.phone"
        autocomplete="off"
        type="text"
        placeholder="联系电话"
        maxlength="11"
        show-word-limit
      />
    </el-form-item>
    <el-form-item label="备注">
      <el-input
        v-model="dialogInfo.data.remark"
        type="textarea"
        placeholder="该工程师备注"
        autocomplete="off"
        autosize
        maxlength="200"
        show-word-limit
      />
    </el-form-item>
    <el-form-item label="部门" v-if="dialogInfo.id != 0">
      <el-select
        v-model="dialogInfo.data.group_name"
        placeholder="选择部门"
        multiple
        autocomplete="off"
      >
        <el-option
          v-for="item in groupFormdata"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
  <span class="dialog-footer">
    <el-button @click="cancel()">取消</el-button>
    <el-button type="primary" @click="submit(ruleFormRef)" :loading="loading">
      确认
    </el-button>
  </span>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus";
import { ElNotification } from "element-plus";
import { ref, onMounted, reactive, computed } from "vue";
import type {
  apiResponseData,
  apiResponseCustomerRepresentative,
  apiResponseMessage,
} from "../../model/interface";
import { useDialogStore } from "../../store/store";
import { storeToRefs } from "pinia";
import ApiClient from "../../request/request";
const apiClient = ApiClient.getInstance();
const dialogStore = useDialogStore();
const { dialogInfo }: any = storeToRefs(dialogStore);
const ruleFormRef = ref<FormInstance>();

// 下拉框接口
interface options {
  value: string;
  label: string;
}

// 用户名验证
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入更新人"));
  } else {
    if (
      value == "admin" ||
      value == "litzhu" ||
      value == "piqiu" ||
      value == "cly"
    ) {
      callback(new Error("请重新输入名称"));
    }
    callback();
  }
};
// 手机号验证
const validatePhone = (rule: any, value: any, callback: any) => {
  if (value != "") {
    if (value.length == 11) {
      callback();
    } else {
      callback(new Error("手机号需要11位"));
    }
  } else {
    callback();
  }
};
// 验证规则
const rules = reactive<FormRules>({
  username: [{ validator: validateUsername, trigger: "change" }],
  phone: [{ validator: validatePhone, trigger: "blur" }],
});
// 分组下拉框数据
const groupFormdata = ref<options[]>([]);
// 获取分组下拉框数据
const getSearchOptions = async (): Promise<void> => {
  const response = await apiClient.get<apiResponseData>("/group/name");
  groupFormdata.value = (response!.data as any).map((user: options) => {
    return {
      value: user,
      label: user,
    };
  });
};
// 取消按钮
const cancel = (): void => {
  // 执行还原数据方法
  dialogStore.clearInfo();
};
const loading = ref<boolean>(false);
// 确认按钮
const submit = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    loading.value = true;
    if (valid) {
      if (!dialogInfo.value.isShow) {
        // console.error("你是怎么按的按钮？");
        console.error("提交失败，请检查格式");
        // 失败弹窗
        ElNotification({
          title: "失败",
          message: "提交失败，请检查格式",
          type: "error",
        });
        loading.value = false;
        return;
      }

      if (dialogInfo.value.title == "新增工程师信息") {
        const res = await apiClient.post<any>(
          "/CustomerRepresentative",
          dialogInfo.value.data,
          { params: { role_id: 2 } }
        );
        console.log(res);
        if (res!.code == 200) {
          ElNotification({
            title: "成功",
            message: "新增成功",
            type: "success",
          });
          cancel();
        } else if (res!.code == 422) {
          ElNotification({
            title: "失败",
            message: "提交失败（可能是公司名重复和更新人重复",
            type: "error",
          });
          console.error(res!.data.message);
        } else {
          ElNotification({
            title: "失败",
            message: res!.message,
            type: "error",
          });
        }
      } else if (dialogInfo.value.title == "修改工程师信息") {
        const res = await apiClient.put<any>(
          "/CustomerRepresentative/" + dialogInfo.value.id,
          dialogInfo.value.data
        );
        // 提交
        if (res!.code == 200) {
          ElNotification({
            title: "成功",
            message: "修改成功",
            type: "success",
          });
          cancel();
        } else {
          ElNotification({
            title: "失败",
            message: res!.message,
            type: "error",
          });
        }
      }
      loading.value = false;
    } else {
      loading.value = false;
      return false;
    }
    loading.value = false;
  });
};

onMounted(() => {
  getSearchOptions();
});
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
