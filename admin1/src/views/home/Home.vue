<template>
    <div>
        <el-page-header 
            content="首页" 
            icon="" 
            title="企业门户网站管理系统"
        />
        <el-card class="box-card">
            <el-row>
                <el-col :span="4">
                    <el-avatar :size="100" :src="avatarUrl" />
                </el-col>
                <el-col :span="20">
                    <h3 style="line-height: 100px;">欢迎 {{store.state.userInfo.username}} 回来,{{ welcomeText }}</h3>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="box-card" title="公司产品">
            <template #header>
                <div class="card-header">
                    <span>公司产品</span>
                </div>
            </template>
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in 6" :key="item">
                <h3 text="2xl" justify="center">{{ item }}</h3>
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
import {useStore} from 'vuex'
import {computed} from 'vue'
const store = useStore()
console.log(store.state)
const avatarUrl = computed(
    ()=>
    store.state.userInfo.avatar
    ?'http://localhost:3000'+store.state.userInfo.avatar
    :`https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
);
const welcomeText = computed(()=>new Date().getHours()<12?'要开心啊，每一天！':'你可能累了，喝杯咖啡提提神吧！')
</script>
<style lang="scss" scoped>
.box-card{
   margin-top: 50px; 
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
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