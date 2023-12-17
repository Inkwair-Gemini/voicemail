//该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router"
import Delete from "../pages/Delete.vue"
import Menu from "../pages/Menu.vue"
import Mail from "../pages/Mail.vue"
import Register from "../components/Register.vue"
import Login from "../components/Login.vue"

export default new VueRouter({
    routes:[
        {
            path:'/',
            component:Menu,
        },
        {
            path:'/delete',
            component:Delete,
        },
        {
            path:'/mail',
            component:Mail,
        },
        {
            path:'/Login',
            component:Login,
        },
        {
            path:'/register',
            component:Register,
        },
    ]
})