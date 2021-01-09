<template>
  <div class="activity-wrapper">
    <div class="activity-box">
      <div class="activity-main">
        <img src="../../assets/advertise_bg.jpg" alt="" />
        <div class="form-box">
          <input
            id="mobileinput"
            ref="mobileinput"
            class="form-input"
            type="text"
            placeholder="enter something"
          />
          <button class="form-button">submit</button>
        </div>
      </div>
      <div class="product-list-box">
        <img src="../../assets/product1.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clientHeight: 0,
      scrollHeight: 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.$utils.isAndroid()) {
        this.adjustAndroidInputPosition();
      } else if (this.$utils.isIOS()) {
        this.adjustIOSInputPosition();
      }
    },
    adjustAndroidInputPosition() {
      this.clientHeight =
        document.documentElement.clientHeight ||
        document.body.clientHeight ||
        screen.height;
      window.addEventListener("resize", () => {
        const resizeHeight =
          document.documentElement.clientHeight ||
          document.body.clientHeight ||
          screen.height;
        if (resizeHeight < this.clientHeight) {
          this.scrollHeight = Math.abs(this.clientHeight - resizeHeight);
          //Android 软键盘弹出，将 input 滚动到可视区域正中的位置
          if (this.$refs.mobileinput) {
            this.$refs.mobileinput.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });
          }
        } else {
          //Android 软键盘收起，将页面复原
          window.scrollBy({
            left: 0,
            top: -this.scrollHeight,
            behavior: "smooth"
          });
        }
        this.clientHeight = resizeHeight;
      });
    },
    adjustIOSInputPosition() {
      this.$refs.mobileinput.addEventListener("focusout", () => {
        // IOS 软键盘收起，将页面复原
        let scrollheight =
          document.documentElement.scrollTop || document.body.scrollTop;
        //使用 jQuery 滚动整个页面
        $("html, body").animate({ scrollTop: -this.scrollHeight }, 500);
      });
    }
  }
};
</script>

<style lang="scss">
.activity-box {
  .activity-main {
    width: 100%;
    position: relative;
    img {
      width: 100%;
      height: auto;
    }
    .form-box {
      text-align: center;
      padding: 0 20px;
      position: absolute;
      bottom: 20px;
      .form-input {
        width: 100%;
        height: 45px;
        padding: 0 20px;
        box-sizing: border-box;
        outline: none;
        border: none;
        border-radius: 4px;
      }
      .form-button {
        width: 200px;
        margin-top: 20px;
        height: 40px;
        border-radius: 5px;
        outline: none;
        border: none;
        padding: 0;
        background-color: #fff;
        font-size: 18px;
      }
    }
  }
  .product-list-box {
    img {
      width: 100%;
    }
  }
}
</style>
