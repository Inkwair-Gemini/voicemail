<template>
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
</template>

<script>
import axios from 'axios';
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
                // axios.post('http://localhost:8080/user/loginUser',JSON.stringify(this.loginUser)).then(
                //     response=>{
                //         // const result=response.data
                        const result={
                            success:true,
                            user:{
                                id:12,
                                username:'ok',
                                avatarUrl:"https://ts1.cn.mm.bing.net/th/id/R-C.4b50dad811534dc8169ea45db550a87d?rik=PFKIeJF5U1uEYQ&riu=http%3a%2f%2fsociety.yunnan.cn%2fpic%2f003%2f037%2f094%2f00303709457_f1380d4c.jpg&ehk=0vwsmM0G2yWl8CrWnr7wFtjDApWZJlHYTPOkEmjj%2fD4%3d&risl=&pid=ImgRaw&r=0",
                                deleteListNumber:12
                            }
                        }
                        if(result.success===true){
                            this.$bus.$emit("getUser",result.user,)
                            this.dialogVisible = false;
                        }else{
                            alert('用户名或密码错误！')
                        }
                //     },
                //     error=>{console.log(error.message)}
                // )
            },
            register(){
                this.dialogVisible = false;
                this.$bus.$emit("registerVisible")
            }
        },
        mounted(){
            this.$bus.$on("login",this.login)
        }
    }
</script>

<style scoped>
  .registerName{
    position: relative;
    top:5px;
    left: 95px;
  }
  .registerName:hover{
    color: #0d6efd;
    cursor: pointer
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