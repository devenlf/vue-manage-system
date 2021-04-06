<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover" class="mgb20" style="height:403px;">
                    <div class="class-info">
                        <video controls>
                            <source src="movie.mp4" type="video/mp4">
                            <source src="movie.ogg" type="video/ogg">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover" style="height:403px;">
                    <template #header>
                        <div class="clearfix">
                            <span>课程简介</span>
                        </div>
                    </template>

                    <div style="height:290px;">{{chapterInfo.chapterDese}}</div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                        <template #header>
                        <div class="clearfix">
                            <span>讨论区</span>
                        </div>
                    </template>
                    <div class="teacherSpan">
                        <template v-for="item in dataList" :key="item.id">
                            <span>{{item.commentContent}}</span>
                        </template>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <template #header>
                        <div class="clearfix">
                            <span>提出问题</span>
                        </div>
                    </template>
                    <div class="teachers">
                        <el-input v-model="editCommentContent" placeholder="请输入内容"></el-input>
                        <el-button type="primary" @click="publishData">发布 </el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="收货地址" :visible="dialogTableVisible">
          <el-input v-model="editCommentContent1"/>
        </el-dialog>
    </div>
</template>

<script>
import { queryChapterInfo } from '../api/chapter'
import { queryComments, sumitComment } from '../api/comment'
import { getInfo } from '../utils/tools'
export default {
    name: "course",
    data() {
        return {
            name: localStorage.getItem("ms_username"),
            chapterInfo: {
            },
            editCommentContent:"",
            editCommentContent1:"",
            dataList:[],
            dialogTableVisible:false,
        };
    },
    mounted(){
        this.queryChapterInfo()
        this.queryComments()
    },
    methods: {
        async queryChapterInfo() {
            const { errCode, data} = await queryChapterInfo({id:this.$route.params.id})
            if(errCode === "0"){
                this.chapterInfo = {...data}
            }
        },

        gotoCharpt() {
            console.log(13213213)
            this.dialogTableVisible = !this.dialogTableVisible;
        },
        async queryComments() {
            const { errCode, datas} = await queryComments({id:this.$route.params.id})
            if(errCode === "0"){
                this.dataList = datas;
            }
        },

        async publishData(){
            let userName = getInfo('userName');
            let userId = getInfo('ID')
            let chapterId = this.$route.params.id
            let {errCode,data} = await sumitComment({
                commentContent: this.editCommentContent,
                userName,
                userId,
                chapterId
            })
            if(errCode === "0"){
                this.$message.successs(data)
            }
        }
        // handleListener() {
        //     bus.$on('collapse', this.handleBus);
        //     // 调用renderChart方法对图表进行重新渲染
        //     window.addEventListener('resize', this.renderChart);
        // },
        // handleBus(msg) {
        //     setTimeout(() => {
        //         this.renderChart();
        //     }, 200);
        // },
        // renderChart() {
        //     this.$refs.bar.renderChart();
        //     this.$refs.line.renderChart();
        // }
    },
};
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}

.class-info{
    background: #fff;
    height: 349px;
    width: 100%;
}

.class-info video{
    height: 100%;
    width: 100%;
}

.teachers{
    display: flex;
}




.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
