<template>
    <div>
        <el-page-header 
            content="首页" 
            icon="" 
            title="企业门户网站管理系统"
        />
        <button @click="log">log</button>

        <el-card class="box-card">
            <el-row>
                <el-col :span="4">
                    <el-avatar :size="100" :src="avatarUrl" />
                </el-col>
                <el-col :span="20">
                    <h3 style="line-height: 100px;">欢迎 {{userInfo.username}} 回来,{{ welcomeText }}</h3>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="box-card" title="公司产品">
            <template #header>
                <div class="card-header">
                    <span>公司产品</span>
                </div>
            </template>
            <el-carousel v-if="loopList.length" :interval="4000" type="card" height="400px">
                <el-carousel-item v-for="item in loopList" :key="item.pid">
                    <div :style="{
                        backgroundImage:`url(http://localhost:3000${item.cover})`,
                        backgroundSize:'cover'
                    }">
                    <h3>{{ item.title }}</h3>    
                </div>              
                </el-carousel-item>
            </el-carousel>
        </el-card>
    </div>
</template>
<script setup>
import axios from "axios";
// axios.get("/adminapi/user/home").then(res=>{
//     console.log(res.data)
// })
import {mainStore} from '../../store/index'
import {computed,onMounted,ref} from 'vue'
import { storeToRefs } from 'pinia';
const store = mainStore()
const loopList = ref([])
let {userInfo} = storeToRefs(store)
const avatarUrl = computed(
    ()=>
    userInfo.value.avatar
    ?'http://localhost:3000'+userInfo.value.avatar
    :`https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
);
const welcomeText = computed(()=>new Date().getHours()<12?'要开心啊，每一天！':'你可能累了，喝杯咖啡提提神吧！')
onMounted(()=>{
    getData()
})
const log=()=>{
    console.log(store.userInfo);
}
const getData =async ()=>{
   const res = await axios.get(`/adminapi/products/list`)
   if (res.data.code === 200) {  
    loopList.value = res.data.data;
  }
}
</script>
<style lang="scss" scoped>
.box-card{
   margin-top: 40px; 
}
.el-carousel__item h3 {
  color: white;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>