<template>
  <!-- 新建工单背景 -->
  <div class="box">
    <!-- 标题、描述、添加附件 -->
    <div class="box-item attachments">
      <el-form :label-position="attachmentsPosition" label-width="75px" :model="orderData" style="max-width: 800px">
        <!-- 标题输入框 -->
        <el-form-item label="工单标题:">
          <el-input v-model="orderData.name" />
        </el-form-item>
        <!-- 描述输入框 -->
        <el-form-item label="工单描述:">
          <el-input type="textarea" :rows="5" v-model="orderData.descript" />
        </el-form-item>
      </el-form>
      <!-- 添加附件按钮 -->
      <div class="attachments_upload">
        <!-- TODO: 需要做添加附件功能 -->
        <el-upload v-model:file-list="fileList" class="upload-demo"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple :limit="3">
          <el-button type="primary">添加附件</el-button>
          <template #tip>
            <div class="el-upload__tip">
              最多只能上传3个附件
            </div>
          </template>
        </el-upload>
      </div>
    </div>
    <!-- 客户信息 -->
    <div class="box-item template">
      <div class="template_box">
        <!-- 标题 -->
        <el-text class="title">客户信息</el-text>
        <!-- 图标 -->
        <el-icon color="lightblue" :size="20" class="template_icon">
          <Setting />
        </el-icon>
      </div>
      <div class="template_center" style="margin-top: 20px">
        <!-- 客户信息表单 -->
        <el-form :label-position="templatePosition" :model="customerData">
          <el-select class="data-box" v-model="customerData.customerName" multiple filterable allow-create
            default-first-option :reserve-keyword="false" placeholder="请输入客户名称">
            <el-option v-for="item in customerData.customerNameList" :label="item" :value="item" />
          </el-select>
          <el-select class="data-box" v-model="customerData.contacter" multiple filterable allow-create
            default-first-option :reserve-keyword="false" placeholder="请输入联系人">
            <el-option v-for="item in customerData.contacterList" :label="item" :value="item" />
          </el-select>
          <el-input class="data-box" v-model="customerData.phone" placeholder="请输入联系电话" />
          <el-input class="data-box" v-model="customerData.servicePlace" placeholder="请输入服务地区" />
          <el-input class="data-box" v-model="customerData.address" placeholder="请输入详细地址" />
        </el-form>
      </div>
    </div>
    <!-- 到达时间、优先级 -->
    <div class="box-item attribute">
      <div class="template_box">
        <!-- 标题 -->
        <el-text class="title">其他</el-text>
        <!-- 图标 -->
        <el-icon color="lightblue" :size="20" class="template_icon">
          <Link />
        </el-icon>
      </div>
      <!-- 内容 -->
      <div class="attribute_center">
        <el-form :model="otherData">
          <!-- 图标 -->
          <div class="attribute_box">
            <div class="attribute_center">
              <el-text>到达时间</el-text>
            </div>
            <el-date-picker v-model="otherData.time" type="datetime" placeholder="请选择到达时间" />
          </div>
          <div class="attribute_box">
            <div class="attribute_center">
              <el-text>优先级</el-text>
            </div>
            <el-select v-model="customerData.contacter" placeholder="请选择工单优先级" style="width: 400px">
              <el-option label="cly" value="cly" />
              <el-option label="litZhu" value="litZhu" />
              <el-option label="申月初五" value="申月初五" />
            </el-select>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="add_btn" style="display: flex; justify-content: end">
      <el-button type="primary" size="large">发布工单</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Setting, Link } from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile } from 'element-plus'
//表单排序方向
const attachmentsPosition = ref("right");
const templatePosition = ref("top");

/*
--------------表单数据绑定--------------
*/
// 工单基本信息
const orderData = reactive({
  name: "",
  descript: "",
});
// 附件
const fileList = ref<UploadUserFile[]>([])
// 客户信息
const customerData = reactive({
  customerName: "",
  customerNameList: [],
  contacter: "",
  contacterList: [],
  phone: "",
  servicePlace: "",
  address: "",
});
// 其他
const otherData = reactive({
  time: '',
  priority: '',
})
</script>
<style scoped lang="scss">
.box {
  padding: 10px;
  box-sizing: border-box;

  .attachments {
    display: flex;
    justify-content: space-between;

    .el-form,
    .attachments_upload {
      flex-grow: 1;
    }
  }

  // 模板
  .box-item {
    background-color: white;
    width: 100%;
    margin-bottom: 20px;
    padding: 20px;
    box-sizing: border-box;


    // 添加附件
    .attachments_upload {
      position: relative;
      margin-left: 50px;
      margin-bottom: 0;
    }

    // 标题栏
    .template_box {
      border-bottom: 2px solid #f3f1f6;

      // 标题
      .title {
        font-weight: bold;
        font-size: 15px;
        position: relative;
        bottom: 5px;
      }

      // 标题右侧图标
      .template_icon {
        padding-left: 5px;
      }
    }

    .attribute_box {
      width: 400px;
      margin-top: 20px;

      .attribute_center {
        margin-bottom: 10px;

        .el-form {
          display: flex;
        }
      }

    }

    .data-box {
      width: 400px !important;
      line-height: 40px;
      margin: 20px;
    }
  }
}
</style>
