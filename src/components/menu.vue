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
        <div class="loginLabel">未登录</div>
      </div>
      <div class="second">
        <label>留言功能</label>
        <el-switch
          class="switch"
          v-model="value1"
          active-text="打开"
          inactive-text="关闭"
          inactive-color="#c0c4cc"
          size="large"
        />
      </div>

      <div class="second">
        <label>进入信箱</label>
        <i class="el-icon-arrow-right"/>
      </div>
      <div class="second">
        <label>更换语言</label>
      </div>
      <div class="second">
        <label>最近删除</label>
        <span class="deleteValue">3</span>
        <i class="el-icon-arrow-right"/>
      </div>
      <div class="second">

      </div>
    </div>
  </div>
</template>

<script>
  import {ref} from 'vue'
  export default {
    name:"Menu",
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
    background-color: #8b3939;
    border-radius: 2px; /* 设置圆角边框 */
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5); /* 添加阴影效果 */
    padding: 20px;
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
  .loginLabel {
    position: relative;
    top:-13px;
  }
  .second{
    width: 314px;
    height: 70px;
    background: #ffffff;
    border-top: 1px solid #000;
  }
  .second label{
    position: relative;
    left: 45px;
    top: 22px;
    color:#606266;
    font-size: 18px;
  }
  .el-switch{
    position: relative;
    left: 150px;
    top: 20px;
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
  .el-switch__label * {
    line-height: 1;
    font-size: 12px;
    display: inline-block;
  }
 .el-switch__label {
    position: absolute;
    display: none;
    color: #fff !important;
    font-size: 12px !important;
  }
  /*打开时文字位置设置*/
  .el-switch__label--right {
    z-index: 1;
    left: -3px;
  }
  /*关闭时文字位置设置*/
  .el-switch__label--left {
    z-index: 1;
    left: 20px;
  }
  /*显示文字*/
  .el-switch__label.is-active {
    display: block;
  }
   /*开关宽度*/
  .el-switch .el-switch__core,
  .el-switch .el-switch__label {
    width: 52px !important;
  }

</style>