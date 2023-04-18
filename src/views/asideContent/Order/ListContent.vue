<template>
  <div id="Order">
    <!-- TODO:用ElementPlus优化工单视图 -->
    <div class="OrderView">
      <div class="avatar">
        <div>
          <el-avatar
            :size="50"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
        </div>
        <div style="margin-left: 10px">
          <h4>Cly</h4>
          <el-text>可接单</el-text>
        </div>
      </div>
      <div class="mid">
        <el-text tag="b">工单视图</el-text>
        <el-icon
          style="
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate(0, -50%);
          "
        >
          <Refresh />
        </el-icon>
      </div>
      <el-divider />
      <div class="views">
        <ul>
          <li>所有工单<i>10</i></li>
          <li>待分配工单<i>1</i></li>
          <li>待处理工单<i>1</i></li>
          <li>已处理工单<i>6</i></li>
        </ul>
      </div>
    </div>
    <div class="OrderList">
      <Order />
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
  display: grid;
  grid-template-columns: 1fr 5fr;
  column-gap: 10px;
  height: 100%;

  .OrderView {
    background-color: white;
    padding: 20px;

    .avatar {
      display: flex;
    }

    .mid {
      display: flex;
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      position: relative;
    }

    .views ul li {
      height: $views-li;
      line-height: $views-li;
      list-style: none;
      display: flex;
      justify-content: space-between;
    }
  }

  .OrderList {
    width: 100%;
    background-color: white;
    padding: 0 10px;
    box-sizing: border-box;
  }
}
</style>
