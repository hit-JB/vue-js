<template>
  <div class="m-content">
    <h1>欢迎来到博客页面</h1>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar" v-show="hasLogin"></el-avatar>
      <div ><a href="#" @click = 'editUserInfo'>{{user.username}}</a></div>
    </div>
    <div class="maction">

      <span> <el-link href="/blogs">主页</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link type="success" href="/blog/add">发表博客</el-link></span>


      <span v-show="hasLogin">
         <el-divider direction="vertical"></el-divider>
        <el-link type="danger" @click="logout">退出</el-link>
      </span>
      <el-divider direction="vertical"></el-divider>
      <span>
        <el-link type="primary" href="/login">登陆</el-link>
      </span>

    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data(){
    return {
      user:{
        username:'请先登陆',
        avatar:'http://localhost:8080/static/head/img.png',
      },
      hasLogin:false
    }
  },
  methods:{
    editUserInfo(){
      if(this.hasLogin){
        this.$router.push('/userEdit')
      }else{
        alert('请先登录');
        return false;
      }
    },
    logout(){
      //可以不请求后端从redis里面删除信息，直接从内存中删除信息,如果后端jwt有状态则要删除
      const that = this;
      that.$axios.get('/logout',{//固定了url请求的基本地址
        headers:{
          "Authorization":localStorage.getItem("token")
        }
      }).then(res=>{
        that.$store.commit("REMOVE_INFO")
        that.$router.push('/login')
      })
    }
  },
  created() {//页面创建的时候就会调用的一个方法
    if(this.$store.getters.getUser.username){
      this.user.username = this.$store.getters.getUser.username
      this.user.avatar = this.$store.getters.getUser.avatar
      this.hasLogin = true;
    }
  }
}
</script>

<style scoped>
.m-content{
  margin: 0 auto;
  max-width: 960px;
  text-align: center;
}
.maction{
  margin: 10px 0;
}
</style>
