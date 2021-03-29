<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 学习课时</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
              <el-table :data="chapterListData" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template #default="scope">
                                <span class="message-title">{{scope.row.chapterName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="date" width="180"></el-table-column>
                        <el-table-column width="120">
                            <template #default="scope">
                                <el-button size="small" @click="goChapterInfo(scope.row.chapterId)">学习</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
        </div>
    </div>
</template>

<script>
// queryChapterInfo
import { queryChapterList } from '../api/chapter'
    export default {
        name: 'lesson',
        data() {
            return {
                message: 'first',
                showHeader: false,
                chapterListData: []
            }
        },
        mounted(){
            this.queryChapterList()
        },
        methods: {
            async queryChapterList(){
                const {errCode, datas} = await queryChapterList({courseId:this.$route.params.courseId});
                if(errCode === "0"){
                    this.chapterListData = datas;
                }
                
            },
            async goChapterInfo(id){
                this.$router.push({ name: 'lessonDetails', params: { id }})
            },
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

