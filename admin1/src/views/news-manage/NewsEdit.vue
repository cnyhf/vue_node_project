<template>
    <div>
        <el-page-header 
            content="编辑新闻" 
            @back="handleBack()" 
            title="新闻管理"
        />
        <el-form
            ref="newsFormRef"
            :model="newsForm"
            :rules="newsFormRules"
            label-width="80px"
            class="demo-ruleForm"
        >
            <el-form-item 
                label="标题" 
                prop="title"
            >
                <el-input v-model="newsForm.title" />
            </el-form-item>
            <el-form-item 
                label="内容" 
                prop="content"
            >
                <editor @event="handleUploadChange" 
                    :content="newsForm.content" 
                    v-if="newsForm.content"
                />
            </el-form-item>
            <el-form-item 
                label="类别" 
                prop="category"
            >
                <el-select 
                    v-model="newsForm.category" 
                    class="m-2" 
                    placeholder="Select" 
                    
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item 
                label="封面" 
                prop="cover"
            >
            <Upload :avatar="newsForm.cover"
                @ztchange="handleChange" />
            </el-form-item>
            <el-form-item>
                <el-button 
                    type="primary" 
                    @click="submitForm()"
                >编辑新闻</el-button>
            
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { ref,reactive,onMounted } from "vue";
import editor from "@/components/editor/Editor";
import Upload from '@/components/upload/Upload'
import upload from "@/util/upload";
import {useRouter,useRoute} from 'vue-router'
import axios from 'axios'
//拿到的是所有的路由对象
const router = useRouter()
//拿到的是当前路由对象
const route = useRoute()
const newsFormRef = ref()
const newsForm  = reactive({
    title:"",
    content:"",
    category:"", //1 最新动态，2 典型案例  3 通知公告
    cover:"",
    file:null,
    isPublish:0,// 0 未发布， 1 已发布
})
const newsFormRules  = reactive({
    title:[{
        required:true,
        message:"请输入标题",
        trigger:"blur"
    }],
    content:[{
        required:true,
        message:"请输入内容",
        trigger:"blur"
    }],
    category:[{
        required:true,
        message:"请选择分类",
        trigger:"blur"
    }],
    cover:[{
        required:true,
        message:"请上传图片",
        trigger:"blur"
    }],
})
//每次editor内容改变的回调
const handleUploadChange = data=>{
    // console.log(data)]
    newsForm.content = data
}
//新闻类别
const options = [
    {
        label:"最新动态",
        value:1
    },
    {
        label:"典型案例",
        value:2
    },
    {
        label:"通知公告",
        value:3
    },
]
const handleChange = (file)=>{
    //本地回显用的,生成blob这样一个二进制的地址
    newsForm.cover = URL.createObjectURL(file)
    //提交给后端的
    newsForm.file = file
}
const submitForm = ()=>{
    newsFormRef.value.validate(async(valid)=>{
        if(valid){
            //后台通信
            await upload("/adminapi/news/list",newsForm)
            router.back()
        }
    })
}
const handleBack = ()=>{
    router.back()
}
//获取当前页面数据
onMounted(async()=>{
    // console.log(route.params.num)
    const res = await axios.get(`/adminapi/news/list/${route.params.num}`)
    console.log(res.data.data[0])
    Object.assign(newsForm,res.data.data[0])
})
</script>
<style lang="scss" scoped>                                                                                                                                                       
.el-form{
    margin-top: 50px;
}
</style>
