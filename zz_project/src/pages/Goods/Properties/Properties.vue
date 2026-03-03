<template>
  <div>
    <Category :scene="scene"/>
  </div>
  <el-card style="margin: 10px 0px;">
    <div v-show="scene==0">
      <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.C3id?false:true" @click="add">添加产品属性</el-button>
      <el-table border style="width: 100%; margin-top: 10px;" :data="attrArr">
      <el-table-column prop="id" label="序号" width="80px" align="center" type="index" ></el-table-column>
      <el-table-column prop="attrName" label="属性名称" width="150px"></el-table-column>
      <el-table-column prop="value" label="属性值名称"  >
        <template #="{row,$index}">
          <el-tag v-for="ele in row.attrValueList" :key="ele.id" style="margin: 5px 10px;">{{ele.valueName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template #default="{row, $index}">
          <el-button type="primary" size="small" icon="Edit" @click="edit(row,$index)">编辑</el-button>
           <el-popconfirm :title="`确定删除${row.attrName}吗?`" width="200px" icon="delete" @confirm="deleteAttr(row.id)">
              <template #reference>
                <el-button type="danger" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div v-show="scene==1">
      <el-form  :inline="true">
        <el-form-item label="属性名称">
          <el-input placeholder="请输入属性名称" v-model="attrParam.attrName" ></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="addattrvalue" type="primary" size="default" icon="Plus"  :disabled="!attrParam.attrName?true:false">添加属性值</el-button>
      <el-button type="info" size="default" plain @click="cancel">取消</el-button>
      <el-table border style="width: 100%; margin: 10px 0px;" :data="attrParam.attrValueList">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="属性值">
          <template #="{row,$index}">
            <el-input :ref="(vc:any)=>inputArr[$index]=vc" size="small" v-model="row.valueName" placeholder="请输入属性值" v-if="!row.model" @blur="todo(row,$index)"></el-input>
            <div v-else @click="tolook(row,$index)" class="look">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{row,$index}">
            <el-button type="danger" size="small" icon="Delete" @click="attrParam.attrValueList.splice($index,1)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="default" @click="save" :disabled="attrParam.attrValueList.length==0?true:false">保存</el-button>
      <el-button type="info" size="default" plain @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import {watch,ref, nextTick} from 'vue';
import { useCategoryStore } from '@/stores/modules/setting/category';
import { reqAttrInfoList,reqAddOrUpdateAttr,reqDeleteAttr } from '@/api/product/attr';
import type { Attr, AttrValue } from '@/api/product/attr/type';
import { ElMessage } from 'element-plus';
import losdash from 'lodash';
import router from '@/router';
const categoryStore = useCategoryStore();
watch(() => categoryStore.C3id,
  () => {
    attrArr.value=[]
     if(categoryStore.C3id){
       getAttrInfoList(categoryStore.C1id,categoryStore.C2id,categoryStore.C3id)
     }
  }
)
let attrArr=ref<Attr[]>([])
  const getAttrInfoList = async (C1id: any, C2id: any, C3id: any) => {
    let result = await reqAttrInfoList(C1id, C2id, C3id)
    if (result.code == 200) {
      attrArr.value = result.data
    }
  }

  //card切换
  let scene = ref<number>(0);//0-table 1-添加与修改
  const edit=(row:Attr,$index:number)=>{
    attrParam.value={
      id:row.id,
      attrName:row.attrName,
      categoryId:categoryStore.C3id,
      categoryLevel:3,//代表三级分类
      attrValueList:losdash.cloneDeep(row.attrValueList)
  }
    console.log(row);

    scene.value=1
  }
  const add=()=>{
    scene.value=1
    attrParam.value={
      attrName:'',
      categoryId:categoryStore.C3id,
      categoryLevel:3,//代表三级分类
      attrValueList:[]
    }
  }
  const cancel=()=>{
    scene.value=0
  }
  //新增属性
  let attrParam=ref<Attr>({
    attrName:'',
    categoryId:'',
    categoryLevel:3,//代表三级分类
    attrValueList:[]
  })
  //添加属性值
  const addattrvalue=()=>{
    attrParam.value.attrValueList.push({
      valueName:'',
      model:false
    })
    nextTick(()=>{
      inputArr.value[attrParam.value.attrValueList.length-1]?.focus()
    })
  }
    //保存
    const save=async()=>{

      let result=await reqAddOrUpdateAttr(attrParam.value)
      if(result.code==200){
        ElMessage({
          message: `${attrParam.value.id ? '修改' : '新增'}属性成功`,
          type: 'success',
        });
        scene.value=0
        getAttrInfoList(categoryStore.C1id,categoryStore.C2id,categoryStore.C3id)
      }else{
        ElMessage({
          message: `${attrParam.value.id ? '修改' : '新增'}属性失败`,
          type: 'error',
        })
      }
    }
    //失去焦点修改模式
    const todo=(row:AttrValue,index:number)=>{
      if(row.valueName.trim()===''){
        attrParam.value.attrValueList.splice(index,1)
        ElMessage({
          message: `属性值不能为空`,
          type: 'warning',
        })
        return
      }
      if(attrParam.value.attrValueList.find((item,idx)=>item.valueName===row.valueName&&idx!==index)){
          attrParam.value.attrValueList.splice(index,1)
          ElMessage({
            message: `属性值不能重复`,
            type: 'warning',
          })
          return
        }
      row.model=!row.model
    }
    //查看模式
    const tolook=(row:AttrValue,index:number)=>{
       row.model=!row.model
      //聚焦要在v-if渲染后进行
      nextTick(()=>{
        inputArr.value[index]?.focus()
      })
    }
    //输入框数组
    let inputArr=ref<HTMLElement[]>([])
    //删除属性
    const deleteAttr=async(attrId:number)=>{
      let result=await reqDeleteAttr(attrId)
      if(result.code==200){
        ElMessage({
          message: `删除属性成功`,
          type: 'success',
        });
        getAttrInfoList(categoryStore.C1id,categoryStore.C2id,categoryStore.C3id)
      }else{
        ElMessage({
          message: `删除属性失败`,
          type: 'error',
        })}
      }
      //初始化
      router.beforeEach((to,from,next)=>{
        categoryStore.reset()
        next()
      })
      //第二种初始化方式
      // onBeforeUnmount(()=>{
      //   categoryStore.reset()
      // })
</script>
<style>
.look{
  padding-left: 10px;
  border: 1px solid #000000;
  background-color: #00d9ff;
  border-radius: 4px;
  cursor: pointer;
}
</style>
