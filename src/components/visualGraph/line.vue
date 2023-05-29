<template>
  <div class="line_select">
    <!-- <el-button-group class="ml-4">
      <el-button type="primary">全部</el-button>
      <el-button type="primary">部门</el-button>
      <el-button type="primary">自己</el-button>
    </el-button-group>
    <el-dropdown @command="handleCommand" trigger="click">
      <el-button type="primary" plain>
        一周内
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="一月内">一月内</el-dropdown-item>
          <el-dropdown-item command="一周内">一周内</el-dropdown-item>
          <el-dropdown-item command="一天内">一天内</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown> -->
  </div>
  <div
    class="chart"
    v-loading="loading"
    ref="chartRef"
    :style="{ width: chartStyle.chartWidth, height: chartStyle.chartHeight }"
  ></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, Ref } from "vue";
import * as echarts from "echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/grid";
import { ElMessage } from "element-plus";
import { ArrowDown } from "@element-plus/icons-vue";
import ApiClient from "../../request/request";
const apiClient = ApiClient.getInstance();
const loading = ref<boolean>(true);
// 样式
const chartStyle = {
  chartWidth: "100%",
  chartHeight: "100%",
};
// 点击切换日期
/* const handleCommand = (command: string | number | object) => {
  ElMessage(`click on item ${command}`);
}; */
// 获取当前日期
const today = new Date();
// 将日期向前6天
const date = new Date();
date.setDate(today.getDate() - 9);
// 定义一个数组保存日期
const dateArray: string[] = [];
for (let i = 0; i < 10; i++) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateString = month + "-" + day;
  dateArray.push(dateString);
  date.setDate(date.getDate() + 1);
}
// 获取今天工单信息
const getTodayOrderData = async (): Promise<object> => {
  // 配置项
  const option: any = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["当日已接收工单数", "当日处理中工单数", "当日完成工单数"],
      left: "center",
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: dateArray,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "当日已接收工单数",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [],
      },
      {
        name: "当日处理中工单数",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [],
      },
      {
        name: "当日完成工单数",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [],
      },
    ],
  };
  try {
    const pushRes = await apiClient.get<any>("/order/showWithinTenOrder/2");
    const dealWithRes = await apiClient.get<any>("/order/showWithinTenOrder/3");
    const finishRes = await apiClient.get<any>("/order/showWithinTenOrder/4");
    const [push, dealWith, finish] = await apiClient.all<any>([
      pushRes,
      dealWithRes,
      finishRes,
    ]);
    // 获取当天发布的工单数量
    if (push?.data?.count) {
      option.series[0].data = push.data.count;
    }
    // 获取当天处理的工单数量
    if (dealWith?.data?.count) {
      option.series[1].data = dealWith.data.count;
    }
    // 获取当天完成的工单数量
    if (finish?.data?.count) {
      option.series[2].data = finish.data.count;
    }
    loading.value = false;
  } catch (err) {
    ElMessage({
      message: "line获取数据失败！",
      type: "error",
    });
  }
  return option;
};

// 初始化 ECharts 实例
const chartRef: Ref<any> = ref(null);
onMounted(async () => {
  const option = await getTodayOrderData();
  // chartRef.value.
  const chart = echarts.init(chartRef.value);
  // 选择渲染数据
  chart.setOption(option);
  // 当窗口大小变化时重新绘制图表
  const resizeHandler = () => {
    if (chartRef.value && chartRef.value.clientWidth !== 0) {
      chartStyle.chartWidth = chartRef.value.clientWidth + "px";
      chartStyle.chartHeight = chartRef.value.clientHeight + "px";
      chart.resize();
    }
  };
  window.addEventListener("resize", resizeHandler);

  onUnmounted(() => {
    window.removeEventListener("resize", resizeHandler);
  });
});
</script>

<style lang="scss" scoped>
.line_select {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  // .el-dropdown-link {
  //   cursor: pointer;
  //   color: var(--el-color-primary);
  //   display: flex;
  //   align-items: center;
  // }
}
.chart {
  min-height: 200px;
}
</style>
