<template>
  <div class="table">
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2 fixed :columns="columns" :data="data" :width="width" :height="height">
          <template #row="props">
            <Row v-bind="props" />
          </template>
        </el-table-v2>
      </template>
    </el-auto-resizer>
  </div>
  <!-- <el-table-v2 fixed :columns="columns" :data="data" :width="700" :height="400">
    <template #row="props">
      <Row v-bind="props" />
    </template>
  </el-table-v2> -->
</template>

<script lang="ts" setup>
import { cloneVNode } from 'vue'

// 工程师列表
const engineerList = ['cly', 'litZhu', '赵小帅']

const generateColumns = (length = 10, prefix = '号', props?: any) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${columnIndex}`,
    dataKey: `${columnIndex}`,
    title: `${columnIndex}${prefix}`,
    width: 60,
  }))

const generateData = (
  columns: ReturnType<typeof generateColumns>,
  length = 200,
  prefix = '工程师'
) =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        if (column.dataKey == '0') {  // 如果column的dataKey为0号，将其换成工程师名字
          rowData[column.dataKey] = engineerList[rowIndex];
        } else {  // 其他日期不变     
          rowData[column.dataKey] = ''
        }
        return rowData
      },
      {
        id: `${prefix} - ${rowIndex}`,
        parentId: null,
      }
    )
  })

const columns = generateColumns(23)
const data = generateData(columns, engineerList.length)

const colSpanIndex = 2
columns[colSpanIndex].colSpan = ({ rowIndex }) => (rowIndex)
columns[colSpanIndex].align = 'center'
const Row = ({ rowData, rowIndex, cells, columns }) => {
  console.log(rowIndex)
  let width = Number.parseInt(cells[colSpanIndex].props.style.width) * 2

  const style = {
    ...cells[colSpanIndex].props.style,
    width: `${width}px`,
    backgroundColor: 'var(--el-color-primary-light-3)',
  }
  cells[colSpanIndex] = cloneVNode(cells[colSpanIndex], { style })


  return cells
}
</script>

<style lang="scss" scoped>
.table {
  height: calc(100% - 90px);
}
</style>