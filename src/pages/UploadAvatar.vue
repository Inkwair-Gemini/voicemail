<template>
    <div class="container">
          <div>
            <el-form :model="avatarform" size="mini" class="form">
                <el-form-item label="图片链接" :label-width="formLabelWidth">
                <el-input v-model="avatarform.url" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer">
                <el-button @click="close" size="mini">取 消</el-button>
                <el-button type="primary" size="mini" @click="avatarSubmit">确 定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    naem:"UploadAvatar",
    data(){
        return{
            avatarform:{url:''},
            formLabelWidth: '70px',
        }
    },
    methods:{
        close(){
            close()
        },
        avatarSubmit(){
            electronAPI.send('avatar',this.avatarform.url)
            localStorage.setItem("user",JSON.stringify(this.user))
            // axios.post('http://localhost:8080/user/updateUser',this.user).then(
            // response=>{
            //     console.log(response.data)
            // },
            // error=>{console.log(error.message)}
            // )
            close()
        },
    }

}
</script>

<style>

.container{
    display: flex !important;
    justify-content: center;
    align-items: center;
}
.dialog-footer{
    position: relative;
    left: 50px;
}
.form{
    position: relative;
    top: -20px;
}
</style>