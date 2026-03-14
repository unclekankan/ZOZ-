<template>
  <el-card style="height: 80px;">
    <el-form :inline="true" class="form">
      <el-form-item label="角色名:">
        <el-input placeholder="请输入角色名称" v-model="rolename"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="search" :disabled="rolename ? false : true">搜索</el-button>
        <el-button type="info" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 20px;">
    <el-button type="primary" size="default" @click="addRole" icon="Plus">添加角色</el-button>
    <el-table  border style="width: 100%; margin-top: 20px;" :data="list">
      <el-table-column label="#" type="index" width="80px" align="center"></el-table-column>
      <el-table-column label="id" prop="id" width="220px" align="center"></el-table-column>
      <el-table-column label="角色名称" prop="roleName" width="220px" align="center"></el-table-column>
      <el-table-column label="创建时间" prop="createTime" width="220px" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="更新时间" prop="updateTime" width="220px" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="center">
        <template #="{row}">
        <el-button type="warning" size="default" @click="setPermission(row)" icon="InfoFilled" >分配权限</el-button>
        <el-button type="primary" size="default" @click="editRole(row)" icon="Edit">编辑</el-button>
          <el-popconfirm :title="`确定删除${row.roleName}吗?`" width="200px" icon="delete" @confirm="deleteRole(row)" >
              <template #reference>
                <el-button type="danger" icon="Delete" size="default">删除</el-button>
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
   <el-dialog v-model="dialogFormVisible" :title="title" width="650px" >
    <el-form style="margin: 30px 0;" :model="roleList"  :rules="rules" ref="form">
      <el-form-item label="角色名称" label-width="80px" prop="roleName">
        <el-input placeholder="请输入角色名称" v-model="roleList.roleName" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 分配权限 -->
   <el-drawer v-model="drawer">
    <template #header>
      <h2 style="color:#999999;">分配菜单及按钮权限</h2>
    </template>
    <template #>
        <el-tree ref="treeRef" style="max-width: 600px" :data="permission" show-checkbox node-key="id" default-expand-all :default-checked-keys="checkedPermission" :props="defaultProps"/>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { ref , onMounted, nextTick} from 'vue';
import { ElMessage } from 'element-plus';
import {reqGetRolePage, reqAddOrUpdateRole ,reqDeletRole ,reqGetPermission,reqAssignPermission} from '@/api/acl/role/index.ts'
import type { Role,permissionData, permissionList } from '@/api/acl/role/type.ts'
import type { roles } from '@/api/acl/user/type';
const rolename = ref('')
//列表数据
const list = ref<Role[]>([])
  //分页数据
  const currentPage4 = ref<number>(1)
  const pageSize4 = ref<number>(3)
  const total = ref<number>(0)
  //获取列表数据
  const getList = async(page = 1,rolename?:string)=>{
    page = currentPage4.value
    let result = await reqGetRolePage(currentPage4.value,pageSize4.value,rolename?.trim())
    if(result.code === 200){
      list.value = result.data.records
      total.value = result.data.total
    }
  }
  onMounted(()=>{
    getList()
  })
  //页码改变
  const handleCurrentChange = (val:number) => {
    currentPage4.value = val
    getList()
  }
  //每页条数改变
  const handleSizeChange = (val:number) => {
    pageSize4.value = val
    getList(1)
  }
  //搜索
  const search = ()=>{
    getList(1,rolename.value)
  }
  //重置
  const reset = ()=>{
    rolename.value = ''
    getList()
  }
  //显示添加角色的dialog
  const dialogFormVisible = ref<boolean>(false)
  let title = ref<string>('添加角色')
  let roleList = ref<Role>({
    id: 0,
    roleName: '',
    remark: ''
  })
  //添加角色
  const addRole = ()=>{
    Object.assign(roleList.value,{
      id: 0,
      roleName: '',
      remark: ''
    })
    dialogFormVisible.value = true
    title.value = '添加角色'
    //清楚上一次校验结果
    nextTick(()=>{
      form.value.clearValidate()
    })
  }
  //编辑角色
  const editRole = async(role:Role)=>{
    dialogFormVisible.value = true
    title.value = '编辑角色'
    Object.assign(roleList.value,{
      id: role.id,
      roleName: role.roleName,
      remark: role.remark
    })
    //清楚上一次校验结果
    nextTick(()=>{
      form.value.clearValidate()
    })
  }
  //保存
  const save = async()=>{
    await form.value.validate()
    dialogFormVisible.value = false
    let result = await reqAddOrUpdateRole(roleList.value)
    if(result.code === 200){
      ElMessage.success(roleList.value.id ? "修改成功" : "添加成功")
      getList(roleList.value.id ? currentPage4.value : 1)
    }else{
      ElMessage.error(result.message)
    }
  }
  //删除角色
  const deleteRole = async(row:roles)=>{
    let res = await reqDeletRole(row.id as number)
    if(res.code == 200){
      ElMessage.success("删除成功")
      getList(currentPage4.value)
    }else{
      ElMessage.error(res.message)
    }
  }
  //校验
  const validatorRoleName = (rules:any,value:string,callback:any)=>{
    if(value.trim().length >= 2){
      callback()
    }else{
      callback(new Error('必须大于两位'))
    }
  }
  const rules = {
    roleName:[
      {required: true,validator:validatorRoleName,trigger:'blur'}
  ]
  }
  //表单ref
  let form = ref()
  //抽屉的展示
  let drawer = ref<boolean>(false)
  //已选的权限
  let checkedPermission = ref([])
  //分配权限
  const setPermission = async(row:roles)=>{
    drawer.value = true
    Object.assign(paramsRole.value,row)
    let res = await reqGetPermission(paramsRole.value.id as number)
    if(res.code == 200){
      permission.value = res.data
    }
    checkedPermission.value = filterSelect(permission.value,[])
  }
  //递归判断权限
  const filterSelect = (allData:any,initArr:any)=>{
    allData.forEach((element:any) => {
      if(element.select && element.level == 4){
        initArr.push(element.id)
    }if(element.children && element.children.length > 0){
      filterSelect(element.children,initArr)
    }
    })
    return initArr
  }
  //权限列表
  let permission = ref<permissionData[]>([])
  //tree的展示规则
  const defaultProps = {
    children:'children',
    label:'name'
  }
  //角色信息
  let paramsRole = ref<roles>({
    id:0,
    roleName:'',
  })
  //确认
  let paramsList = ref([])
  let paramsList1 = ref([])
  let treeRef = ref()
  const confirm = async()=>{
    let roleid:number = paramsRole.value.id as number
    paramsList.value=treeRef.value.getCheckedKeys()
    paramsList1.value=treeRef.value.getHalfCheckedKeys()
    let permissionid = paramsList.value.concat(paramsList1.value)
    let res = await reqAssignPermission(roleid,permissionid)
    if(res.code == 200){
      ElMessage.success("权限分配成功")
      window.location.reload()
    }else{
      ElMessage.error(res.message)
    }
  }
</script>
<style>
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
