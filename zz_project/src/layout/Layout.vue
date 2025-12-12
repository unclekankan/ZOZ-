<template>
<div class="layout_continer">
  <!-- 菜单 -->
  <div class="layout_menu">
    <div class="logo" v-if="setting.logoHidden">
      <img :src="setting.logo" alt="">
      <p>{{ setting.title }}</p>
      </div>
      <el-scrollbar class="scrollbar">
        <el-menu background-color="#002f3e" text-color="#ffffff">
          <el-menu-item index="1">
           首页
          </el-menu-item>
          <el-menu-item index="2">
           数据大屏
          </el-menu-item>
        <el-sub-menu index="3">
          <template #title>
            <span>权限管理</span>
          </template>
          <el-menu-item index="3-1">
          <el-icon><setting /></el-icon>
          <span>用户管理</span>
        </el-menu-item><el-menu-item index="3-2">
          <el-icon><setting /></el-icon>
          <span>角色管理</span>
        </el-menu-item><el-menu-item index="3-3">
          <el-icon><setting /></el-icon>
          <span>菜单管理</span>
        </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="7">
          <template #title>
            <span>商品管理</span>
          </template>
          <el-menu-item index="8">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item><el-menu-item index="9">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item><el-menu-item index="10">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
        </el-sub-menu>

      </el-menu>
      </el-scrollbar>

  </div>
  <div class="layout_content">
    <router-view>Loading...</router-view>
    <p style="height: 100px;"></p>
  </div>
  <div class="layout_navigation">
    导航
  </div>
</div>

</template>
<script setup lang="ts">
import setting from '../setting.ts'
</script>
<style scoped lang="scss">
.layout_continer{
  width: 100%;
  height: 100vh;
  background-color: #000000;
  .layout_menu{
  width: $layout_manu_width;
  height: 100vh;
  background-color: $layout_manu_bgc;
  .logo{
    display: flex;
    align-items: center;
    width:100% ;
    height: $layout_manu_logo_height;
    padding: 20px 0 0 20px;
    img{
      width: 60px;
      height: 70px;
    }
    p{
      font-size: $layout_manu_p_size;
      margin-left: 10px;
      color: #ffffff;
    }
  }
  .scrollbar{
      height: calc(100vh - $layout_manu_logo_height);
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
  box-shadow: 0 3.5px 5px -2px rgb(0, 0, 0);
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
}
</style>
