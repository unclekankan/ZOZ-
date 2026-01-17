<template>
<div class="login_container">
  <el-row>
    <el-col :span="17" :xs="0"></el-col>
    <el-col :span="7" :xs="24">
      <el-form class="login" :model="userInfo" :rules="rules" ref="loginForm">
        <h1>你好！</h1>
        <h2>欢迎使用ZOZ后台管理系统</h2>
        <!-- prop连接需要验证的属性与规则 -->
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" :prefix-icon="User" v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" type="password" :prefix-icon="Lock" v-model="userInfo.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login_but" size="default" @click="login" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</div>
</template>






<script setup lang="ts" >
import {Lock, User} from '@element-plus/icons-vue'
import {ref} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { ElMessage, ElNotification } from 'element-plus'
const {userLogin} = useUserStore()
const router = useRouter()
const route = useRoute()
// 登录表单数据
let userInfo=ref({
  username:'admin',
  password:'111111'
})
console.log(userInfo.value.password);

// 表单验证规则
const validatorUsername=(rules:any,value:string,callback:any)=>{
  if(/^[a-zA-Z_][a-zA-Z0-9_]{3,15}$/.test(value)){
    callback()
  } else {
    callback(new Error('必须以字母下划线开头，长度4-16'))
  }
}
const validatorPassword=(rules:any,value:string,callback:any)=>{
if(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{}|;:,.?/~`]{6,10}$/.test(value)){
  callback()
} else {
  callback(new Error('密码长度6-10位'))
}
}
const rules = {
  username: [
  {validator:validatorUsername,trigger:'change'}
  ],
  password: [
  {validator:validatorPassword,trigger:'change'}
]
}
//获取时间
const getTime = () => {
  const hour = new Date().getHours();
  if (hour < 6) return '凌晨好';
  if (hour < 9) return '早上好';
  if (hour < 12) return '上午好';
  if (hour < 14) return '中午好';
  if (hour < 17) return '下午好';
  if (hour < 19) return '傍晚好';
  if (hour < 22) return '晚上好';
  return '夜深了，注意休息哦';
}
// 表单ref
let loginForm=ref()
//  loading状态
let loading=ref(false)
// 登录方法
//asyncx 修饰的函数会返回一个promise对象如果其中的异步操作失败会返回reject状态的promise(此代码后面的代码不会执行)
 const login= async()=>{
  // 表单验证，如果验证失败会直接返回reject导致后面的代码无法执行2
  await loginForm.value.validate()
  loading.value=true
  try{
    await userLogin(userInfo.value)
    loading.value=false
    let redirect:any = route.query.redirect
    router.push({path:redirect || '/'})
    ElNotification({
      title: '宝贝儿~'+' '+getTime(),
      message: '欢迎回来！',
      type: 'success',
    })
  } catch (error:any){
    loading.value=false
    ElMessage.error(error.message)
  }
}
</script>




<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/images/login.jpg');
  background-size: cover;
}
.login{
  width: 45vh;
  margin-top: 35vh;
  padding: 1vh 3vh 1vh 3vh;
  box-shadow: 0 0 10px rgba(12, 131, 174, 0.1);
  border-radius: 8px;
  background-color: #aebbbed2;
}
.login_but{
  width: 100%;
}
</style>
