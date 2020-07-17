<template>
  <div class="detail-baseinfo">
    <div class="title">{{baseInfo.title}}</div>
    <div class="prices">
      <span class="price">{{baseInfo.price}}</span>
      <span class="oldprice">{{baseInfo.oldPrice}}</span>
      <span class="discount">{{baseInfo.discountDesc}}</span>
    </div>
    <div class="columns">
      <div class="cleft">{{baseInfo.columns[0]}}</div>
      <div class="ccenter">{{baseInfo.columns[1]}}</div>
      <div class="cright">{{baseInfo.services[baseInfo.services.length-1].name}}</div>
    </div>
    <div class="services">
      <div
        :class="{'cright':index===2,'cleft':index===0,'ccenter':index===1}"
        :key="index"
        v-for="(item,index) in baseInfo.services.length-1"
      >
        <img :src="baseInfo.services[index].icon" alt />
        <span>{{baseInfo.services[index].name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    baseInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.detail-baseinfo {
  padding: 15px 5px;
  box-shadow: 0px 2px 2px rgba(100, 100, 100, 0.1);
}
.title {
  font-size: 16px;
  color: #222222;
}
.prices {
  margin-top: 10px;
}
.prices .price {
  color: #ff5777;
  font-size: 24px;
}
.prices .oldprice {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}
.prices .discount {
  padding: 2px 6px;
  border-radius: 8px;
  background-color: #ff5777;
  color: #ffffff;
  font-size: 12px;
  margin-left: 10px;
}
.columns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  font-size: 13px;
  margin-top: 15px;
  color: #999999;
}
.columns div {
  flex: 1;
}
.services {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  font-size: 14px;
  margin-top: 20px;
  color: #666666;
}
.services div {
  flex: 1;
}
.services img {
  width: 13px;
  height: 13px;
}
</style>
