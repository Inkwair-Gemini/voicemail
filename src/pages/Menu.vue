<template>
  <div class="container">
    <div class="main">
      <div class="login">
        <el-row class="demo-avatar demo-basic">
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar :size="130" :src="user.avatarUrl"></el-avatar>
            </div>
          </div>
        </el-row>

        <el-button size="medium" circle @click="uploadAvatar"
          ><i class="el-icon-camera-solid"
        /></el-button>

        <!-- 标签 -->
        <div class="loginLabel">
          <label v-show="!isLogin" class="loginName" @click="toLogin">{{
            user.username
          }}</label>
          <el-popover placement="top-start" v-model="quitVisible">
            <p class="quitConfirm"><br />{{ $t("menu.logoutConfirm") }}</p>
            <div class="quitButton">
              <el-button size="mini" type="text" @click="quitVisible = false">{{
                $t("menu.cancel")
              }}</el-button>
              <el-button type="text" size="mini" @click="quitLogin">{{
                $t("menu.confirm")
              }}</el-button>
            </div>
            <label slot="reference" v-show="isLogin" class="quitnLogin">{{
              user.username
            }}</label>
          </el-popover>
        </div>
      </div>
      <div class="second">
        <label class="line-label">{{ $t("menu.record") }}</label>
        <div
          class="btn-group"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            class="btn-check"
            name="switch"
            id="switch1"
            autocomplete="off"
            checked
          />
          <label
            class="btn btn-outline-primary"
            for="switch1"
            @click="openRecord"
            ><span class="fontspan">{{ $t("menu.on") }}</span></label
          >

          <input
            type="radio"
            class="btn-check"
            name="switch"
            id="switch2"
            autocomplete="off"
          />
          <label
            class="btn btn-outline-primary"
            for="switch2"
            @click="closeRecord"
            ><span class="fontspan">{{ $t("menu.off") }}</span></label
          >
        </div>
      </div>
      <div class="second hovergrey" @click="toMail">
        <label class="line-label">{{ $t("menu.mail") }}</label>
        <i class="el-icon-arrow-right" />
      </div>
      <div class="second">
        <label class="line-label">{{ $t("menu.language") }}</label>
        <div
          class="btn-group"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            class="btn-check"
            name="lang"
            id="lang1"
            autocomplete="off"
            :checked="currentLang == 'zh-CN'"
            @change="changeLanguage('zh-CN')"
          />
          <label class="btn btn-outline-primary" for="lang1"
            ><span class="fontspan">{{ $t("menu.Chinese") }}</span></label
          >

          <input
            type="radio"
            class="btn-check"
            name="lang"
            id="lang2"
            autocomplete="off"
            :checked="currentLang == 'en-US'"
            @change="changeLanguage('en-US')"
          />
          <label class="btn btn-outline-primary" for="lang2"
            ><span class="fontspan">{{ $t("menu.English") }}</span></label
          >
        </div>
      </div>
      <div class="second hovergrey" @click="toDelete">
        <label class="line-label">{{ $t("menu.delete") }}</label>
        <span class="deleteValue">{{ deleteNumber }}</span>
        <i class="el-icon-arrow-right" />
      </div>
      <div class="second">
        <button class="quit" @click="quit">
          <img class="quiticon" src="../assets/icon/quit.svg" alt="" />&nbsp;
          <span>{{ $t("menu.quit") }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
export default {
  name: "Menu",
  data() {
    return {
      value1: ref(true),
      value2: ref(true),
      quitVisible: false,
      isLogin: false,
      deleteNumber: 0,
      user: {
        id: "",
        username: "",
        avatarUrl: "",
      },
    };
  },
  methods: {
    quit() {
      let res = confirm(this.$t("menu.quitConfirm"));
      if (res) {
        close();
      }
    },
    quitLogin() {
      this.quitVisible = false;
      this.user.username = this.$t("menu.notLogined");
      this.user.avatarUrl =
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
      localStorage.removeItem("user");
      this.isLogin = false;
      this.deleteNumber = "";
      this.$forceUpdate();
    },
    uploadAvatar() {
      if (this.isLogin) {
        electronAPI.openUploadWindow("upload");
      } else {
        alert(this.$t("menu.notloginedAlert"));
      }
    },
    toDelete() {
      if (this.isLogin) {
        electronAPI.openDeleteWindow("delete");
      } else {
        alert(this.$t("menu.notloginedAlert"));
      }
    },
    toMail() {
      if (this.isLogin) {
        electronAPI.openMailWindow("mail");
      } else {
        alert(this.$t("menu.notloginedAlert"));
      }
    },
    toLogin() {
      electronAPI.openLoginWindow("login");
    },
    openRecord() {
      electronAPI.openRecordWindow("record");
    },
    closeRecord() {
      electronAPI.send("closeRecord");
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang; // 设置 i18n 的当前语言
      this.$store.dispatch("setLang", lang); // 触发 Vuex action 更新语言状态
      console.log(this.$store.state.lang);
    },
  },
  mounted() {
    electronAPI.openRecordWindow("record");
    electronAPI.receive("getLoginInfo", (loginUser) => {
      localStorage.setItem("user", JSON.stringify(loginUser));
      this.isLogin = true;
      this.user.id = loginUser.id;
      this.user.username = loginUser.username;
      this.user.avatarUrl = loginUser.avatarUrl;
      this.deleteNumber = loginUser.deleteListNumber;
    });
    electronAPI.receive("getAvatarInfo", (url) => {
      this.user.avatarUrl = url;
    });
    electronAPI.receive("getDeleteNumber", (num) => {
      this.deleteNumber = num;
    });
    const loginUser = JSON.parse(localStorage.getItem("user"));
    if (loginUser) {
      this.isLogin = true;
      this.user.id = loginUser.id;
      this.user.username = loginUser.username;
      this.user.avatarUrl = loginUser.avatarUrl;
      axios
        .get(
          `http://localhost:5000/delete/getListByUsername?username=${loginUser.username}`
        )
        .then((Response) => {
          this.deleteNumber = Response.data.deleteList.length;
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      this.user.username = this.$t("menu.notLogined");
      this.user.avatarUrl =
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
      this.deleteNumber = "";
    }
  },
  computed: {
    currentLang() {
      return this.$store.state.lang; // 从 Vuex 中获取当前语言状态
    },
  },
};
</script>

<style scoped>
.container {
  display: flex !important;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 使容器铺满整个视口高度 */
}
.main {
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
  top: -13px;
}
.loginName:hover {
  color: #0d6efd;
  cursor: pointer;
}
.quitnLogin:hover {
  color: #f56c6c;
  cursor: pointer;
}
.demo-basic--circle {
  margin-top: 30px; /* 调整这个数值 */
}
.el-button {
  position: relative;
  left: 40px;
  top: -24px;
}
.el-icon-camera-solid {
  font-size: 20px;
}
.second {
  width: 314px;
  height: 70px;
  background: #ffffff;
  position: relative;
  border-top: 1px solid #000;
}
.line-label {
  position: relative;
  left: 45px;
  top: 22px;
  color: #606266;
  font-size: 18px;
}
.hovergrey:hover {
  color: #606266;
  background-color: #e8e8e8;
  cursor: pointer;
}

.el-icon-arrow-right {
  position: relative;
  font-size: 22px;
  top: 23px;
  right: 30px;
  float: right;
}
.deleteValue {
  position: relative;
  top: 22px;
  color: #606266;
  font-size: 16px;
  right: 65px;
  float: right;
}
.btn-group {
  position: relative;
  top: 23px;
  width: 22px;
  height: 28px;
  right: 90px;
  float: right;
}
.fontspan {
  position: relative;
  left: 0px;
  top: -5px;
}
.quiticon {
  width: 22px;
  height: 22px;
}
.quit {
  position: relative;
  left: 215px;
  top: 22px;
  border: none;
  background-color: white;
  color: #969aa1;
  font-size: 16px;
}
.quit:hover {
  color: #606266;
}
.el-icon-camera-solid:hover {
  color: #0d6efd;
}
.quitButton {
  position: relative;
  top: 20px;
  left: 5px;
}
.quitConfirm {
  text-align: center;
}
</style>