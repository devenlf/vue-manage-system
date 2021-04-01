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
                        <el-button type="text" size="small" @click="workCommentActive(scope.row.id)">批改</el-button>
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
        </div>
            <!-- 编辑弹出框 -->
        <el-dialog title="作业审批" v-model="editVisible" width="80%">
            <el-form ref="form" :model="workComment" label-width="70px">
                <el-form-item label="课件名称">
                    <el-input v-model="workComment"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit"
                        >确 定</el-button
                    >
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { reviewHomeWork, queryDoneHomeWork, createWork} from "../api/work";
import { createChatper } from '../api/chapter'
import { getInfo } from "../utils/tools";
export default {
    data() {
        return {
            workContent:"",
            workComment:"",
            query:{
                pageIndex:1,
                pageSize:10,
            },
            tableData:[],
            userType:"",
        };
    },
    created() {
        this.userType = getInfo('username')
        this.getData()
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

        async workCommentActive(id) {
            const {errCode, data} = await reviewHomeWork({id,workComment:this.workComment})
            if(errCode === "0"){ 
                this.$message.success(data)
             }
            
        },

        async addWork(){
            const {errCode, errMsg} = await createWork({workContent:this.workContent,techerId: getInfo('ID'), techerName: getInfo('userName')})
            if(errCode === "0"){ 
                this.$message.success(errMsg)
             }
        },

        gotoText(id){
            this.editVisible=true;
            this.chapterText.courseId = id;
        },

        async saveEdit(){
            const {errCode, errMsg} = await createChatper({...this.chapterText,courseId:this.chapterText.courseId})
            if(errCode === "0"){ 
                this.$message.success(errMsg)
             }
            
        },
        
        // 删除操作
        handleDelete(index) {
            // 二次确认删除
            this.$confirm("确定要删除吗？", "提示", {
                type: "warning",
            })
                .then(() => {
                    this.$message.success("删除成功");
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
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
