<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.userId" placeholder="username">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.userPw"
                        @keyup.enter="submitForm()"
                    >
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="角色">
                  <el-radio-group v-model="param.userRole">
                    <el-radio label="1">教师</el-radio>
                    <el-radio label="2">学生</el-radio>
                    <el-radio label="3">管理员</el-radio>
                  </el-radio-group>
                  
            </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <div class="login-btn">
                    <el-button type="primary" @click="registerForm()">注册</el-button>
                </div>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
import { login } from "../api/index";
import { saveInfo } from "../utils/tools";
export default {
    data() {
        return {
            param: {
                userId: "",
                userPw: "",
                userRole:"1"
            },
            rules: {
                userId: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                userPw: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            }
        };
    },
    created() {
        this.$store.commit("clearTags");
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(async(valid) => {
                if (valid) {
                 if(this.param.userRole === '3'){
                    if(this.param.userId==='admin'&&this.param.userPw === 'admin123'){
                        this.$message.success("登录成功");
                        saveInfo("userType",this.param.userRole)
                        saveInfo("userName",'admin');
                        saveInfo("ID",'0');
                        this.$router.push("/admin");
                    }
                  }else{
                    const {errCode,data} = await login({...this.param})
                    if(errCode==="0"){
                        this.$message.success("登录成功");
                        saveInfo("userType",data.userRole)
                        saveInfo("userName",data.userName);
                        saveInfo("ID",data.id);
                        this.$router.push("/");
                        if(data.userRole === '1'){
                            this.$router.push('/courseT')
                        }else if(data.userRole === '2'){
                             this.$router.push('/course')
                        }
                    }else{
                        this.$message.error(data);
                    }
                  }
                } else {
                    this.$message.error("请输入账号和密码");
                    return false;
                }
            });
        },
        registerForm(){
            this.$router.push("/register");
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
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
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