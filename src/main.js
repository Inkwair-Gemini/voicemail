import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import { DatePicker } from "ant-design-vue";
import Antd from "ant-design-vue"
import 'ant-design-vue/dist/antd.css';
//引入路由
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
//引入国际化
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
Vue.use(ElementUI);
Vue.use(VueRouter)
Vue.use(Antd);
Vue.use(DatePicker);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

