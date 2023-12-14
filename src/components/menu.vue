<template>
  <div class="container">
    <div class="main">

      <div class="login">
        <el-row class="demo-avatar demo-basic">
          <div class="demo-basic--circle">
            <div class="block"><el-avatar :size="130" :src="circleUrl"></el-avatar></div>
          </div>
        </el-row>
        <el-button size="medium" circle><i class="el-icon-camera-solid"/></el-button>
        <!-- 标签 -->
        <Login/>
      </div>
      <div class="second">
        <label class="line-label">留言功能</label>
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" class="btn-check" name="switch" id="switch1" autocomplete="off" checked>
          <label class="btn btn-outline-primary" for="switch1"><span class="fontspan">开</span></label>

          <input type="radio" class="btn-check" name="switch" id="switch2" autocomplete="off">
          <label class="btn btn-outline-primary" for="switch2"><span class="fontspan">关</span></label>
        </div>
      </div>
      <div class="second hovergrey">
        <label class="line-label">进入信箱</label>
        <i class="el-icon-arrow-right"/>
      </div>
      <div class="second">
        <label class="line-label">更换语言</label>
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" class="btn-check" name="lang" id="lang1" autocomplete="off" checked>
          <label class="btn btn-outline-primary" for="lang1"><span class="fontspan">中</span></label>

          <input type="radio" class="btn-check" name="lang" id="lang2" autocomplete="off">
          <label class="btn btn-outline-primary" for="lang2"><span class="fontspan">英</span></label>
        </div>
      </div>
      <div class="second hovergrey">
        <label class="line-label">最近删除</label>
        <span class="deleteValue">3</span>
        <i class="el-icon-arrow-right"/>
      </div>
      <div class="second">
        <button class="quit">
          <img class="quiticon" src="../assets/icon/quit.svg" alt="">&nbsp;
          <span>退出</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import {ref} from 'vue'
  import Login from './Login.vue';
  export default {
    name:"Menu",
    components:{Login},
    data() {
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        value1:ref(true),
        value2:ref(true),
      };
    },
    methods: {
      changeAvatar() {
        // 处理更换头像的逻辑
      },
    },
  }
</script>

<style>
  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* 使容器铺满整个视口高度 */
    color: #b4bac3;
  }
  .main{
    width: 314px;
    height: 600px;
    border-radius: 2px; /* 设置圆角边框 */
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5); /* 添加阴影效果 */
  }
  /* 头像容器样式 */
  .login {
    text-align: center;
    width: 314px;
    height: 250px;
    background: #ffffff;
  }
  .demo-basic--circle {
    margin-top: 30px; /* 调整这个数值 */
  }
  .el-button{
    position: relative;
    left: 40px;
    top:-24px;
  }
  .el-icon-camera-solid {
    font-size: 20px;
  }
  .second{
    width: 314px;
    height: 70px;
    background: #ffffff;
    border-top: 1px solid #000;
  }
  .line-label{
    position: relative;
    left: 45px;
    top: 22px;
    color:#606266;
    font-size: 18px;
  }
  .hovergrey:hover{
    color:#606266;
    background-color: #e8e8e8;
  }
  .el-icon-arrow-right{
    position: relative;
    font-size: 22px;
    left: 170px;
    top: 23px;
  }
  .deleteValue{
    position: relative;
    left: 160px;
    top: 22px;
    color:#606266;
    font-size: 16px;
  }
  .btn-group{
    position: relative;
    left: 130px;
    top: 19px;
    width: 22px;
    height: 28px;
  }
  .fontspan{
    position: relative;
    left: 0px;
    top: -4px;
  }
  .quiticon{
    width: 22px;
    height: 22px;
  }
  .quit{
    position: relative;
    left: 215px;
    top: 22px;
    border: none;
    background-color:white;
    color:#969aa1;
    font-size: 16px;
  }
  .quit:hover{
    color:#606266;
  }
  .el-icon-camera-solid:hover{
    color: #0d6efd;
  }
</style>