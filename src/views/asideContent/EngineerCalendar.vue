<template>
  <div class="cal_con">
    <!-- 标题 -->
    <header>
      <span>{{ year }} 年 {{ month }} 月</span>
      <div>
        <button @click="preYear">上一年</button>
        <button @click="preMonth">上个月</button>
        <button @click="nextMonth">下个月</button>
        <button @click="nextYear">下一年</button>
      </div>
    </header>

    <div class="cal_month">
      <!--日历表头  周一 周二 周三 周四 周五 周六 周日-->
      <div class="cal_m_weeks">
        <div v-for="w in weeks" :key="w" class="cal_m_weeks_cell">
          {{ w }}
        </div>
      </div>
      <!--日历表内容 -->
      <div class="cal_m_days">
        <!-- 第几行 -->
        <div v-for="(ds, index) in monthData" :key="index" class="cal_m_day_line">
          <!-- 每行内容 -->
          <div v-for="d in ds" :key="d.day" class="cal_m_day_cell" :style="{ color: getCellColor(d) }"
            @mouseenter="mouseenter(d, $event)" @mouseleave="mouseleave(d, $event)">
            <div class="itemDay">{{ d.day }}</div>
            <!-- 卡片 -->
            <template v-for="user in users">
              <div v-if="d.type == 0 && setDataList(d.date).user_id == user.id" :style="{
                background: cardColor[setDataList(d.date).user_id - 1].backgroundColor,
                color: cardColor[setDataList(d.date).user_id - 1].color
              }
                " class="Card">
                <div class="CardTitle">{{ setDataList(d.date).username }} : 期限{{
                  setDataList(d.date).time_limit }}天
                </div>
                <div class="CardDot">
                  <div v-for="i in 3" :style="{ background: cardColor[setDataList(d.date).user_id - 1].color }">
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, defineEmits } from "vue";
import ApiClient from "../../request/request";
const apiClient = ApiClient.getInstance();

const $emit = defineEmits(["enter", "leave", "changeMonth"])
let orderList = reactive({ datas: [] })

let now = ref(new Date()) //当前时间：Fri Jul 29 2022 09:57:33 GMT+0800 (中国标准时间)
let year = ref(0)
let month = ref(0)
const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
let monthData = ref<any>([]) //月数据容器
let currentYear = ref(new Date().getFullYear()) //当前年：2022
let currentMonth = ref(new Date().getMonth() + 1) //当前月：7
let currentDay = ref(new Date().getDate()) //当前天：29
let users = ref<any>([])
const cardColor = [{
  backgroundColor: 'rgba(16, 154, 249, 0.2)',
  color: 'rgba(16, 154, 249, 1)'
}, {
  backgroundColor: 'rgba(255, 199, 0, 0.2)',
  color: 'rgba(255, 199, 0, 1)'
}, {
  backgroundColor: 'rgba(36, 0, 255, 0.2)',
  color: 'rgba(36, 0, 255, 1)'
}, {
  backgroundColor: 'rgba(240, 92, 39, 0.2)',
  color: 'rgba(240, 92, 39, 1)'
}, {
  backgroundColor: 'rgba(29, 209, 155, 0.2)',
  color: 'rgba(29, 209, 155, 1)'
}, {
  backgroundColor: 'rgba(255, 167, 40, 0.2)',
  color: '#ffa728'
}]
onMounted(() => {
  getOrders();
  setYearMonth(now.value);
  generateMonth(now.value);
  getAllUsers();
})
// 获取所有用户
async function getAllUsers() {
  const res: any = await apiClient.get<any>(
    '/CustomerRepresentative/getAllUsers'
  )
  users.value = res.data
}

async function getOrders() {
  const res: any = await apiClient.get<any>(
    '/order'
  )
  orderList.datas = res.data
}

// 通过输入日期，匹配当天的所有数据
// 入参格式 value：'2022-07-09'
function setDataList(value: any) {
  let object: any = {};
  let date = dateFormat("YYYY-mm-dd", value);
  orderList.datas.forEach((element: any) => {
    // 将工单里的预约时间（string类型）转为Date类型
    let appointment = dateFormat("YYYY-mm-dd", new Date(element.appointment))
    if (appointment == date) {
      object = element;
    }
  });
  return object;
}

function setYearMonth(now: any) {
  year.value = now.getFullYear();
  month.value = now.getMonth() + 1;
}
// 上一年
function preYear() {
  let n = now.value;
  let date = new Date(
    n.getFullYear() - 1,
    n.getMonth(),
    n.getDate(),
    n.getHours(),
    n.getMinutes(),
    n.getSeconds(),
    n.getMilliseconds()
  );

  setYearMonthInfos(date);
}
// 上一月
function preMonth() {
  let n = now.value;
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
// 下一年
function nextYear() {
  let n = now.value;
  let date = new Date(
    n.getFullYear() + 1,
    n.getMonth(),
    n.getDate(),
    n.getHours(),
    n.getMinutes(),
    n.getSeconds(),
    n.getMilliseconds()
  );

  setYearMonthInfos(date);
}
// 下个月
function nextMonth() {
  let n = now.value;
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

function setYearMonthInfos(date: any) {

  setYearMonth(date);
  generateMonth(date);
  now.value = date;
  dateChange();
}

function generateMonth(date: any) {
  date.setDate(1);
  // 星期 0 - 6， 星期天 - 星期6
  let weekStart = date.getDay();

  let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  let dayEnd = endDate.getDate();
  // 星期 0 - 6， 星期天 - 星期6
  let weeEnd = endDate.getDay();

  let milsStart = date.getTime();
  let dayMils = 24 * 60 * 60 * 1000;
  let milsEnd = endDate.getTime() + dayMils;

  let monthDatas = [];
  let current: any;
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

function getCellColor(d: any) {
  if (
    d.fullYear == currentYear.value &&
    d.month == currentMonth.value &&
    d.day == currentDay.value
  ) {
    return "#409eff";
  }
  let color = d.type == -1 ? "#c0c4cc" : d.type == 1 ? "#c0c4cc  " : "";

  return color;
}

function mouseenter(d: any, event: any) {
  $emit("enter", event, d);
  // document.getElementsByClassName('cal_m_day_cell').style('background-color','#000000')
}

function mouseleave(d: any, event: any) {
  $emit("leave", event, d);
}

function dateChange() {
  let fullYear = now.value.getFullYear();

  let month = now.value.getMonth();
  let startDay = new Date(fullYear, month, 1);
  let endDay = new Date(fullYear, month + 1, 0, 23, 59, 59);
  $emit("changeMonth", startDay, endDay);
}

function dateFormat(fmt: any, date: any) {
  let ret: any;
  const opt: any = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    }
    ;
  }
  ;
  return fmt;
}


</script>

<style scoped lang="scss">
.cal_con {
  margin: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 10px 20px 20px 20px;
  -webkit-user-select: none; //取消鼠标点快了文字会被选中。
  -moz-user-select: none; //取消鼠标点快了文字会被选中。
  -ms-user-select: none; //取消鼠标点快了文字会被选中。
  user-select: none; //取消鼠标点快了文字会被选中。
  color: #000000;

  // 标题
  header {
    height: 50px;
    line-height: 50px;
    position: relative;
    text-align: center;
    font-size: 20px;

    div {
      position: absolute;
      top: 0;
      right: 0;

      button {
        padding: 5px 10px;
        border-radius: 5px;
        background-color: white;
        cursor: pointer;
        margin-right: 5px;
      }

      button:hover {
        color: #31c3f6;
        border-color: #31c3f6;
        transition: 200ms;
      }
    }
  }

  .cal_month {

    // 日历表头 周日 周一 周二 周三 周四 周五 周六
    .cal_m_weeks {
      display: flex;

      .cal_m_weeks_cell {
        box-sizing: border-box;
        flex: 1;
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

    // 日历表内容
    .cal_m_days {

      // 第几行
      .cal_m_day_line {
        display: flex;

        // 每行内容
        .cal_m_day_cell {
          box-sizing: border-box;
          flex: 1;
          height: 120px;
          border: 1px solid #e4e7ed;

          .itemDay {
            width: 100%;
            height: 30px;
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            text-align: right;
            box-sizing: border-box;
            padding-right: 10px;
          }
        }

        // 每行内容-浮动效果
        .cal_m_day_cell:hover {
          color: #409eff;
        }
      }
    }
  }
}

// 卡片
.Card {
  margin: 0px 0px 0px 8px;
  width: 80%;
  height: 25px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;

  .CardDot {
    div {
      width: 4px;
      height: 4px;
      margin-bottom: 2px;
      border-radius: 4px;
    }
  }
}

.Card:hover {
  transform: scale(1.1);
}
</style>