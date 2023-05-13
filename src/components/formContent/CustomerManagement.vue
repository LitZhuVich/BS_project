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
    <el-form-item label="公司名称" prop="companyname">
      <el-input
        v-model="dialogInfo.data.companyname"
        autocomplete="off"
        type="text"
        placeholder="公司名称"
      />
    </el-form-item>

    <el-form-item label="最后更新人" prop="username">
      <el-input
        v-model="dialogInfo.data.username"
        autocomplete="off"
        type="text"
        placeholder="最后更新人"
      />
    </el-form-item>
    <el-form-item label="公司地址">
      <el-input
        v-model="dialogInfo.data.address"
        autocomplete="off"
        placeholder="公司地址"
        type="text"
      />
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input
        v-model="dialogInfo.data.phone"
        autocomplete="off"
        type="text"
        placeholder="手机号"
        maxlength="11"
        show-word-limit
      />
    </el-form-item>
    <el-form-item label="备注">
      <el-input
        v-model="dialogInfo.data.remark"
        type="textarea"
        placeholder="该客户备注"
        autocomplete="off"
        autosize
        maxlength="200"
        show-word-limit
      />
    </el-form-item>
    <el-form-item label="分组" v-if="dialogInfo.id != 0">
      <el-select
        v-model="dialogInfo.data.group_name"
        placeholder="选择组"
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
import { ref, onMounted, reactive, computed, defineProps } from "vue";
import type {
  apiResponseData,
  apiResponseCustomerRepresentative,
  apiResponseMessage,
} from "../../model/interface";
import { useDialogStore } from "../../store/store";
import { storeToRefs } from "pinia";
import ApiClient from "../../request/request";
import { fa } from "element-plus/es/locale";
const apiClient = ApiClient.getInstance();
const dialogStore = useDialogStore();
const { dialogInfo }: any = storeToRefs(dialogStore);
const ruleFormRef = ref<FormInstance>();
const props = defineProps({
  updateData: Function,
});
// 下拉框接口
interface options {
  value: string;
  label: string;
}
// 公司名验证
const validateCompanyname = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入公司名"));
  } else {
    callback();
  }
};
// 用户名验证
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入更新人"));
  } else {
    if (value == "admin" || value == "cly" || value == "litzhu") {
      callback(new Error("请重新输入名称"));
    }
    callback();
  }
};
// 手机号验证
const validatePhone = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入手机号"));
  } else {
    if (value.length != 11) {
      callback(new Error("手机号需要11位"));
    }
    callback();
  }
};
// 验证规则
const rules = reactive<FormRules>({
  companyname: [{ validator: validateCompanyname, trigger: "change" }],
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
        return;
      }

      if (dialogInfo.value.title == "新增客户信息") {
        const res = await apiClient.post<
          apiResponseCustomerRepresentative & apiResponseMessage
        >("/CustomerRepresentative", dialogInfo.value.data);
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
      } else if (dialogInfo.value.title == "修改客户信息") {
        const res = await apiClient.patch<apiResponseCustomerRepresentative>(
          "/CustomerRepresentative/" + dialogInfo.value.id,
          dialogInfo.value.data
        );
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
      (props as any).updateData();
    } else {
      return false;
    }
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
