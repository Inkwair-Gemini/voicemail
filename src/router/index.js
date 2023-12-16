//该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router"
import Delete from "../pages/Delete.vue"
import Menu from "../pages/Menu.vue"
  
export default new VueRouter({
    routes:[
        {
            path:'/menu',
            component:Menu,
        },
        {
            path:'/delete',
            component:Delete,
        },
    ]
})