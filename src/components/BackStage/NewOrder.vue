<template>
  <!-- 第一个框架 -->
  <div class="box">
    <div class="one">
      <el-form
        label-position="right"
        label-width="50px"
        :model="formLabelAlign"
        style="max-width: 800px"
      >
        <el-form-item label="标题:">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="描述:">
          <el-input type="textarea" :rows="5" v-model="formLabelAlign.region" />
        </el-form-item>
        <div class="one_upload">
          <el-button type="primary" :icon="Link">添加附件</el-button>
        </div>
      </el-form>
    </div>
    <!-- 第二个框架 -->
    <div class="two">
      <div class="two_box">
        <span class="two_title">客户模板切换</span
        ><el-icon color="lightblue" :size="20" class="two_icon"
          ><Setting
        /></el-icon>
      </div>
      <div class="two_center">
        <el-form :label-position="labelPosition2" :model="formLabelAlign">
          <el-form-item label="公司名称">
            <el-select
              v-model="formLabelAlign2.region"
              placeholder="-"
              style="width: 400px"
            >
              <el-option label=" 朱忠浩的公司 " value="朱忠浩的公司" />
              <el-option label=" 滑辰的公司 " value="滑辰的公司" />
              <el-option label=" 赵峙宇的公司 " value="赵峙宇的公司" />
            </el-select>
            <el-button type="primary" style="margin-left: 10px"
              >添加公司</el-button
            >
          </el-form-item>
          <el-form-item label="姓名">
            <el-select
              v-model="formLabelAlign2.region2"
              placeholder="-"
              style="width: 400px"
            >
              <el-option label="朱忠浩" value="朱忠浩" />
              <el-option label="滑辰" value="滑辰" />
              <el-option label="赵峙宇" value="赵峙宇" />
            </el-select>
            <el-button type="primary" style="margin-left: 10px"
              >新增联系人</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 第三个框架 -->
    <div class="two">
      <div class="two_box">
        <span class="two_title">属性</span>
      </div>
      <div class="two_center">
        <el-form
          :label-position="labelPosition2"
          :model="formLabelAlign"
          label-width="50px"
          style="max-width: 800px"
        >
          <el-icon color="royalblue" class="three_icon"><Location /></el-icon>
          <div>
            <span style="float: right">我自己</span>
            <el-form-item label="客服姓名">
              <el-input
                v-model="formLabelAlign.name"
                style="max-width: 400px"
              />
            </el-form-item>
          </div>
          <el-form-item label="抄送人">
            <span>我自己</span>
            <el-input v-model="formLabelAlign.name" />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Setting } from "@element-plus/icons-vue";
import { Link } from "@element-plus/icons-vue";
import { Location } from "@element-plus/icons-vue";
const labelPosition = ref("right");
const labelPosition2 = ref("top");
const formLabelAlign = reactive({
  name: "",
  region: "",
});
const formLabelAlign2 = reactive({
  region: "",
  region2: "",
});
</script>
<style scoped lang="scss">
.box {
  width: 100vw;
}
.one {
  background-color: white;
  padding: 20px;
  width: 100%;
  margin-bottom: 20px;
}
.one_upload {
  position: relative;
  margin-left: 50px;
  margin-bottom: 0;
}
.two_icon {
  padding-left: 5px;
}
.two_box {
  border-bottom: 2px solid #f3f1f6;
}
.two {
  background-color: white;
  width: 100%;
  margin-bottom: 20px;
}
.two_title {
  font-weight: bold;
  font-size: 15px;
  padding-left: 20px;
  position: relative;
  bottom: 5px;
}
.two_center {
  padding: 20px;
}
.three_icon {
  padding-left: 10px;
  padding-bottom: 10px;
}
</style>
