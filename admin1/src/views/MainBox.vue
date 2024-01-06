<template>
    <div class="common-layout">
        <el-container>
            <SideMenu/>
            <el-container direction="vertical">
                <TopHeader/>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>   
</template>
<script setup>
import TopHeader from '../components/mainbox/TopHeader.vue'
import SideMenu from '../components/mainbox/SideMenu.vue'

</script>
<style lang="scss" scoped>
.el-main{
    overflow:auto;
    height:calc(100vh - 60px)
}
</style>