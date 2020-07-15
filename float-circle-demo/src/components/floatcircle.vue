<template>
  <div :class="{ hidden: isHidden }">
    <div
      class="circle-box"
      :class="{
        opened: showCircleContent,
        animation: isAnimated
      }"
      ref="circle"
    >
      <div class="content" v-if="showCircleContent">
        <div
          class="status"
          :style="{
            backgroundImage: 'url(' + (isPlay ? playIcon : pauseIcon) + ')'
          }"
          @click="togglePlayState"
        ></div>
        <div class="info">
          <div class="title">{{ title || "暂无歌名" }}</div>
          <div class="time" v-if="currentTime && duration">
            {{ currentTime }}/{{ duration }}
          </div>
        </div>
        <div class="close">
          <span @click="closeCircle">×</span>
        </div>
      </div>
      <div
        class="circle"
        v-if="!showCircleContent"
        @click="handleClickCircle"
        @touchend="handleTouchEnd"
        @touchmove.prevent="handleTouchMove"
      >
        <!-- touchend和touchstart不能添加prevent，添加后无法触发click事件 -->
        <div
          class="icon"
          :style="{
            backgroundImage: 'url(' + (isPlay ? playIcon : pauseIcon) + ')'
          }"
        ></div>
      </div>
    </div>
    <div
      class="mask"
      :class="{ isOpen: showCircleContent }"
      @click="handleHideCircle"
    ></div>
  </div>
</template>

<script>
export default {
  name: "floatcircle",
  props: {
    isHidden: {
      type: Boolean,
      default: true
    },
    title: {
      type: String
    },
    currentTime: {
      type: String
    },
    duration: {
      type: String
    },
    isPlay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      circleWidth: 0,
      circleHeight: 0,
      clientWidth: 0, //屏幕宽度
      clientHeight: 0, //屏幕高度
      placeholderWidth: 10,
      placeholderBottom: 100,
      showCircleContent: false,
      isAnimated: false,
      playIcon: require("@/assets/icon-sound-white-play.gif"),
      pauseIcon: require("@/assets/icon-sound-white-pause.png")
    };
  },
  watch: {
    isHidden(newVal, oldVal) {
      if (!newVal && this.circleWidth === 0) {
        this.initCircle();
      }
    }
  },
  mounted() {
    //记录屏幕的宽度和高度
    this.clientWidth = document.documentElement.clientWidth;
    this.clientHeight = document.documentElement.clientHeight;
    this.initCircle();
  },
  methods: {
    initCircle() {
      this.$nextTick(() => {
        this.circleWidth = this.$refs.circle.clientWidth;
        this.circleHeight = this.$refs.circle.clientHeight;
        //初始化小球的位置在右侧居中的位置
        this.$refs.circle.style.left =
          document.documentElement.clientWidth - this.circleWidth + "px";
        this.$refs.circle.style.top =
          document.documentElement.clientHeight / 2 -
          this.circleHeight / 2 +
          "px";
        this.$refs.circle.style.borderRadius = "50% 0 0 50%";
      });
    },
    handleHideCircle() {
      let extendedWidth = 150;
      if (this.showCircleContent) {
        if (this.$refs.circle.style.left !== "0px") {
          //在屏幕右边
          this.$refs.circle.style.left =
            parseInt(this.$refs.circle.style.left.replace("px", "")) +
            (extendedWidth - this.circleWidth) +
            "px";
        }
      }
      this.showCircleContent = false;
    },
    handleClickCircle() {
      let extendedWidth = 150;
      if (!this.showCircleContent) {
        if (this.$refs.circle.style.left === "0px") {
          this.$refs.circle.style.borderRadius = "0 100px 100px 0";
        } else {
          //在屏幕右边
          this.$refs.circle.style.left =
            parseInt(this.$refs.circle.style.left.replace("px", "")) -
            (extendedWidth - this.circleWidth) +
            "px";
          this.$refs.circle.style.borderRadius = "100px 0 0 100px";
        }
      }
      this.showCircleContent = true;
    },
    //限制悬浮球一个范围内滑动
    handleTouchMove(e) {
      this.isAnimated = false;
      this.$refs.circle.style.borderRadius = "50%";
      let offsetX = e.targetTouches[0].clientX - this.circleWidth / 2; //减去this.circleWidth / 2目的是让手指按在悬浮球正中
      let offsetY = e.targetTouches[0].clientY - this.circleHeight / 2; //减去this.circleHeight / 2目的是让手指按在悬浮球正中
      if (offsetX <= 0 + this.placeholderWidth) {
        offsetX = 0 + this.placeholderWidth;
      } else if (
        offsetX >=
        document.documentElement.clientWidth -
          this.circleWidth -
          this.placeholderWidth //微信悬浮球不是完全贴边，离屏幕边缘有一段距离
      ) {
        offsetX =
          document.documentElement.clientWidth -
          this.circleWidth -
          this.placeholderWidth;
      }

      if (offsetY <= 0 + this.placeholderWidth) {
        offsetY = 0 + this.placeholderWidth;
      } else if (
        offsetY >=
        document.documentElement.clientHeight -
          this.circleHeight -
          this.placeholderWidth
      ) {
        offsetY =
          document.documentElement.clientHeight -
          this.circleHeight -
          this.placeholderWidth;
      }
      this.$refs.circle.style.left = offsetX + "px";
      this.$refs.circle.style.top = offsetY + "px";
    },
    //touchend的时候，悬浮球吸边显示
    handleTouchEnd(e) {
      this.isAnimated = true;
      let circleCenterX =
        parseInt(this.$refs.circle.style.left.replace("px", "")) +
        this.circleWidth / 2; //悬浮球中心的x坐标
      let circleCenterY =
        parseInt(this.$refs.circle.style.top.replace("px", "")) +
        this.circleHeight / 2; //悬浮球中心的y坐标

      if (circleCenterX < this.clientWidth / 2) {
        //吸附左侧
        this.$refs.circle.style.left = 0;
        this.$refs.circle.style.borderRadius = "0 50% 50% 0";
      } else {
        //吸附在右侧
        this.$refs.circle.style.left =
          this.clientWidth - this.circleWidth + "px";
        this.$refs.circle.style.borderRadius = "50% 0 0 50%";
      }

      if (circleCenterY >= this.clientHeight - this.placeholderBottom) {
        this.$refs.circle.style.top =
          this.clientHeight - this.placeholderBottom + "px";
      }
    },
    togglePlayState() {
      this.$emit("togglePlayState");
    },
    closeCircle() {
      this.handleHideCircle();
      this.$emit("togglePlayState");
      this.$emit("toggleCircle", true);
    }
  }
};
</script>

<style lang="scss">
$extendedWidth: 150px;
$circleWidth: 46px;
$circleHeight: 46px;
$soundWidth: 36px;
$soundHeight: 36px;

.hidden {
  display: none;
}

.mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: pink;
  display: none;

  &.isOpen {
    display: block;
  }
}
.circle-box {
  position: relative;
  width: $circleWidth;
  height: $circleHeight;
  position: fixed;
  z-index: 9999;
  border-radius: 50%;
  background-color: olivedrab;
  overflow: hidden;
  // background-color: hsla(0,0%,100%,.9);
  -webkit-tap-highlight-color: transparent; //ios长按的高亮灰色设置为透明
  -webkit-touch-callout: none; //ios禁止显示系统默认菜单
  -webkit-user-select: none; //ios控制文本是否默认选中
  user-select: none;
  img {
    -webkit-touch-callout: none; //ios禁止显示系统默认菜单
    // pointer-events: none; //禁止长按图片保存，同时禁止img的所有点击事件
  }

  &.opened {
    width: $extendedWidth;
  }

  &.animation {
    transition: all 0.3s;
  }

  .content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;

    .status {
      width: 30px;
      height: 30px;
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translate(0%, -50%);
      background-color: blue;
      background-size: contain;
      background-repeat: no-repeat;
    }
    .info {
      flex: 1;
      width: 70px;
      height: 100%;
      padding-left: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #4c4948;
      font-size: 10px;
      .title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .time {
        color: #7b7b7b;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .close {
      flex-shrink: 0;
      width: 30px;
      color: #fff;
      background-color: red;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.circle {
  width: 100%;
  height: 100%;
  .icon {
    width: $circleWidth;
    height: $circleHeight;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-size: $soundWidth $soundHeight;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
