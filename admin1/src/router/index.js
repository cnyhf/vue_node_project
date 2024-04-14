import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainBox from '../views/MainBox.vue'
import RoutesConfig from './config'
import {mainStore} from "../store/index";
import route1 from "./config"
const routes = [
  {
    path:"/",
    redirect:"/login",
  },
  {
    path:"/login",
    name:"login",
    component:Login
  },

  {
    path:"/mainbox",
    name:"mainbox",
    component:MainBox,
    // children:route1
  },
  // ...route1
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
    //创建PiniaStore
  var storePinia = mainStore();

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
      if(!storePinia.isGetterRouter){
        //删除所有嵌套路由，有点复杂
        //mainbox
        router.removeRoute("mainbox")
        ConfigRouter(storePinia)
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
const ConfigRouter = (storePinia)=>{
  if(!router.hasRoute("mainbox")){
    router.addRoute({
      path:"/mainbox",
      name:"mainbox",
      component:MainBox
    })
  }
  //mainbox的嵌套路由，后面根据权限动态添加
  RoutesConfig.forEach(item => {
    checkPermission(item,storePinia) && router.addRoute("mainbox",item)
  });
  //改变isGetterRouter为true
  storePinia.changeGetterRouter(true)
}
const checkPermission = (item,storePinia)=>{
    //创建PiniaStore
  if(item.requireAdmin){
    return storePinia.userInfo.role===1
  }
  return true
}
export default router
