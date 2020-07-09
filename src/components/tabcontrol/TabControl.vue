<template>
  <div class="tab-control">
    <div :key="index" @click="tabClick(index)" v-for="(item,index) in tabTitles">
      <span :class="{'active': index===tabIndex}">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    tabTitles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      tabIndex: 0
    }
  },
  methods: {
    tabClick(index) {
      this.tabIndex = index
      this.$emit('tabclick', index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 40px;
  line-height: 40px;
}
.tab-control div {
  flex: 1;
  text-align: center;
  font-size: 15px;
  color: #333333;
}
.tab-control div span {
  padding: 5px;
}
.active {
  color: #ff5777;
  border-bottom: 3px solid #ff8198;
}
</style>
