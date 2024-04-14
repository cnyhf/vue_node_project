<template>
    <el-header>
        <div class="left">
            <el-icon @click="handleCollapsed">
                <Menu />
            </el-icon>
            <span style="margin-left: 10px;">企业门户网站管理系统</span>
        </div>
        <div class="right">
            <span>欢迎 {{userInfo.username}} 回来</span>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon :size="30" color="white"><User /></el-icon>
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
                    <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>            
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>
<script setup>
//Pinia引入:
import { mainStore } from "../../store/index";
import {Menu,User} from '@element-plus/icons-vue'
import { useRouter } from "vue-router";
import { storeToRefs } from 'pinia';
//创建PiniaStore
const store = mainStore();
const router = useRouter()
// 从 store 中解构出需要的状态
const { userInfo } = storeToRefs(store);
const handleCollapsed = ()=>{
    //change
    store.changeCollapsed()
}
const handleCenter = () =>{
    router.push("/center")
}
const handleLogout = () =>{
    localStorage.removeItem("token")
    store.clearUserInfo()
    router.push("/login")
}
</script>
<style lang="scss" scoped>
.el-header{
    background-color: #2d3a4b;
    color:white;
    width:100%;
    height:60px;
    line-height: 60px;
    display:flex;
    justify-content:space-between;
    align-items:center;

}
.left,.right{
    display:flex;
}
.left{
    i{
        margin:auto;
    }
}
.right{
    .el-dropdown{
        margin:auto;
    }
}

</style>