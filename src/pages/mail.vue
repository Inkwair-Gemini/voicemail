<template>
  <div class="container">
    <div class="main">
      <div class="header">
        <div class="header2">
          <label class="headerlabel">{{ $t("mail.title") }}</label>
        </div>
      </div>
      <div>
        <el-table
          :data="
            mailList.filter(
              (data) =>
                !search ||
                data.sender.toLowerCase().includes(search.toLowerCase())
            )
          "
          height="500"
          style="width: 100%"
          stripe
          @row-click="toDetail"
        >
          <el-table-column :min-width="10"></el-table-column>
          <el-table-column :label="$t('mail.duration')" prop="title" width="90">
          </el-table-column>
          <el-table-column label="">
            <template slot-scope="scope">
              <div>
                <el-slider
                  v-model="scope.row.progress"
                  :show-input="false"
                  :show-tooltip="false"
                  :max="100"
                  @change="handleSliderChange"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="right" width="140">
            <template slot="header" slot-scope="{}">
              <el-input
                class="search"
                v-model="search"
                size="mini"
                :placeholder="$t('mail.search')"
              />
              <i class="el-icon-search" />
            </template>
            <template slot-scope="scope">
              <div class="buttons">
                <el-button
                  class="vediobutton"
                  type="primary"
                  size="mini"
                  @click.stop="handlePlay(scope.$index, scope.row)"
                >
                  <i
                    id="play"
                    :class="
                      isPlaying[scope.$index]
                        ? 'el-icon-video-pause'
                        : 'el-icon-video-play'
                    "
                  />
                </el-button>
                <el-button
                  class="delete"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click.stop="handleDelete(scope.$index, scope.row)"
                />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div id="peak-container">
        <!-- <div id="zoomview-container" ref="zoomview"></div> -->
        <div id="overview-container" ref="overview"></div>
      </div>
      <div id="demo-controls">
        <audio ref="audio" id="audio" controls="controls"></audio>
      </div>
    </div>
  </div>
</template>

<script>
// import Chart from "chart.js";
import axios from "axios";
import Vue from "vue";
import { DatePicker } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import Peaks from "peaks.js";
Vue.use(DatePicker);

export default {
  name: "Mail",
  data() {
    return {
      mailList: [],
      search: "",
      isPlaying: [],
      currentAudio: "",
      currentAudioPosition: 0,
      currentIndex: 0,
      currentRowData: {},
      justChanged: false,
      recorder: "",
      timestamp: new Date().getTime(),
      url: "",
    };
  },
  created() {
    for (let i = 0; i < this.isPlaying.length; i++) {
      this.$set(this.isPlaying, i, false);
    }
    this.fetchDataFromBackend();
    // this.getVoice();
    this.$nextTick(() => {
      const options = {
        zoomview: {
          container: this.$refs.zoomview,
        },
        overview: {
          container: this.$refs.overview,
        },
        // 只需要修改dom就可以展示音频或视频波形图
        mediaElement: this.$refs.audio,
        webAudio: {
          audioContext: new AudioContext(),
        },
        emitCueEvents: true,
        //  //显示轴标签
        showAxisLabels: true,
      };
      Peaks.init(options, (err, peaks) => {
        if (err) {
          console.log("messge " + err);
          return;
        }
        this.peaks = peaks;
      });
    });
  },
  methods: {
    async fetchDataFromBackend() {
      try {
        const requestData = {
          // username: JSON.parse(localStorage.getItem("user")).username,
          username: "lzy",
        };

        const response = await axios.post(
          "http://localhost:5000/user/sendAllVoice",
          requestData
        );
        // console.log("response",response);
        const mailList = response.data.voicemails.map((data) => ({
          progress: 0,
          id: data.id,
          title: data.title,
        }));
        this.mailList = mailList;
      } catch (error) {
        console.error("Data Acquisition Failure:", error);
      }
      console.log("this.mailList", this.mailList);

      const updatedMailList = []; // 用于存储更新后的 mailList

      for (const item of this.mailList) {
        try {
          const response = await axios.get(
            "http://localhost:5000/user/getVoice",
            {
              responseType: "blob",
              params: {
                id: item.id,
              },
            }
          );
          // 创建 URL 对象以获取 Blob 数据的临时链接
          const audioUrl = window.URL.createObjectURL(
            new Blob([response.data])
          );

          item.musicUrl = audioUrl;

          updatedMailList.push(item); // 将更新后的元素添加到数组中
        } catch (error) {
          console.error("获取音频文件失败", error);
          updatedMailList.push(item); // 如果请求失败，将原始元素添加到数组中
        }
      }
      // 更新 mailList
      // console.log("updatedMailList", updatedMailList);

      this.mailList = updatedMailList;
      // console.log("this.mailList", this.mailList);
    },

    handlePlay(index, rowData) {
      console.log(`正在播放第 ${index} 行的数据: `);
      this.$set(this.isPlaying, index, !this.isPlaying[index]);
      //暂停或续播
      if (this.currentAudio && this.currentIndex == index) {
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
        if (progress == 100) {
          this.$set(this.isPlaying, index, false);
          this.currentAudio.currentTime = 0;
        }
      }
      //切歌
      else if (this.currentAudio) {
        if (!this.currentAudio.paused) {
          this.currentAudio.pause();
          console.log("now it is paused.");
        } else {
          console.log("it's already paused.");
        }
        this.$set(this.isPlaying, this.currentIndex, true);
        for (let i = 0; i < this.isPlaying.length; i++) {
          if (i !== index) {
            this.$set(this.isPlaying, i, false);
          }
        }
        let previousRowData = this.currentRowData;
        this.currentIndex = index;
        this.currentRowData = rowData;
        this.currentAudio = null;

        const audio = new Audio(rowData.musicUrl);

        audio.addEventListener("canplay", () => {
          this.$refs.audio.src = rowData.musicUrl;
          audio.play();

          // 监听音频播放进度变化事件
          audio.addEventListener("timeupdate", () => {
            // 计算进度百分比
            let progress = (audio.currentTime / audio.duration) * 100;
            if (progress == 100) {
              this.$set(this.isPlaying, index, false);
              progress = 0;
            }
            this.$set(rowData, "progress", progress);
          });
          // 将当前音频对象保存到数据中
          this.$set(previousRowData, "progress", 0);
          this.currentAudio = audio;
        });
      }
      //打开界面后第一次播放音乐
      else {
        // 否则，创建新的音频对象并播放
        const audio = new Audio(rowData.musicUrl);
        audio.addEventListener("canplay", () => {
          this.$refs.audio.src = rowData.musicUrl;
          audio.play();
          // 监听音频播放进度变化事件
          audio.addEventListener("timeupdate", () => {
            // 计算进度百分比
            let progress = (audio.currentTime / audio.duration) * 100;
            if (progress == 100) {
              this.$set(this.isPlaying, index, false);
              progress = 0;
            }
            this.$set(rowData, "progress", progress);
          });
          // 将当前音频对象保存到数据中
          this.currentAudio = audio;
          this.currentRowData = rowData;
          this.currentIndex = index;
        });
      }
    },

    handleSliderChange(value) {
      if (this.currentAudio) {
        this.currentAudio.currentTime =
          (value / 100) * this.currentAudio.duration;
      }
      this.justChanged = true;
      setTimeout(() => {
        this.justChanged = false;
      }, 1);
    },

    toDetail(row) {
      for (let i = 0; i < this.isPlaying.length; i++) {
        this.$set(this.isPlaying, i, false);
      }
      if (this.justChanged == false) {
        electronAPI.openDetailWindow("detail", this.$store.state.lang, row.id);
        this.currentAudio.pause();
      }
      console.log(row.id);
    },

    zoomable() {
      let container = document.getElementById("zoomview-container");
      let zoomview = this.peaks.views.getView("zoomview");

      if (zoomview) {
        this.peaks.views.destroyZoomview();
        container.style.display = "none";
      } else {
        container.style.display = "block";
        this.peaks.views.createZoomview(container);
      }
    },

    async handleDelete(index, rowData) {
      try {
        console.log(rowData.id);
        await axios.post("http://localhost:5000/user/deleteVoiceByid", {
          id: rowData.id,
        });

        this.mailList.splice(index, 1);

        console.log("Successfully Deleted.");
      } catch (error) {
        console.error("Failed to delete:", error);
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
.search {
  position: relative;
  left: -16px;
  width: 100px;
}
.play {
  position: relative;
  border: none;
  width: 57px;
  height: 28px;
}
.play .anticon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.el-icon-refresh-left {
  font-size: 16px;
}
.el-icon-search {
  position: relative;
  left: -10px;
}
.content {
  position: relative;
  right: -40px;
  width: 400px;
  display: inline-block;
  word-break: break-all;
  white-space: normal;
}
.custom-slider-wrapper .el-slider__button {
  display: none;
}
.custom-large-button {
  font-size: 30px;
  padding: 20px 20px;
}
#zoomview-container {
  height: 100px;
}
#overview-container {
  height: 100px;
}
#audio::-webkit-media-controls {
  display: none;
}

#audio::-webkit-media-controls-play-button {
  display: inline-block;
  width: 20px; /* 根据需要设置按钮的宽度和高度 */
  height: 20px;
  background-color: #000; /* 设置按钮的背景颜色 */
  color: #fff; /* 设置按钮的文本颜色 */
  border: none; /* 移除按钮的边框 */
  cursor: pointer; /* 鼠标指针样式，使按钮看起来可点击 */
}
.buttons {
  position: relative;
  left: -10px;
}
.vediobutton {
  position: relative;
  top: 4px;
  width: 45px;
  height: 27.5px;
  font-size: 20px;
}
.delete {
  position: relative;
  top: -3px;
}
#play {
  position: relative;
  top: -3.5px;
  left: -3px;
}
</style>