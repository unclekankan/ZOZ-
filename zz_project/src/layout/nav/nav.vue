<template>
<div class="nav">
  <div class="left_nav">
    <el-icon style="margin-right:2vh ;" @click="fold_change">
    <component :is="fold_Icon"/>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="ele in route.matched" :key="ele.path" v-show="ele.meta.title" :to="ele.path">
        <el-icon style="margin: 0px 2px; vertical-align: top; ">
          <component :is="ele.meta.icon"></component>
        </el-icon>
        <span>{{ ele.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="right_nav">
    <el-button icon="Refresh" circle @click="fresh"></el-button>
    <el-button :icon="Ficon" circle @click="fullScreen"></el-button>
     <el-popover placement="bottom" title="主题切换" :visible="visual" width="250px">
      <el-form>
        <el-form-item label="主题颜色">
           <el-color-picker v-model="color" show-alpha @change="setColor"/>
        </el-form-item>
        <el-form-item label="暗黑模式">
           <el-switch v-model="dark" inline-prompt active-action-icon="MoonNight" inactive-action-icon="Sunny" @change="setMode"/>
        </el-form-item>
      </el-form>
    <template #reference>
      <el-button icon="Setting" circle @click="visual = !visual"></el-button>
    </template>
  </el-popover>
    <div class="avatar">
      <img :src=userStore.avater style="width: 35px; height: 35px;">
    </div>
    <!-- 退出登录 -->
    <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="LogOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  </div>
</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import {useRoute} from 'vue-router'
import { useRouter } from 'vue-router';
import {useLayoutStore} from '@/stores/modules/setting/setting'
import { useUserStore } from '@/stores/modules/user.ts'
const userStore = useUserStore()
const router = useRouter()
let fold_Icon = ref('fold')
let fold_props = defineProps(['fold_menu','fold_menu_f'])
const fold_change = ()=>{
  fold_Icon.value = fold_Icon.value === 'fold' ? 'Expand' : 'fold'
  if(fold_props.fold_menu){
    fold_props.fold_menu_f(false)

  }else{fold_props.fold_menu_f(true)}
}
const route = useRoute()
const layoutStore = useLayoutStore()
const fresh = ()=>layoutStore.refresh = !layoutStore.refresh
// 全屏
let Ficon = 'FullScreen'
const fullScreen = ()=>{
  let flag = document.fullscreenElement
  if(!flag){
    //  Ficon = 'FullScreen'
    document.documentElement.requestFullscreen()
  }else{
    document.exitFullscreen()
    // Ficon = ''
  }
}
// 退出登录
const LogOut = async()=>{
  try{await userStore.userLogout()
    router.replace({
    path:'/Login',
    query: { redirect:route.path}
  })
  }
  catch(e){
    console.log(e);
  }
}
//颜色选择器
const color = ref('rgba(19, 206, 102, 0.8)')
//暗黑模式切换开关
let dark = ref<boolean>(false)
let visual = ref<boolean>(false)
//切换暗黑模式
const setMode = ()=>{
  let html = document.documentElement
  dark.value ? html.className='dark' : html.className=''
}
//主题颜色
const setColor = ()=>{
  let html = document.documentElement
  getComputedStyle(html).getPropertyValue(`--el-color-primary`)
  html.style.setProperty('--el-color-primary', color.value)
}
</script>
<style scoped lang="scss">
  .nav{
    width: 100%;
    height: 100%;
    padding-left:2vh ;
    padding-right: 2vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left_nav{
    display: flex;
  }
    .right_nav{
      display: flex;
      align-content:  center;
      .avatar{
        width: 35px;
        height: 35px;
        margin: 0 2vh 0 2vh;
        // border: 1px solid #000000;
        border-radius: 17.5px;
        overflow: hidden;
      }
      .el-dropdown-link{
        line-height: 32px;
      }
    }
  }
</style>
