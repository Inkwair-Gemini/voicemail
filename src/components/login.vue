<template>
  <div class="loginLabel">
    <label class="loginName" @click="login">未登录</label>
    <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="handleClose" @close="close">
        <!-- 自定义title -->
        <div slot="title" class="header-title">
            <span>登陆</span>
        </div>
        <el-form v-model="user" label-width="80px">
            <label>用户名&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-input class="input" v-model="user.username" size="small" placeholder="请输入用户名" autofocus></el-input><br><br>
            <label>&nbsp;&nbsp;&nbsp;密码&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-input class="input" v-model="user.password" size="small" placeholder="请输入密码" show-password></el-input>
        </el-form>
        <label class="register">没有注册?</label>
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
    data() {
      return {
        dialogVisible: false,
        user:{
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
        }
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
  .input{
    width: 200px;
  }
  .dialog-footer{
    position: relative;
    left: -150px;
  }
</style>