<template>
  <div class="table">
    <el-calendar ref="calendar">
      <template #header="{ date }">
        <span>工程师日历</span>
        <span>{{ date }}</span>
        <el-button-group>
          <el-button size="small" @click="selectDate('prev-month')">
            上个月
          </el-button>
          <el-button size="small" @click="selectDate('today')">今天</el-button>
          <el-button size="small" @click="selectDate('next-month')">
            下个月
          </el-button>
        </el-button-group>
      </template>
      <template #date-cell="{ day }">
        {{ checkOrder(day) }}
        <!-- <p :class="day.isSelected ? 'is-selected' : ''" style="display: flex;flex-direction: column;">
          <span>
            {{ day.day.split('-').slice(0, 2).join('-') }}
            {{ day.isSelected ? '✔️' : '' }}
          </span>
          <span>
            <span :style="{ backgroundColor: 'green' }" class="dot">
             
            </span>
          </span>
        </p> -->
      </template>
    </el-calendar>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import ApiClient from '../../request/request'

const apiClient = ApiClient.getInstance();
const userColor = ref(['red', 'orange', 'yellow', 'green', 'aqua', 'blue', 'purple'])
// let orders: any = null

// onMounted(() => {
//   getOrders()
// })

// 获取全部工单
const getOrders = async () => {
  try {
    const res: any = await apiClient.get<any>('/order')
    let orders = res.data
    return orders;
    let request: any = [];
    orders.forEach((item: any) => {
      // request.push(item.appointment.split('-').substring(2, 4))
    });
    console.log(request);

    console.log('orders', orders)

  } catch (e) {
    console.log(e)
  }
}

// 判断订单时间
const checkOrder = async (data: any) => {
  let orders = [...await getOrders()]
  // console.log('orders', orders)
  console.log('data', data)
  // console.log(data.date.getDate());
  // console.log(new Date(orders[0].appointment).getDate())
  // orders.forEach((item: any) => {
  //   console.log(new Date(item.appointment).getDate())
  // });
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
