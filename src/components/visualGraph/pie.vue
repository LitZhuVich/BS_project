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
  const chart = echarts.init(chartRef.value);

  // 初始化数据
  const data = {
    xData: [
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
      "星期天",
    ],
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
  //  选择渲染数据
  chart.setOption(option);
  // 当窗口大小变化时重新绘制图表
  window.onresize = function () {
    chart.resize();
  };
});
</script>

<style lang="scss" scoped></style>
