<template>
  <!-- TODO:需要有折线图、可视化图、是后台系统的牌面所在 -->
  <div class="content">
    <div class="row">
      <div class="grid-content">
        <div class="image Comment">
          <el-icon class="icon" color="#409EFC" :size="25"><Comment /></el-icon>
        </div>
        <div class="content">
          <el-text tag="b" size="large">10</el-text>
          <el-text tag="b">待回复的</el-text>
        </div>
      </div>
      <div class="grid-content">
        <div class="image SuccessFilled">
          <el-icon class="icon" color="#67C23A" :size="25">
            <SuccessFilled />
          </el-icon>
        </div>
        <div class="content">
          <el-text tag="b" size="large">20</el-text>
          <el-text tag="b">总已解决的</el-text>
        </div>
      </div>
      <div class="grid-content">
        <div class="image SuccessFilled">
          <el-icon class="icon" color="#67C23A" :size="25">
            <SuccessFilled />
          </el-icon>
        </div>
        <div class="content">
          <el-text tag="b" size="large">2</el-text>
          <el-text tag="b">今已解决的</el-text>
        </div>
      </div>
      <div class="grid-content">
        <div class="image SuccessFilled">
          <el-icon class="icon" color="#67C23A" :size="25">
            <SuccessFilled />
          </el-icon>
        </div>
        <div class="content">
          <el-text tag="b" size="large">18</el-text>
          <el-text tag="b">组已解决的</el-text>
        </div>
      </div>
      <div class="grid-content">
        <div class="image Promotion">
          <el-icon class="icon" color="#E6A23C" :size="25">
            <Promotion />
          </el-icon>
        </div>
        <div class="content">
          <el-text tag="b" size="large">5</el-text>
          <el-text tag="b">超时的</el-text>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="left">
        <div class="grid-content notice">
          <div class="header">
            <div class="image">
              <el-icon :size="20" color="#11c9cb"><Bell /></el-icon>
            </div>
            公告
          </div>
          <div class="notice_content">
            <notice />
          </div>
        </div>
        <div class="grid-content myOrderList">
          <div class="header">
            <div class="image">
              <el-icon :size="20" color="#11c9cb"><Odometer /></el-icon>
            </div>
            我处理的工单
          </div>
          <div class="orderList_content">
            <myOrderList />
          </div>
        </div>
      </div>
      <div class="right">
        <div class="grid-content line">
          <!-- TODO:显示总体工单信息、进行中的工单、日汇总工单，有个下拉框显示时间，分别有全部、部门、自己、三个数据量 -->

          <lineGrape />
        </div>
        <div class="grid-content bar">
          <barGrape />
        </div>
        <div class="grid-content pie">
          <pieGrape />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  Comment,
  Promotion,
  SuccessFilled,
  Bell,
  Odometer,
} from "@element-plus/icons-vue";
import lineGrape from "../../components/visualGraph/line.vue";
import barGrape from "../../components/visualGraph/bar.vue";
import pieGrape from "../../components/visualGraph/pie.vue";
import myOrderList from "../../components/myOrderList.vue";
import notice from "../../components/notice.vue";
</script>
<style lang="scss" scoped>
.content {
  padding: 10px;
  box-sizing: border-box;
  display: grid;
  row-gap: 10px;
  .grid-content {
    border-radius: 4px;
    background-color: white;
    box-shadow: 2px 2px 5px #ccc;
  }
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 100px;
    column-gap: 10px;

    .grid-content {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .Comment,
      .SuccessFilled,
      .Promotion {
        border-radius: 50%;
        width: 70px;
        height: 70px;
        display: grid;
        place-items: center;
      }
      .Comment {
        background-color: rgba($color: #409efc, $alpha: 0.2);
      }
      .SuccessFilled {
        background-color: rgba($color: #67c23a, $alpha: 0.2);
      }
      .Promotion {
        background-color: rgba($color: #e6a23c, $alpha: 0.2);
      }
    }
  }
  .main {
    display: grid;
    grid-template-columns: 1fr 2fr;
    column-gap: 10px;
    .left {
      display: grid;
      grid-template-rows: 200px 530px;
      row-gap: 10px;
      .header {
        height: 50px;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        padding-left: 10px;
        box-sizing: border-box;
        .image {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background-color: rgba($color: #11c9cb, $alpha: 0.2);
          margin-right: 5px;
        }
      }
      // TODO 公告样式，目前是mode版
      .notice_content {
        height: 100px;
        display: grid;
        place-items: center;
        color: #ccc;
      }
      .orderList_content {
        padding: 10px;
        box-sizing: border-box;
      }
    }
    .right {
      display: grid;
      grid-template-areas:
        "line line"
        "bar pie";
      grid-template-rows: 400px 330px;
      gap: 10px;
      .line {
        grid-area: line;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
      }
      .bar {
        grid-area: bar;
        width: 560px;
      }
      .pie {
        grid-area: pie;
        width: 560px;
      }
    }
  }
}
</style>
