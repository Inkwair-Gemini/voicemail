<template>
  <div class="container">
    <div class="dialog">
        <!-- 自定义title -->
        <div class="header-title">
            <span>{{$t('login.title')}}</span>
        </div>
        <el-form v-model="loginUser" label-width="80px" class="form">
            <label>{{$t('login.username')}}</label>
            <el-input class="input" v-model="loginUser.username" size="small" :placeholder="$t('login.usernameTips')" autofocus></el-input><br><br>
            <label class="pas">{{$t('login.password')}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-input class="input" v-model="loginUser.password" size="small" :placeholder="$t('login.passwordTips')" show-password></el-input>
        </el-form>
        <label class="registerName" @click="register">{{$t('login.haveNoAccount')}}</label>
        <br>
        <span class="dialog-footer">
            <el-button @click="close">{{$t('login.cancelButton')}}</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary" @click="submit">{{$t('login.loginButton')}}</el-button>
        </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
    export default {
        name:"Login",
        data() {
            return {
                loginUser:{
                    username:'',
                    password:'',
                }
            };
        },
        methods: {
            close(){
                close()
            },
            submit(){
                axios.post('http://localhost:5000/user/loginUser',this.loginUser).then(
                    response=>{
                        if(response.data.result.success===true){
                            close()
                            electronAPI.send('login',response.data.result.user)
                        }else{
                            console.log(response.data)
                            alert(this.$t('login.loginFailed'))
                        }
                    }).catch(
                    error=>{
                      console.log(error.message)
                    })
            },
            register(){
                close()
                electronAPI.openRegisterWindow("register")
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
  .dialog{
    width: 400px;
    height: 300px;
    min-width: 400px;
    min-height: 300px;
    border-radius: 2px; /* 设置圆角边框 */
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5); /* 添加阴影效果 */
    overflow: hidden;
    margin: auto;
    color: rgb(135, 131, 131);
  }
  .registerName{
    position: relative;
    top:65px;
    right: -270px;
  }
  .registerName:hover{
    color: #0d6efd;
    cursor: pointer
  }
  .header-title {
    position: relative;
    top: 16px;
    left:16px;
    font-size: 18px;
    line-height: 24px;
    color: rgb(135, 131, 131);
  }
  .form{
    position: relative;
    left: 45px;
    top: 60px;
  }
  .input{
    position: relative;
    left: 40px;
    width: 200px;
  }
  .pas{
    position: relative;
    left: 17px;
  }
  .dialog-footer{
    position: relative;
    top: 95px;
    left: 28%;
  }
</style>