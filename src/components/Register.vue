<template>
  <div>
    <el-row class="demo-avatar">
      <div v-for="(img,key) in heads">
      <el-col :span="5">
        <div class="sub-title" @click="selectHead(img,key)">{{key}}</div>
        <div class="demo-basic--circle">
            <el-avatar  :src="img" >
            </el-avatar>
        </div>
      </el-col>
      </div>
    </el-row>


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" @blur = "checkName"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" @blur="sendEmail"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input  type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="cpassword">
        <el-input  type="password" v-model="confirmPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      ruleForm: {
       username:'',
        password:'',
        email:'',
        avatar:'',
      },
      circleUrl: "http://localhost:8080/static/head/img.png",
      sizeList: ["large", "medium", "small"],
      confirmPassword: '',
      rules: {
        username: [
          { required: true, message: '请输入注册用户名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        confirmPassword:[
          {required:true, message:'请确认密码输入',trigger: 'change' }
        ]
      },

      heads:{

      }
    };
  },
  methods: {
    selectHead(img,key){
      this.ruleForm.avatar = img
      alert("你选择的头像为"+key)
      console.log(this.ruleForm.avatar)
    },
    checkName(){
      this.$axios.get('http://localhost:8080/user/findUser?username='+this.ruleForm.username).then(response=>{
        if(response.data.code !== 200){
          console.log('用户名已存在')
          this.$message({
            message: '用户名已存在',
            type: 'error'
          })
          this.ruleForm.username=''
        }
      })
    },
    sendEmail(){
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (this.ruleForm.email !== '' && !regEmail.test(this.ruleForm.email)) {
        this.$message({
          message: '邮箱格式不正确',
          type: 'error'
        })
        this.ruleForm.email = ''
    }},
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        var that = this
        if (valid && this.confirmPassword===this.ruleForm.password) {
          this.$axios.post('http://localhost:8080/user/register',this.ruleForm).then(response=>{//跨域请求无法获得响应头,跨域请求的问题，如何设置
            //可以在响应头里获取
            console.log(response.data.data)
            that.$router.push("/login");
          })
        } else {
          if(this.confirmPassword!==this.ruleForm.password)
            alert('两次输入的密码不一致');
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.confirmPassword='';
    }
  },
  created() {
    this.$axios.get('http://localhost:8080/user/heads').then(res=>{

      this.heads = res.data.data
      console.log(this.heads)
    })
  }
}
</script>

<style scoped>


</style>
