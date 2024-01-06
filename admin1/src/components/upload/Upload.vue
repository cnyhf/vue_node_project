<template>
     <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :auto-upload="false"

        :on-change="handleChange"
    >
        <img 
            v-if="props.avatar" 
            :src="uploadAvatar" 
            class="avatar" 
        />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>

<script setup>
import { defineEmits,defineProps,computed } from "vue";
import {Plus} from "@element-plus/icons-vue";
//父传子，定义好接受属性
const props = defineProps({
    avatar:String
})
//子传父，要提前定义好生成emit对象，利用emit对象传给父组件，父组件接收更改
const emit = defineEmits(["ztchange"])
//如果包含blob就原始这个地址就return出去了，如果不包含就说明从后端返回新图片了
const uploadAvatar = computed(()=>
    props.avatar.includes("blob")
    ?props.avatar
    :'http://localhost:3000'+props.avatar
)
//每次选择完图片之后的回调, 
const handleChange = (file)=>{
    emit("ztchange",file.raw)
}
</script>
<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

::v-deep.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

::v-deep.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar{
    width: 178px;
    height: 178px;
}
</style>
