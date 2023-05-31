<template>
  <div id="Order">
    <!-- TODO:用ElementPlus优化工单视图 -->
    <div class="OrderView">
      <div class="avatar">
        <div>
          <el-avatar :size="50" :src="userInfo.avator" />
        </div>
        <div style="margin-left: 10px">
          <h4>{{ userInfo.username }}</h4>
          <el-text>可接单</el-text>
        </div>
      </div>
      <div class="mid">
        <el-text tag="b">工单视图</el-text>
        <el-icon style="
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate(0, -50%);
          ">
          <Refresh />
        </el-icon>
      </div>
      <el-divider />
      <div class="views">
        <ul>
          <li>所有工单<i>{{ totalOrders }}</i></li>
          <li>待分配工单<i>{{ totalToBeAssignedOrders }}</i></li>
          <li>待处理工单<i>{{ totalToBeDoneOrders }}</i></li>
          <li>处理中工单<i>{{ totalOnDoingOrders }}</i></li>
          <li>已处理工单<i>{{ totalDoneOrders }}</i></li>
        </ul>
      </div>
    </div>
    <div class="OrderList">
      <Order />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Refresh } from "@element-plus/icons-vue";
import { useUserStore } from "../../../store/store";
import { storeToRefs } from "pinia";
import Order from "../../../components/orderList/Order.vue"
import ApiClient from "../../../request/request";
const apiClient = ApiClient.getInstance();
// 实例化
const userStore = useUserStore();
const { userInfo }: any = storeToRefs(userStore);

onMounted(() => {
  getOrders();
  getToBeAssignedOrders();
  getToDoneOrders();
  getOnDoingOrders();
  getDoneOrders();
})

interface TabType {
  title: string; // 标签页显示名称
  componentName: string; // 动态组件名
  data: any; // 动态组件传参
}
interface TabListType extends TabType {
  name: string; //标签页唯一标识，添加标签页时根据componentName自动生成
}

const totalOrders = ref(0),
  totalToBeAssignedOrders = ref(0),
  totalToBeDoneOrders = ref(0),
  totalOnDoingOrders = ref(0),
  totalDoneOrders = ref(0)
// 获取工单数据
const getOrders = async () => {
  const res: any = await apiClient.get<any>(
    `/order`
  )
  totalOrders.value = res.data.length
}
// 获取待分配工单
const getToBeAssignedOrders = async () => {
  const res: any = await apiClient.get<any>('/order/status/1')
  totalToBeAssignedOrders.value = res.data.length
}
// 获取待处理工单
const getToDoneOrders = async () => {
  const res: any = await apiClient.get<any>('/order/status/2')
  totalToBeDoneOrders.value = res.data.length
}
// 获取处理中工单
const getOnDoingOrders = async () => {
  const res: any = await apiClient.get<any>('/order/status/3')
  totalOnDoingOrders.value = res.data.length
}
// 获取已处理工单
const getDoneOrders = async () => {
  const res: any = await apiClient.get<any>('/order/status/4')
  totalDoneOrders.value = res.data.length
}
</script>

<style scoped lang="scss">
$views-li: 40px;

#Order {
  display: grid;
  grid-template-columns: 1fr 6fr;
  column-gap: 10px;
  height: calc(100% - 120px);
  margin: 10px;

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
