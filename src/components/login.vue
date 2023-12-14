<template>
  <div class="loginLabel">
    <label class="loginName" @click="login">未登录</label>
    <el-dialog :visible="dialogVisible" width="30%"  @close="close">
        <!-- 自定义title -->
        <div slot="title" class="header-title">
            <span>登陆</span>
        </div>
        <el-form v-model="loginUser" label-width="80px">
            <label>用户名&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-input class="input" v-model="loginUser.username" size="small" placeholder="请输入用户名" autofocus></el-input><br><br>
            <label>&nbsp;&nbsp;&nbsp;密码&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-input class="input" v-model="loginUser.password" size="small" placeholder="请输入密码" show-password></el-input>
        </el-form>
        <label class="registerName" @click="register">没有账号?</label>
        <br>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary" @click="submit">登 陆</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>

    export default {
        name:"Login",
        components:{},
        data() {
            return {
                dialogVisible: false,
                loginUser:{
                    username:'',
                    password:'',
                }
            };
        },
        methods: {
            close(){
                this.dialogVisible = false;
            },
            login(){
                this.dialogVisible = true;
            },
            submit(){
                this.dialogVisible = false;
            },
            register(){
                this.dialogVisible = false;
                this.$bus.$emit("registerVisible")
            }
        },
    }
</script>

<style scoped>
  .loginLabel {
    position: relative;
    top:-13px;
  }
  .loginName:hover,.registerName:hover{
    color: #0d6efd;
    cursor: pointer
  }
  .registerName{
    position: relative;
    top:5px;
    left: 95px;
  }
  .header-title {
    position: relative;
    left:-180px;
    font-size: 18px;
    line-height: 24px;
    color: #b4bac3;
  }
  .input{
    width: 200px;
  }
  .dialog-footer{
    position: relative;
    left: -110px;
  }
</style>