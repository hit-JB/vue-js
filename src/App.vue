<template>
<!--  注意这个id和主页的id不是同一个id-->
  <div id="app1">
<!--    <h1>This is about page</h1>-->
<!--    <el-button>按钮</el-button>-->
    <router-view></router-view>
  </div>
</template>

<script>
import BlogEdit from "./components/BlogEdit";
import BlogDetail from "./components/BlogDetail";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Header from "./components/Header";
import Register from "./components/Register";
import UserEdit from "./components/UserEdit";
import Element from 'element-ui'
export default {
  name: 'App',
  props:['message'],
  components: {
    Blogs,
    BlogEdit,
    BlogDetail,
    Login,
    Header,
    Register,
    UserEdit
  }
}
</script>

<style>
/*#app1 {*/
/*  max-width: 960px;*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin: 60px auto 0;*/
/*}*/
</style>
