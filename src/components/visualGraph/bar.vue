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
const chartStyle = {
  chartWidth: "100%",
  chartHeight: "100%",
};
// 定义中文星期名称的数组
const weekDays = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日",
];

const today = new Date();
let dayOfWeek = today.getDay();
let nextMonday = new Date(
  today.getTime() + (8 - dayOfWeek) * 24 * 60 * 60 * 1000
);
// 定义一个数组保存日期
const dateArray: string[] = [];
for (var i = 0; i < 7; i++) {
  if (i === 0) {
    dateArray.push(weekDays[nextMonday.getDay()]);
  } else {
    let nextDay = new Date(nextMonday.getTime() + i * 24 * 60 * 60 * 1000);
    dateArray.push(weekDays[nextDay.getDay()]);
  }
}
// 显示星期一到星期天接收到的工单
// 获取所有工单数据
const getOrderData = async (): Promise<object> => {
  // 配置项
  const option: any = {
    legend: {
      data: ["已接收", "已超时", "已完成"],
      left: "center",
    },
    tooltip: {},
    dataset: {
      source: [],
    },
    xAxis: { type: "category" },
    yAxis: {
      type: "value",
    },
    series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
  };
  try {
    const takeRes = await apiClient.get<any>("/order/showWeekOrder/3");
    const timeOutRes = await apiClient.get<any>("/order/showWeekOrder/6");
    const finishRes = await apiClient.get<any>("/order/showWeekOrder/4");
    const [take, timeOut, finish] = await apiClient.all<any>([
      takeRes,
      timeOutRes,
      finishRes,
    ]);

    // 存储时间信息
    let data = [];
    for (let i = 0; i < weekDays.length; i++) {
      data.push({
        product: weekDays[i],
        已接收: take.data.dateDay[i],
        已超时: timeOut.data.dateDay[i],
        已完成: finish.data.dateDay[i],
      });
    }
    option.dataset.source = [...data];
    loading.value = false;
    // 返回数据
  } catch (error) {
    ElMessage({
      message: "bar获取数据失败！",
      type: "error",
    });
  }
  return option;
};
// 初始化 ECharts 实例
const chartRef: Ref<any> = ref(null);
onMounted(async () => {
  const option = await getOrderData();
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
