<template>
  <div class="Settingbox">
    <div class="SettingTitle">
      <span class="SettingTitle_span"> 个人设置 </span>
    </div>
    <div class="SettingTitle_conter">
      <div class="SettingTitle_conter_span">
        <div class="div_box">
          <span>头像</span>
        </div>
        <div class="scp_avatar">
          <el-avatar
            :src="
              userInfo.avator ||
              'https://cdn.staticaly.com/gh/LitZhuVich/blogcdn@master/img/user_tou.jpg'
            "
          ></el-avatar>
        </div>
        <el-button type="primary" link class="scp_btn" @click="updateAvatar()">
          修改
        </el-button>
      </div>
      <div class="SettingTitle_conter_span2">
        <div class="div_box">
          <span>昵称</span>
        </div>
        <el-text class="scp_text">{{ userInfo.username }}</el-text>
        <el-button
          type="primary"
          link
          class="scp_btn"
          @click="updateUsername()"
        >
          修改
        </el-button>
      </div>
    </div>
    <div class="SettingTitle_tail">
      <!-- 手机号 -->
      <div class="SettingTitle_conter_span">
        <div class="div_box">
          <span>手机号</span>
        </div>
        <el-text class="scp_text">
          {{ userInfo.phone ?? "未绑定手机号" }}
        </el-text>
        <el-button type="primary" link class="scp_btn" @click="updatePhone()"
          >修改</el-button
        >
        <el-button
          type="primary"
          link
          class="scp_btn"
          v-if="userInfo.phone != null"
          >解绑</el-button
        >
      </div>
      <!-- 邮箱 -->
      <div class="SettingTitle_conter_span">
        <div class="div_box">
          <span>邮箱</span>
        </div>
        <el-text class="scp_text">{{ userInfo.email ?? "未绑定邮箱" }}</el-text>
        <el-button type="primary" link class="scp_btn" @click="updateEmail()"
          >修改</el-button
        >
        <el-button
          type="primary"
          link
          class="scp_btn"
          v-if="userInfo.email != null"
          >解绑</el-button
        >
      </div>
      <!-- 密码 -->
      <div class="SettingTitle_conter_span">
        <div class="div_box">
          <span>密码</span>
        </div>
        <el-text class="scp_text">********</el-text>
        <el-button type="primary" link class="scp_btn" @click="updatePassword()"
          >修改</el-button
        >
      </div>
      <!-- 语言 -->
      <!-- <div class="SettingTitle_conter_span">
        <div class="div_box">
          <span>语言</span>
        </div>
        <div class="scp_select">
          <el-select v-model="value" class="m-2" placeholder="简体中文">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div> -->
      <!-- 账号绑定 -->
      <!-- <div class="SettingTitle_conter_span">
        <div class="div_box">
          <span>账号绑定</span>
        </div>
        <div class="scp_avatar">
          <el-avatar shape="square" :src="circleUrl" />
          <el-text class="scp_wx">微信</el-text>
        </div>
        <el-button type="primary" link>解绑</el-button>
      </div> -->

      <!-- 联系 -->
      <div class="SettingTitle_conter_span">
        <div class="div_box">
          <span>联系我们</span>
        </div>
        <el-text class="scp_text">
          <el-text style="color: #31c3f6">zhuzhonghao666@163.com</el-text>
          or
          <el-text style="color: #31c3f6">huachenchen88@gmail.com</el-text>
          or
          <el-text style="color: #31c3f6">1464243458@qq.com</el-text>
        </el-text>
        <!-- <el-button type="primary" link class="scp_btn">联系</el-button> -->
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogFormVisible" title="添加头像">
    <el-upload
      ref="uploadRef"
      class="avatar-uploader"
      :action="patchAvatarApi"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img
        v-if="userInfo.avator"
        :src="imageUrl || userInfo.avator"
        class="avatar"
      />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <el-text>点击修改图片</el-text>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitAvatar()"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps, UploadInstance } from "element-plus";
import { useUserStore } from "../../store/store";
import { storeToRefs } from "pinia";
import type {
  apiResponseUser,
  apiResponseUserAvatar,
} from "../../model/interface";
import ApiClient from "../../request/request";
const apiClient = ApiClient.getInstance();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const dialogFormVisible = ref(false);

/* const { circleUrl, squareUrl, sizeList } = toRefs(state);
const value = ref("");
const options = [
  {
    value: "简体中文",
    label: "简体中文",
  },
  {
    value: "繁體",
    label: "繁體",
  },
  {
    value: "Enlish",
    label: "Enlish",
  },
  {
    value: "日語",
    label: "日語",
  },
]; */
// 修改头像名称
const patchAvatarApi = `http://www.bstestserver.com/api/v1/CustomerRepresentative/${userInfo.value.id}/avatar`;

// 图片路径
const imageUrl = ref("");

const uploadRef = ref<UploadInstance>();

const formData = new FormData();
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
  formData.append("avatar", uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error("头像大小不能超过5MB");
    return false;
  }
  return true;
};

// 修改头像
const updateAvatar = (): void => {
  // 显示修改头像
  dialogFormVisible.value = true;
};

const submitAvatar = async (): Promise<void> => {
  const res = await apiClient.post<apiResponseUserAvatar>(
    `/CustomerRepresentative/${userInfo.value.id}/avatar`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if (typeof res!.data.avatar_url == "string") {
    userInfo.value.avator = res!.data.avatar_url;
    ElMessage({
      type: "success",
      message: `头像修改成功`,
    });
    dialogFormVisible.value = false;
  } else {
    ElMessage({
      type: "error",
      message: `头像修改失败`,
    });
  }
};
// 修改名称
const updateUsername = (): void => {
  ElMessageBox.prompt("输入名称：", "输入框", {
    confirmButtonText: "确认",
    cancelButtonText: "关闭",
  })
    .then(async ({ value }) => {
      if (value != "" && value != null) {
        const res = await apiClient.patch<apiResponseUser>(
          `/CustomerRepresentative/${userInfo.value.id}/username`,
          {
            username: value,
          }
        );
        if (typeof res!.data.username == "string") {
          userInfo.value.username = res!.data.username;
          ElMessage({
            type: "success",
            message: `你的用户名:${value}`,
          });
        } else {
          ElMessage({
            type: "error",
            message: `用户名重复:${value}`,
          });
        }
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消输入",
      });
    });
};
// 修改密码
const updatePassword = (): void => {
  ElMessageBox.prompt("输入密码：", "输入框", {
    confirmButtonText: "确认",
    cancelButtonText: "关闭",
  })
    .then(async ({ value }) => {
      if (value != "" && value != null) {
        const res = await apiClient.patch<apiResponseUser>(
          `/CustomerRepresentative/${userInfo.value.id}/password`,
          {
            password: value,
          }
        );
        if (typeof res!.data.password == "string") {
          userInfo.value.password = res!.data.password;
          ElMessage({
            type: "success",
            message: `密码修改成功`,
          });
        }
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消输入",
      });
    });
};
// 修改手机号
const updatePhone = (): void => {
  ElMessageBox.prompt("输入手机号：", "输入框", {
    confirmButtonText: "确认",
    cancelButtonText: "关闭",
    inputPattern: /^[1][3-9][0-9]{9}$/,
    inputErrorMessage: "无效的手机号",
  })
    .then(async ({ value }) => {
      if (value != "" && value != null) {
        const res = await apiClient.patch<apiResponseUser>(
          `/CustomerRepresentative/${userInfo.value.id}/phone`,
          {
            phone: value,
          }
        );
        if (typeof res!.data.phone == "string") {
          userInfo.value.phone = res!.data.phone;
          ElMessage({
            type: "success",
            message: `你的手机号:${value}`,
          });
        } else {
          ElMessage({
            type: "error",
            message: `手机号重复:${value}`,
          });
        }
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消输入",
      });
    });
};
// TODO:邮箱验证待写
// 修改邮箱
const updateEmail = (): void => {
  ElMessageBox.prompt("输入邮箱：", "输入框", {
    confirmButtonText: "确认",
    cancelButtonText: "关闭",
    inputPattern:
      /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/, // 邮箱的正则表达式
    inputErrorMessage: "无效的邮箱",
  })
    .then(async ({ value }) => {
      if (value != "" && value != null) {
        const res = await apiClient.patch<apiResponseUser>(
          `/CustomerRepresentative/${userInfo.value.id}/email`,
          {
            email: value,
          }
        );
        if (typeof res!.data.email == "string") {
          userInfo.value.email = res!.data.email;
          ElMessage({
            type: "success",
            message: `你的邮箱:${value}`,
          });
          console.log(userInfo.value);
        } else {
          ElMessage({
            type: "error",
            message: `邮箱重复:${value}`,
          });
        }
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消输入",
      });
    });
};

onMounted(() => {});
</script>
<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.Settingbox {
  margin: 10px;
  padding: 10px;
  box-sizing: border-box;
  height: calc(100% - 120px);
  background-color: white;

  .div_box {
    width: 80px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(248, 248, 248);
  }
  .scp_select {
    padding: 40px;
  }
  .scp_text {
    padding: 40px;
  }
  .scp_avatar {
    padding: 40px;
    display: flex;
    align-items: center;
  }
  .scp_wx {
    padding: 10px;
  }
  .scp_btn {
    padding-left: 20px;
  }
  .SettingTitle_conter_span {
    height: 60px;
    display: flex;
    padding-left: 10px;
    align-items: center;
    border-bottom: 1px solid gainsboro;
  }
  .SettingTitle_conter_span2 {
    height: 60px;
    padding-left: 10px;
    display: flex;
    align-items: center;
  }
  .SettingTitle {
    padding: 10px;
    box-sizing: border-box;
    background-color: white;
    height: 60px;
    color: rgb(98, 103, 107);
    display: flex;
    align-items: center;
    border-bottom: 1px solid gainsboro;
    .SettingTitle_span {
      font-size: large;
      padding-right: 20px;
      padding-left: 10px;
    }
  }
  .SettingTitle_conter {
    background-color: white;
    box-sizing: border-box;
    height: 150px;
    padding: 20px;
    color: rgb(98, 103, 107);
  }
  .SettingTitle_tail {
    background-color: white;
    box-sizing: border-box;
    margin-top: 10px;
    height: 420px;
    padding: 20px;
  }
}
</style>
