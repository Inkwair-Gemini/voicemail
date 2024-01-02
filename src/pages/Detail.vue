<template>
  <div class="container">
    <div class="main">
      <div class="header">
        <div class="header2">
          <label class="headerlabel">{{ $t("detail.title") }}</label>
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
          <el-button
            class="play custom-large-button primary-button-style"
            type="primary"
            @click="fastBackward()"
          >
            <a-icon type="backward" />
          </el-button>
          <el-button
            class="play custom-large-button primary-button-style"
            type="primary"
            @click="handlePlay()"
          >
            <a-icon :type="isPlaying ? 'pause' : 'caret-right'" />
          </el-button>
          <el-button
            class="play custom-large-button primary-button-style"
            type="primary"
            @click="fastForward()"
          >
            <a-icon type="forward" />
          </el-button>
        </div>
        <hr class="divider" />
      </template>
      <template>
        <div class="text">
          {{ displayedText }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Detail",
  data() {
    return {
      title: "",
      text: "",
      progress: 0,
      displayedText: "",
      music: "",
      //   musicUrl: require(this.music + ".mp3"),
      musicUrl: require("@/assets/music/School_Song_of_ZJUT.mp3"),
      currentAudio: null,
      currentAudioPosition: 0,
      currentIndex: 0,
      isPlaying: false,
      timestamp: null,
      id: 1,
    };
  },
  created() {
    this.fetchDataFromBackend();
    this.startTyping();
    electronAPI.receive("open-detail-window", (event, route, id) => {
      console.log("Received Route:", route);
      this.id = id;
    });
  },

  methods: {
    async fetchDataFromBackend() {
      try {
        const requestData = {
          id: this.id,
        };

        const response = await axios.post(
          "http://localhost:5000/user/getDetail",
          requestData
        );
        this.text = response.data.voicemails[0].text;
        this.title = response.data.voicemails[0].title;
        console.log("text:", this.text);
        console.log("title:", this.title);
      } catch (error) {
        console.error("Data Acquisition Failure:", error);
      }

      const response = await axios.get("http://localhost:5000/user/getVoice", {
        responseType: "blob",
        params: {
          id: this.id,
        },
      });
      // 创建 URL 对象以获取 Blob 数据的临时链接
      const audioUrl = window.URL.createObjectURL(new Blob([response.data]));

      this.musicUrl = audioUrl;
    },
    startTyping() {
      this.displayedText = "";
      this.intervalId = setInterval(() => {
        if (this.currentIndex < this.text.length) {
          this.displayedText += this.text[this.currentIndex];
          this.currentIndex++;
        } else {
          clearInterval(this.intervalId); // 停止计时器
        }
      }, 100); // 每100毫秒显示一个字符，可以根据需要调整速度
    },
    handlePlay() {
      this.isPlaying = !this.isPlaying;
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
  mounted() {
    electronAPI.receive("changeLang", (lang) => {
      this.$i18n.locale = lang; // 设置 i18n 的当前语言
      this.$store.dispatch("setLang", lang); // 触发 Vuex action 更新语言状态
      console.log(this.$store.state.lang);
    });
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 使容器铺满整个视口高度 */
  color: #b4bac3;
}
.main {
  width: 500px;
  min-width: 500px;
  min-height: 700px;
  height: 700px;
  border-radius: 2px; /* 设置圆角边框 */
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5); /* 添加阴影效果 */
  overflow: hidden;
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
.text {
  margin-left: 50px;
  margin-right: 50px;
  font-size: 16px;
  color: black;
  line-height: 2;
}
.primary-button-style {
  background: white; /* 将默认背景颜色改为白色 */
  color: #646466; /* 文本颜色，这里使用了原先的蓝色 */
  border-color: #2979ff;
}

.primary-button-style:hover {
  background: #edf3ff; /* 鼠标悬停时的背景颜色 */
  color: #3e95ff;
}
</style>