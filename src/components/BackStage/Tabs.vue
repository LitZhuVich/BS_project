<template>
  <div style="margin-bottom: 20px">
    <!--  @click="addTab(editableTabsValue)" -->
    <el-button size="small"> 添加 </el-button>
  </div>
  <el-tabs v-model="tabValue" type="card" class="demo-tabs">
    <el-tab-pane key="1" label="工单" name="1">
      <Order />
    </el-tab-pane>
    <el-tab-pane key="2" label="新建工单" name="2">
      <NewOrder />
    </el-tab-pane>
    <el-tab-pane
      v-for="item in tabList"
      :name="item.name"
      :key="item.name"
      closeable
    >
      <component :is="item.componentName" v-bind="item.data"></component>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from "vue";
// 引入组件
// TODO: 工单和新建工单页写完后，替换下面的TEST.vue
import Order from "../BackStage/Order.vue";
import NewOrder from "../BackStage/NewOrder.vue";

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

// // 添加标签页
// const addTab = (tab: TabType) => {
//     // 保证相同组件路径标签页name标识唯一
//     const name = `${tab.componentName}_${Date.now()}`
//     tabList.value.push({
//         ...tab,// TODO:不知道这三个.是什么意思，待弄懂 -CLY
//         name
//     })
//     tabValue.value = name
// }

// addTab({
//     title: '标签1',
//     componentName: 'tag1',
//     data: {
//         test: '数据'
//     }
// })
</script>

<style>
/* 清除标签下外边距 */
.el-tabs__header {
  margin: 0;
}
.el-tabs__content {
  /* 标签内容背景颜色 */
  background-color: #f3f1f6;
  /* 标签内容外边距 */
  padding: 20px;
  box-sizing: border-box;
}
/* 标签行背景颜色 */
.el-tabs__nav-scroll {
  background-color: white;
}
.demo-tabs > .el-tabs__content {
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
