<template>
  <div class="main">
    <audio id="audio" controls :src="audiourl"></audio>
    <div class="show-circle" @click="showCircle">
      显示悬浮球
    </div>
    <float-circle
      title="这是一首我想听的歌曲歌词是什么"
      :isPlay="isPlay"
      :audio="currentAudio"
      :duration="duration"
      :isHidden="isHidden"
      @toggleCircle="toggleCircle"
      @togglePlayState="togglePlayState"
    ></float-circle>
    <!-- :currentTime="currentTime" 不建议这里传入currentTime，因为Vue响应式更新，data中的currentTime一直在更新，会使这个页面重新渲染，最好把currentTime放在float-circle组件里面更新-->
  </div>
</template>
<script>
import leftpad from "leftpad";
export default {
  data() {
    return {
      isHidden: true,
      duration: "",
      isPlay: false,
      currentAudio: null,
      audiourl: require("@/assets/music.mp3")
    };
  },
  mounted() {
    let audio = document.getElementById("audio");
    this.currentAudio = audio;
    audio.addEventListener("canplay", () => {
      //初始化音乐播放时间
      this.duration = this.formatTime(audio.duration);
    });
    audio.addEventListener("timeupdate", () => {
      //更新时间
      this.currentTime = this.formatTime(audio.currentTime);
    });
    audio.addEventListener("playing", () => {
      this.isPlay = true;
    });
    audio.addEventListener("pause", () => {
      this.isPlay = false;
      console.log("pause = ", audio.paused);
    });
    audio.addEventListener("waiting", () => {
      console.log("waiting paused = ", audio.paused);
    });
  },
  methods: {
    showCircle() {
      this.isHidden = !this.isHidden;
    },
    toggleCircle(value) {
      this.isHidden = value;
    },
    togglePlayState() {
      let audio = document.getElementById("audio");
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    formatTime(time) {
      let result = time + "";
      let minuate = parseInt(time / 60) + "";
      if (minuate.length <= 1) {
        result = leftpad(minuate, 2, "0");
      } else {
        result = minuate;
      }

      let second = parseInt(time % 60) + "";
      if (second.length <= 1) {
        result = result + ":" + leftpad(second, 2, "0");
      } else {
        result = result + ":" + second;
      }
      return result;
    }
  }
};
</script>
<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  background-color: #fffbf5;
}
.show-circle {
  width: 30vw;
  height: 20vw;
  background-color: red;
}
</style>
