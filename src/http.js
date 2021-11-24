/**
 * ajax请求配置
 */
import axios from 'axios'
import Element from 'element-ui'
import Vue from 'vue'
import store from './store'
import router from './router'
axios.defaults.baseURL = 'http://localhost:8080';
axios.interceptors.request.use(config=>{
  //前置拦截
  console.log('---------------')
  console.log('前置请求拦截');
  console.log('---------------')
  return config;
})

var vue = new Vue;   // 实例化一个新的vue对象，用于绑定toast插件

// axios默认配置
//axios.defaults.timeout = 5000;          // 超时时间

//**整理数据格式**

// **路由请求拦截**
// http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     //config.data = JSON.stringify(config.data);
//     config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//     //判断是否存在ticket，即判断用户是否登录，如果存在的话，则每个http header都加上ticket
//     if (cookie.get("ticket")) {
//       //用户每次操作，都将cookie设置成2小时
//       cookie.set("ticket", cookie.get("ticket"),1/12)
//       //每个http header都加上ticket
//       **config.headers.ticket = cookie.get("ticket");**
//       //每个http header都加上personnelid
//       if(sessionStorage.loginStaffInfo){
//         config.headers.personnelid = sessionStorage.personnelid;
//       }
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error.response);
//   });

// **路由响应拦截**
// http response 拦截器
axios.interceptors.response.use(
  response => {
    let res = response.data;
    console.log('---------------')
    console.log('后置拦截并打印数据')
    console.log('---------------')

    if(res.code===200){
      return response;
    }else{
      console.log(res)
      Element.Message.error(res.msg,{duration:3*1000});
      return Promise.reject(res.msg);
    }

  },
  error => {
    //console.log(error)
    // if(error.response.data){
    //   error.message = error.response.data.message
    // }
    if(error.response.status===401){
      store.commit('REMOVE_INFO')
      router.push("/login")
    }
    Element.Message.error(error.message,{duration:3*1000});
    return Promise.reject(error)   // 返回接口返回的错误信息
  });
export default axios;
