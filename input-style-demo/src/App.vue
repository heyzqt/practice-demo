<template>
  <div id="app">
    <h1>表单元素自定义样式</h1>
    <h2>方法一：利用label元素的for属性，绑定表单数据</h2>
    <t-label></t-label>

    <h2>方法二：利用css样式和div的点击事件来控制input样式</h2>
    <t-label1 :initChecked="true" @change="change"></t-label1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCheck: true,
    };
  },
  methods: {

  },
};
</script>
<style lang="scss"></style>
