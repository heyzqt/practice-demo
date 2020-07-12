<template>
  <div>
    <audio
      id="audio"
      controls
      type="audio/mpeg"
      src="http://music.163.com/song/media/outer/url?id=481853043.mp3"
    >
      您的浏览器暂不支持音频播放
    </audio>
    <div id="duration">audio duration: {{ formatTime(duration) }}</div>
    <div id="currentTime">currentTime: {{ formatTime(currentTime) }}</div>
    <div id="">快进15秒</div>
    <div>audio slider</div>
    <div class="audio-slider-container">
      <input
        id="slider"
        type="range"
        min="1"
        max="100"
        value="0"
        class="slider"
        @change="sliderChanged"
        @input="sliderChanging"
      />
    </div>
  </div>
</template>

<script>
import leftpad from "left-pad";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      currentTime: 0,
      duration: 0,
      sliderchanging: false
    };
  },
  mounted() {
    let audio = document.getElementById("audio");

    audio.addEventListener("play", () => {
      //audio从暂停到播放状态改变时会触发play事件
      console.log("play");
      console.log("ended audio ended = ", audio.ended);
    });

    audio.addEventListener("playing", () => {
      //audio从暂停到播放，或者缺少数据被迫暂停，再次恢复播放时，会触发playing事件
      console.log("playing");
    });

    audio.addEventListener("waiting", () => {
      //audio在缺少数据加载的时候会触发waiting事件
      //使用场景：需要loading状态时使用
      console.log("waiting");
    });

    audio.addEventListener("ended", () => {
      //audio结束播放时触发该该事件
      //使用场景，音频播放结束处理播放器的显示状态
      console.log("ended audio ended = ", audio.ended);
    });

    audio.addEventListener("timeupdate", () => {
      //currentTime更新时触发该函数，currentTime返回的是秒数
      //使用场景：更新播放时间
      if (!this.sliderchanging) {
        this.currentTime = audio.currentTime;
      }
      console.log('timeupdate');
      // console.log("audio currentTime = ", audio.currentTime);
      this.updateSlider();
    });

    audio.addEventListener("canplay", () => {
      console.log("canplay duration = ", audio.duration);
      //音频初始化完成时，会调用1次canplay，此时可以初始化duration
      this.duration = audio.duration;
    });
  },
  computed: {
    formatCurrentTime() {
      let time = "";
      let minuate = parseInt(this.currentTime / 60) + "";
      if (minuate.length <= 1) {
        time = leftpad(minuate, 2, "0");
      } else {
        time = minuate;
      }

      let second = parseInt(this.currentTime % 60) + "";
      if (second.length <= 1) {
        time = time + ":" + leftpad(second, 2, "0");
      } else {
        time = time + ":" + second;
      }
      return time;
    }
  },
  methods: {
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
    },
    sliderChanged(e) {
      console.log('sliderChanged value = ', e.target.value);
      
      if (isNaN(this.duration)) {
        this.duration = 0;
      } else {
        let audio = document.getElementById("audio");
        console.log('e.target.value% * duration = ', e.target.value / 100 * this.duration)
        audio.currentTime = e.target.value / 100 * this.duration;
      }
      this.sliderchanging = false;
    },
    sliderChanging(e) {
      this.sliderchanging = true;
      let slider = document.getElementById('slider');
      slider.style.backgroundSize = e.target.value + "% 100%";
      this.currentTime = this.duration * e.target.value / 100
    },
    updateSlider() {
      let slider = document.getElementById('slider');
      slider.value = parseInt(this.currentTime / this.duration * 100)
      slider.style.backgroundSize = parseInt(this.currentTime / this.duration * 100) + "% 100%";
    }
  }
};
</script>

<style lang="scss" scoped>
.audio-slider-container {
  width: 200px;
  margin: 0 auto;
  position: relative;
}

.slider {
  width: 100%;
  height: 4px;
  // background-color: #d3d3d3;
  outline: none;
  -webkit-appearance: none; /* 去掉input默认的slider-horizontal样式 */
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  border-radius: 10px;
  position: relative;
  background: #e6e6e5 linear-gradient(to right, #f5c057, #f5c057) no-repeat;
  background-size: 0% 100%;
  &:hover {
    opacity: 1;
  }
}

.slider::-webkit-slider-thumb {
  width: 14px;
  height: 14px;
  background-color: olivedrab;
  cursor: pointer;
  -webkit-appearance: none;
  border-radius: 50%;
  position: relative;
}

//设置滚动条的颜色
.slider::-webkit-slider-runnable-track {
  // background-color: #ff0000;
  // border-radius: 10px;
  // height: 8px;
  // pointer-events: none;
  // background:linear-gradient(to right, #1ab1e2);
}

/* .slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: #4caf50;
  cursor: pointer;
}

//兼容Firefox
.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #4caf50;
  cursor: pointer;
} 

//兼容IE
.slider::-ms-thumb {  
        border: 3px solid #fff;
        height: 7px;
        width: 7px;
        border-radius: 8px;
        background: #1ba1e2;
        cursor: pointer;
    }

*/
</style>
