import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from "axios";
import VueAxios from "vue-axios";
import './assets/css/global.css'
//导入api的全局函数
// import {postKeyValueRequest} from './utils/api'

Vue.config.productionTip = false
Vue.use(VueAxios,axios)
// Vue.prototype.postKeyValueRequest =postKeyValueRequest;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
