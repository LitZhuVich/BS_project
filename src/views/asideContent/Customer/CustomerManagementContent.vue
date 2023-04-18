<template>
  <div id="Order">
    <div class="OrderList">
      <Customer />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Refresh } from "@element-plus/icons-vue";
// 引入组件
// TODO: 工单和新建工单页写完后，替换下面的TEST.vue
// import Order from "../../../components/orderlist/Order";

interface TabType {
  title: string; // 标签页显示名称
  componentName: string; // 动态组件名
  data: any; // 动态组件传参
}
interface TabListType extends TabType {
  name: string; //标签页唯一标识，添加标签页时根据componentName自动生成
}

// 存放标签页数组
const tabList = ref<TabListType[]>([]);
// 默认显示工单页面
const tabValue = ref("1");
</script>

<style scoped lang="scss">
$views-li: 40px;

#Order {
  column-gap: 10px;
  height: 100%;


  .OrderList {
    width: 100%;
    background-color: white;
    padding: 0 10px;
    box-sizing: border-box;
  }
}
</style>
