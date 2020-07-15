<template>
  <div class="main">
    <audio id="audio" controls :src="audiourl"></audio>
    <div @click="showCircle" style="height: 100px; background-color: red;">
      显示float circle
    </div>
    <float-circle
      title="这是一首我想听的歌曲歌词是什么"
      :isPlay="isPlay"
      :currentTime="currentTime"
      :duration="duration"
      :isHidden="isHidden"
      @toggleCircle="toggleCircle"
      @togglePlayState="togglePlayState"
    ></float-circle>
  </div>
</template>
<script>
import leftpad from "leftpad";
export default {
  data() {
    return {
      isHidden: true,
      currentTime: "",
      duration: "",
      isPlay: false,
      audiourl:
        "http://cdnizy.knowgroup.cn/upload/audios/201906/093i4CV1561522122rsc4pOC8.mp3"
    };
  },
  mounted() {
    let audio = document.getElementById("audio");
    audio.addEventListener("canplay", () => {
      this.duration = this.formatTime(audio.duration);
    });
    audio.addEventListener("timeupdate", () => {
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
</style>
