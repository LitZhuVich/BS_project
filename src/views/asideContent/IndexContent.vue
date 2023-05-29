<template>
  <div class="IndexContent">
    <div class="row">
      <div class="grid-content">
        <div class="image Comment">
          <el-icon class="icon" color="#409EFC" :size="25">
            <Comment />
          </el-icon>
        </div>
        <div class="content">
          <el-text tag="b" style="font-size: 30px">{{ replieCount }}</el-text>
          <el-text tag="b">个人待回复的</el-text>
        </div>
      </div>
      <div class="grid-content">
        <div class="image SuccessFilled">
          <el-icon class="icon" color="#67C23A" :size="25">
            <SuccessFilled />
          </el-icon>
        </div>
        <div class="content">
          <el-text tag="b" style="font-size: 30px">
            {{ allSolvedCount }}
          </el-text>
          <el-text tag="b">个人总已解决的</el-text>
        </div>
      </div>
      <div class="grid-content">
        <div class="image SuccessFilled">
          <el-icon class="icon" color="#67C23A" :size="25">
            <SuccessFilled />
          </el-icon>
        </div>
        <div class="content">
          <el-text tag="b" style="font-size: 30px">
            {{ withinTenSolvedCount }}
          </el-text>
          <el-text tag="b">个人十天内已解决的</el-text>
        </div>
      </div>
      <div class="grid-content">
        <div class="image SuccessFilled">
          <el-icon class="icon" color="#67C23A" :size="25">
            <SuccessFilled />
          </el-icon>
        </div>
        <div class="content">
          <el-text tag="b" style="font-size: 30px">
            {{ groupSolvedCount }}
          </el-text>
          <el-text tag="b">部门已解决的</el-text>
        </div>
      </div>
      <div class="grid-content Promotion">
        <div class="image Promotion">
          <el-icon class="icon" color="#E6A23C" :size="25">
            <Promotion />
          </el-icon>
        </div>
        <div class="content">
          <el-text tag="b" style="font-size: 30px">{{ timeOutCount }}</el-text>
          <el-text tag="b">个人总超时的</el-text>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="grid-content notice">
        <div class="header">
          <div class="image">
            <el-icon :size="20" color="#11c9cb">
              <Bell />
            </el-icon>
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
            <el-icon :size="20" color="#11c9cb">
              <Odometer />
            </el-icon>
          </div>
          我处理的工单
        </div>
        <div class="orderList_content">
          <myOrderList />
        </div>
      </div>
      <div class="grid-content line">
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
import myOrderList from "../../components/index/myOrderList.vue";
import notice from "../../components/index/notice.vue";

import { ref, onMounted } from "vue";
import ApiClient from "../../request/request";
const apiClient = ApiClient.getInstance();
// 数组求和函数
const sum = (arr: ReadonlyArray<number>): number => {
  return arr.reduce((prev, curr) => prev + curr, 0);
};

const replieCount = ref(0);
const allSolvedCount = ref(0);
const withinTenSolvedCount = ref(0);
const groupSolvedCount = ref(0);
const timeOutCount = ref(0);

const getCount = async () => {
  const [
    { data: replie },
    { data: allSolved },
    {
      data: { count: withinTenSolvedCounts },
    },
    { data: groupSolved },
    { data: timeOut },
  ] = await Promise.all([
    apiClient.get<any>("/orderReplied/myCount"),
    apiClient.get<any>("/order/status/my/4"),
    apiClient.get<any>("/order/showWithinTenOrder/4"),
    apiClient.get<any>("/order/showGroupOrder"),
    apiClient.get<any>("/order/status/my/6"),
  ]);

  replieCount.value = replie;
  allSolvedCount.value = allSolved.length;
  withinTenSolvedCount.value = sum(withinTenSolvedCounts);
  groupSolvedCount.value = groupSolved.length;
  timeOutCount.value = timeOut.length;
};

onMounted(getCount);
</script>

<style lang="scss" scoped>
.IndexContent {
  padding: 10px;
  box-sizing: border-box;
  display: grid;
  gap: 10px;

  .grid-content {
    border-radius: 4px;
    background-color: white;
    box-shadow: 2px 2px 5px #ccc;
    overflow: hidden;
  }

  .row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 10px;

    .grid-content {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 100px;

      .image {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .SuccessFilled {
        background-color: rgba($color: #67c23a, $alpha: 0.2);
      }

      .Comment {
        background-color: rgba($color: #409efc, $alpha: 0.2);
      }

      .Promotion {
        background-color: rgba($color: #e6a23c, $alpha: 0.2);
      }

      .content {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .main {
    height: 730px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-template-areas:
      "notice notice line line line line"
      "notice notice line line line line"
      "notice notice line line line line"
      "myOrderList myOrderList bar bar pie pie"
      "myOrderList myOrderList bar bar pie pie";
    gap: 10px;
    // grid-template-rows: repeat(auto-fit, minmax(300px, 1fr));
    // grid-template-columns: 1fr 2fr;
    // grid-template-rows: 1fr 2fr 2fr;

    .notice {
      grid-area: notice;

      .notice_content {
        height: 100px;
        display: grid;
        place-items: center;
        color: #ccc;
      }
    }

    .myOrderList {
      grid-area: myOrderList;

      .orderList_content {
        padding: 10px;
        box-sizing: border-box;
      }
    }

    .notice .header,
    .myOrderList .header {
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

    .line {
      grid-area: line;
    }

    .bar {
      grid-area: bar;
    }

    .pie {
      grid-area: pie;
    }
  }

  @media (max-width: 1440px) {
    .main {
      height: 1000px;
      grid-template-areas:
        "notice notice myOrderList myOrderList myOrderList myOrderList"
        "line line line line line line"
        "bar bar bar pie pie pie"
        "bar bar bar pie pie pie";
    }

    .line {
      height: 300px;
    }

    .bar {
      height: 300px;
    }

    .pie {
      height: 300px;
    }
  }

  @media (max-width: 1050px) {
    .main {
      height: 1200px;
      grid-template-areas:
        "notice notice myOrderList myOrderList myOrderList myOrderList"
        "line line line line line line"
        "bar bar pie pie pie pie"
        "bar bar pie pie pie pie";
    }

    .line {
      height: 400px;
    }

    .bar {
      height: 400px;
    }

    .pie {
      height: 400px;
    }
  }

  @media (max-width: 868px) {
    .main {
      height: 1500px;
      grid-template-areas:
        "notice notice notice notice notice notice"
        "myOrderList myOrderList myOrderList myOrderList myOrderList myOrderList"
        "line line line line line line"
        "line line line line line line"
        "bar bar bar bar bar bar"
        "pie pie pie pie pie pie";
    }

    .line {
      height: 300px;
    }

    .bar {
      height: 300px;
    }

    .pie {
      height: 300px;
    }
  }
}
</style>
