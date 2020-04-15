import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button,Form,FormItem,Input,Message} from "element-ui";

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Message)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
