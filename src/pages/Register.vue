<template>
  <div class="container">
    <div class="dialog">
      <!-- 自定义title -->
      <div slot="title" class="header-title">
        <span>{{ $t("register.title") }}</span>
      </div>
      <!-- <el-form v-model="registerUser" label-width="80px" class="form">
            <label class="username">{{$t('register.username')}}</label>
            <el-input class="input1" v-model="registerUser.username" size="small" placeholder="请输入用户名" autofocus></el-input><br><br>
            <label class="password">{{$t('register.password')}}&nbsp;&nbsp;</label>
            <el-input class="input2" v-model="registerUser.password" size="small" placeholder="请输入密码" show-password></el-input><br><br>
            <label class="repassword">{{$t('register.repassword')}}</label>
            <el-input class="input3" v-model="registerUser.repassword" size="small" placeholder="请再次输入密码" show-password></el-input>
        </el-form> -->
      <el-form label-position="right" label-width="80px" class="form">
        <el-form-item :label="$t('register.username')">
          <el-input
            class="input"
            v-model="registerUser.username"
            size="small"
            :placeholder="$t('register.usernameTips')"
            autofocus
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('login.password')">
          <el-input
            class="input"
            v-model="registerUser.password"
            size="small"
            :placeholder="$t('register.passwordTips')"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('register.repassword')">
          <el-input
            class="input"
            v-model="registerUser.repassword"
            size="small"
            :placeholder="$t('register.repasswordTips')"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">{{ $t("register.cancelButton") }}</el-button
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary" @click="submit">{{
          $t("register.registerButton")
        }}</el-button>
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      registerUser: {
        username: "",
        password: "",
        repassword: "",
      },
    };
  },
  methods: {
    close() {
      close();
    },
    userIsExits(username) {
      axios
        .get(
          `http://localhost:5000/user/selectUserByUsername?username=${username}`
        )
        .then((response) => {
          return response.data.result;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    submit() {
      if (this.userIsExits(this.registerUser.username)) {
        alert(this.$t("register.usernameExists"));
      } else if (this.registerUser.password !== this.registerUser.repassword) {
        alert(this.$t("register.passwordsDoNotMatch"));
      } else {
        axios
          .post(`http://localhost:5000/user/addUser`, this.registerUser)
          .then((Response) => {
            if (Response.data.result === true) {
              alert(this.$t("register.registerSuccess"));
              electronAPI.openLoginWindow("login");
              close();
            } else {
              alert(this.$t("register.registerFailed") + Response.data.reason);
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    },
  },
  mounted(){
    electronAPI.receive("changeLang", (lang) => {
      this.$i18n.locale = lang; // 设置 i18n 的当前语言
      this.$store.dispatch("setLang", lang); // 触发 Vuex action 更新语言状态
      console.log(this.$store.state.lang);
    })
  }
};
</script>

<style scoped>
.container {
  display: flex !important;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 使容器铺满整个视口高度 */
}
.dialog {
  width: 400px;
  height: 300px;
  min-width: 400px;
  min-height: 300px;
  border-radius: 2px; /* 设置圆角边框 */
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5); /* 添加阴影效果 */
  overflow: hidden;
  margin: auto;
}
.loginName:hover {
  color: #0d6efd;
}
.header-title {
  position: relative;
  left: 16px;
  top: 16px;
  font-size: 18px;
  line-height: 24px;
  color: #b4bac3;
}
.form {
  position: relative;
  left: 60px;
  top: 30px;
}
.input {
  width: 214px;
}
.dialog-footer {
  position: relative;
  top: 30px;
  left: 28%;
}
.password {
  position: relative;
  left: 6px;
}
.repassword {
  position: relative;
  left: -22px;
}
</style>