<template>
<el-card style="height: 80px;">
  <el-form :inline="true" class="form">
    <el-form-item label="用户名:">
      <el-input placeholder="请输入用户名称" v-model="username"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="search">搜索</el-button>
      <el-button type="info" size="default" @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</el-card>
<el-card style="margin: 10px 0px;">
  <el-button type="primary" size="default" @click="addUser">添加用户</el-button>
  <el-button type="danger" size="default" @click="batchDeleteUser">批量删除</el-button>
  <el-table border :data="userList" style="width: 100%; margin-top: 10px;" @selection-change="selectChange">
    <el-table-column type="selection" width="55" align="center"></el-table-column>
    <el-table-column label="#" type="index" width="120px" align="center"></el-table-column>
    <el-table-column label="id" width="135px" prop="id"></el-table-column>
    <el-table-column label="用户名字" width="130px" prop="username" show-overflow-tooltip></el-table-column>
    <el-table-column label="用户昵称" width="130px" prop="name" show-overflow-tooltip></el-table-column>
    <el-table-column label="用户角色" width="120px" prop="roleName" show-overflow-tooltip></el-table-column>
    <el-table-column label="创建时间" width="120px" prop="createTime"  show-overflow-tooltip ></el-table-column>
    <el-table-column label="更新时间" width="120px" prop="updateTime"  show-overflow-tooltip ></el-table-column>
    <el-table-column label="操作" align="center">
      <template #="{row}">
        <el-button type="warning" size="small" @click="assignRole(row)">分配角色</el-button>
        <el-button type="primary" size="small" @click="addUser(row)">编辑</el-button>
         <el-popconfirm :title="`确定删除${row.username}吗?`" width="200px" icon="delete" @confirm="deleteUser(row)" >
              <template #reference>
                <el-button type="danger" icon="Delete" size="small">删除</el-button>
              </template>
            </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
   <div class="demo-pagination-block">
    <div class="demonstration"></div>
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      background
      :page-sizes="[3, 7, 9]"
      layout="prev, pager, next, jumper ,-> , sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</el-card>
<el-drawer v-model="drawer2">
    <template #header>
      <h4>{{title}}</h4>
    </template>
    <el-form size="default" label-width="80px" style="margin-top: 10px;" :model="userInfo" :rules="rules" ref="formRef">
      <el-form-item label="用户姓名" label-width="80px" style="margin-bottom: 30px;" prop="username">
        <el-input placeholder="请输入用户姓名" v-model="userInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" label-width="80px" style="margin-bottom: 30px;" prop="name">
        <el-input placeholder="请输入用户昵称" v-model="userInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" label-width="80px" style="margin-bottom: 30px;" prop="password" v-if="psd">
        <el-input placeholder="请输入用户密码" v-model="userInfo.password"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel" size="default">取消</el-button>
        <el-button type="primary" @click="save" size="default">确定</el-button>
      </div>
    </template>
  </el-drawer>
  <el-drawer v-model="drawer1">
    <template #header>
      <h4>分配角色用户</h4>
    </template>
    <el-form size="default" label-width="80px" style="margin-top: 10px;">
      <el-form-item label="用户姓名" label-width="80px" style="margin-bottom: 30px;">
        <el-input v-model="userInfo.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色列表">
  <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" style="margin-right: 20px;" label="全选" @change="handleCheckAllChange">
  </el-checkbox>
  <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRolesChange">
    <el-checkbox v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.roleName">
      {{ item.roleName }}
    </el-checkbox>
  </el-checkbox-group>
    </el-form-item>
    </el-form>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelAssignRole" size="default">取消</el-button>
        <el-button type="primary" @click="saveAssignRole" size="default">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { ref , onMounted } from 'vue'
import { reqGetUserPage ,reqAddOrUpdateUser,reqAssignRole,reqSaveAssignRole,reqDeleteUser,reqBatchDeleteUser} from '@/api/permission/user/index'
import type { User,roles } from '@/api/permission/user/type'
import { ElMessage } from 'element-plus'
const currentPage4 = ref(1)
const pageSize4 = ref(3)
const total = ref<number>(1)
onMounted(()=>{
  getUserPage()
})
//获取用户分页列表
let userList = ref<User[]>([])
const getUserPage = async(page=1,userName?:string)=>{
  page = currentPage4.value
  let res = await reqGetUserPage(page,pageSize4.value,userName?.trim())
  if(res.code == 200){
    total.value = res.data.total
    userList.value = res.data.records
  }
}
//页码改变时触发
const handleCurrentChange = (val: number) => {  currentPage4.value = val
  getUserPage(val)
}
//每页条数改变时触发
const handleSizeChange = (val: number) => { pageSize4.value = val
  getUserPage()
}
//是否显示密码输入框
let psd = ref<boolean>(true)
//添加用户
let title = ref<string>('添加用户')
const addUser = (row:User)=>{
  if(row.id){
    Object.assign(userInfo.value,{
      id: row.id,
      username: row.username,
      name: row.name
    })
    psd.value = false
    title.value = '修改用户'
  }else{
    title.value = '添加用户'
      userInfo.value = {
        username: '',
        password: '',
        name: ''
      }
    psd.value = true
  }
  drawer2.value = true
}
//添加用户抽屉
let drawer2 = ref<boolean>(false)
//新增用户信息
let userInfo = ref<User>({
  username: '',
  password: '',
  name: ''
})
//保存用户
const save = async()=>{
  await formRef.value.validate()
  let res = await reqAddOrUpdateUser(userInfo.value)
  if(res.code == 200){
    drawer2.value = false
    ElMessage.success(`${title.value}成功`)
    //留在当前页不变(修改时)
    // getUserPage(userInfo.value.id ? currentPage4.value : 1)
    //页面刷新
    window.location.reload()
  }else{
    drawer2.value = false
    ElMessage.error(`${title.value}失败`)
  }

}
//取消添加
const cancel = ()=>{
  drawer2.value = false
}
// 表单验证规则
const validatorUsername=(rules:any,value:string,callback:any)=>{
  if(/^[\u4e00-\u9fa5a-zA-Z_][\u4e00-\u9fa5a-zA-Z0-9_]{3,15}$/.test(value)){
    callback()
  } else {
    callback(new Error('必须以字母，中文或下划线开头，长度4-16'))
  }
}
const validatorPassword=(rules:any,value:string,callback:any)=>{
if(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{}|;:,.?/~`]{6,10}$/.test(value)){
  callback()
} else {
  callback(new Error('密码长度6-10位'))
}
}
const validatorName=(rules:any,value:string,callback:any)=>{
  if(/^[\u4e00-\u9fa5a-zA-Z0-9_]{2,10}$/.test(value)){
    callback()
  } else {
    callback(new Error('昵称长度2-10位'))
  }}
const rules = {
  username: [
  { required: true,validator:validatorUsername,trigger:'change'}
  ],
  name: [
  { required: true,validator:validatorName,trigger:'change'}
  ],
  password: [
  { required: true,validator:validatorPassword,trigger:'change'}
]
}
//表单ref
let formRef = ref()
//分配角色抽屉
let drawer1 = ref<boolean>(false)
//分配角色
let roleList = ref<roles[]>([])
const assignRole = async(row:User)=>{
  Object.assign(userInfo.value,{
    id: row.id,
    username: row.username,
    name: row.name,
    roleName: row.roleName
  })
    let res = await reqAssignRole(row.id!)
    if(res.code == 200){
      roleList.value = res.data.allRolesList
      checkedRoles.value = res.data.assignRoles.map((item:roles)=>item.roleName)
    }
  drawer1.value = true
}
//全选
const checkAll = ref(false)
const isIndeterminate = ref(true)
let checkedRoles = ref<string[]>([])
const handleCheckedRolesChange =(val:any)=>{
  const checkedCount = val.length
  checkAll.value = checkedCount === roleList.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < roleList.value.length
}
const handleCheckAllChange = (val:boolean)=>{
  checkedRoles.value =  val ? roleList.value.map(item=>item.roleName) : []
  isIndeterminate.value = false
}
//取消分配角色
const cancelAssignRole = ()=>{
  drawer1.value = false
}
//保存分配角色
let userId = ref<number>(0)
let roleId = ref<number[]>([])
const saveAssignRole = async()=>{
  roleId.value = roleList.value.filter(item=>checkedRoles.value.includes(item.roleName)).map(item=>item.id!)
  userId.value = userInfo.value.id!
  let res = await reqSaveAssignRole(userId.value,roleId.value)
  if(res.code == 200){
    drawer1.value = false
    ElMessage.success('分配角色成功')
    //页面刷新
    getUserPage(currentPage4.value)
  }else{
    drawer1.value = false
    ElMessage.error('分配角色失败')
}}
//删除用户
const deleteUser = async(row:User)=>{
  let res = await reqDeleteUser(row.id!)
  if(res.code == 200){
    ElMessage.success('删除用户成功')
    getUserPage(currentPage4.value)
  }else{
    ElMessage.error('删除用户失败')
  }
}
let userIdList = ref<number[]>([])
//批量删除用户
const selectChange = async(val:User[])=>{
  userIdList.value = val.map(item=>item.id!)
}
const batchDeleteUser = async()=>{
  let res = await reqBatchDeleteUser(userIdList.value)
  if(res.code == 200){
    ElMessage.success('批量删除用户成功')
    getUserPage(currentPage4.value)
  }else{
    ElMessage.error('批量删除用户失败')
  }}
  //查询
  let username = ref<string>('')
  const search = async()=>{
    getUserPage(1,username.value)
  }
  //重置
  const reset = async()=>{
    username.value = ''
    getUserPage(1)
  }
</script>
<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  }
.el-form-item {
  margin-bottom: 0;
}
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
