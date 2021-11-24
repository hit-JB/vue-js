<template>
  <div>
    <Header/>
    <div class="m-blog">
      <h2>{{blog.title}}</h2>
      <el-link icon="el-icon-edit" v-show="blog.ownBlog===true">
        <router-link :to="{name:'blogEdit',params:{blogId:blog.id}}">
          编辑
        </router-link>
      </el-link>
      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>
    </div>

  </div>
</template>

<script>
import Header from "./Header";
import "github-markdown-css/github-markdown.css"
export default {
  data(){
    return {
      blog:{
        ownBlog:false,
        title:'moren',
        content:"nerong"
      }
    }
  },
  name: "BlogDetail",
  components: {Header},
  created() {
    const blogId = this.blogId = this.$route.params.blogId
    const that = this
    if (blogId) {
      this.$axios.get('/blogs/' + blogId).then(res => {
        const blog = res.data.data;
        that.blog.id = blog.id
        that.blog.title = blog.title
        var markDownIt = require("markdown-it")
        var md = new markDownIt()
        var result = md.render(blog.content)
        that.blog.content = result
        that.blog.ownBlog = (blog.userId === that.$store.getters.getUser.id)
      })
    }
  }
}
</script>

<style scoped>
.m-blog{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  width: 100%;
  min-height: 700px;
  padding: 20px 15px;
}
</style>
