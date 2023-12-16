<template>
  <div class="container">
    <div class="main">
      <div class="header">
        <div class="header2">
          <label class="headerlabel">详情</label>
        </div>
        <div class="title">
          <label class="headerlabel">{{ title }}</label>
        </div>
      </div>
      <audio ref="audio" style="width: 100px"></audio>
      <template>
        <div class="custom-slider-wrapper">
          <el-slider
            v-model="progress"
            :show-input="false"
            class="custom-slider"
            :show-tooltip="false"
            :max="100"
            @change="handleSliderChange"
          ></el-slider>
        </div>
      </template>
      <template>
        <div class="custom-button-wrapper">
          <el-button class="play custom-large-button" @click="fastBackward()">
            <a-icon type="backward" />
          </el-button>
          <el-button class="play custom-large-button" @click="handlePlay()">
            <a-icon type="caret-right" />
          </el-button>
          <el-button class="play custom-large-button" @click="fastForward()">
            <a-icon type="forward" />
          </el-button>
        </div>
        <hr class="divider" />
      </template>
      <!-- <el-input class="input" :rows="10" v-model="text"></el-input> -->
      <div class="text">{{ text }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import { DatePicker } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(DatePicker);

export default {
  data() {
    return {
      title: "温家宝谈政治体制改革",
      text: "而且，要进行政治体制改革，特别是党和国家领导制度的改革。现在，改革到了攻坚阶段。没有政治体制改革的成功，经济体制改革不可能进行到底。已经取得的成果还有可能得而复失，社会上新产生的问题也不能从根本上得到解决。文化大革命，这样历史的悲剧，还有可能重新发生。",
      progress: 0,
      music: "",
      //   musicUrl: require(this.music + ".mp3"),
      musicUrl: require("@/assets/music/PoliticalReform.mp3"),
      currentAudio: null,
      currentAudioPosition: 0,
      currentIndex: null,
      currentRowData: null,
    };
  },
  mounted() {
    this.fetchDataFromBackend();
  },

  methods: {
    async fetchDataFromBackend() {
      try {
        const response = await axios.get("localhost:8080/");
        const responseData = response.data;
        this.title = responseData.title;
        this.text = responseData.text;
        this.music = responseData.music;
      } catch (error) {
        console.error("Data Acquisition Failure:", error);
      }
    },
    handlePlay() {
      if (this.currentAudio) {
        if (this.currentAudio.paused) {
          // 如果音频已经暂停，从存储的位置继续播放
          this.currentAudio.currentTime = this.currentAudioPosition;
          this.currentAudio.play();
        } else {
          // 如果音频正在播放，暂停它并存储当前播放位置
          this.currentAudio.pause();
          this.currentAudioPosition = this.currentAudio.currentTime;
        }
        let progress =
          (this.currentAudio.currentTime / this.currentAudio.duration) * 100;
        console.log(progress);
        if (progress == 100) {
          this.currentAudio.currentTime = 0;
        }
      } else {
        // 否则，创建新的音频对象并播放
        const audio = new Audio(this.musicUrl);
        console.log("1111111");
        audio.addEventListener("canplay", () => {
          this.$refs.audio.src = this.musicUrl;
          audio.play();
          console.log("1111111");
          // 监听音频播放进度变化事件
          audio.addEventListener("timeupdate", () => {
            // 计算进度百分比
            let progress = (audio.currentTime / audio.duration) * 100;
            console.log(progress);
            // 更新数据对象中的进度
            if (progress == 100) {
              progress = 0;
            }
            this.progress = progress;
          });
          // 将当前音频对象保存到数据中
          this.currentAudio = audio;
        });
      }
    },
    handleSliderChange(value) {
      if (this.currentAudio) {
        this.currentAudio.currentTime =
          (value / 100) * this.currentAudio.duration;
      }
    },
    fastForward() {
      if (this.currentAudio) {
        this.currentAudio.currentTime += 5;
      }
    },
    fastBackward() {
      if (this.currentAudio) {
        this.currentAudio.currentTime -= 5;
      }
    },
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #b4bac3;
}
.main {
  width: 500px;
  height: 700px;
  border-radius: 2px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
}
.header {
  width: 500px;
  height: 60px;
}
.header2 {
  position: relative;
  top: 7px;
  left: 13px;
}
.title {
  position: relative;
  top: 36px;
  left: 25px;
  font-size: 20px;
  color: black;
}

.play {
  position: relative;
  border: none;
  height: 25px;
  margin-right: 20px;
  margin-left: 20px;
}
.play .anticon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.custom-large-button {
  font-size: 36px;
  padding: 20px 20px;
}
.content {
  position: relative;
  right: -40px;
  width: 400px;
  display: inline-block;
  word-break: break-all;
  white-space: normal;
}

.custom-slider-wrapper {
  margin-top: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  flex-direction: column;
}

.custom-slider {
  width: 300px;
}

.el-slider__button {
  display: none !important;
}
.custom-button-wrapper {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.divider {
  border: 1px solid #ccc;
  margin-top: 20px;
  margin-left: 40px;
  margin-right: 40px;
}
.input {
  padding-left: 45px;
  padding-right: 45px;
  white-space: normal;
  word-break: break-all;
}
.text{
    margin-left: 50px;
    margin-right: 50px;
    font-size: 16px;
    color: black;
    line-height: 2;
}
</style>