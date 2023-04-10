<template>
  <el-row class="tac">
    <el-col>
      <div class="logo">
        <!-- TODO: 有LOGO后把下面图标换成替换成LOGO -->
        <el-icon>
          <Shop :color="iconColor" />
        </el-icon>
      </div>
      <el-menu default-active="2" class="el-menu-vertical-demo" router>
        <!-- 首页控制台 -->
        <el-menu-item index="/index">
          <div class="nav-item">
            <el-popover placement="right" popper-style="text-align:center" content="首页控制台" trigger="hover"
              :hide-after="50">
              <template #reference style="width: 70px; height: 100%">
                <div>
                  <el-icon>
                    <HomeFilled :color="iconColor" />
                  </el-icon>
                  <span>首页控制台</span>
                </div>
              </template>
            </el-popover>
          </div>
        </el-menu-item>
        <!-- 工单管理：发起工单、我的工单、代办工单池、工单列表 -->
        <el-sub-menu>
          <template #title>
            <el-icon>
              <Document :color="iconColor" />
            </el-icon>
            <span>工单管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="">发起工单</el-menu-item>
            <el-menu-item index="">我的工单</el-menu-item>
            <el-menu-item index="">代办工单池</el-menu-item>
            <el-menu-item index="orderList">工单列表</el-menu-item>
            <!-- 工单设置：工单模板、分派路由 -->
            <el-menu-item index="">工单设置</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <!-- 组织架构：部门管理、技能管理、工程师管理 -->
        <el-menu-item index="">
          <el-icon>
            <Menu :color="iconColor" />
          </el-icon>
          <span>组织架构</span>
        </el-menu-item>
        <!-- 工程师日历 -->
        <el-menu-item index="">
          <el-icon>
            <Calendar :color="iconColor" />
          </el-icon>
          <span>工程师日历</span>
        </el-menu-item>
        <!-- 客户管理：客户列表、添加会员 -->
        <el-menu-item index="">
          <el-icon>
            <User :color="iconColor" />
          </el-icon>
          <span>客户管理</span>
        </el-menu-item>
        <!-- 资产管理：资产清单、资产分类、添加资产、分派资产 -->
        <el-sub-menu index="">
          <template #title>
            <el-icon>
              <Discount :color="iconColor" />
            </el-icon>
            <span>资产管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="">资产清单</el-menu-item>
            <el-menu-item index="">资产分类</el-menu-item>
            <el-menu-item index="">添加资产</el-menu-item>
            <el-menu-item index="">分派资产</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <!-- 系统设置：个人中心、公司设置 -->
        <el-menu-item index="">
          <el-icon>
            <setting :color="iconColor" />
          </el-icon>
          <span>系统设置</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>

  <!-- <el-menu :default-openeds="['1', '3']">
    <el-sub-menu>
      <template #title>
        <span>
          工单管理
        </span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/test">
          <div class="nav-item">
            <el-popover placement="right" popper-style="text-align:center" content="工单" trigger="hover" :hide-after="50">
              <template #reference>
                <el-icon>
                  <Message :color="iconColor" />
                </el-icon>
              </template>
            </el-popover>
          </div>
        </el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="1-3">
      <div class="nav-item">
        <el-popover placement="right" popper-style="text-align:center" content="呼叫中心" trigger="hover" :hide-after="50">
          <template #reference>
            <el-icon>
              <Phone :color="iconColor" />
            </el-icon>
            <span>
              工单配置
            </span>
          </template>
        </el-popover>
      </div>
    </el-menu-item>
    <el-menu-item index="1-4">
      <div class="nav-item">
        <el-popover placement="right" popper-style="text-align:center" content="在线客服" trigger="hover" :hide-after="50">
          <template #reference>
            <el-icon>
              <ChatDotRound :color="iconColor" />
            </el-icon>
            <span>
              组织架构
            </span>
          </template>
        </el-popover>
      </div>
    </el-menu-item>
    <el-menu-item index="1-5">
      <div class="nav-item">
        <el-popover placement="right" popper-style="text-align:center" content="知识库" trigger="hover" :hide-after="50">
          <template #reference>
            <el-icon>
              <Reading :color="iconColor" />
            </el-icon>
            <span>
              客户管理
            </span>
          </template>
        </el-popover>
      </div>
    </el-menu-item>
    <el-menu-item index="1-6">
      <div class="nav-item">
        <el-popover placement="right" popper-style="text-align:center" content="客服管理" trigger="hover" :hide-after="50">
          <template #reference>
            <el-icon>
              <Avatar :color="iconColor" />
            </el-icon>
            <span>
              资产管理
            </span>
          </template>
        </el-popover>
      </div>
    </el-menu-item>
    <el-menu-item index="1-7">
      <div class="nav-item">
        <el-popover placement="right" popper-style="text-align:center" content="效绩规则" trigger="hover" :hide-after="50">
          <template #reference>
            <el-icon>
              <Operation :color="iconColor" />
            </el-icon>
            <span>
              系统设置
            </span>
          </template>
        </el-popover>
      </div>
    </el-menu-item>
  </el-menu> -->
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Shop,
  HomeFilled,
  Discount,
  User,
  Calendar,
  Menu,
  ChatDotRound,
  Reading,
  Avatar,
  Operation,
} from "@element-plus/icons-vue";

// 侧边栏图标颜色
const iconColor = ref("#ffffff");
// 侧边栏图标弹出框消失时间 1000=1s
const hideTime = ref(50);
</script>

<style scoped lang="scss">
// 引入全局样式文件
@import "../../GlobalStyle.scss";

.logo {
  text-align: center;
  font-size: 50px;
}

.el-menu,
.el-menu-item-group {
  width: 100%;
  border: none;
  background-color: $AsideBg;

  .el-menu-item,
  .el-sub-menu span {
    color: white;
  }

  .nav-item,
  .el-icon {
    height: 100%;
  }

  .el-menu-item:hover svg,
  .el-menu-item:hover span,
  .el-sub-menu:hover svg,
  .el-sub-menu:hover span {
    color: #0065f8;
  }
}
</style>
