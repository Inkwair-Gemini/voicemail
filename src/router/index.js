//该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router"
import Delete from "../pages/Delete.vue"
import Menu from "../pages/Menu.vue"
import Register from "../pages/Register.vue"
import Login from "../pages/Login.vue"
import Mail from "../pages/Mail.vue"
import Record from "../pages/Record.vue"
import Detail from "../components/Detail.vue"
import UploadAvatar from "../pages/UploadAvatar.vue"

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Menu,
        },
        {
            path: '/delete',
            component: Delete,
        },
        {
            path: '/Mail',
            component: Mail,
        },
        {
            path: '/Login',
            component: Login,
        },
        {
            path: '/register',
            component: Register,
        },
        {
            path: '/detail',
            component: Detail,
        },
        {
            path: '/record',
            component: Record
        },
        {
            path: '/upload',
            component: UploadAvatar
        },

    ]
})