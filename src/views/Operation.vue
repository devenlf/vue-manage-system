<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-warn"></i>课后作业</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <h1>管理员权限页面</h1>
            <p class="question">只有用 admin 账号登录的才拥有管理员权限，才能进到这个页面，其他账号想进来都会跳到403页面，重新用管理员账号登录才有权限。</p>
            <h1>回答</h1>
            <p class="answer">
                <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="textarea">
                </el-input>
            </p>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                textarea: ''
            }
        }
    }
</script>

<style scoped>
h1{
    text-align: left;
    margin: 30px 0;
}
p{
    line-height: 30px;
    margin-bottom: 10px;
    text-indent: 2em;
}
.logout{
    color: #409EFF;
}
</style>