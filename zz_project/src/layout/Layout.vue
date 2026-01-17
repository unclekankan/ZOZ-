<template>
<div class="layout_continer">
  <!-- 菜单 -->
  <div class="layout_menu">
    <div class="logo" v-if="setting.logoHidden">
      <img :src="setting.logo" alt="">
      <p>{{ setting.title }}</p>
    </div>
      <el-scrollbar class="scrollbar">
        <el-menu background-color="#002f3e" text-color="#ffffff"  :default-active="route.path" :collapse="fold_menu">
         <Menus :menuList="menuRouter"></Menus>
        </el-menu>
      </el-scrollbar>
  </div>
  <!-- 内容区 -->
  <div class="layout_content" :class="{fold: fold_menu}">
    <Content></Content>
  </div>
  <!-- 导航 -->
  <div class="layout_navigation"  :class="{fold: fold_menu}">
    <Nav :fold_menu="fold_menu" :fold_menu_f="fold_menu_f"></Nav>
  </div>
</div>

</template>
<script setup lang="ts">
import setting from '../setting.ts'
import { useUserStore } from '@/stores/modules/user.ts'
import Menus from './menu/menu.vue'
import Content from './Content/Content.vue'
import {useRoute} from 'vue-router'
import Nav from './nav/nav.vue'
import {ref,onMounted} from 'vue'
const route= useRoute()
const {menuRouter,userInfo} = useUserStore()
let fold_menu = ref(false)
const fold_menu_f = (ele:boolean) => {
  fold_menu.value = ele
  if(ele){
  }else{}
}
onMounted(()=>{
  let result = userInfo()
})
</script>
<style scoped lang="scss">
.layout_continer{
  width: 100%;
  height: 100vh;
  background-color: #000000;
  .layout_menu{
  width: $layout_manu_width;
  transition: all 0.5s;
  height: 100vh;
  background-color: $layout_manu_bgc;
  .logo{
    display: flex;
    align-items: center;
    width:100% ;
    height: $layout_manu_logo_height;
    padding: 20px 0 0 10px;
    img{
      width: 45px;
      height: 50px;
    }
    p{
      font-size: $layout_manu_p_size;
      margin-left: 10px;
      color: #ffffff;
    }

  }
    &.fold{
    width: $layout_manu_minus_width;
    }
  .scrollbar{
      height: calc(100vh - $layout_manu_logo_height);
      .el-menu{
        border-right: none;
      }
}
}
}
.layout_navigation{
  position: fixed;
  top: 0%;
  left: $layout_manu_width;
  width: calc(100% - $layout_manu_width);
  height: $layout_navigation_height;
  background-color: #ffffff;
  transition: all 0.5s;
  box-shadow: 0 3.5px 5px -2px rgb(0, 0, 0);
   &.fold{
    width: calc(100% - $layout_manu_minus_width);
    left: $layout_manu_minus_width;
    }
}
.layout_content{
  padding: 20px;
  width: calc(100% - $layout_manu_width);
  height: calc(100vh - $layout_navigation_height);
  background-color: #ffffff;
  position: relative;
  left: $layout_manu_width;
  top:calc($layout_navigation_height - 100vh);
  overflow: auto;
  transition: all 0.5s;
   &.fold{
    width: calc(100% - $layout_manu_minus_width);
    left:$layout_manu_minus_width;
    }
}

</style>
