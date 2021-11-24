import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
//相当于放全局变量的仓库
export default new Vuex.Store({
  state:{
    token:localStorage.getItem("token"),
    userInfo:JSON.parse(sessionStorage.getItem("userInfo")),
  },
  mutations:{
    //相当于java里面的set方法
    SET_TOKEN:((state, token) =>{
      state.token = token;
      localStorage.setItem("token",token);
    } ),
    SET_USERINFO:((state, userInfo) =>{
      state.userInfo = userInfo;
      sessionStorage.setItem("userInfo",JSON.stringify(userInfo));
    } ),
    REMOVE_INFO:((state, payload) => {
      state.token='';
      state.userInfo={};
      localStorage.setItem("token",'');
      sessionStorage.setItem("userInfo",JSON.stringify(''));
    })
  },
  getters:{
    getUser:state => {
      return state.userInfo;
    },
    getToken: state=>{
      return state.token
    }
  },
  actions:{},

})
