<template>
   <el-table :data="perList" style="width: 100%; margin-bottom: 20px" row-key="id" border >
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column label="修改时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作">
      <template #="{row}">
        <el-button type="primary" size="default" @click="addPer(row)">添加菜单</el-button>
        <el-button type="primary" size="default" @click="editPer(row)">编辑</el-button>
        <el-popconfirm :title="`确定删除${row.name}吗?`" width="200px" icon="delete" @confirm="deletePer(row)" >
              <template #reference>
                <el-button type="danger" icon="Delete" size="default">删除</el-button>
              </template>
          </el-popconfirm>
      </template>
    </el-table-column>
    </el-table>
  <!-- 添加&&编辑 -->
  <el-dialog v-model="dialogFormVisible" :title="paramsPer.id?'更新菜单':'添加菜单'" width="550px" >
    <el-form style="margin: 30px 0;" :model="paramsPer"  :rules="rules" ref="form">
      <el-form-item label="名称" label-width="80px" style="margin: 20px 0px;" prop="name">
        <el-input placeholder="请输入名称" v-model="paramsPer.name" />
      </el-form-item>
      <el-form-item label="权限值" label-width="80px"  prop="code" >
        <el-input placeholder="请输入权限值" v-model="paramsPer.code" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="Confirm">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref ,onMounted,nextTick} from 'vue'
import {reqGetPerList,reqAddAndUpdatePer,reqDeletePer} from '@/api/acl/permission/index'
import type { permissionData } from '@/api/acl/role/type'
import { ElMessage } from 'element-plus'
let perList = ref<permissionData[]>()
const getManu = async()=>{
  let res = await reqGetPerList()
  if(res.code == 200){
    perList.value = res.data
  }
}
//控制对话组件的显示与隐藏
let dialogFormVisible = ref<boolean>(false)
let paramsPer = ref<permissionData>({
  name:'',
  level:0,
  code:'',
  pid:0
})
//添加菜单
const addPer = (row:any)=>{
  Object.assign(paramsPer.value,{
    pid:row.pid,
    level:row.level,
    name:'',
    code:''
  })
  //清除上一次校验结果
    nextTick(()=>{
    form.value.clearValidate(['code','name'])
    })
  dialogFormVisible.value = true
}
//编辑菜单
const editPer = (row:permissionData)=>{
  Object.assign(paramsPer.value,{
    id:row.id,
    pid:row.pid,
    level:row.level,
    name:row.name,
    code:row.code
  })
  //清除上一次校验结果
    nextTick(()=>{
    form.value.clearValidate(['code','name'])
    })
  dialogFormVisible.value = true
}
//表单ref
let form = ref()
//确认添加或修改
const Confirm = async()=>{
  await form.value.validate()
  let res = await reqAddAndUpdatePer(paramsPer.value)
  if(res.code == 200){
    ElMessage.success(paramsPer.value.id ? "修改成功":"修改失败")
    getManu()
    dialogFormVisible.value = false
  }else{
    ElMessage.error(res.message)
    dialogFormVisible.value = false
  }
}

const validatorcode = (rules:any,value:string,callback:any)=>{
  if(/^(?:[a-z](?:[a-z0-9]|[_-](?![_-]))*[a-z0-9])(?:,(?:[a-z](?:[a-z0-9]|[_-](?![_-]))*[a-z0-9]))*$/.test(value)){
    callback()
  }else{
    callback(new Error("请使用逗号分隔的英文权限值列表，无首尾逗号、无连续逗号、无空项"))
  }
}
//校验规则
const validatorname = (rules:any,value:string,callback:any)=>{
    if(/^[\u4e00-\u9fa5a-zA-Z0-9][\u4e00-\u9fa5a-zA-Z0-9_\-]{1,49}$/.test(value)){
      callback()
    }else{
      callback(new Error("请使用，中文 / 英文 / 数字 / 下划线 / 短横线的组合"))
    }
}
const rules = {
  name:[
    {required: true,validator:validatorname,trigger:'blur'}
  ],
  code:[
    {required: true,validator:validatorcode,trigger:'blur'}
  ]
}
//删除菜单
const deletePer = async(row:permissionData)=>{
  let res = await reqDeletePer(row.id as number)
  if(res.code == 200){
    ElMessage.success("删除成功")
    dialogFormVisible.value = false
    getManu()
  }else{
    ElMessage.error(res.message)
    dialogFormVisible.value = false
}
}
onMounted(()=>getManu())
</script>
<style>

</style>
