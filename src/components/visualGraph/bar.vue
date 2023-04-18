<template>
  <div ref="chartRef" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import * as echarts from "echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/grid";

// 初始化 ECharts 实例
const chartRef: Ref<any> = ref(null);
onMounted(() => {
  // chartRef.value.
  const chart = echarts.init(chartRef.value);

  // 初始化数据
  const data = {
    xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    yData: [820, 932, 901, 934, 1290, 1330, 1320],
  };
  // 显示星期一到星期天接收到的工单
  // 配置项
  const option: any = {
    legend: {
      data: ["已解决", "已超时", "已接收"],
      left: "center",
    },
    tooltip: {},
    dataset: {
      source: [
        { product: "星期一", 已解决: 43, 已超时: 85, 已接收: 93 },
        { product: "星期二", 已解决: 83, 已超时: 73, 已接收: 55 },
        { product: "星期三", 已解决: 86, 已超时: 65, 已接收: 82 },
        { product: "星期四", 已解决: 72, 已超时: 53, 已接收: 39 },
        { product: "星期五", 已解决: 72, 已超时: 53, 已接收: 39 },
        { product: "星期六", 已解决: 72, 已超时: 53, 已接收: 39 },
        { product: "星期天", 已解决: 72, 已超时: 53, 已接收: 39 },
      ],
    },
    xAxis: { type: "category" },
    yAxis: {
      type: "value",
    },
    series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
  };
  //  选择渲染数据
  chart.setOption(option);
  // 当窗口大小变化时重新绘制图表
  window.onresize = function () {
    chart.resize();
  };
});
</script>

<style lang="scss" scoped></style>
