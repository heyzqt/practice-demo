<template>
  <div id="app">
    hello world
    <div @click="showDialog">全区提醒弹窗</div>
  </div>
</template>

<script>
import alert from './components/alert';
export default {
  components: {
    alert
  },
  methods: {
    showDialog() {
      this.$alert({ show: true, msg: "恭喜弹窗弹出" });
    }
  }
};
</script>

<style></style>
