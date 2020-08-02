<template>
  <div class="input-radio-box" @click="toggle" @change="change">
    <input type="radio" :checked="isCheck" />
    <div class="z-focus-helper"></div>
  </div>
</template>
<script>
export default {
  props: {
    initChecked: {
      type: Boolean,
    },
  },
  data() {
    return {
      isCheck: this.initChecked,
    };
  },
  methods: {
    toggle() {
      this.isCheck = !this.isCheck;
      this.change(this.isCheck);
    },
    change() {
      this.$emit("change", this.isCheck);
    },
  },
};
</script>
<style lang="scss">
$circle-width: 16px;
$circle-height: 16px;
.input-radio-box {
  input {
    display: none !important;
  }
  input + div {
    width: $circle-width;
    height: $circle-height;
    display: inline-block;
    border: 1px solid #888;
    border-radius: 50%;
    position: relative;
    box-sizing: border-box;
    &::before {
      content: "";
      position: absolute;
      border-top: 0;
      border-left: 0;
      border-bottom: 1px solid #fff;
      border-right: 1px solid #fff;
      transform: rotate(45deg);
      width: 4px;
      height: 6px;
      left: 4.5px;
      top: 3px;
    }
  }
  input:checked + div {
    background: #00bff6;
    border: 1px solid #00bff6;
    transition: all 0.3s ease;
  }
}
</style>
