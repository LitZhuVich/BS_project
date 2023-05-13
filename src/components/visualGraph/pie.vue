<template>
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
// 样式
const chartStyle = {
  chartWidth: "100%",
  chartHeight: "100%",
};
// 初始化数据
const data = {
  xData: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"],
  yData: [820, 932, 901, 934, 1290, 1330, 1320],
};
// 显示工单类型
// 配置项
const option: any = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    data: ["CityA", "CityB", "CityD", "CityC", "CityE"],
  },
  series: [
    {
      type: "pie",
      selectedMode: "single",
      data: [
        {
          value: 1548,
          name: "CityE",
        },
        { value: 735, name: "CityC" },
        { value: 510, name: "CityD" },
        { value: 434, name: "CityB" },
        { value: 335, name: "CityA" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
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

<style lang="scss" scoped></style>
