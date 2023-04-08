<template>
  <div>
    <div class="logo">
      <!-- TODO: 有LOGO后把下面图标换成替换成LOGO -->
      <el-icon>
        <Shop :color="iconColor" />
      </el-icon>
    </div>
    <el-menu :default-openeds="['1', '3']">
      <el-menu-item-group>
        <el-menu-item index="1-1">
          <div class="nav-item">
            <el-popover placement="right" popper-style="text-align:center" content="后台首页" trigger="hover" hide-after="50">
              <template #reference style="width: 70px; height: 100%">
                <el-icon>
                  <HomeFilled :color="iconColor" />
                </el-icon>
              </template>
            </el-popover>
          </div>
        </el-menu-item>
        <el-menu-item index="1-2">
          <div class="nav-item">
            <el-popover placement="right" popper-style="text-align:center" content="工单" trigger="hover" hide-after="50">
              <template #reference>
                <el-icon>
                  <Message :color="iconColor" />
                </el-icon>
              </template>
            </el-popover>
          </div>
        </el-menu-item>
        <el-menu-item index="1-3">
          <div class="nav-item">
            <el-popover placement="right" popper-style="text-align:center" content="呼叫中心" trigger="hover" hide-after="50">
              <template #reference>
                <el-icon>
                  <Phone :color="iconColor" />
                </el-icon>
              </template>
            </el-popover>
          </div>
        </el-menu-item>
        <el-menu-item index="1-4">
          <div class="nav-item">
            <el-popover placement="right" popper-style="text-align:center" content="在线客服" trigger="hover" hide-after="50">
              <template #reference>
                <el-icon>
                  <ChatDotRound :color="iconColor" />
                </el-icon>
              </template>
            </el-popover>
          </div>
        </el-menu-item>
        <el-menu-item index="1-5">
          <div class="nav-item">
            <el-popover placement="right" popper-style="text-align:center" content="知识库" trigger="hover" hide-after="50">
              <template #reference>
                <el-icon>
                  <Reading :color="iconColor" />
                </el-icon>
              </template>
            </el-popover>
          </div>
        </el-menu-item>
        <el-menu-item index="1-6">
          <div class="nav-item">
            <el-popover placement="right" popper-style="text-align:center" content="客服管理" trigger="hover" hide-after="50">
              <template #reference>
                <el-icon>
                  <Avatar :color="iconColor" />
                </el-icon>
              </template>
            </el-popover>
          </div>
        </el-menu-item>
        <el-menu-item index="1-7">
          <div class="nav-item">
            <el-popover placement="right" popper-style="text-align:center" content="效绩规则" trigger="hover" hide-after="50">
              <template #reference>
                <el-icon>
                  <Operation :color="iconColor" />
                </el-icon>
              </template>
            </el-popover>
          </div>
        </el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Shop,
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

.logo {
  text-align: center;
  font-size: 50px;
}

.el-menu {
  width: 70px;
  border: none;
  background-color: $AsideBg;

  .el-menu-item {
    padding: 0 !important;
  }

  .nav-item,
  .el-icon {
    width: 100%;
    height: 100%;
  }

  .nav-item:hover svg {
    color: #0065f8;
  }
}
</style>
