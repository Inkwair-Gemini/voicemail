<template>
  <div class="container">
    <div class="main">
      <div class="header">
        <div class="header2">
          <label class="headerlabel">信箱</label>
        </div>
      </div>
      <el-table
        :data="
          mailList.filter(
            (data) =>
              !search ||
              data.sender.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <audio ref="audio" style="width: 100px"></audio>

        <el-table-column :min-width="10"></el-table-column>
        <el-table-column
          label="发件人"
          prop="sender"
          width="80"
        ></el-table-column>
        <el-table-column label="">
          <template slot-scope="scope">
            <!-- 使用 el-slider 作为可拖动的进度条，隐藏指示器 -->
            <div class="custom-slider-wrapper">
              <el-slider
                v-model="scope.row.progress"
                :show-input="false"
                :show-tooltip="false"
                :max="100"
                @change="handleSliderChange"
              ></el-slider>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="right" width="150">
          <template slot="header" slot-scope="{}">
            <el-input
              class="search"
              v-model="search"
              size="mini"
              placeholder="关键字搜索 . ."
            />
            <i class="el-icon-search" />
          </template>
          <template slot-scope="scope">
            <el-button
              class="play custom-large-button"
              @click="handlePlay(scope.$index, scope.row)"
            >
              <a-icon
                :type="isPlaying[scope.$index] ? 'pause' : 'caret-right'"
              />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// import Chart from "chart.js";
import axios from "axios";

export default {
  name: "Mail",
  data() {
    return {
      title: "最近删除",
      mailList: [
        {
          id: 1,
          progress: "50",
          sender: "Zhang",
          musicUrl: require("@/assets/music/test.mp3"),
        },
        {
          id: 2,
          progress: "0",
          sender: "Li",
          musicUrl: require("@/assets/music/test.mp3"),
        },
        {
          id: 3,
          progress: "0",
          sender: "Wang",
          musicUrl: require("@/assets/music/test.mp3"),
        },
      ],
      tableHeaderAlign: "right",
      search: "",
      isPlaying: [],
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
        const backendMailList = response.data;

        this.mailList = backendMailList;
      } catch (error) {
        console.error("Data Acquisition Failure:", error);
      }
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
        console.log(progress);
        if (progress == 100) {
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

        // audio.addEventListener("canplay", () => {
        audio.addEventListener("canplay", () => {
          this.$refs.audio.src = rowData.musicUrl;
          audio.play();

          // 监听音频播放进度变化事件
          audio.addEventListener("timeupdate", () => {
            // 计算进度百分比
            let progress = (audio.currentTime / audio.duration) * 100;
            console.log(progress);
            // 更新数据对象中的进度
            if (progress == 100) {
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
        console.log("1111111");
        audio.addEventListener("canplay", () => {
          this.$refs.audio.src = rowData.musicUrl;
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
            this.$set(rowData, "progress", progress);
          });
          // 将当前音频对象保存到数据中
          this.currentAudio = audio;
          this.currentRowData = rowData;
          this.currentIndex = index;
        });
      }
    },

    // isPlaying(rowData) {
    //   // 检查是否当前音频正在播放
    //   return (
    //     this.currentAudio &&
    //     this.currentAudio.src === rowData.musicUrl &&
    //     !this.currentAudio.paused
    //   );
    // },

    handleSliderChange(value) {
      if (this.currentAudio) {
        this.currentAudio.currentTime =
          (value / 100) * this.currentAudio.duration;
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
.search {
  position: relative;
  left: -16px;
  width: 110px;
}
.play {
  position: relative;
  border: none;
  left: -25px;
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

/* canvas {
  width: 100%;
  height: 100px;
} */

.custom-slider-wrapper .el-slider__button {
  display: none;
}
.custom-large-button {
  font-size: 30px;
  padding: 20px 20px;
}
</style>