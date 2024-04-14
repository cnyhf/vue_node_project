<template>
    <div>
        <el-page-header 
            content="个人中心" 
            icon="" 
            title="企业门户网站管理系统"
        />
        <el-row :gutter="20" class="el-row">
            <el-col :span="8">
                <el-card class="box-card">
                    <el-avatar :size="100" :src="avatarUrl" />
                    <h3>{{ userInfo.username }}</h3>
                    <h5>{{ userInfo.role===1?'管理员':'编辑' }}</h5>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>个人信息</span>
                        </div>
                    </template>
                        <el-form
                            ref="userFormRef"
                            :model="userForm"
                            :rules="userFormRules"
                            label-width="120px"
                            class="demo-ruleForm"
                        >
                            <el-form-item 
                                label="用户名" 
                                prop="username"
                            >
                                <el-input v-model="userForm.username" />
                            </el-form-item>
                            <el-form-item 
                                label="性别" 
                                prop="gender"
                            >
                                <el-select 
                                    v-model="userForm.gender" 
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
                                label="个人简介" 
                                prop="introduction"
                            >
                                <el-input 
                                    v-model="userForm.introduction"
                                    type="textarea"
                                />
                            </el-form-item>
                            <el-form-item 
                                label="头像" 
                                prop="avatar"
                            >
                               <Upload :avatar="userForm.avatar"
                               @ztchange="handleChange" />

                            </el-form-item>
                            <el-form-item>
                                <el-button 
                                    type="primary" 
                                    @click="submitForm()"
                                >更新</el-button>
                           
                            </el-form-item>
                        </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import { mainStore } from "../../store/index";
import {computed,ref,reactive} from 'vue'
import { storeToRefs } from 'pinia';

import {ElMessage} from 'element-plus'
import upload from "@/util/upload";
import Upload from '@/components/upload/Upload'
//创建PiniaStore
const storePinia = mainStore();
// 从 store 中解构出需要的状态
const { userInfo} = storeToRefs(storePinia);
console.log(userInfo);
// const userInfoa=ref({
//     avatar:'',
// })

// console.log(userInfo.avatar);

// console.log(userInfo.value.avatar?1:2);
const avatarUrl = computed(()=>userInfo.value.avatar?'http://localhost:3000'+userInfo.value.avatar
    :`https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
);

//帮助校验表单所有的是否通过
const userFormRef = ref()
//解构
const {username,gender,introduction,avatar} = userInfo.value
//收集表单信息，双向绑定关联字段
const userForm =reactive({
    username,
    gender,
    introduction,
    avatar,
    file:null
})
//校验规则
const userFormRules = reactive({
  username: [
    { required: true, message: '请输入名字', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'blur' }
  ],
  introduction: [
    { required: true, message: '请输入介绍', trigger: 'blur' }
  ],
  avatar: [
    { required: true, message: '请上传头像', trigger: 'blur' }
  ],
})
//性别选择
const options = [
    {
        label:"保密",
        value:0
    },
    {
        label:"男",
        value:1
    },
    {
        label:"女",
        value:2
    }
]
//每次选择完图片之后的回调, 
const handleChange = (file)=>{
    // console.log(file.raw)
    //本地回显用的,生成blob这样一个二进制的地址
    userForm.avatar = URL.createObjectURL(file)
    //提交给后端的
    userForm.file = file
}
//更新提交
const submitForm=()=>{
    // 先校验
    userFormRef.value.validate(async (valid)=>{
        if(valid){
            console.log("submit",userForm)
            const res = await upload("/adminapi/user/upload",userForm)
            
            if(res.code===200){
                storePinia.changeUserInfo(res.data)
                ElMessage.success("更新成功")
                console.log(res.data)
            }
        }
    })
}
</script>
<style scoped lang="scss">
.el-row{
    margin-top:20px;
    .box-card{
        text-align:center;
    }
}


</style>
