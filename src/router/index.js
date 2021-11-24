import Vue from "vue";
import VueRouter from "vue-router";
import Blogs from "../components/Blogs";
import BlogEdit from "../components/BlogEdit";
import BlogDetail from "../components/BlogDetail";
import Login from "../components/Login";
import Register from "../components/Register";
import UserEdit from "../components/UserEdit";
//安装路由,导入，安装
Vue.use(VueRouter);
//配置导出路由
let router =  new VueRouter({
  mode: 'history',
  routes:[
    {
      path:'/',
      name:'blogs',
      component:Blogs
    },
    {
      path:'/blogs',
      name:'blogs',
      component:Blogs
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },//路由配置有一定的顺序注意顺序要区别开来
    {
      path:'/blog/add',
      name:'blogAdd',
      component:BlogEdit,
      meta:{
        requireAuth:true
      }
    },
    {
      path:'/blog/:blogId',
      name:'blogDetail',
      component:BlogDetail
    },
    {
      path:'/blog/:blogId/edit',
      name:'blogEdit',
      component:BlogEdit,
      meta:{
        requireAuth:true
      }
    },
    {
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path:'/userEdit',
      name:'userEdit',
      component:UserEdit,
      meta:{
        requireAuth:true
      }
    }
  ]
});
export default router
// router.beforeEach((to, from, next) => {
//   let islogin = localStorage.getItem("islogin");
//   console.log(islogin);
//   console.log(to.path);
//   islogin = Boolean(Number(islogin));
//
//   if(to.path == "/login"){
//     if(islogin){
//       next("/main/form/radio");
//     }else{
//       next();
//     }
//   }else{
//     // requireAuth:可以在路由元信息指定哪些页面需要登录权限
//     if(to.meta.requireAuth && islogin) {
//       next();
//     }else{
//       next("/login");
//     }
//   }
// })

