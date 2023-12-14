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
          senderList.filter(
            (data) =>
              !search ||
              data.sender.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column type="expand"> </el-table-column>
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
              class="play"
              size="mini"
              @click="handlePlay(scope.$index, scope.row)"
            >
              <a-icon type="play-circle" />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <audio ref="audio"></audio>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";

import Vue from "vue";
import { DatePicker } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(DatePicker);

export default {
  name: "Delete",
  data() {
    return {
      title: "最近删除",
      senderList: [
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
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.senderList.forEach((row, index) => {
        this.renderWaveChart(
          `waveCanvas_${index}` /* 传递数据给图表，例如 row 中的音频数据 */
        );
      });
    });
  },
  methods: {
    renderWaveChart(canvasId, audioData) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      //创建音波图表
      new Chart(ctx, {
        type: "line",
        data: {
          //   labels:
          datasets: [
            {
              label: "音波图",
              borderColor: "blue",
              borderWidth: 2,
              data: audioData,
            },
          ],
        },
        options: {
          // 配置图表样式和其他选项
        },
      });
    },
    handlePlay(index, rowData) {
      console.log(`正在播放第 ${index} 行的数据: `);
      let audio = new Audio();
      audio = rowData.musicUrl;
      this.$refs.audio.src = audio;
      this.$nextTick(() => {
        const { audio } = this.$refs;
        audio.load();
        audio.play();
      });
      // audio.addEventListener("canplay", () => {
      //   audio.play();

      //   // 监听音频播放进度变化事件
      //   audio.addEventListener("timeupdate", () => {
      //     // 计算进度百分比
      //     const progress = (audio.currentTime / audio.duration) * 100;

      //     // 更新数据对象中的进度
      //     this.$set(rowData, "progress", progress);
      //   });
      // });
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

canvas {
  width: 100%;
  height: 100px; /* 设置音波图的高度*/
}

.custom-slider-wrapper .el-slider__button {
  display: none;
}
</style>