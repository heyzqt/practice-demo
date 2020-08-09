<template>
  <div>
    <h1>home page</h1>
    <h2>directive，检测表单数据的修改，离开页面时弹窗提醒</h2>

    <div v-if="initDate" v-confirm-data="{ name, age, sex }">
      <div>用户信息表单</div>
      <div>
        <label for="name">姓名：</label>
        <input id="name" type="text" placeholder="请输入姓名" v-model="name" />
      </div>
      <div>
        <label for="age">年龄：</label>
        <input id="age" type="number" placeholder="请输入年龄" v-model="age" />
      </div>
      <div>
        <label for="sex">性别：</label>
        <select id="sex" @change="handleSexChange($event.target.value)">
          <option value="man" :selected="sex == 'man'">男</option>
          <option value="woman" :selected="sex == 'woman'">女</option>
        </select>
      </div>
      <button @click="submit">提交</button>
      <button @click="goPagea">去pagea</button>
    </div>
  </div>
</template>
<script>
import { needConfirm } from "../directives/confirm";
export default {
  data() {
    return {
      name: "",
      age: "",
      sex: "woman",
      initDate: false,
    };
  },
  mounted() {
    this.init();
    this.initDate = true;
  },
  methods: {
    init() {
      localStorage.getItem("name")
        ? (this.name = localStorage.getItem("name"))
        : (this.name = "");
      localStorage.getItem("age")
        ? (this.age = localStorage.getItem("age"))
        : (this.age = "");
      localStorage.getItem("sex")
        ? (this.sex = localStorage.getItem("sex"))
        : (this.sex = "woman");
    },
    submit() {
      alert("save success");
      localStorage.setItem("name", this.name);
      localStorage.setItem("age", this.age);
      localStorage.setItem("sex", this.sex);
    },
    handleSexChange(value) {
      this.sex = value;
    },
    goPagea() {
      if (needConfirm) {
        alert("当前数据未保存，需要先保存数据离开");
        return;
      }
      this.$router.push({ name: "pagea" });
    },
  },
};
</script>
