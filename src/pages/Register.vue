<template>
  <div class="container">
    <div class="dialog">
        <!-- 自定义title -->
        <div slot="title" class="header-title">
            <span>注册</span>
        </div>
        <el-form v-model="registerUser" label-width="80px" class="form">
            <label class="username">用 户 名</label>
            <el-input class="input1" v-model="registerUser.username" size="small" placeholder="请输入用户名" autofocus></el-input><br><br>
            <label class="password">密 码&nbsp;&nbsp;</label>
            <el-input class="input2" v-model="registerUser.password" size="small" placeholder="请输入密码" show-password></el-input><br><br>
            <label class="repassword">确 认 密 码</label>
            <el-input class="input3" v-model="registerUser.repassword" size="small" placeholder="请再次输入密码" show-password></el-input>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary" @click="submit">注 册</el-button>
        </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

    export default {
        name:"Register",
        data() {
            return {
                registerUser:{
                    username:'',
                    password:'',
                    repassword:'',
                }
            };
        },
        methods: {
            close(){
                close()
            },
            userIsExits(username){
              const un = {"username":username}
              axios.post("http://localhost:5000/user/selectUserByUsername",un).then(
                response=>{
                  return response.data.result
                },
                error=>{console.log(error.message)}
              )
            },
            submit(){
                if(this.userIsExits(this.registerUser.username)){
                  alert("用户名已存在！")
                }else if(this.registerUser.password!==this.registerUser.repassword){
                  alert("两次输入的密码不一致！")
                }else{
                  axios.post(`http://localhost:5000/user/addUser`,this.registerUser).then(
                    Response=>{
                      if(Response.data.result===true){
                        alert("注册成功！")
                        electronAPI.openLoginWindow("login")
                        close()
                      }else{
                        alert("注册失败:"+Response.data.reason)
                      }
                    },
                    error=>{console.log(error.message)}
                  )
                }
            }
        },
    }
</script>

<style scoped>
  .container{
    display: flex !important;
    justify-content: center;
    align-items: center;
    height: 100vh; /* 使容器铺满整个视口高度 */
  }
  .dialog{
    width: 400px;
    height: 300px;
    min-width: 400px;
    min-height: 300px;
    border-radius: 2px; /* 设置圆角边框 */
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5); /* 添加阴影效果 */
    overflow: hidden;
    margin: auto;
  }
  .loginName:hover{
    color: #0d6efd;
  }
  .header-title {
    position: relative;
    left:16px;
    top: 16px;
    font-size: 18px;
    line-height: 24px;
    color: #b4bac3;
  }
    .form{
    position: relative;
    left: 60px;
    top: 45px;
  }
  .input1,.input2,.input3{
    width: 200px;
  }
  .dialog-footer{
    position: relative;
    top: 75px;
    left: 28%;
  }
  .password{
    position: relative;
    left: 6px;
  }
  .repassword{
    position: relative;
    left: -22px;
  }
  .input1{
    position: relative;
    left: 20px;
  }
  .input2{
    position: relative;
    left: 28px;
  }
  .input3{
    position: relative;
    left: px;
  }
</style>