<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 课程管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <span>添加课程： </span>
                <el-input
                    v-model="searchCourse.name"
                    placeholder="课程名"
                    class="handle-input mr10"
                ></el-input>
                <el-input
                    v-model="searchCourse.des"
                    placeholder="描述"
                    class="handle-input mr10"
                ></el-input>
                <el-button
                    type="primary"
                    icon="el-icon-search"
                    @click="addCourseF"
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
                    prop="courseName"
                    label="课程名"
                    width="200"
                ></el-table-column>
                <el-table-column prop="courseDese" label="描述"></el-table-column>
                <el-table-column prop="teacherName" label="老师"></el-table-column>
                <el-table-column prop="createDate" label="创建时间"></el-table-column>
                <el-table-column label="操作">
                    <template v-slot="scope">
                        <el-button type="text" size="small" @click="gotoText(scope.row.id)">编辑章节</el-button>
                        <el-button type="text" size="small" @click="delCourse(scope.row.id)">删除</el-button>
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
        <el-dialog title="编辑" v-model="editVisible" width="80%">
            <el-form ref="form" :model="chapterText" label-width="70px">
                <el-form-item label="课件名称">
                    <el-input v-model="chapterText.chapterName"></el-input>
                </el-form-item>
                <el-form-item label="课件描述">
                    <el-input v-model="chapterText.chapterDese"></el-input>
                </el-form-item>
                <el-form-item label="课件地址">
                    <el-input v-model="chapterText.chapterUrl"></el-input>
                </el-form-item>
                <el-form-item label="视频地址">
                    <el-input v-model="chapterText.chapterVideoUrl"></el-input>
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
import { addCourse, searchCourseList, delCourse} from "../api/course";
import { createChatper } from '../api/chapter'
import { getInfo } from "../utils/tools";
export default {
    data() {
        return {
            query: {
                pageIndex: 1,
                pageSize: 10,
            },
            searchCourse:{
                name:"",
                des:""
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            chapterText:{
                courseId:"",
                chapterName:"",
                chapterDese:"",
                chapterUrl:"",
                chapterVideoUrl:""
            },
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        async getData() {
           const teacherId = getInfo('ID');
           const {errCode, data: {datas}} = await searchCourseList({pageNum:this.query.pageIndex, pageSize:this.query.pageSize, teacherId})
            if(errCode === "0"){ 
                this.tableData = datas
             }
        },

        async delCourse(id){
            const {errCode, data} = await delCourse({id})
            if(errCode === "0"){ 
                this.$message.success(data)
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
        async addCourseF(){
            const {data,errCode} = await addCourse({
                courseName:this.searchCourse.name,
                courseDese: this.searchCourse.des,
                teacherId:  getInfo('ID'),
                teacherName: getInfo('userName'),
            })
            if(errCode === "0"){ this.$message.success("添加成功"); }
            console.log(data)
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = "";
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + " ";
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
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
