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
                        <!-- {{ ds[index].date.Format("yyyy-MM-dd") }} -->
                        <!-- {{ d.date.Format("yyyy-MM-dd") }} -->
                        <slot :name="d.fullYear + '-' + d.month + '-' + d.day"></slot>
                        <!-- 正常卡 -->
                        <div v-if="d.type == 0 &&
                            setDataList(d.date).typeName == '正常卡'
                            " class="ZhengChang">
                            <div class="ZhengChangTitle">正常卡:{{ setDataList(d.date).jobTime }}次</div>
                            <div class="ZhengChangDian">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <!-- 请假 -->
                        <div v-if="d.type == 0 &&
                            setDataList(d.date).typeName == '请假'
                            " class="Qingjia">
                            <div class="QingjiaTitle">请假:事假{{ setDataList(d.date).jobTime }}</div>
                            <div class="QingjiaDian">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <!-- 加班 -->
                        <div v-if="d.type == 0 &&
                            setDataList(d.date).typeName == '加班'
                            " class="JiaBan">
                            <div class="JiaBanTitle">加班:{{ setDataList(d.date).jobTime }}h</div>
                            <div class="JiaBanDian">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <!-- 出差 -->
                        <div v-if="d.type == 0 &&
                            setDataList(d.date).typeName == '出差'
                            " class="ChuChai" @click="ss(index)">
                            <div class="ChuChaiTitle">出差{{ setDataList(d.date).jobTime }}</div>
                            <div class="ChuChaiDian">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <!-- 异常卡 -->
                        <div v-if="d.type == 0 &&
                            setDataList(d.date).typeName == '异常卡'
                            " class="YiChang" @click="ss(index)">
                            <div class="YiChangTitle">异常卡{{ setDataList(d.date).jobTime }}</div>
                            <div class="YiChangDian">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>

                        <!-- 假期 -->
                        <div v-if="d.type == 0 &&
                            setDataList(d.date).typeName == '假期'
                            " class="JiaQi">
                            <div class="JiaQiTitle">假期{{ setDataList(d.date).jobTime }}</div>
                            <div class="JiaQiDian">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, defineEmits } from "vue";

const $emit = defineEmits(["enter", "leave", "changeMonth"])
const dataList = reactive({
    datas: [
        {
            time: "2023-01-29",
            typeName: "正常卡",
            jobTime: 8
        },
        {
            time: "2023-01-29",
            typeName: "请假",
            jobTime: 8
        },
        {
            time: "2023-01-10",
            typeName: "请假",
            jobTime: 8
        },
        {
            time: "2023-01-22",
            typeName: "加班",
            jobTime: 4
        },
        {
            time: "2023-01-11",
            typeName: "出差",
            jobTime: 14
        },
        {
            time: "2023-01-14",
            typeName: "异常卡",
            jobTime: 8
        },
        {
            time: "2023-01-02",
            typeName: "假期",
            jobTime: 11
        },
    ],
})

let now = ref(new Date()) //当前时间：Fri Jul 29 2022 09:57:33 GMT+0800 (中国标准时间)
let year = ref(0)
let month = ref(0)
let jobTime = ref([])
const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
let monthData = ref([]) //月数据容器
let currentYear = ref(new Date().getFullYear()) //当前年：2022
let currentMonth = ref(new Date().getMonth() + 1) //当前月：7
let currentDay = ref(new Date().getDate()) //当前天：29
onMounted(() => {
    setYearMonth(now.value);
    generateMonth(now.value);
    getJobTime()
})

function getJobTime() {
    dataList.datas.forEach((item) => {
        console.log("223", jobTime)

        // check if animal type has already been added to newObj
        if (!jobTime.value[item.typeName]) {
            // If it is the first time seeing this animal type
            // we need to add title and points to prevent errors
            jobTime.value[item.typeName] = {};
            jobTime.value[item.typeName] = 0;
        }
        // add animal points to newObj for that animal type.
        jobTime.value[item.typeName] += item.jobTime
    })
    console.log("22", JSON.stringify(jobTime.value["请假"]))
}

// 通过输入日期，匹配当天的所有数据
// 入参格式 value：'2022-07-09'
function setDataList(value) {
    let object = {};
    const date = dateFormat("YYYY-mm-dd", value)
    dataList.datas.forEach((element) => {
        if (element.time == date) {
            object = element;
        }
    });
    return object;
}

function setYearMonth(now) {
    year.value = now.getFullYear();
    month.value = now.getMonth() + 1;
}

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

function setYearMonthInfos(date) {

    setYearMonth(date);
    generateMonth(date);
    now.value = date;
    dateChange();
}

function generateMonth(date) {
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

function getCellColor(d) {
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

function mouseenter(d, event) {
    $emit("enter", event, d);
    // document.getElementsByClassName('cal_m_day_cell').style('background-color','#000000')
}

function mouseleave(d, event) {
    $emit("leave", event, d);
}

function dateChange() {
    let fullYear = now.value.getFullYear();

    let month = now.value.getMonth();
    let startDay = new Date(fullYear, month, 1);
    let endDay = new Date(fullYear, month + 1, 0, 23, 59, 59);
    $emit("changeMonth", startDay, endDay);
}

function dateFormat(fmt, date) {
    let ret;
    const opt = {
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
                    width: 200px;
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

// 正常卡
.ZhengChang {
    margin: 0px 0px 0px 8px;
    width: 120px;
    height: 35px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    background: rgba(16, 154, 249, 0.2);
    color: rgba(16, 154, 249, 1);

    .ZhengChangTitle {}

    .ZhengChangDian {
        div {
            width: 4px;
            height: 4px;
            margin-bottom: 2px;
            border-radius: 4px;
            background: rgba(16, 154, 249, 1);
        }
    }
}

.ZhengChang:hover {
    transform: scale(1.1);
}

// 请假
.Qingjia {
    margin: 0px 0px 0px 8px;
    width: 120px;
    height: 35px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    background: rgba(255, 199, 0, 0.2);
    color: rgba(255, 199, 0, 1);

    .QingjiaTitle {}

    .QingjiaDian {
        div {
            width: 4px;
            height: 4px;
            margin-bottom: 2px;
            border-radius: 4px;
            background: rgba(255, 199, 0, 1);
        }
    }
}

.Qingjia:hover {
    transform: scale(1.1);
}

// 加班
.JiaBan {
    margin: 0px 0px 0px 8px;
    width: 120px;
    height: 35px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    background: rgba(36, 0, 255, 0.2);
    color: rgba(36, 0, 255, 1);

    .JiaBanTitle {}

    .JiaBanDian {
        div {
            width: 4px;
            height: 4px;
            margin-bottom: 2px;
            border-radius: 4px;
            background: rgba(36, 0, 255, 1);
        }
    }
}

.JiaBan:hover {
    transform: scale(1.1);
}

// 出差
.ChuChai {
    margin: 0px 0px 0px 8px;
    width: 120px;
    height: 35px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    background: rgba(255, 167, 40, 0.2);
    color: #ffa728;

    .ChuChaiTitle {}

    .ChuChaiDian {
        div {
            width: 4px;
            height: 4px;
            margin-bottom: 2px;
            border-radius: 4px;
            background: #ffa728;
        }
    }
}

.ChuChai:hover {
    transform: scale(1.1);
}

// 异常卡
.YiChang {
    margin: 0px 0px 0px 8px;
    width: 120px;
    height: 35px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    background: rgba(240, 92, 39, 0.2);
    color: rgba(240, 92, 39, 1);

    .YiChangTitle {}

    .YiChangDian {
        div {
            width: 4px;
            height: 4px;
            margin-bottom: 2px;
            border-radius: 4px;
            background: rgba(240, 92, 39, 1);
        }
    }
}

.YiChang:hover {
    transform: scale(1.1);
}

// 假期
.JiaQi {
    margin: 0px 0px 0px 8px;
    width: 120px;
    height: 35px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    background: rgba(29, 209, 155, 0.2);
    color: rgba(29, 209, 155, 1);

    .JiaQiTitle {}

    .JiaQiDian {
        div {
            width: 4px;
            height: 4px;
            margin-bottom: 2px;
            border-radius: 4px;
            background: rgba(29, 209, 155, 1);
        }
    }
}

.JiaQi:hover {
    transform: scale(1.1);
}
</style>