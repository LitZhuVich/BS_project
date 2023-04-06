<template>
  <div>
    <el-scrollbar>
      <!-- TODO: 有LOGO后把h1替换成LOGO -->
      <h1>8</h1>
      <el-menu :default-openeds="['1', '3']">
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <el-icon>
              <HomeFilled :color="iconColor" />
            </el-icon>
          </el-menu-item>
          <el-menu-item index="1-2">
            <el-icon>
              <Message :color="iconColor" />
            </el-icon>
          </el-menu-item>
          <el-menu-item index="1-3">
            <el-icon>
              <Phone :color="iconColor" />
            </el-icon>
          </el-menu-item>
          <el-menu-item index="1-4">
            <el-icon>
              <ChatDotRound :color="iconColor" />
            </el-icon>
          </el-menu-item>
          <el-menu-item index="1-5">
            <el-icon>
              <Reading :color="iconColor" />
            </el-icon>
          </el-menu-item>
          <el-menu-item index="1-6">
            <el-icon>
              <Avatar :color="iconColor" />
            </el-icon>
          </el-menu-item>
          <el-menu-item index="1-7">
            <el-icon>
              <Operation :color="iconColor" />
            </el-icon>
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  HomeFilled,
  Message,
  Phone,
  ChatDotRound,
  Reading,
  Avatar,
  Operation,
} from "@element-plus/icons-vue";

const iconColor = ref("#ffffff");
</script>

<style scoped lang="scss">
// 引入全局样式文件
@import "../../GlobalStyle.scss";

.el-menu {
  background-color: $AsideBg;
}
</style>
