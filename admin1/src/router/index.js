import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainBox from '../views/MainBox.vue'
import RoutesConfig from './config'
import store from "../store/index";
const routes = [
  {
    path:"/login",
    name:"login",
    component:Login
  },
  {
    path:"/mainbox",
    name:"mainbox",
    component:MainBox
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.name==="login"){
    next()
  }else{
    //未授权，重定向到login
    if(!localStorage.getItem("token")){
      next({
        path:"login"
      })
    //如果授权（已登录过）next
    }else{
      //如果是第一次
      if(!store.state.isGetterRouter){
        ConfigRouter()
        next({
          path:to.fullPath
        })
        //之后就直接过
      }else{
        next()
      }     
    }
  }
})
const ConfigRouter = ()=>{
  //mainbox的嵌套路由，后面根据权限动态添加
  RoutesConfig.forEach(item => {
    router.addRoute("mainbox",item)
  });
  //改变isGetterRouter为true
  store.commit("changeGetterRouter",true)
}
export default router
