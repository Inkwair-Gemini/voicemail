import Vue from "vue";
import VueI18n from 'vue-i18n'
import zh from "./zh-CN.js"
import en from "./en-US.js"
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: "zh-CN",
    messages: {
        "zh-CN": zh,
        "en-US": en,
    }
});

export default i18n