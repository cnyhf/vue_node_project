<!-- 新闻详情 -->
<template>
    <el-row>
        <el-col :span="17" :offset="1">
            <div>
                <h2>
                    {{ currentNews.title }}
                </h2>
                <div class="time">
                    {{ whichTime(currentNews.editTime) }}
                </div>
                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider>
                <div v-html="currentNews.content"></div>
            </div>
        </el-col>
        <el-col :span="4" :offset="1" :pull="1">
            <el-card class="box-card">
                <template #header>
                <div class="card-header">
                    <span style="font-size: 16px;font-weight:bold ;">最近新闻</span>
                </div>
                </template>
                    <div 
                        v-for="item in topNews" 
                        :key="item.num" 
                        class="text item"
                        style="padding: 14px;"
                        @click="handleChange(item.num)"
                    >
                    <span>{{ item.title }}</span>
                    <div class="bottom">
                        <time class="time">{{ whichTime(item.editTime) }}</time>
                    </div>
                    </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script setup>
import { onMounted,ref,watchEffect,onBeforeUnmount} from 'vue'
import axios from 'axios'
import {useRoute,useRouter} from 'vue-router'
import moment from 'moment'
import { StarFilled } from "@element-plus/icons-vue";
const route =  useRoute()
const router =  useRouter()
const currentNews = ref({})
const topNews = ref([])

moment.locale("zh-cn")
const stop  = watchEffect(async() => {
    if(!route.params.num) return
    const res1 = await axios.get(`/webapi/news/list/${route.params.num}`)
    const res2 = await axios.get(`/webapi/news/toplist?limit=3`)
    currentNews.value = res1.data.data[0]
    topNews.value = res2.data.data

})
const whichTime = time =>{
    return moment(time).format("lll")
  }
const handleChange =(num)=>{
    router.push(`/news/${num}`)
}
onBeforeUnmount(() => {
   stop() 
})
</script>

<style lang="scss" scoped>
    .el-row{
        margin-top: 30px;
    }
    .time{
        font-size: 13px;
        color: gray;
    }
    .box-card{
        
    }
</style>