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
        <div class="clearfix">
            <p>老师列表</p>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="状态">
                <el-select v-model="userReviewStatus" @change="changeInfo" placeholder="活动区域">
                <el-option label="未审核" value="0"></el-option>
                <el-option label="审核" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addTeacher">查询</el-button>
            </el-form-item>
        </el-form>
        </div>
        <template v-if="userReviewStatus==='0'">
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
            <el-pagination
                :page-size="pageSize"
                :page-count="pageNum"
                :total="totle">
            </el-pagination>
          </template>

        <template  v-else>
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
                <el-button type="text" size="small" @click="handledl(scope.row.id)">删除</el-button>
            </template>
            </el-table-column>
            </el-table>
               <el-pagination
                :page-size="pageSize"
                :page-count="pageNum"
                :total="totle">
            </el-pagination>
        </template> 
</el-card>
    <el-card>
        <p>课程列表</p>
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
            <el-pagination
                :page-size="pageSize"
                :page-count="pageNum"
                :total="totle">
            </el-pagination>
          </template>
    </el-card>
    </div>
    <div>

    </div>
</template>

<script>
import { queryTeachersPage, pass, deleteA, addTeacher } from "../api/user";
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
                tableData: [{
                    updTime: '2016-05-02',
                    userName: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    updTime: '2016-05-04',
                    userName: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }]
            }
        },
        methods: {
            goStudy(index) {
                console.log(index)
            },
            changeInfo(){
                this.pageInfo.pageNum = 1;
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
               let {errCode,data} = await queryTeachersPage({...this.pageInfo})
                if(errCode==="0"){
                    this.totle = data.total;
                    this.tableData = data.datas;
                    this.pageInfo.pageNum = data.pageNum;
                    this.pageInfo.pageSize = data.pageSize;
                }
            }
        },
        mounted(){
            this.getUnpassData()
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

