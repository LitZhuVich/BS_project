<template>
  <div class="table">
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          fixed
          :columns="columns"
          :data="data"
          :width="width"
          :height="height"
        >
          <template #row="props">
            <Row v-bind="props" />
          </template>
        </el-table-v2>
      </template>
    </el-auto-resizer>
  </div>
</template>

<script lang="ts" setup>
import { cloneVNode } from "vue";

const generateColumns = (length = 10, prefix = "号", props?: any) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${columnIndex}`,
    dataKey: `${columnIndex}`,
    title: `${columnIndex}${prefix}`,
    width: 60,
  }));

const generateData = (
  columns: ReturnType<typeof generateColumns>,
  length = 200,
  prefix = "工程师"
) =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        /*
        rowData（每行的数据）: （每行数据）,id,parentId
        column（每列的属性）: key,dataKey,title,width
        columnIndex（每列的索引值）: （数字：索引值）
        */
        if (column.dataKey == "0") {
          // 如果column的dataKey为0号，将其换成工程师名字
          rowData[column.dataKey] = engineerList[rowIndex];
        } else {
          // 其他日期不变
          rowData[column.dataKey] = "";
        }
        return rowData;
      },
      {
        id: `${prefix} - ${rowIndex}`, // 每行的ID=“工程师 - （数字）”
        parentId: null,
      }
    );
  });

// 工程师列表
const engineerList = ["cly", "litZhu", "赵小帅"];

// 列（产生多少列）
const columns = generateColumns(23);
// 产生数据（多少列，多少行）
const data = generateData(columns, engineerList.length);

// 蓝条在哪一列开始显示
const colSpanIndex = 2;
columns[colSpanIndex].colSpan = ({ rowIndex }) => rowIndex;

// 蓝条内文字居中
columns[colSpanIndex].align = "center";

const engineerOrders = [
  {
    id: 0,
    orders: [
      {
        title: "这是一个工单",
        startTime: 2,
        endTime: 3,
      },
      {
        title: "这是一个工单",
        startTime: 5,
        endTime: 6,
      },
      {
        title: "这是一个工单",
        startTime: 9,
        endTime: 9,
      },
    ],
  },
  {
    id: 1,
    orders: [
      {
        title: "这是一个工单",
        startTime: 1,
        endTime: 5,
      },
    ],
  },
  {
    id: 2,
    orders: [
      {
        title: "这是一个工单",
        startTime: 9,
        endTime: 12,
      },
    ],
  },
];

const Row = ({ rowData, rowIndex, cells, columns }) => {
  /*
  rowData（每行的数据）: （每行数据）,id,parentId
  rowIndex（每行的索引值）: （数字：索引值）
  cells: 每行的单个数据：数组
  column（每列的属性）: key,dataKey,title,width
  */

  engineerOrders.forEach((engineers) => {
    engineers.orders.forEach((order) => {
      console.log(order);
    });
  });

  // TODO: 每行的(索引值+1) ????????????????????
  // const colSpan = columns[colSpanIndex].colSpan({ rowData, rowIndex })
  // // 如果每行的（索引值+1）大于1
  // if (colSpan == 0) {// 显示在第一个工程师的行
  //   // 蓝条宽度
  //   let width = Number.parseInt(cells[colSpanIndex].props.style.width) * 4

  //   const style = {
  //     ...cells[colSpanIndex].props.style,
  //     width: `${width}px`,
  //     backgroundColor: 'var(--el-color-primary-light-3)',
  //   }
  //   cells[colSpanIndex] = cloneVNode(cells[colSpanIndex], { style })
  // }

  return cells;
};
</script>

<style lang="scss" scoped>
.table {
  height: calc(100% - 90px);
}
</style>
