<template>
  <div class="table">
    <el-calendar ref="calendar">
      <template #header="{ date }">
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
            {{ data.isSelected ? '✔️' : '' }}
          </span>
          <span>
            <span v-if="checkOrder(data.date)" :style="{ backgroundColor: 'green' }" class="dot"></span>
          </span>
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import ApiClient from '../../request/request'

const apiClient = ApiClient.getInstance();
const userColor = ref(['red', 'orange', 'yellow', 'green', 'aqua', 'blue', 'purple'])
let orders: any = ref([])

onMounted(() => {
  getOrders()
})

// 获取全部工单
const getOrders = async () => {
  try {
    const res: any = await apiClient.get<any>('/order')
    res.data.forEach((item: any) => {
      let orderDate = new Date(item.appointment)
      // 找出预约时间的月份等于日历显示的月份的订单
      if (orderDate.getMonth() + 1 == 4) {
        if (orderDate.getDate() == 30) {
          orders.value.push(orderDate)
        }
      }
    });
  } catch (e) {
    console.log(e)
  }
}

// 判断订单时间
const checkOrder = (data: any) => {
  console.log(data.getMonth() + 1)
  if (data.getMonth() + 1 == 5) {
    orders.value.forEach((item: any) => {
      if (item.getDate() == data.getDate()) {
        console.log(true)
        return true
      }
    });
  }
  return false
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
