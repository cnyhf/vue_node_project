<template>
    <div>
        <el-page-header 
            content="添加用户" 
            icon="" 
            title="用户管理"
        />
        <el-form
            ref="userFormRef"
            :model="userForm"
            :rules="usrFormRules"
            label-width="80px"
            class="demo-ruleForm"
        >
            <el-form-item 
                label="用户名" 
                prop="username"
            >
                <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item 
                label="密码" 
                prop="password"
            >
                <el-input v-model="userForm.password"
                type="password" />
            </el-form-item>
            <el-form-item 
                label="权限" 
                prop="role"
            >
                <el-select 
                    v-model="userForm.role" 
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
                >添加用户</el-button>
            
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { ref,reactive } from 'vue'
import Upload from '@/components/upload/Upload'
import upload from "@/util/upload";
import {useRouter} from 'vue-router'
const userFormRef = ref()
const userForm = reactive({
    username:"",
    password:"",
    role:2 ,//1是管理员，2是编辑
    introduction:"",
    avatar:"",
    file:null,
    gender:2
})
const usrFormRules = reactive({
  username: [
    { required: true, message: '请输入名字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  role: [
    { required: true, message: '请选择权限', trigger: 'blur' }
  ],
  introduction: [
    { required: true, message: '请输入介绍', trigger: 'blur' }
  ],
  avatar: [
    { required: true, message: '请上传头像', trigger: 'blur' }
  ], 
})
//权限选择
const options = [
    {
        label:"管理员",
        value:1
    },
    {
        label:"编辑",
        value:2
    },
]
//每次选择完图片之后的回调, 
const handleChange = (file)=>{
    // console.log(file.raw)
    //本地回显用的,生成blob这样一个二进制的地址
    userForm.avatar = URL.createObjectURL(file)
    //提交给后端的
    userForm.file = file
}
const router = useRouter()
//提交
const submitForm=()=>{
    // 先校验
    userFormRef.value.validate(async (valid)=>{
        if(valid){
            const res = await upload("/adminapi/user/add",userForm)
            
            router.push(`/user-manage/userlist`)
        }
    })
}
</script>
<style lang="scss" scoped>
.demo-ruleForm{
    margin-top: 50px;
}
</style>