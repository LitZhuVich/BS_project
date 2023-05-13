<template>
  <div class="line_select">
    <el-button-group class="ml-4">
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
    </el-dropdown>
  </div>
  <div
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
// 点击切换日期
const handleCommand = (command: string | number | object) => {
  ElMessage(`click on item ${command}`);
};
// 获取当前日期
const today = new Date();
// 将日期向前7天
const date = new Date();
date.setDate(today.getDate() - 7);
// 定义一个数组保存日期
const dateArray: string[] = [];
// 生成日期字符串并显示在网页中
for (let i = 0; i < 8; i++) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateString = month + "-" + day;
  dateArray.push(dateString);
  date.setDate(date.getDate() + 1);
}
// 初始化数据
const data = {
  xData: dateArray,
  yData: {
    push: [5, 2, 1, 4, 8, 6, 5, 2],
    dealWith: [3, 2, 34, 6, 2, 3, 5, 1],
    finish: [5, 2, 1, 3, 2, 34, 6, 2],
  },
};
// 样式
const chartStyle = {
  chartWidth: "100%",
  chartHeight: "100%",
};
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
    data: ["当日发布工单数", "当日处理工单数", "当日完成工单数"],
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
      data: data.xData,
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "当日发布工单数",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: data.yData.push,
    },
    {
      name: "当日处理工单数",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: data.yData.dealWith,
    },
    {
      name: "当日完成工单数",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: data.yData.finish,
    },
  ],
};
// 初始化 ECharts 实例
const chartRef: Ref<any> = ref(null);
onMounted(() => {
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
</style>
