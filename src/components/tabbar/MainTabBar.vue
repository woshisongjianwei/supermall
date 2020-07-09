<template>
  <tab-bar>
    <tab-bar-item tabname="home">
      <!-- <i class="fa fa-home fa-lg"></i> -->
      <img alt slot="icon" src="@/assets/img/tabbar/home.svg" />
      <img alt slot="icon-active" src="@/assets/img/tabbar/home_active.svg" />
      <span slot="text">首页</span>
    </tab-bar-item>
    <tab-bar-item tabname="category">
      <!-- <i class="fa fa-eye fa-lg"></i> -->
      <img alt slot="icon" src="@/assets/img/tabbar/category.svg" />
      <img alt slot="icon-active" src="@/assets/img/tabbar/category_active.svg" />
      <span slot="text">分类</span>
    </tab-bar-item>
    <tab-bar-item tabname="cart">
      <!-- <i class="fa fa-eye fa-lg"></i> -->
      <img alt slot="icon" src="@/assets/img/tabbar/shopcart.svg" />
      <img alt slot="icon-active" src="@/assets/img/tabbar/shopcart_active.svg" />
      <span slot="text">购物车</span>
    </tab-bar-item>
    <tab-bar-item tabname="profile">
      <!-- <i class="fa fa-user fa-lg"></i> -->
      <img alt slot="icon" src="@/assets/img/tabbar/profile.svg" />
      <img alt slot="icon-active" src="@/assets/img/tabbar/profile_active.svg" />
      <span slot="text">我的</span>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from '@/components/tabbar/TabBar.vue'
import TabBarItem from '@/components/tabbar/TabBarItem.vue'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
</style>
