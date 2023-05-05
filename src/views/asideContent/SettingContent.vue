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
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          >
          </el-avatar>
        </div>
        <el-button color="#626aef" type="text" class="scp_btn">修改</el-button>
      </div>
      <div class="SettingTitle_conter_span2">
        <div class="div_box">
          <span>昵称</span>
        </div>
        <el-text class="scp_text">litzhu</el-text>
        <el-button color="#626aef" type="text" class="scp_btn">修改</el-button>
      </div>
    </div>
    <div class="SettingTitle_tail">
      <!-- 手机号 -->
      <div class="SettingTitle_conter_span">
        <div class="div_box">
          <span>手机号</span>
        </div>
        <el-text class="scp_text">15164443169</el-text>
        <el-button color="#626aef" type="text" class="scp_btn">修改</el-button>
        <el-button color="#626aef" type="text" class="scp_btn">解绑</el-button>
      </div>
      <!-- 邮箱 -->
      <div class="SettingTitle_conter_span">
        <div class="div_box">
          <span>邮箱</span>
        </div>
        <el-text class="scp_text">15164443169@163.com</el-text>
        <el-button color="#626aef" type="text" class="scp_btn">修改</el-button>
        <el-button color="#626aef" type="text" class="scp_btn">解绑</el-button>
      </div>
      <!-- 密码 -->
      <div class="SettingTitle_conter_span">
        <div class="div_box">
          <span>密码</span>
        </div>
        <el-text class="scp_text">********</el-text>
        <el-button color="#626aef" type="text" class="scp_btn">修改</el-button>
      </div>
      <!-- 语言 -->
      <div class="SettingTitle_conter_span">
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
      </div>
      <!-- 账号绑定 -->
      <div class="SettingTitle_conter_span">
        <div class="div_box">
          <span>账号绑定</span>
        </div>
        <div class="scp_avatar">
          <el-avatar shape="square" :src="circleUrl" />
          <el-text class="scp_wx">微信</el-text>
        </div>
        <el-button color="#626aef" type="text">解绑</el-button>
      </div>
      <!-- 联系 -->
      <div class="SettingTitle_conter_span">
        <div class="div_box">
          <span>联系我们</span>
        </div>
        <el-text class="scp_text">1552553595</el-text>
        <el-button color="#626aef" type="text" class="scp_btn">联系</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
const state = reactive({
  circleUrl:
    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  squareUrl:
    "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
  sizeList: ["small", "", "large"] as const,
});

const { circleUrl, squareUrl, sizeList } = toRefs(state);
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
];
</script>
<style lang="scss" scoped>
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
