<template>
  <div>
    <el-card style="max-width: 100%">
    <el-button type="primary" icon="Plus" @click="dialogNameChange('添加')">添加商品</el-button>
    <el-table :data="tableData" border style="width: 100% ;margin: 10px 0px;">
      <el-table-column  label="序列" width="80" align="center"type="index" />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column prop="logoUrl" label="品牌logo" >
        <template #="{row,$index}">
          <img :src="row.logoUrl" alt="无图片" style="width: 100px; height: 100px;" />
        </template>
      </el-table-column>
      <el-table-column prop="edit" label="品牌操作" >
        <template #="{row,$index}">
          <el-button type="primary" icon="Edit" @click="editTrade(row)">编辑</el-button>
          <el-button type="danger" icon="Delete" @click="deleteTrade(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[3, 5,7, 9]"
      :background="true"
      layout=" prev, pager, next, jumper ,-> , sizes,total"
      :total="total"
      @current-change="getTradeMark(currentPage4)"
      @size-change="getTradeMark(pageSize4)"
    />
  </div>
  </el-card>
  <el-dialog v-model="dialogFormVisible" :title="dialogName" width="700px">
      <el-form :model="add_trade" style="width: 80%;" label-width="100px">
        <el-form-item label="品牌名称">
          <el-input v-model="add_trade.tmName" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo">
          <el-upload class="avatar-uploader"
              action="/api/admin/product/fileUpload"
              :headers="token"
              :show-file-list="true"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
                  <img v-if="add_trade.logo" :src="add_trade.logo" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
       <template #footer>
      <div>
        <el-button @click="cancel" type="primary">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </div>
    </template>
  </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import { ref , onMounted} from 'vue';
  import { reqHasTradeMark ,reqAddTradeMark,reqUpdateTradeMark,reqDeleteTradeMark } from '@/api/product/trademark/index.ts';
  import type {Records,Trademark,TrademarkResponseData} from '@/api/product/trademark/type';
  import { ElMessage } from 'element-plus'
  import type { UploadProps } from 'element-plus'
  import { useUserStore } from '@/stores/modules/user'
  const currentPage4 = ref<number>(1);
  const pageSize4 = ref<number>(3);
  const total = ref<number>(0);
    const tableData = ref<Records>([]);
  const getTradeMark = async (pager = 1)=>{
    currentPage4.value = pager
    let result: TrademarkResponseData = await reqHasTradeMark(currentPage4.value,pageSize4.value)
    console.log(result);
    if(result.code ==200){
      total.value = result.data.total
      tableData.value = result.data.records
    }
  }
  onMounted(()=>{
    getTradeMark()
  })
const dialogFormVisible = ref<boolean>(false)
const add_trade = ref({
  id:null,
  tmName:'',
  logo:''
})
const cancel = () => {
  add_trade.value.id = null
  add_trade.value.tmName = ''
  add_trade.value.logo = ''
  dialogFormVisible.value = false
}
const dialogName = ref<string>('添加商品品牌')
const dialogNameChange = (name: string) => {
  dialogFormVisible.value = true
  dialogName.value = `${name}品牌`
}
const editTrade = async(row: any)=>{
    add_trade.value.id = row.id
    add_trade.value.tmName = row.tmName
    add_trade.value.logo = row.logoUrl
    dialogNameChange('编辑')
}
const confirm = async ()=>{
  if(add_trade.value.id){
    // 编辑品牌
    let result = await reqUpdateTradeMark({
      id: add_trade.value.id,
      tmName: add_trade.value.tmName,
      logoUrl: add_trade.value.logo
    })
    if(result.code ==200){
      ElMessage.success('编辑品牌成功')
      dialogFormVisible.value = false
      add_trade.value.id = null
      add_trade.value.tmName = ''
      add_trade.value.logo = ''
      getTradeMark(currentPage4.value)
    }else{
      ElMessage.error('编辑品牌失败')
  }
    return
  }
  let result = await reqAddTradeMark({
    tmName: add_trade.value.tmName,
    logoUrl: add_trade.value.logo
  })
  if(result.code ==200){
    ElMessage.success('添加品牌成功')
    dialogFormVisible.value = false
    add_trade.value.tmName = ''
    add_trade.value.logo = ''
    getTradeMark()
  }else{
    ElMessage.error('添加品牌失败')
}
}
// 上传图片
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const isJPG = rawFile.type == 'image/jpeg' || rawFile.type == 'image/png' || rawFile.type == 'image/gif';
  const isLt2M = rawFile.size / 1024 / 1024 < 2;

  if (!isJPG) {
    ElMessage.error('上传图片只能是 JPG/PNG 格式!');
  }
  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 2MB!');
  }
  return isJPG && isLt2M;
}
// 上传成功回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  add_trade.value.logo = URL.createObjectURL(uploadFile.raw!)
  console.log(response)
  add_trade.value.logo = response.data
}
const userStore = useUserStore()
// 携带token(对象的形式)
const token = {
  token: userStore.token
}
// 删除品牌
const deleteTrade = async(row: Trademark)=>{
  let result = await reqDeleteTradeMark(row.id as number)
  if(result.code ==200){
    ElMessage.success('删除品牌成功')
    getTradeMark(currentPage4.value)
  }else{
    ElMessage.error('删除品牌失败')
  }
}
</script>
<style>
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #ced1d1;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar{
  width: 178px;
  height: 178px;
  display: block;
}
</style>
