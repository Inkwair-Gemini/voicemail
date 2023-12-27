<template>
  <div class="container">
    <div>
      <el-form :model="avatarform" size="mini" class="form">
        <el-form-item label="图片链接" :label-width="formLabelWidth">
          <el-input v-model="avatarform.url" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="close" size="mini">{{
          $t("avatar.cancelButton")
        }}</el-button>
        <el-button type="primary" size="mini" @click="avatarSubmit"
          >{{
          $t("avatar.confirmButton")
        }}</el-button
        >
      </div>
    </div>
  </div>
</template>

<script scoped>
import axios from "axios";
export default {
  naem: "UploadAvatar",
  data() {
    return {
      avatarform: { url: "" },
      formLabelWidth: "70px",
    };
  },
  methods: {
    close() {
      close();
    },
    avatarSubmit() {
      electronAPI.send("avatar", this.avatarform.url);
      let user = JSON.parse(localStorage.getItem("user"));
      user.avatarUrl = this.avatarform.url;
      localStorage.setItem("user", JSON.stringify(user));
      console.log(user);
      axios
        .post("http://localhost:5000/user/updateUser", user)
        .then((response) => {
          console.log(response.data.result);
        })
        .catch((error) => {
          console.log(error.message);
        });
      close();
    },
  },
};
</script>

<style scoped>
.container {
  display: flex !important;
  justify-content: center;
  align-items: center;
}
.dialog-footer {
  position: relative;
  top: 50px;
  left: 50px;
}
.form {
  position: relative;
  top: 40px;
}
</style>