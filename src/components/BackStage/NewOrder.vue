<template>
  <!-- 新建工单背景 -->
  <div class="box">
    <!-- 第一个框架 -->
    <!-- 文件 -->
    <div class="attachments">
      <!-- 第一个框架的表单 -->
      <el-form
        :label-position="attachmentsPosition"
        label-width="50px"
        :model="attachments_input"
        style="max-width: 800px"
      >
        <!-- 标题输入框 -->
        <el-form-item label="标题:">
          <el-input v-model="attachments_input.name" />
        </el-form-item>
        <!-- 描述输入框 -->
        <el-form-item label="描述:">
          <el-input
            type="textarea"
            :rows="5"
            v-model="attachments_input.region"
          />
        </el-form-item>
        <!-- 按钮 -->
        <div class="attachments_upload">
          <el-button type="primary" :icon="Link">添加附件</el-button>
        </div>
      </el-form>
    </div>
    <!-- 第二个框架 -->
    <!-- 客户模板 -->
    <div class="template">
      <!-- 第二个框架的背景 -->
      <div class="template_box">
        <!-- 标题 -->
        <el-text class="template_title">客户模板切换</el-text>
        <!-- 图标 -->
        <el-icon color="lightblue" :size="20" class="template_icon"
          ><Setting
        /></el-icon>
      </div>
      <!-- 第二个框架的内容 -->
      <div class="template_center">
        <!-- 第二个框架的公司名称表单 -->
        <el-form :label-position="templatePosition">
          <el-form-item label="公司名称">
            <!-- 下拉搜索框 -->
            <el-select
              v-model="template_value"
              filterable
              style="width: 400px"
              allow-create
            >
              <el-option
                v-for="item in template_option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <!-- 按钮 -->
            <el-button type="primary" style="margin-left: 10px"
              >添加公司</el-button
            >
          </el-form-item>
          <!-- 第二个框架的姓名表单 -->
          <el-form-item label="姓名">
            <!-- 下拉搜索框 -->
            <el-select
              v-model="template_value2"
              filterable
              style="width: 400px"
              allow-create
            >
              <el-option
                v-for="item in template_option2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <!-- 按钮 -->
            <el-button type="primary" style="margin-left: 10px"
              >新增联系人</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 第三个框架 -->
    <!-- 属性 -->
    <div class="attribute">
      <!-- 第三个框架的背景 -->
      <div class="attribute_box">
        <!-- 标题 -->
        <el-text class="attribute_title">属性</el-text>
      </div>
      <!-- 内容 -->
      <div class="attribute_center">
        <el-form :model="attribute_input">
          <!-- 图标 -->
          <el-icon
            color="lightblue"
            :size="20"
            style="position: absolute; left: 95px; top: 630px"
            ><Location
          /></el-icon>
          <div class="attribute_center_one">
            <el-text>客服姓名</el-text>
            <el-text>我自己</el-text>
          </div>
          <el-input v-model="attribute_input.value1" style="max-width: 400px" />

          <div class="attribute_center_two">
            <el-text>抄送人</el-text>
            <el-text>我自己</el-text>
          </div>
          <el-input v-model="attribute_input.value2" style="max-width: 800px" />
        </el-form>
      </div>
    </div>
    <!-- 第四个框架 -->
    <!-- 售后 -->
    <div class="sales">
      <div class="sales_box">
        <el-text class="sales_title">工单模板：售后设备维修模板</el-text>
      </div>
      <div class="sales_box2">
        <!-- 图标 -->
        <el-icon
          color="lightblue"
          :size="20"
          style="position: relative; left: 15px"
          ><SuitcaseLine
        /></el-icon>
        <el-text class="sales_title2">执行人选择</el-text>
        <el-text style="position: relative; bottom: 5px; left: 1400px"
          >收起</el-text
        >
      </div>
      <!-- 内容 -->
      <div class="sales_center">
        <el-form>
          <!-- Layout布局 -->
          <el-row :gutter="20">
            <el-col :span="8">
              <el-text>工单类型</el-text>
              <el-select
                v-model="sales_value1"
                style="width: 400px; display: block"
              >
                <el-option
                  v-for="item in sales_option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                /> </el-select
            ></el-col>
            <el-col :span="8">
              <el-text>工单优先级</el-text>
              <el-select
                v-model="sales_value2"
                style="width: 400px; display: block"
              >
                <el-option
                  v-for="item in sales_option2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                /> </el-select
            ></el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="add_btn" style="display: flex; justify-content: end">
      <el-button type="primary" size="large">添加</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Setting, Link, Location, SuitcaseLine } from "@element-plus/icons-vue";
//表单排序方向
//第一个框架
const attachmentsPosition = ref("right");
//第二个框架
const templatePosition = ref("top");

//表单数据绑定
//第一个框架
const attachments_input = reactive({
  name: "",
  region: "",
});
//第三个框架
const attribute_input = reactive({
  value1: "",
  value2: "",
});
//第二个框架的下拉框
//公司名称下拉框
const template_value = ref("-");
const template_option = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
//姓名下拉框
const template_value2 = ref("-");
const template_option2 = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
//第三个框架的下拉框
//工单类型的下拉框
const sales_value1 = ref("-");
const sales_option = [
  {
    value: "-",
    label: "-",
  },
  {
    value: "问题",
    label: "问题",
  },
  {
    value: "事物",
    label: "事物",
  },
  {
    value: "故障",
    label: "故障",
  },
  {
    value: "任务",
    label: "任务",
  },
];
//工单优先级的下拉框
const sales_value2 = ref("-");
const sales_option2 = [
  {
    value: "-",
    label: "-",
  },
  {
    value: "低",
    label: "低",
  },
  {
    value: "正常",
    label: "正常",
  },
  {
    value: "高",
    label: "高",
  },
  {
    value: "紧急",
    label: "紧急",
  },
];
</script>
<style scoped lang="scss">
.box {
  width: 100vw;
}
.attachments {
  background-color: white;
  padding: 20px;
  width: 90%;
  margin-bottom: 20px;
}
.attachments_upload {
  position: relative;
  margin-left: 50px;
  margin-bottom: 0;
}
.template_icon {
  padding-left: 5px;
}
.template_box,
.attribute_box,
.sales_box {
  border-bottom: 2px solid #f3f1f6;
}
.template,
.attribute,
.sales {
  background-color: white;
  width: 100%;
  margin-bottom: 20px;
}
.template_title,
.attribute_title,
.sales_title {
  font-weight: bold;
  font-size: 15px;
  padding-left: 20px;
  position: relative;
  bottom: 5px;
}
.template_center {
  padding: 20px;
}
.attribute_center_one {
  width: 400px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.attribute_center_two {
  width: 800px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.attribute_center {
  padding: 0px 20px 40px 20px;
}

.sales_title2 {
  font-weight: bold;
  font-size: 15px;
  padding-left: 20px;
  position: relative;
  bottom: 5px;
}

.sales_box2 {
  border-bottom: 2px solid #f3f1f6;
}
.sales_center {
  padding: 0px 20px 200px 20px;
}
.add_btn {
  width: 92%;
  margin-bottom: 50px;
}
</style>
