<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">注册页面</div>
            <el-form label-width="80px" :model="formLabelAlign">
            <el-form-item label="用户名">
                <el-input v-model="formLabelAlign.userId"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="formLabelAlign.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formLabelAlign.userPw"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input v-model="formLabelAlign.userPw1"></el-input>
            </el-form-item>
            <el-form-item label="角色">
                  <el-radio-group v-model="formLabelAlign.userRole">
                    <el-radio label="1">教师</el-radio>
                    <el-radio label="0">学生</el-radio>
                  </el-radio-group>
            </el-form-item>
            </el-form>
            <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">注册</el-button>
                </div>
        </div>
    </div>
</template>

<script>
import { register } from "../api/index";
import { saveInfo } from "../utils/tools";
export default {
    data() {
        return {
            formLabelAlign: {
                userId: '',
                userPw: '',
                userName: '',
                userRole: '',
                }
        };
    },
    created() {
        this.$store.commit("clearTags");
    },
    methods: {
        async submitForm() {
          if(this.formLabelAlign.userPw != this.formLabelAlign.userPw1) { 
               this.$message({
                    message: '密码不一致',
                    type: 'error'
                    });
                return
          }
         const {data} = await register({
              userId:this.formLabelAlign.userId,
              userPw: this.formLabelAlign.userPw,
              userName: this.formLabelAlign.userName,
              userRole: this.formLabelAlign.userRole,
          })
          if(data){
              this.$message.success('注册成功');
               if(this.param.userRole==="0"){
                            saveInfo("userType",data.userRole)
                            saveInfo("userName",data.name);
                            saveInfo("ID",data.id);
                        }
              this.$router.push("/");
          }
        }

        
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    padding: 20px;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.6);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}

.ms-title{
    margin-bottom: 10px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>