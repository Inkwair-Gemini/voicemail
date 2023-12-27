import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import { DatePicker } from "ant-design-vue";
import Antd from "ant-design-vue"
import 'ant-design-vue/dist/antd.css';
import i18n from './lang'
import VueRouter from 'vue-router' //引入路由
import router from './router' //引入路由器
import VueI18n from 'vue-i18n' //引入国际化
import Vuex from 'vuex' //引入VueX

Vue.use(Vuex)
Vue.use(VueI18n)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Antd)
Vue.use(DatePicker)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    lang: 'zh-CN'
  },
  mutations: {
    changeLang(state, lang) {
      state.lang = lang
    },
  },
  actions: {
    setLang(context, lang) {
      context.commit('changeLang', lang)
    },
  }
})

new Vue({
  render: h => h(App),
  router,
  i18n,
  store,
}).$mount('#app')

