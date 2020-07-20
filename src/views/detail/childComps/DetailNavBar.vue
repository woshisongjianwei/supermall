<template>
  <div>
    <nav-bar>
      <i @click="arrowClick" class="fa fa-angle-left" slot="left"></i>
      <div class="nav-title" slot="center">
        <div
          :class="{'active': index===navIndex}"
          :key="index"
          @click="navClick(index)"
          class="nav-title-item"
          v-for="(item,index) in navTitles"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar.vue'

export default {
  name: 'DetailNavBar',
  props: {
    navTitles: {
      type: Array,
      default() {
        return []
      }
    },
    navIndex: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  methods: {
    arrowClick() {
      this.$router.back()
    },
    navClick(index) {
      this.$emit('gonavposition', index)
    }
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>
.nav-title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
}
.nav-title-item {
  flex: 1;
}
.active {
  color: #ff5777;
}
</style>
