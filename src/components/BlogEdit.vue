<template>
  <div>
    <Header/>
    <div class="content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="博客标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content" class="m-content">
          <mavon-editor v-model="ruleForm.content"></mavon-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
export default {
  name: "BlogEdit",
  components: {Header},
  data() {
    return {
      ruleForm: {
       blogId:'',
       id:'',
       title:'',
       description:'',
       content:'',
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入摘要', trigger: 'change' }
        ],
        content: [
          {message: '请输入内容', trigger: 'change' }//验证date属性出错，去掉大特属性校验
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const that = this;
          console.log(this.ruleForm)
          this.$axios.post('/blogs/edit',this.ruleForm,{
            headers:{
              "Authorization":localStorage.getItem("token")
            }
          }).then(res=>{
            console.log(res);
            this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                that.$router.push("/blogs")
              }
          })
        }
      )}})},
    resetForm(formName){
      this.$refs[formName].resetFields();
    }
  },
  created() {
    const blogId = this.blogId = this.$route.params.blogId
    const  that = this
    if(blogId){
      this.$axios.get('/blogs/'+blogId).then(res=>{
        const blog = res.data.data;
        that.ruleForm.id = blog.id
        that.ruleForm.blogId = blog.blogId
        that.ruleForm.title = blog.title
        that.ruleForm.content = blog.content
        that.ruleForm.description = blog.description
      })
    }
  }
}
</script>

<style scoped>
.m-content{
  text-align: center;
}
</style>
