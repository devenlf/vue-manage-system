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
                <el-select
                    v-model="courseType"
                    @change="changeData"
                    class="handle-select mr10"
                >
                    <el-option
                        key="1"
                        label="未完成作业"
                        value="1"
                    ></el-option>
                    <el-option
                        key="2"
                        label="已完成"
                        value="2"
                    ></el-option>
                </el-select>
            </div>
            <div v-if="courseType==='1'">
            <el-table
                :data="unSeletedWorkArr"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="techerName" label="老师"></el-table-column>
                <el-table-column prop="workContent" label="描述"></el-table-column>
                <el-table-column prop="createDate" label="创建时间"></el-table-column>
                <el-table-column label="操作">
                    <template v-slot="scope">
                        <el-button type="text" size="small" @click="handleEdit(scope.row)">做作业</el-button>
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
            <div v-else>
            <el-table
                :data="workArr"
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
                        <el-button type="text" size="small" @click="cancelCourse(scope.row.id)">取消</el-button>
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
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-form ref="form" label-width="70px">
                <el-form-item label="回答">
                    <el-input v-model="workContent"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="doHomeWork"
                        >确 定</el-button
                    >
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { cancelCourse } from "../api/course";
import { getInfo } from "../utils/tools"
import { queryWorksPage, queryDoneHomeWork, doHomeWork } from '../api/work'
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
            workContent:"",
            courseType:"1",
            unSeletedWorkArr: [],
            workArr:[],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
        };
    },
    created() {
        this.getUnWorksData();
    },
    methods: {
        changeData(){
            if(this.courseType==="1"){
                this.getUnWorksData()
            }else{
                this.getWorkData()
            }
        },
        // 获取 easy-mock 的模拟数据
        async getUnWorksData() {
           const {errCode,data:{datas}} = await queryWorksPage({pageNum:this.query.pageIndex, pageSize:this.query.pageSize})
            if(errCode === "0"){ 
                this.unSeletedWorkArr = datas
             }
        },
         async getWorkData() {
           const {errCode,data:{datas}} = await queryDoneHomeWork({pageNum:this.query.pageIndex, pageSize:this.query.pageSize, userId:getInfo('ID')})
            if(errCode === "0"){ 
                this.workArr = datas
             }
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, "pageIndex", 1);
            this.getData();
        },
        async doHomeWork(val){
            const {errCode,errMsg} = await doHomeWork({
                    courseId:val.courseId, 
                    userId:val.id,
                    workContent: this.workContent,
                    userName:getInfo('userName')
                })
            if(errCode === "0"){ 
                this.editVisible = false
                this.$message.success(errMsg)
             }
        },
        async cancelCourse(id){
            const {errCode,errMsg} = await cancelCourse({
                id
                })
            if(errCode === "0"){ 
                this.$message.success(errMsg)
             }
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
        // 编辑操作
        handleEdit(row) {
            console.log(row)
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, "pageIndex", val);
            this.getData();
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
