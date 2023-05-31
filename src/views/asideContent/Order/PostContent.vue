<template>
  <!-- 新建工单背景 -->
  <div class="box">
    <!-- 标题、描述、添加附件 -->
    <div class="box-item attachments">
      <el-form :label-position="attachmentsPosition" label-width="75px" :model="orderData" style="max-width: 800px">
        <!-- 标题输入框 -->
        <el-form-item label="工单标题:">
          <el-input v-model="orderData.title" />
        </el-form-item>
        <!-- 描述输入框 -->
        <el-form-item label="工单描述:">
          <el-input type="textarea" :rows="5" v-model="orderData.description" />
        </el-form-item>
        <!-- 工单类型 -->
        <el-form-item label="工单类型">
          <el-select v-model="orderData.orderType" class="m-2" placeholder="请选择工单类型">
            <el-option v-for="item in orderTypeList" :key="item.id" :label="item.type_name" :value="item.id" />
          </el-select>
        </el-form-item>
        <!-- 是否线上 -->
        <el-form-item label="线上/线下">
          <el-select v-model="orderData.isOnLine" class="m-2" placeholder="请选择线上/线下">
            <el-option label="线上" :value="1" />
            <el-option label="线下" :value="0" />
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 添加附件按钮 -->
      <div class="attachments_upload">
        <el-upload v-model:file-list="fileList" class="upload-demo" action="http://www.bstestserver.com/api/v1/upload"
          multiple :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="3"
          :on-exceed="handleExceed">
          <el-button type="primary">添加附件</el-button>
          <template #tip>
            <div class="el-upload__tip">最大5MB</div>
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
        <el-form :label-position="templatePosition" :model="orderData">
          <el-input class="data-box" v-model="orderData.phone" placeholder="请输入联系电话" />
          <el-input class="data-box" v-model="orderData.address" placeholder="请输入详细地址" />
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
        <el-form :model="orderData">
          <!-- 图标 -->
          <div class="attribute_box">
            <div class="attribute_center">
              <el-text>希望完成时间</el-text>
            </div>
            <el-date-picker v-model="orderData.appointment" type="datetime" placeholder="请选择希望完成时间" />
          </div>
          <div class="attribute_box">
            <div class="attribute_center">
              <el-text>工单期限（单位：天）</el-text>
            </div>
            <el-input-number v-model="orderData.timeLimit" :min="1" />
            <el-switch size="large" v-model="value" active-text="自动分派" inactive-text="不自动分派" />
          </div>
        </el-form>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="add_btn" style="display: flex; justify-content: end">
      <el-button @click="publishOrder" type="primary" size="large">发布工单</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { Setting, Link } from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile } from "element-plus";
import type { apiResponseOrderFile } from "../../../model/interface";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import ApiClient from "../../../request/request";


const apiClient = ApiClient.getInstance();
//表单排序方向
const attachmentsPosition = ref("right");
const templatePosition = ref("top");

/*
--------------方法--------------
*/
// 获取工单类型
const getAllOrderType = async () => {
  try {
    const res: any = await apiClient.get<any>("/orderType");
    orderTypeList.value = res.data;
  } catch (err) {
    console.log(err);
  }
};
// 判断工单优先级
const decidePriority = () => {
  if (orderData.timeLimit <= 5) {
    orderData.priority = 1;
  } else {
    orderData.priority = 2;
  }
};
/*
--------------初始化选择框数据--------------
*/
// 工单类型列表
let orderTypeList = ref<any>([]);
onMounted(() => {
  getAllOrderType();
});
/*
--------------表单数据绑定--------------
*/
// 工单基本信息
const orderData = reactive({
  priority: 0,
  status: 1, // 工单状态默认为1（待处理）
  phone: "",
  orderType: "",
  title: "",
  timeLimit: 0,
  description: "",
  isOnLine: null,
  address: "",
  appointment: "",
  engineer_id: 2
});
// 重置表单
const resetForm = () => {
  orderData.priority = 0;
  orderData.status = 1; // 工单状态默认为1（待处理）
  orderData.phone = "";
  orderData.orderType = "";
  orderData.title = "";
  orderData.timeLimit = 0;
  orderData.description = "";
  orderData.isOnLine = null;
  orderData.address = "";
  orderData.appointment = "";
  orderData.engineer_id = 0
}

// 附件
const fileList = ref<UploadUserFile[]>([]);
const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  // console.log(file, uploadFiles);
};

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(
    `只能上传 3 个文件，已选择 ${files.length} 个, 加起来 ${files.length + uploadFiles.length
    }`
  );
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(`确定要删除 ${uploadFile.name} ?`).then(
    () => true,
    () => false
  );
};
/*
--------------事件-------------- 
*/
// 发布工单
const publishOrder = async () => {
  decidePriority();
  await getEngineers(); // 这里必须用await，等这方法拿到最少工单的工程师ID后才可以继续执行
  if (value.value) {
    orderData.engineer_id = minEngId.value
    orderData.status = 3
  }
  const formData = new FormData();

  try {
    const resOrder = await apiClient.post<any>("/order", orderData);
    // 上传文件
    fileList.value.forEach(async (item: any) => {
      formData.append("file", item.raw);
      const resFile = await apiClient.post<apiResponseOrderFile>(
        "/file/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            order_id: resOrder!.data.id,
          },
        }
      );
    });
    // 如果返回code不为200
    if (resOrder.code != 200) {
      ElNotification({
        title: '工单操作',
        message: '发布失败',
        type: 'error',
      })
      return;
    }
    ElNotification({
      title: '工单操作',
      message: '发布成功',
      type: "success",
    })
    resetForm()
  } catch (err) {
    console.log("错误：" + err);
  }
};
// 是否自动分派
const value = ref<boolean>(true)
// 最少工单工程师ID
const minEngId = ref(0)
// 判断工程师是否忙碌
const EngineerStatus: any = ref([])
const getEngineers = async () => {
  const engineerList = await apiClient.get<any>('/CustomerRepresentative/getAllEngineers')
  for (let i = 0; i < engineerList.data.length; i++) {
    const res = await apiClient.get<any>('/order/countOrders/' + engineerList.data[i].id)
    let status = { id: engineerList.data[i].id, orders: res.data }
    EngineerStatus.value.push(status)
  }
  minEngId.value = getMinEngID(EngineerStatus);
}
// 获取工单量最少的工程师ID
const getMinEngID = (engList: any) => {
  const ordersArray = engList.value.map((engineer: any) => engineer.orders)
  const minOrders = Math.min(...ordersArray)  // 获取最少的工单
  // 找到最少工单的工程师ID
  const minOrdersEngineer = EngineerStatus.value.find((engineer: any) => engineer.orders === minOrders)
  const minOrdersEngineerId = minOrdersEngineer.id
  return minOrdersEngineerId
}
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

      .el-switch {
        margin-left: 20px;
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
