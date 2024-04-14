// import { createStore } from 'vuex'
// import createPersistedState from "vuex-persistedstate"
// export default createStore({
//   state: {
//     isGetterRouter:false,
//     isCollapsed:false,
//     userInfo:{}
//   },
//   getters: {
//   },
//   mutations: {
//     changeGetterRouter(state,value){
//       state.isGetterRouter = value
//     },
//     //控制侧边栏展开
//     changeCollapsed(state){
//       state.isCollapsed = !state.isCollapsed
//     },
//     changeUserInfo(state,value){
//       console.log("这是info",state.userInfo)
//       console.log("这是value，",value)
//       state.userInfo = {
//         ...state.userInfo,
//         ...value
//       }

//     },
//     clearUserInfo(state,value){
//       state.userInfo = {}
//     }
//   },
//   actions: {
//   },
//   modules: {
//   },
//   plugins:[createPersistedState({
//     paths:["isCollapsed","userInfo"]//控制是否持久化,记住用户偏好
//   })]
// })
import { defineStore } from 'pinia'


export const mainStore = defineStore('main', {
  state: () => ({
    isGetterRouter: false,
    isCollapsed: false,
    userInfo: {}
  }),
  getters: {
    // 在这里定义getters
  },
  actions: {
    changeGetterRouter(value) {
      this.isGetterRouter = value
    },
    changeCollapsed() {
      this.isCollapsed = !this.isCollapsed
    },
    changeUserInfo(value) {
      this.userInfo = {
        ...this.userInfo,
        ...value
      }
      console.log('111',this.userInfo)
    },
    clearUserInfo() {
      this.userInfo = {}
    }
    // 在这里定义其他actions
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'main',
        storage: localStorage, // 或者使用 sessionStorage
        paths: ['isCollapsed', 'userInfo']
      }
    ]
  }
})


