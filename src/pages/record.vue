<template>
  <div class="container">
    <div class="main">
      <div class="header">
        <div class="header2">
          <label class="headerlabel">{{ mediaRecorder }}</label>
        </div>
      </div>
      <div class="record">
        <el-button @click="handleRecord()">
          <audio ref="audioPlayer"></audio>
          <a-icon type="audio" />
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isRecording: false,
      recorderName: JSON.parse(localStorage.getItem("user")).username,
      audioChunks: [],
      mediaRecorder:'',
      recordingStartTime: null,
      recordingEndTime: null,
    };
  },
  methods: {
    handleRecord() {
      if (!this.isRecording) {
        console.log("开始录制音频");
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((stream) => {
            this.mediaRecorder = new MediaRecorder(stream);

            this.mediaRecorder.ondataavailable = (event) => {
              if (event.data.size > 0) {
                this.audioChunks.push(event.data);
              }
            };

            this.mediaRecorder.onstart = () => {
              // 记录录制的开始时间
              const today = new Date();
              this.recordingStartTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            };

            this.mediaRecorder.onstop = () => {
              console.log("停止录制音频");
              // 记录录制的结束时间
              this.recordingEndTime = new Date();

              // 创建一个 Blob 对象，将音频块数组转换为音频数据
              const audioBlob = new Blob(this.audioChunks, {
                type: "audio/wav",
              });

              // 将录制者名称和录制时间作为JSON数据添加到请求体
              const recordingData = {
                recorderName: this.recorderName,
                recordingEndTime: this.recordingEndTime,
              };

              // 使用FormData传输音频数据和录制者信息
              const formData = new FormData();
              formData.append("audio", audioBlob, "recorded_audio.wav");
              formData.append("recordingData", JSON.stringify(recordingData));

              // 使用axios将FormData发送到后端服务器
              axios
                .post("http://localhost:5000/user/addVoice", formData)
                .then((response) => {
                  // 处理上传成功的响应
                  console.log("音频上传成功");
                })
                .catch((error) => {
                  // 处理上传失败的错误
                  console.error("上传音频失败:", error);
                });

              // 清空音频块数组以备下次录制
              this.audioChunks = [];
            };

            this.mediaRecorder.start();
            this.isRecording = true;
          })
          .catch((error) => {
            console.error("获取音频流失败:", error);
          });
      } else {
        if (this.mediaRecorder) {
          this.mediaRecorder.stop();
          this.isRecording = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 使容器铺满整个视口高度 */
}
.main {
  width: 54px;
  height: 43px;
  min-width: 54px;
  min-height: 43px;
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
.record {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

