import Home from '../views/home/Home.vue'
import Center from '../views/center/Center.vue'
import UserAdd from '../views/user-manage/UserAdd.vue'
import UserList from '../views/user-manage/UserList.vue'
import ProductAdd from '../views/product-manage/ProductAdd.vue'
import ProductList from '../views/product-manage/ProductList.vue'
import ProductEdit from '../views/product-manage/ProductEdit.vue'
import NewsAdd from "../views/news-manage/NewsAdd.vue"
import NewsList from "../views/news-manage/NewsList.vue"
import NewsEdit from "../views/news-manage/NewsEdit.vue"
import NotFound from "../views/notfound/NotFound.vue"
import Login from '../views/Login.vue'
const routes = [
    {
        path:"/index",
        component:Home
    },
    {
        path:"/center",
        component:Center
    },
    {
        path:"/user-manage/adduser",
        component:UserAdd,
        requireAdmin:true
    },
    {
        path:"/user-manage/userlist",
        component:UserList,
        requireAdmin:true
    },
    {
        path:"/product-manage/addproduct",
        component:ProductAdd
    },
    {
        path:"/product-manage/productlist",
        component:ProductList
    },
    {
        path:"/product-manage/editproducts/:pid",
        component:ProductEdit
    },
   
    {
        path:"/news-manage/addnews",
        component:NewsAdd
    },
    {
        path:"/news-manage/newslist",
        component:NewsList
    },
    {
        path:"/news-manage/editnews/:num",
        component:NewsEdit
    },
    {
        path:"/",
        redirect:"/login",
    },
    {
        // 实现通配符路由，捕获所有不匹配其他路由的路径
        path:"/:pathMatch(.*)*",
        name:"Notfound",
        component:NotFound
    }
]
export default routes