<template>
  <div class="input-checkbox-box">
    <input type="checkbox" id="input1" />
    <label for="input1"></label>
    <!-- label是行内标签 -->
  </div>
</template>
<style lang="scss">
$circle-width: 16px;
$circle-height: 16px;
.input-checkbox-box {
  input {
    display: none !important;
  }
  input + label {
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
  input:checked + label {
    background: #00bff6;
    border: 1px solid #00bff6;
    transition: all 0.3s ease;
  }
}
</style>
