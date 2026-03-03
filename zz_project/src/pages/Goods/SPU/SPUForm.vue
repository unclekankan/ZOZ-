<template>
  <div v-show="scene==1">
    <el-card style ="margin: 10px 0px;">
      <el-form  style="margin-top: 10px;"label-width="100px">
        <el-form-item label="SUP名称">
          <el-input placeholder="请输入SUP名称" v-model="InitSpu.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
          <el-select placeholder="请选择SPU品牌" style="width: 200px;" v-model="InitSpu.tmId">
            <el-option
              v-for="item in tradArr"
              :key="item.id"
              :label="item.tmName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SUP描述">
          <el-input type="textarea" placeholder="请输入SUP描述" v-model="InitSpu.description"></el-input>
        </el-form-item>
        <el-form-item label="SUP图片">
          <el-upload
            v-model:file-list="ImageList"
            action="/api/admin/product/fileUpload"
            :headers="token"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="handleUpload"
            :on-success="handleUploadSuccess"
            >
            <el-icon><Plus /></el-icon>
          </el-upload>
          <el-dialog  v-model="dialogVisible" style="width: 700px; height: 700px;">
          <img w-full :src="dialogImageUrl" alt="Preview Image" style="height: 100%; width: 100%;" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
          <el-select :placeholder="UnselectSale.length < 3 ? `还有${UnselectSale.length}个未选择`: '还未选择'" style="width: 200px;" v-model="selectedSaleAttrAndName">
            <el-option
              v-for="item in UnselectSale"
              :key="item.id"
              :label="item.name"
              :value="`${item.id}:${item.name}`">
            </el-option>
          </el-select>
          <el-button type="primary" size="default" icon="Plus" :disabled="selectedSaleAttrAndName ? false : true" @click="addSaleAttr">添加销售属性</el-button>
          <el-table border style="width: 100%; margin: 10px 0px;" :data="selectedSaleAttr">
            <el-table-column prop="Id" label="序号" width="80px" align="center"></el-table-column>
            <el-table-column prop="saleAttrName" label="属性名"></el-table-column>
            <el-table-column prop="spuSaleAttrValueList" label="属性值">
              <template #="row,$index">
                <el-tag @close="row.row.spuSaleAttrValueList.splice(index,1)" v-for="(tag , index) in row.row.spuSaleAttrValueList" :key="tag.id" closable style="margin: 0px 5px;">{{ tag.saleAttrValueName}}</el-tag>
                <el-input @blur="toLook(row.row)" v-model="row.row.saleValueName" placeholder="请输入属性值" size="small" style="width: 150px;" v-if="row.row.flag"></el-input>
                <el-button type="primary" size="small" @click="toEdit(row.row)" icon="Plus" v-else></el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120px">
              <template #="$index">
              <el-button type="danger" size="small" @click="selectedSaleAttr?.splice($index,1)" icon="Delete"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="spuSave" :disabled="selectedSaleAttr?.length as number > 0 ? false : true">保存</el-button>
          <el-button type="info" size="default" plain @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref,onMounted ,computed} from 'vue'
import { ElMessage } from 'element-plus'
import type { Trademark } from '@/api/product/trademark/type'
import type {spuBaseSaleAttr, spuBaseSaleAttrList, SPUImageList, spuSaleAttrList} from '@/api/product/SPU/type'
import { useUserStore } from '@/stores/modules/user'
import { reqGetTrademarkList,reqGetSPUImageList,reqGetSPUSaleAttrList,reqGetAllSPUSaleAttrList,reqUpdateOrAddSpu} from '@/api/product/SPU'
import type { SPU , spuSaleAttrLists,SPUImage , spuSaleAttrValue} from '@/api/product/SPU/type'
const userStore = useUserStore()
const token = {
  token: userStore.token
}
let $emit=defineEmits(['changeScence'])
const back=()=>{
  $emit('changeScence',{flag:0})
}
//所有品牌列表
let tradArr=ref<Trademark[]>([])
//所有销售属性列表
let Allsale = ref<spuBaseSaleAttr[]>([])
//获取品牌列表和销售属性列表
onMounted( async()=>{
  let result=await reqGetTrademarkList()
  if(result.code==200){
    tradArr.value=result.data
  }
  let saleAttrResult=await reqGetAllSPUSaleAttrList()
  if(saleAttrResult.code==200){
    Allsale.value=saleAttrResult.data
}
})
//已有的销售属性列表
let selectedSaleAttr = ref<spuSaleAttrLists>([])
//获取销售属性列表
const saleGet=async(id:number)=>{
  let result=await reqGetSPUSaleAttrList(id)
    if(result.code==200){
       selectedSaleAttr.value=result.data
    }
}
//暴露方法
let InitSpu=ref<SPU>({
  spuName: '',
  description: '',
  category3Id: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: []
})
//所有图片列表
let ImageList = ref<SPUImageList>([])
const ImgGet=async(id:number)=>{
//获取图片列表
  let imgResult=await reqGetSPUImageList(id)
  if(imgResult.code==200){
    ImageList.value=imgResult.data.map((item:SPUImage)=>{
      return {
        name:item.imgName,
        url:item.imgUrl
      }
    })
  }
}
//照片墙方法
let dialogVisible = ref<boolean>(false)
let dialogImageUrl = ref<string>('')
const handlePictureCardPreview= (uploadFile:any)=>{
  dialogVisible.value = true
  dialogImageUrl.value=uploadFile.url
}
const handleRemove = ()=>{}
//成功上传后方法
const handleUploadSuccess = (response: any, uploadFile: any) => {
  // 找到当前上传的文件在ImageList中的索引
  const index = ImageList.value?.findIndex?.((file: any) => file?.uid === uploadFile?.uid)
  if (typeof index === 'number' && index !== -1 && ImageList.value && ImageList.value[index]) {
    // 将服务器返回的真实URL更新到ImageList中
    ImageList.value[index].url = response?.data
  }
}
const initSpuForm=async(row:SPU)=>{
  InitSpu.value=row
  saleGet(row.id as number)
  InitSpu.value.spuName=row.spuName
  ImgGet(row.id as number)
}
const handleUpload = (rawFile:any)=>{
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
//新增
const initAddSpu = async (row:number)=>{
  Object.assign(InitSpu.value,{
  spuName: '',
  description: '',
  category3Id: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: []
  })
  //照片列表清空
  ImageList.value = []
  //销售属性清空
  selectedSaleAttr.value = []
  selectedSaleAttrAndName.value = ''
  InitSpu.value.category3Id = row
}
defineExpose({initSpuForm,initAddSpu})
defineProps({scene:Number})
//保存
const spuSave = async()=>{
  InitSpu.value.spuSaleAttrList = selectedSaleAttr.value || []
  InitSpu.value.spuImageList =  ImageList.value?.map(item=>{
    return {
      imgName:item.name,
      imgUrl:item.url
    }
  }) || []
  await SpuUpdate(InitSpu.value)
  $emit('changeScence',{flag:0,params:InitSpu.value.id ? 'Update':'Add'})
}
//更新请求
const SpuUpdate = async (data:SPU)=>{
  let result = await reqUpdateOrAddSpu(InitSpu.value)
  if(result.code == 200){
     ElMessage.success(`${data.id ? '修改完成':'添加完成'}`)
  }else{
     ElMessage.error(`${data.id ? '修改失败':'添加失败'}`)
  }
}
//筛选
let UnselectSale = computed(()=>{
  let UnSale = Allsale.value.filter(item=>{
    return selectedSaleAttr.value?.every(item1=>{
      return item.name != item1.saleAttrName
    })
  })
  return UnSale
})
//绑定select
let selectedSaleAttrAndName = ref<string>('')
//增加销售属性
let addSaleAttr = ()=>{
  const [baseSaleAttrId , saleAttrName] = selectedSaleAttrAndName.value.split(':')
  let NewAttr =  ref<spuSaleAttrList>({
      baseSaleAttrId: Number(baseSaleAttrId),
      saleAttrName: saleAttrName || '',
      spuSaleAttrValueList:[]
  })
  selectedSaleAttr.value?.push(NewAttr.value)
  selectedSaleAttrAndName.value = ''
}
//编辑模式
const toEdit = (row:spuSaleAttrList)=>{
  row.flag = true
  row.saleValueName = ''
}
//显示模式
const toLook = (row:spuSaleAttrList)=>{
  const { baseSaleAttrId,saleValueName} = row
  let newSaleAttr = {
    baseSaleAttrId,
    saleAttrValueName:saleValueName as string,
  }
  if(saleValueName?.trim() == ''){
    ElMessage.error('输入不能为空!')
    return
  }
  let repeat = row.spuSaleAttrValueList.find(item=>saleValueName == item.saleAttrValueName)
  if(repeat){
    ElMessage.error('此属性已有!')
    return
  }
  row.spuSaleAttrValueList.push(newSaleAttr)
  row.flag = false
}
</script>
<style scoped>
</style>
