import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Particles from "particles.vue3";
import '@/util/axios.config'
import { createPinia } from 'pinia'
//pinia持久化
import piniaPluginPersist from 'pinia-plugin-persist'  //这个是
const pinia = createPinia();
pinia.use(piniaPluginPersist)
createApp(App)
.use(pinia)
.use(ElementPlus)
.use(Particles)
.use(router)
.mount('#app')

