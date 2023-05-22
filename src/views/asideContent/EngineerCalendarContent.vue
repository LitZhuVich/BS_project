<template>
  <div class="calendar">
    <!-- 标题 -->
    <header>
      <span>{{ year }} 年 {{ month }} 月</span>
      <div>
        <button @click="preMonth">上个月</button>
        <button>今天</button>
        <button @click="nextMonth">下个月</button>
      </div>
    </header>

    <div class="content">
      <!-- 日历表头 -->
      <div class="week_raw">
        <div v-for="item in weeks" class="week_raw_cell">{{ item }}</div>
      </div>
      <!-- 日历内容 -->
      <div class="calendarContent">
        <div v-for="(ds, index) in monthData" :key="index" class="days_raw">
          <!-- 每行内容 -->
          <div v-for="d in ds" :key="d.day" @mouseenter="mouseenter(d, $event)" @mouseleave="mouseleave(d, $event)"
            class="day" :style="{ color: getCellColor(d) }">
            <div class="itemDay">{{ d.day }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineEmits } from 'vue'

const $emit = defineEmits(["enter", "leave", "changeMonth"])

// 获取当前日期
const DateNow = ref(new Date())
// 当前年份
const YearNow = ref(DateNow.value.getFullYear())
// 当前月份
const MonthNow = ref(DateNow.value.getMonth() + 1)
// 当前天
const DayNow = ref(DateNow.value.getDate())
// 星期
const weeks = ref(['周日', '周一', '周二', '周三', '周四', '周五', '周六'])
// 月数据容器
let monthData = ref([])
let year = ref(0)
let month = ref(0)

onMounted(() => {
  generateMonth(DateNow.value)
})


// 生成月份
function generateMonth(date: any) {
  // date: 传入的是当前时间
  // 将date设置为那个月的第一天 例：Wed May 01 2023 00:00:00 GMT+0800 (中国标准时间)
  date.setDate(1);
  // 星期 0 - 6， 星期天 - 星期6
  let weekStart = date.getDay();

  // 获取date那个月的最后一天的日期 例：Wed May 31 2023 00:00:00 GMT+0800 (中国标准时间)
  let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  // 获取date那个月的最后一天
  let dayEnd = endDate.getDate();
  // 星期 0 - 6， 星期天 - 星期6
  let weeEnd = endDate.getDay();

  let milsStart = date.getTime();
  let dayMils = 24 * 60 * 60 * 1000;
  let milsEnd = endDate.getTime() + dayMils;

  let monthDatas = [];
  let current;
  // 上个月的几天
  for (let i = 1; i < weekStart; i++) {
    current = new Date(milsStart - (weekStart - i) * dayMils);
    monthDatas.push({
      type: -1,
      date: current,
      fullYear: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    });
  }
  // 当前月
  for (let i = 0; i < dayEnd; i++) {
    current = new Date(milsStart + i * dayMils);
    monthDatas.push({
      type: 0,
      date: current,
      fullYear: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    });
  }
  // 下个月的几天
  for (let i = 0; i < 6 - weeEnd + 1; i++) {
    current = new Date(milsEnd + i * dayMils);
    monthDatas.push({
      type: 1,
      date: current,
      fullYear: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    });
  }

  monthData.value = [];
  for (let i = 0; i < monthDatas.length; i++) {
    let mi = i % 7;
    if (mi == 0) {
      monthData.value.push([]);
    }
    monthData.value[Math.floor(i / 7)].push(monthDatas[i]);
  }

  // 少于6行，补足6行
  if (monthData.value.length <= 5) {
    milsStart = current.getTime();
    let lastLine = [];
    for (let i = 1; i <= 7; i++) {
      current = new Date(milsStart + i * dayMils);
      lastLine.push({
        type: 1,
        date: current,
        fullYear: current.getFullYear(),
        month: current.getMonth() + 1,
        day: current.getDate(),
      });
    }
    monthData.value.push(lastLine);
  }
  console.log("//", JSON.parse(JSON.stringify(monthData.value)))
}
// 判断当前日期
function getCellColor(d: any) {
  if (
    d.fullYear == YearNow.value &&
    d.month == MonthNow.value &&
    d.day == DayNow.value
  ) {
    return "#409eff";
  }
  let color = d.type == -1 ? "#c0c4cc" : d.type == 1 ? "#c0c4cc  " : "";

  return color;
}
// 点击上个月
function preMonth() {
  let n = DateNow.value;
  let date = new Date(
    n.getFullYear(),
    n.getMonth() - 1,
    n.getDate(),
    n.getHours(),
    n.getMinutes(),
    n.getSeconds(),
    n.getMilliseconds()
  );
  setYearMonthInfos(date);
}
// 点击下个月
function nextMonth() {
  let n = DateNow.value;
  let date = new Date(
    n.getFullYear(),
    n.getMonth() + 1,
    n.getDate(),
    n.getHours(),
    n.getMinutes(),
    n.getSeconds(),
    n.getMilliseconds()
  );
  setYearMonthInfos(date);
}
function setYearMonth() {
  year.value = DateNow.value.getFullYear();
  month.value = DateNow.value.getMonth() + 1;
}
function setYearMonthInfos(date: any) {
  setYearMonth();
  generateMonth(date);
  DateNow.value = date;
  dateChange();
}
function dateChange() {
  let fullYear = DateNow.value.getFullYear();

  let month = DateNow.value.getMonth();
  let startDay = new Date(fullYear, month, 1);
  let endDay = new Date(fullYear, month + 1, 0, 23, 59, 59);
  $emit("changeMonth", startDay, endDay);
}
// 鼠标移入
function mouseenter(d, event) {
  $emit("enter", event, d);
}
// 鼠标移出
function mouseleave(d, event) {
  $emit("leave", event, d);
}
</script>

<style lang="scss" scoped>
.calendar {



  .content {

    // 日历表头
    .week_raw {
      display: flex;

      .week_raw_cell {
        box-sizing: border-box;
        flex-grow: 1;
        height: 30px;
        font-weight: 400;
        font-size: 16px;
        border: 1px solid #e4e7ed;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(0, 0, 0, 0.45);
      }
    }

    // 日历内容
    .calendarContent {

      // 每行内容
      .days_raw {
        display: flex;

        .day {
          box-sizing: border-box;
          width: 200px;
          height: 80px;
          border: 1px solid #e4e7ed;

          .itemDay {
            width: 100%;
            height: 30px;
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            text-align: right;
            box-sizing: border-box;
            padding-right: 10px;
          }
        }

        .day:hover {
          color: #409eff;
        }
      }
    }
  }
}
</style>
