<template>
  <div class="container">
    <div class="main">
        <div class="header">
            <div class="header2">
                <label class="headerlabel">{{$t('delete.mainTitle')}}</label>   
            </div>
        </div>
        <el-table :data="deleteList.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))" style="width: 100%" height="620">
            <el-table-column type="expand">
              <template slot-scope="props">
                <span class="content">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{props.row.data}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('delete.date')" prop="time"></el-table-column>
            <el-table-column :label="$t('delete.title')" prop="title"></el-table-column>
            <el-table-column align="right">
              <template slot="header" slot-scope={}>
                <el-input class="search" v-model="search" size="mini" :placeholder="$t('delete.search')"/>
                <i class="el-icon-search"/>
              </template>
              <template slot-scope="scope">
                <el-button class="recover" type="primary" size="mini" @click="handleRecover(scope.row.id)">
                  <i class="el-icon-refresh-left"></i>
                </el-button>
                <el-button class="delete" type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row.id)"></el-button>
              </template>
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
    export default {
        name:"Delete",
        data(){
            return{
                deleteList:[],
                search: ''
            }
        },
        methods:{
          handleRecover(id){
            axios.get(`http://localhost:5000/delete/recoverById?id=${id}`).then(
              Response=>{
                console.log(Response.data)
              }).catch(
              error => {
                console.log(error.message);
              })
            this.deleteList=this.deleteList.filter(p=>p.id!==id)
            electronAPI.send("deleteNumber",this.deleteList.length)
          },
          handleDelete(id){
            axios.get(`http://localhost:5000/delete/deleteById?id=${id}`).then(
              Response=>{
                console.log(Response.data)
              }).catch(
              error => {
                console.log(error.message);
              })
            this.deleteList=this.deleteList.filter(p=>p.id!==id)
            electronAPI.send("deleteNumber",this.deleteList.length)
          },
          getUsername(){
            return JSON.parse(localStorage.getItem('user')).username
          }
        },
        mounted(){
          const username = this.getUsername()
          if(!username){
            alert(this.$t('delete.notLogined'))
          }else{
            axios.get(`http://localhost:5000/delete/getListByUsername?username=${username}`).then(
                response => {
                  this.deleteList = response.data.deleteList;
                }).catch(
                error => {
                  console.log(error.message);
                })
          }
        }
    }
</script>

<style scoped>
  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* 使容器铺满整个视口高度 */
    color: #b4bac3;
  }
  .main{
    width: 500px;
    min-width: 500px;
    min-height: 700px;
    height: 700px;
    border-radius: 2px; /* 设置圆角边框 */
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5); /* 添加阴影效果 */
    overflow: hidden;
  }
  .header{
    width: 500px;
    height: 60px;
  }
  .header2{
    position: relative;
    top: 7px;
    left: 13px;
    color: #979ca4;
  }
  .search{
    position: relative;
    left: -11px;
    width: 110px;
  }
  .el-icon-search{
    position: relative;
    left: -4px;
  }
  .recover{
    position: relative;
    left: -20px;
  }
  .delete{
    position: relative;
    right:15px;
  }
  .el-icon-refresh-left{
    font-size: 14px;
  }
  .content{
    position: relative;
    right:-40px;
    width: 400px;
    display: inline-block;
    word-break: break-all;
    white-space: normal;
  }
</style>