<template>
  <div class="container">
    <div class="main">
      <div class="login">

        <el-row class="demo-avatar demo-basic">
          <div class="demo-basic--circle">
            <div class="block"><el-avatar :size="130" :src="user.avatarUrl"></el-avatar></div>
          </div>
        </el-row>

        <el-button size="medium" circle @click="uploadAvatar"><i class="el-icon-camera-solid"/></el-button>
        <el-dialog :visible.sync="avatarVisible">
          <!-- 自定义title -->
          <div slot="title" class="header-title">
              <span>上传头像</span>
          </div>
          <el-form :model="avatarform">
            <el-form-item label="图片链接" :label-width="formLabelWidth">
              <el-input v-model="avatarform.url" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="avatarVisible = false">取 消</el-button>
            <el-button type="primary" @click="avatarSubmit">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 标签 -->
        <div class="loginLabel">
          <label v-show="!isLogin"  class="loginName" @click="toLogin">{{user.username}}</label>
          <el-popover placement="top-start" v-model="quitVisible">
            <p class="quitConfirm"><br>确定退出登录吗？</p>
            <div class="quitButton">
              <el-button size="mini" type="text" @click="quitVisible = false">取消</el-button>
              <el-button type="text" size="mini" @click="quitLogin">确定</el-button>
            </div>
            <label slot="reference" v-show="isLogin" class="quitnLogin">{{user.username}}</label>
          </el-popover>
        </div>

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
      <div class="second hovergrey" @click="toMail">
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
      <div class="second hovergrey" @click="toDelete">
        <label class="line-label">最近删除</label>
        <span class="deleteValue">{{ deleteNumber }}</span>
        <i class="el-icon-arrow-right"/>
      </div>
      <div class="second">
        <button class="quit" @click="quit">
          <img class="quiticon" src="../assets/icon/quit.svg" alt="">&nbsp;
          <span>退出</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import {ref} from 'vue'
  import axios from 'axios'
  export default {
    name:"Menu",
    data() {
      return {
        value1:ref(true),
        value2:ref(true),
        quitVisible:false,
        avatarVisible:false,
        isLogin:false,
        avatarform:{url:''},
        formLabelWidth: '70px',
        deleteNumber:0,
        user:{
          id:'',
          username:"",
          avatarUrl: "",
        },
      };
    },
    methods: {
      quit(){
          let res=confirm('确定退出程序?')
          if(res){
            close()
          }
      },
      quitLogin(){
          this.quitVisible=false
          this.user.username="未登录"
          this.user.avatarUrl="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          localStorage.removeItem('user')
          this.isLogin=false
          this.deleteNumber=''
          this.$forceUpdate();
      },
      uploadAvatar(){
        if(this.isLogin){
          this.avatarform.url=''
          this.avatarVisible=true
        }else{
          alert("未登录,请先登录")
        }
      },
      avatarSubmit(){
        this.user.avatarUrl=this.avatarform.url
        localStorage.setItem("user",JSON.stringify(this.user))
        axios.post('http://localhost:8080/user/updateUser',this.user).then(
          response=>{
              console.log(response.data)
          },
          error=>{console.log(error.message)}
        )
        this.avatarVisible=false
        this.$forceUpdate();
      },
      getDeleteNum(username){
        //   axios.get(`http://localhost:8080/delete/getListByUsername?username=${username}`).then(()=>{
        //     Response=>{
        //       return Response.data.deleteList.length
        //     },
        //     error=>{console.log(error.message)}
        //   })
        return 3
      },
      toDelete(){
        electronAPI.openDeleteWindow("delete")
      },
      toMail(){
        electronAPI.openMailWindow("mail")
      },
      toLogin(){
        electronAPI.openLoginWindow("login")
      }
    },
    mounted(){
      electronAPI.receive("getLoginInfo",(loginUser)=>{
        localStorage.setItem('user',JSON.stringify(loginUser))
        this.isLogin=true
        this.user.id=loginUser.id
        this.user.username=loginUser.username
        this.user.avatarUrl=loginUser.avatarUrl
        this.deleteNumber=loginUser.deleteListNumber
      })

      const loginUser=JSON.parse(localStorage.getItem('user'))
      if(loginUser){
        this.isLogin=true
        this.user.id=loginUser.id
        this.user.username=loginUser.username
        this.user.avatarUrl=loginUser.avatarUrl
        this.deleteNumber=this.getDeleteNum(loginUser.username)
      }else{
        this.user.username="未登录"
        this.user.avatarUrl="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        this.deleteNumber=''
      }
    }
  }
</script>

<style scoped>
  .container{
    display: flex !important;
    justify-content: center;
    align-items: center;
    height: 100vh; /* 使容器铺满整个视口高度 */
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
  .loginLabel {
    position: relative;
    top:-13px;
  }
  .loginName:hover{
    color: #0d6efd;
    cursor: pointer
  }
  .quitnLogin:hover{
    color: #F56C6C;
    cursor: pointer
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
    cursor: pointer;
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
  .quitButton{
    position: relative;
    top: 20px;
    left: 5px;
  }
  .quitConfirm{
    text-align: center;
  }
  .dialog-footer{
    position: relative;
    left: -100px;
  }
  .header-title {
    position: relative;
    left:-320px;
    font-size: 18px;
    line-height: 24px;
    color: #b4bac3;
  }
</style>