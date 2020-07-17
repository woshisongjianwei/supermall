<template>
  <div class="detail-goodinfo">
    <div class="good-top">
      <div class="feagure-up"></div>
      <div class="desc">{{goodInfo.desc}}</div>
      <div class="feagure-down"></div>
    </div>
    <div class="good-bottom">
      <div :key="index" class="item" v-for="(item,index) in goodInfo.detailImage">
        <p>{{item.key}}</p>
        <img :key="indey" :src="iten" @load="imgLoad" alt v-for="(iten,indey) in item.list" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodInfo',
  props: {
    goodInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imgLoad() {
      this.$emit('goodinfoimgloadrefresh')
    }
  }
}
</script>

<style scoped>
.detail-goodinfo {
  padding: 20px 5px;
  box-shadow: 0px 2px 2px rgba(100, 100, 100, 0.1);
}
.good-top {
  position: relative;
}
.feagure-up {
  border: 1px solid #aaaaaa;
  width: 25%;
  position: absolute;
  top: 0;
  height: 0;
}
.feagure-up::before {
  content: '';
  width: 5px;
  height: 5px;
  background-color: #666666;
  display: inline-block;
  position: absolute;
  top: -6px;
  left: -1px;
}
.feagure-down {
  border: 1px solid #aaaaaa;
  width: 25%;
  position: absolute;
  right: 0;
  height: 0;
}
.feagure-down::after {
  content: '';
  width: 5px;
  height: 5px;
  background-color: #666666;
  display: inline-block;
  position: absolute;
  top: -6px;
  right: -1px;
}
.good-top .desc {
  font-size: 14px;
  color: #666666;
  padding: 15px 0;
}
.item p {
  font-size: 18px;
  margin: 30px 0 10px;
  color: #333333;
}
.good-bottom img {
  width: 100%;
}
</style>
