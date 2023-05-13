<template>
  <div>
    <el-dialog v-model="confirmDelete" title="确认" width="30%" align-center>
      <span>确定要删除吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="confirmDelete = false">取消</el-button>
          <el-button type="primary" @click="handleDelete()"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { apiResponseData } from "../model/interface";
import { ElNotification } from "element-plus";
import { useDialogStore } from "../store/store";
import { storeToRefs } from "pinia";
import ApiClient from "../request/request";
const props = defineProps({
  updateData: Function,
});
const apiClient = ApiClient.getInstance();
const dialogStore = useDialogStore();
const { dialogInfo, confirmDelete, delUrl }: any = storeToRefs(dialogStore);
const handleDelete = async () => {
  const response = await apiClient.delete<apiResponseData>(
    `/${delUrl.value}/` + dialogInfo.value.id
  );
  // 在页面上展示删除成功的提示消息
  ElNotification({
    title: "Success",
    message: `${response!.data}，删除了
    公司：${dialogInfo.value.data.companyname}`,
    type: "success",
  });
  confirmDelete.value = false;
  // 还原数据
  dialogStore.clearInfo();
  (props as any).updateData();
};
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
