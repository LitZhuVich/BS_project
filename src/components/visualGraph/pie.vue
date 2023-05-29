<template>
  <div
    ref="chartRef"
    v-loading="loading"
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
import ApiClient from "../../request/request";
const apiClient = ApiClient.getInstance();
const loading = ref<boolean>(true);
// 样式
const chartStyle = {
  chartWidth: "100%",
  chartHeight: "100%",
};
const name = [
  "总待处理",
  "总已受理",
  "总处理中",
  "总已完成",
  "总已完结",
  "总已超时",
];
const getAllOrderData = async () => {
  // 配置项
  const option: any = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      data: [],
    },
    series: [
      {
        type: "pie",
        selectedMode: "single",
        data: [],
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

  try {
    const res = await apiClient.get<any>("/order/showAllOrder");
    let data = [];
    for (let i = 0; i < name.length; i++) {
      data.push({
        value: res.data.count[i],
        name: name[i],
      });
    }
    option.legend.data = [...name];
    option.series[0].data = [...data];
    loading.value = false;
  } catch (error) {
    console.error(error);
    ElMessage({
      message: "pie获取数据失败！",
      type: "error",
    });
  }

  return option;
};

// 初始化 ECharts 实例
const chartRef: Ref<any> = ref(null);
onMounted(async () => {
  const option = await getAllOrderData();
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
