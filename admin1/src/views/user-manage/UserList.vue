<template>
    <div>
        <el-card>
            <el-page-header 
                content="用户列表" 
                icon="" 
                title="用户管理"
            />
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="username" label="用户名" width="180" />
            <el-table-column label="头像" width="180">
                <template #default="scope">
                    <div v-if="scope.row.avatar">
                        <el-avatar :size="50" :src="'http://localhost:3000'+scope.row.avatar"></el-avatar>
                    </div>
                    <div v-else>
                        <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="角色" >
                <template #default="scope">
                   <!-- {{ scope.row.role === 1?'管理员':'编辑' }} -->
                   <el-tag 
                        v-if="scope.row.role===1"                       
                        class="ml-2" 
                        type="danger"
                    >管理员</el-tag>
                   <el-tag 
                        v-else
                        class="ml-2" 
                        type="success"
                   >编辑</el-tag>
                   
                </template>
            </el-table-column>
            <el-table-column label="Operations">
                <template #default="scope">
                    <el-button 
                        size="small" 
                        @click="handleEdit(scope.row)"
                    >编辑</el-button
                    >
                    <el-popconfirm title="你确定要删除吗？"
                        confirmButtonText="确定"
                        cancelButtonText="取消" 
                        @confirm="handleDelete(scope.row)">
                        <template #reference>
                            <el-button
                                size="small"
                                type="danger"
                            >删除</el-button
                            >
                        </template>
                       
                    </el-popconfirm>
                    
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <el-dialog
        v-model="dialogVisible"
        title="编辑用户"
        width="30%"
    >
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
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleEditConfirm()"> 确认</el-button>
        </span>
        </template>
  </el-dialog>
    </div>
</template>
<script setup>
import {ref,onMounted,reactive} from "vue";
import axios from 'axios';
const dialogVisible = ref(false)
const tableData = ref([])
const userFormRef = ref()
let userForm  = ref({
    username:"",
    password:"",
    role:2 ,//1是管理员，2是编辑
    introduction:"",

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
onMounted(() => {
    getTableData()
})

const getTableData = async ()=>{
    const res = await axios.get("/adminapi/user/list")
    tableData.value = res.data.data;
}
// 编辑回调
const handleEdit =async data =>{
    const res = await axios.get(`/adminapi/user/list/${data.id}`)
    userForm.value = res.data.data[0]
    dialogVisible.value = true
}
const handleDelete = async data=>{
    await axios.delete(`/adminapi/user/list/${data.id}`)
    // reload data
    getTableData();
}
// 编辑确认回调
const handleEditConfirm = ()=>{
    userFormRef.value.validate(async(valid)=>{
        if(valid){
            // 更新后端
            await axios.put(`/adminapi/user/list/${userForm.id}`,userForm.value)
            // dialog隐藏
            dialogVisible.value = false
            // 获取table数据
            getTableData()
        }
    })
}
</script>
<style lang="scss" scoped>
.el-table{
    margin-top:50px
}
</style>