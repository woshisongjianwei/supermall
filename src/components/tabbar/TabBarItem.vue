<template>
  <div @click="handleClick()" class="tab-bar-item">
    <div v-if="!displayFlag">
      <slot name="icon"></slot>
    </div>
    <div v-else>
      <slot name="icon-active"></slot>
    </div>
    <div :class="{'red': displayFlag}">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    tabname: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    handleClick() {
      if (this.tabname === 'home') {
        this.$router.push({
          path: '/home'
        })
      } else if (this.tabname === 'category') {
        this.$router.push({
          path: '/category'
        })
      } else if (this.tabname === 'cart') {
        this.$router.push({
          path: '/cart'
        })
      } else if (this.tabname === 'profile') {
        this.$router.push({
          path: '/profile'
        })
      }
    }
  },
  computed: {
    displayFlag() {
      return this.$route.path.indexOf(this.tabname) !== -1
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  font-size: 14px;
  flex: 1;
  text-align: center;
  /* display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center; */
  /* padding: 7px 0; */
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
.red {
  color: #ff5777;
}
</style>
