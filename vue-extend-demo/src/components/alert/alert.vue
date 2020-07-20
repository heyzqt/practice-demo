<template>
  <div class="alert-wrapper" v-show="visible" @click="close">
    <div class="alert-box">
      <div class="alert-header">弹窗标题</div>
      <div class="alert-main" v-if="msg">{{ msg }}</div>
      <div class="alert-footer"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: true,
      msg: ""
    };
  },
  watch: {
    visible(newVal) {
      if (!newVal) {
        this.destroyElement();
      }
    }
  },
  methods: {
    close() {
      this.visible = false;
    },
    destroyElement() {
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el); //parentNode是w3c的标准，parentElement只有ie支持，parentNode可以替代parentElement所有功能
    }
  }
};
</script>
<style scoped>
.alert-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(55, 55, 55, 0.6);
}
.alert-box {
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  display: inline-block;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.alert-header {
  line-height: 40px;
  text-align: center;
}
</style>
