<template>
  <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="头像" prop="avatar">
          <div class="demo-basic--circle">
            <el-avatar  :src="ruleForm.avatar" ></el-avatar>
          </div>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" @blur = "checkName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" @blur = "sendEmail"></el-input>
        </el-form-item>
        <el-form-item label="原密码" prop="password">
           <el-input type="password" v-model="ruleForm.password" @blur = "checkPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_password">
          <el-input type="password" v-model="newPassword" @blur="checkNewPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm_password">
          <el-input type="password" v-model="confirmPassword" @blur="checkSame"></el-input>
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
  name: "UserEdit",
  data() {
    return {
      ruleForm: {
        username: '',
        avatar: '',
        email: '',
        password:''
      },
      oldName:'',
      newPassword:'',
      confirmPassword:'',
      heads:{

      },
      rules: {
        username: [
          {required: true, message: '请输入注册用户名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
      },
    }
  },
  methods:{
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
    checkSame(){
      if(this.confirmPassword!==this.newPassword){
        alert('两次输入的密码不一致，请重新输入')
        this.confirmPassword=''
      }
    },
    checkPassword(){
      var that = this;
      this.$axios.post('http://localhost:8080/login',{
          username:that.oldName,
          password:that.ruleForm.password
      }).then(res=>{
        if(res.data.code===400) {
          alert('密码不正确')
          that.ruleForm.password = ''
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
    checkNewPassword(){
      if(this.newPassword==='')
      {
        this.$message({
          message: '新密码不能为空',
          type: 'error'
        })
      }
      else if(this.newPassword.length<3 || this.newPassword.length >8){
        this.$message({
          message: '密码长度必须在3-8个字符之间',
          type: 'error'
        })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        var that = this
        if (valid && this.confirmPassword===this.newPassword) {
          this.ruleForm.password = this.newPassword
          this.$axios.post('http://localhost:8080/user/changeUser',this.ruleForm,{
            headers:{
              "Authorization":localStorage.getItem("token")
            }
          }).then(response=>{//跨域请求无法获得响应头,跨域请求的问题，如何设置
            //可以在响应头里获取
            alert("信息更改成功，请重新登录")
            that.$router.push("/login");
          })
        } else {
          alert('两次输入的密码不一致');
          this.confirmPassword=''
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
    this.$axios.get('http://localhost:8080/user/edit',{
      headers:{
        "Authorization":localStorage.getItem("token")
      }
    }).then(res=>{
      this.ruleForm = res.data.data;
      this.oldName = res.data.data.username
      console.log(this.oldName)
    })
    this.$axios.get('http://localhost:8080/user/heads').then(res=>{
      this.heads = res.data.data

    })
  }
}
</script>

<style scoped>

</style>
