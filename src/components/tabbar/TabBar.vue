<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style scoped>
#tab-bar {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 49px;
  display: flex;
  background-color: #f6f6f6;
  box-shadow: 0px -2px 5px rgba(100, 100, 100, 0.06);
}
</style>
