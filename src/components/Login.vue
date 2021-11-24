<template>
<!--  template 元素下面只能有一个标签，一般是div-->
  <div>
    <el-container>
      <el-header>
        <!-- 发起一个静态资源请求 -->
<!--        <img class="logo" src="http://localhost:8080/static/head/img.png" alt="">-->
      </el-header>
      <el-main><el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button @click="register">注册</el-button>
        </el-form-item>
      </el-form></el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: 'markerhub',
        password: '111111',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {//这是一个坑，无法表单校验，待填补
        if (valid) {
          const that = this;
          this.$axios.post('http://localhost:8080/login',this.ruleForm).then(response=>{//跨域请求无法获得响应头,跨域请求的问题，如何设置
            //可以在响应头里获取
            const jwt = response.headers['authorization'];
            const userInfo = response.data.data
            console.log(userInfo)
            that.$store.commit("SET_TOKEN",jwt);//将授权信息保存到本地
            that.$store.commit("SET_USERINFO",userInfo);//将会话信息保存到本地
            console.log(that.$store.getters.getUser);
            that.$router.push("/blogs");
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].restFieds();
    },
    register(){
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.demo-ruleForm{
  max-width: 500px;
  margin: 0 auto;
}
.logo{
  height: 60%;
  margin-top: 10px;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
