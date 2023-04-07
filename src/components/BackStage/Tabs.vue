<template>
  <!-- TODO:添加按钮位置不对 -->
  <!-- TODO:点击之后背景颜色不变白色 -->
  <div class="btnBar">
    <!--  @click="addTab(editableTabsValue)" -->
    <el-button size="small"> 添加 </el-button>
  </div>
  <el-tabs v-model="tabValue" type="card" class="demo-tabs">
    <el-tab-pane key="1" label="工单" name="1">
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
            <span>可接单</span>
          </div>
        </div>
        <div class="mid">
          <b>工单视图</b>
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
import { Refresh } from "@element-plus/icons-vue";
// 引入组件
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

<style scoped lang="scss">
$views-li: 40px;

.btnBar,
.el-tabs__header {
  background-color: white;
  margin: 0;
}

.demo-tabs > .el-tabs__content {
  height: 100vh;
}

.el-tab-pane {
  display: flex;
  height: 100vh;

  .OrderView {
    flex: 2;
    margin: 0 10px;
    background-color: white;
    padding: 20px;
    min-width: 200px;
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
    flex: 10;
    padding: 5px;
    background-color: white;
  }
}
</style>
