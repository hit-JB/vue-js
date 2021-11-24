// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'//自动扫描路由配置文件
import ElementUI from 'element-ui';
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import axios from './http'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
//import './permission'
//导入路由包，
//显示的声明，
//
require('es6-promise').polyfill();
require('es6-promise/auto');

//配置要使用的类
Vue.use(ElementUI);
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.prototype.$axios = axios//将这个包定义为原型对象，使得所有vue对象都可以引用它
Vue.prototype.$store = store
//表示组件的名称引用，类似于全局方法
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//全局
  data:{
    message:'data1'
  },
  components: { App },
  template:
      '<App v-bind:message="message"/>',//这里决定模板是否在主页显示
  methods:router.beforeEach(((to, from, next) => {
    if(to.meta.requireAuth){
      if(localStorage.getItem('token')===''){
      next({
        path:'/login'//钩子函数，又相当于切面函数，在每次进入路由之前会执行
      })}
      else{
        next();
      }
    }else{
      next();
    }
  }))
})
