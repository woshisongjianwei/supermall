<template>
  <div id="app">
    <keep-alive :exclude="['Detail']">
      <router-view />
    </keep-alive>

    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from '@/components/tabbar/MainTabBar.vue'

export default {
  data() {
    return {}
  },
  components: {
    MainTabBar
  }
}
</script>

<style>
@import 'assets/css/base.css';

body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
