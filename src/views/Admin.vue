<template>
    <div class="add">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="昵称">
                <el-input v-model="formInline.userName" placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item label="ID">
                <el-input v-model="formInline.userId" placeholder="ID"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formInline.userPw" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addTeacher">添加老师</el-button>
            </el-form-item>
        </el-form>
        <el-card class="box-card">
        <div>
        <p>未审核</p>
         <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="updTime"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="userName"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            >
            <template v-slot="scope">
                <el-button type="text" size="small" @click="handlePass(scope.row.id)">通过</el-button>
                <el-button type="text" size="small" @click="handleUnPass(scope.row.id)">未通过</el-button>
            </template>
            </el-table-column>
            </el-table>
          </div>

        <div>
         <p>审核通过</p>
             <el-table
            :data="tableData1"
            style="width: 100%">
            <el-table-column
                prop="updTime"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="userName"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
            label="操作"
            >
            <template v-slot="scope">
                <el-button type="text" size="small" @click="handledl(scope.row.id)">删除</el-button>
            </template>
            </el-table-column>
            </el-table>
        </div> 
</el-card>

    </div>

</template>

<script>
import { queryTeachersPage, pass, deleteA } from "../api/user";
import { addTeacher } from "../api/index";

    export default {
        name: 'admin',
        data() {
            return {
              totle:"0",
              userReviewStatus:"0",
              pageInfo:{
                    pageNum:"1",
                    pageSize:"10",
              },
               formInline:{
                   userId:"",
                   userPw:"",
                   userName:""
               },
                tableData: [],
                tableData1:[]
            }
        },
        methods: {
            goStudy(index) {
                console.log(index)
            },
            async handlePass(id){
                let {errCode} = await pass({id:id,userReviewStatus:"1"})
                if(errCode==="0") this.$message.success("设置成功");
            },
            async handledl(id){
                let {errCode} = await deleteA({id:id})
                if(errCode==="0") this.$message.success("删除成功");
            },
            async handleUnPass(id){
                let {errCode} = await pass({id:id,userReviewStatus:"0"})
                if(errCode==="0") this.$message.success("设置成功");

            },

            async addTeacher(){
                let {errCode} = await addTeacher(this.formInline)
                if(errCode==="0") this.$message.success("添加成功");
            },
            
            async getUnpassData(){
               let {errCode,data} = await queryTeachersPage({...this.pageInfo,userReviewStatus:"0"})
                if(errCode==="0"){
                    this.tableData = data.datas;
                }
            },
            async getpassData(){  
               let {errCode,data} = await queryTeachersPage({...this.pageInfo,userReviewStatus:"1"})
                if(errCode==="0"){
                    this.tableData1 = data.datas;
                }
            },
        },
        mounted(){
            this.getUnpassData();
            this.getpassData()
        },
        computed: {
            unreadNum(){
                return this.unread.length;
            }
        }
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
</style>

