<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.nav-bar {
  height: 44px;
  line-height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.left {
  width: 60px;
  font-size: 30px;
  text-align: center;
  color: #999999;
}
.right {
  width: 60px;
}
.center {
  flex: 1;
  text-align: center;
  font-size: 14px;
}
</style>
