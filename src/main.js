import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import {initMenu} from "./utils/menus";
import axios from "axios";
import VueAxios from "vue-axios";


import './assets/css/global.css'
//导入awesome图标库
import 'font-awesome/css/font-awesome.css'
//导入api的全局函数
import {postKeyValueRequest,getRequest,postRequest,putRequest,deleteRequest} from './utils/api'

Vue.config.productionTip = false
Vue.use(VueAxios,axios)
Vue.prototype.postKeyValueRequest =postKeyValueRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest =postRequest;
Vue.prototype.putRequest =putRequest;
Vue.prototype.deleteRequest =deleteRequest;

// 路由的前置导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next()
  } else {
    if(window.sessionStorage.getItem('user')) {
      initMenu(router, store)
      console.log(to)
      console.log(from)
      next()
    } else {
      // 未登录用户跳转到登录页
      next('/?redirect=' + to.path)
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
