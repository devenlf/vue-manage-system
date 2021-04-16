<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 作业
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <span>添加作业： </span>
                <el-input
                    v-model="workContent"
                    placeholder="作业内容"
                    class="handle-input mr10"
                ></el-input>
                <el-button
                    type="primary"
                    icon="el-icon-search"
                    @click="addWork"
                    >添加</el-button
                >
            </div>
            <el-row>
              <p>学生已完成作业列表</p>
               <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column
                    prop="workId"
                    label="工作ID"
                    width="200"
                ></el-table-column>
                <el-table-column prop="userName" label="姓名"></el-table-column>
                <el-table-column prop="questionContent" label="问题内容"></el-table-column>
                <el-table-column prop="workContent" label="作业内容"></el-table-column>
                <el-table-column label="操作">
                    <template v-slot="scope">
                        <el-button type="text" size="small" @click="showReview(scope.row.id)">批改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
            </el-row>
              <el-row>
              <p>作业列表</p>
               <el-table
                :data="tableData1"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column
                    prop="id"
                    label="工作ID"
                    width="200"
                ></el-table-column>
                <el-table-column prop="techerId" label="老师ID"></el-table-column>
                <el-table-column prop="techerName" label="姓名"></el-table-column>
                
                <el-table-column prop="workContent" label="作业内容"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query1.pageIndex"
                    :page-size="query1.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
            </el-row>
        </div>
        <div v-if="editVisible">作业回复: <el-input
                    v-model="workComment"
                    placeholder="作业内容"
                    class="handle-input mr10"
                ></el-input>
                <el-button type="text" size="small" @click="workCommentActive">回复</el-button>
                </div>  
    </div>
</template>

<script>
import { reviewHomeWork, queryDoneHomeWork, queryWorksPage, createWork} from "../api/work";
import { getInfo } from "../utils/tools";
export default {
    data() {
        return {
            workContent:"",
            workComment:"",
            workCommentId: 0,
            editVisible: false,
            query:{
                pageIndex:1,
                pageSize:10,
            },
            query1:{
                pageIndex:1,
                pageSize:10,
            },
            tableData:[],
            tableData1:[],
            userType:"",
        };
    },
    created() {
        this.userType = getInfo('username')
        this.getData()
        this.getData1()
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        async getData() {
           const teacherId = getInfo('ID');
           const {errCode,data:{datas}} = await queryDoneHomeWork({pageNum:this.query.pageIndex, pageSize:this.query.pageSize, teacherId})
            if(errCode === "0"){ 
                this.tableData = datas
             }
        },

        async getData1() {
           const teacherId = getInfo('ID');
           const {errCode,data:{datas}} = await queryWorksPage({pageNum:this.query1.pageIndex, pageSize:this.query1.pageSize, teacherId})
            if(errCode === "0"){ 
                this.tableData1 = datas
             }
        },         

        showReview(id){
            this.editVisible = true
            this.workCommentId = id;
        },

        async workCommentActive() {
            const {errCode, data} = await reviewHomeWork({id:this.workCommentId,workComment:this.workComment})
            if(errCode === "0"){ 
                this.$message.success(data)
                this.editVisible = false
             }
            
        },

        async addWork(){
            const {errCode, errMsg} = await createWork({workContent:this.workContent,techerId: getInfo('ID'), techerName: getInfo('userName')})
            if(errCode === "0"){ 
                this.$message.success(errMsg)
             }
        },
    },
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
