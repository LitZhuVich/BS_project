<template>
  <div class="table">
    <el-calendar ref="calendar">
      <template #header="{ date }">
        <span v-show="false">{{ getOrders(date) }}</span>
        <span>工程师日历</span>
        <span>{{ date }}</span>
        <el-button-group>
          <el-button @click="selectDate('prev-month')">
            上个月
          </el-button>
          <el-button @click="selectDate('today')">今天</el-button>
          <el-button @click="selectDate('next-month')">
            下个月
          </el-button>
        </el-button-group>
      </template>
      <template #date-cell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''" style="display: flex;flex-direction: column;">
          <span>
            {{ data.day.split('-').slice(2, 3).join('-') }}
            <!-- {{ checkOrder(data.date) }} -->
          </span>
          <span v-show="checkOrder(data.date)">
            <span :style="{ backgroundColor: 'green' }" class="dot"></span>
          </span>
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import ApiClient from '../../request/request'

const apiClient = ApiClient.getInstance();
const userColor = ref(['red', 'orange', 'yellow', 'green', 'aqua', 'blue', 'purple'])
let orders: any = ref([])
let calendarMonth: any = ref()

// 获取全部工单
const getOrders = async (date: any) => {
  try {
    // 初始化工单
    orders = ref([])
    // 获取日历当前月份
    calendarMonth = new Date(date).getMonth() + 1
    // 获取所有工单
    const res: any = await apiClient.get<any>('/order')
    res.data.forEach((item: any) => {
      // 将工单预约时间转为时间格式
      let orderDate = new Date(item.appointment)
      // 找出预约时间的月份等于日历显示的月份的订单
      if (orderDate.getMonth() + 1 == calendarMonth) {
        orders.value.push(item)
      }
    });
  } catch (e) {
    console.log(e)
  }
}

// 单个工单信息
let order: any = ref([])
// 判断订单时间
const checkOrder = (data: any) => {
  if (data.getMonth() + 1 == calendarMonth) {
    // 圆点是否出现
    let showDot = ref(false)
    orders.value.forEach((item: any) => {
      let appointment = new Date(item.appointment)
      if (appointment.getDate() == data.getDate()) {
        showDot.value = true
      }
    });
    return showDot.value
  } else {
    return false
  }
}

const calendar = ref()
const selectDate = (val: string) => {
  calendar.value.selectDate(val)
}
</script>

<style lang="scss" scoped>
.table {
  margin: 10px;
  height: calc(100% - 111px);

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
  }

  .is-selected {
    color: #1989fa;
  }
}
</style>
