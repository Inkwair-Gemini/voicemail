<template>
  <div class="loginLabel">
    <el-dialog :visible.sync="dialogVisible" width="30%" @close="close">
        <!-- 自定义title -->
        <div slot="title" class="header-title">
            <span>注册</span>
        </div>
        <el-form v-model="registerUser" label-width="80px">
            <label class="username">用户名</label>
            <el-input class="input1" v-model="registerUser.username" size="small" placeholder="请输入用户名" autofocus></el-input><br><br>
            <label class="password">密码</label>
            <el-input class="input2" v-model="registerUser.password" size="small" placeholder="请输入密码" show-password></el-input><br><br>
            <label class="repassword">再次输入密码</label>
            <el-input class="input3" v-model="registerUser.repassword" size="small" placeholder="请再次输入密码" show-password></el-input>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary" @click="submit">注 册</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';

    export default {
        name:"Register",
        data() {
            return {
                dialogVisible: false,
                registerUser:{
                    username:'',
                    password:'',
                    repassword:'',
                }
            };
        },
        methods: {
            close(){
                this.dialogVisible = false;
            },
            userIsExits(username){
              axios.get(`http://localhost:8080/user/selectUserByUsername?username=${username}`).then(()=>{
                Response=>{
                  return Response.data
                },
                error=>{console.log(error.message)}
              })
            },
            submit(){
                if(this.userIsExits(this.registerUser.username)){
                  alert("用户名已存在！")
                }else if(this.registerUser.password!==this.registerUser.repassword){
                  alert("两次输入的密码不一致！")
                }else{
                  axios.post(`http://localhost:8080/user/addUser`,this.registerUser).then(()=>{
                    Response=>{console.log(Response.data)},
                    error=>{console.log(error.message)}
                  })
                  alert("注册成功！")
                }
                this.dialogVisible = false;
            }
        },
        mounted(){
            this.$bus.$on('registerVisible',()=>{
                this.dialogVisible=true
            })
        }
    }
</script>

<style scoped>
  .loginLabel {
    position: relative;
    top:-13px;
  }
  .loginName:hover{
    color: #0d6efd;
  }
  .header-title {
    position: relative;
    left:-180px;
    font-size: 18px;
    line-height: 24px;
    color: #b4bac3;
  }
  .input1,.input2,.input3{
    width: 200px;
  }
  .dialog-footer{
    position: relative;
    left: -110px;
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