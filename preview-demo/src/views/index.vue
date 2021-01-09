<template>
  <div class="index-wrapper">
    <button @click="handleClickAction('keyboard')">软键盘收起复原demo</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClickAction() {
      this.$router.push({ name: "keyboard" });
    }
  }
};
</script>

<style lang="scss">
.index-wrapper {
  padding-top: 40px;
  text-align: center;
}
</style>
