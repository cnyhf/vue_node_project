
<template>
    <div>
        <el-card>
            <el-page-header
                content="新闻列表"
                icon=""
                title="新闻管理"
            />

             <el-table
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    prop="title"
                    label="标题"
                    width="180"
                />
                <el-table-column
                    
                    label="分类"
                    
                >
                    <template #default="scope">
                        {{categoryFormat(scope.row.category)}}
                    </template>
                </el-table-column>

                <el-table-column
                    label="更新时间"
                    
                >
                    <template #default="scope">
                        {{formatTime.getTime(scope.row.editTime)}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="是否发布"
                    
                >
                    <template #default="scope">
                        <el-switch 
                            v-model="scope.row.isPublish" 
                            active-value="1"
                            inactive-value="0"
                            @change="handleSwitchChange(scope.row)"
                         />
                    </template>
                </el-table-column>

                 <el-table-column 
                    label="操作"
                 >
                    <template #default="scope">
                        <el-button
                            circle
                            :icon="Star"
                            type="success"
                            @click="handlePerview(scope.row)"
                        ></el-button>
                        <el-button
                            circle
                            :icon="Edit"
                            @click="handleEdit(scope.row)"
                        ></el-button>
                        <el-popconfirm title="你确定要删除吗？"
                            confirmButtonText="确定"
                            cancelButtonText="取消" 
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button
                                    circle
                                    :icon="Delete"
                                    type="danger"
                                ></el-button>
                            </template>                      
                        </el-popconfirm>
                       
                    </template>
                </el-table-column>
             </el-table>
        </el-card>
        <el-dialog
            v-model="dialogVisible"
            title="预览新闻"
            width="50%"
        >
            <div>
                <h2>{{ previewData.title }}</h2>
                <div style="font-size: 12px;color:gray;">{{ formatTime.getTime(previewData.editTime) }}</div>
                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider>
                <div v-html="previewData.content" class="htmlcontent"></div>
            </div>
        </el-dialog>
    </div>
</template>
<script setup>
import {ref,onMounted} from "vue"
import axios from 'axios'
import formatTime from '@/util/formatTime'
import {Star,Edit,Delete,StarFilled} from '@element-plus/icons-vue'
import { useRouter } from "vue-router";
const tableData = ref([])
const router = useRouter()
const previewData = ref([])
const dialogVisible = ref(false)
onMounted(()=>{
    getTableData()
})

const getTableData =async ()=>{
   const res = await axios.get(`/adminapi/news/list`)
   if (res.data.code === 200) {  
    tableData.value = res.data.data;
  }
}

//格式化分类信息
const categoryFormat = (category)=>{
    const arr=["最新动态","典型案例","通知公告"]
    return arr[category-1]
}
//开关回调

const handleSwitchChange =async item=>{
    const res = await axios.put(`/adminapi/news/publish`,{
        num:item.num,
        isPublish:item.isPublish
    }) 
    await getTableData()  
}
//预览回调
const handlePerview = (data)=>{
    previewData.value = data
    dialogVisible.value = true
}
const handleDelete = async data=>{
    await axios.delete(`/adminapi/news/list/${data.num}`)
    await getTableData();
}
const handleEdit = async data=>{
    router.push(`/news-manage/editnews/${data.num}`)
}
</script>
<style lang="scss" scoped>
.el-table{
    margin-top:50px;
}
::v-deep .htmlcontent{
    img{
        max-width: 100%;
    }
}
</style>
