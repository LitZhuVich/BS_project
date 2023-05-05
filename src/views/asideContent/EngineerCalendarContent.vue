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
      <template #date-cell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''" style="display: flex;flex-direction: column;">
          <span>
            {{ data.day.split('-').slice(1).join('-') }}
            {{ data.isSelected ? '✔️' : '' }}
          </span>
          <span>
            <span class="dot"></span>
          </span>
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

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
    background-color: red;
    display: inline-block;
  }

  .is-selected {
    color: #1989fa;
  }
}
</style>
