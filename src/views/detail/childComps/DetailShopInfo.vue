<template>
  <div class="detail-shopinfo">
    <div class="shop-top">
      <img :src="shopInfo.shopLogo" alt />
      <span>{{shopInfo.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="sale">
        <span>{{shopInfo.cSells}}</span>
        <span>总销量</span>
      </div>
      <div class="count">
        <span>{{shopInfo.cGoods}}</span>
        <span>全部宝贝</span>
      </div>
      <div class="score">
        <table>
          <tr :key="index" v-for="(item,index) in shopInfo.score">
            <td>{{item.name}}</td>
            <td>
              <span :class="{'good':item.isBetter,'bad':!item.isBetter}">{{item.score}}</span>
            </td>
            <td>
              <span
                :class="{'high':item.isBetter,'low':!item.isBetter,'base':true}"
              >{{item.isBetter ? '高' : '低'}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <span>进店逛逛</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.detail-shopinfo {
  padding: 15px 5px;
  box-shadow: 0px 2px 2px rgba(100, 100, 100, 0.1);
}
.shop-top {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  font-size: 18px;
  color: #333333;
}
.shop-top img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.shop-top span {
  margin-left: 8px;
}
.shop-middle {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  font-size: 14px;
  margin-top: 8px;
}
.sale,
.count {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.score {
  width: 150px;
}
.score table {
  width: 100%;
}
.score td {
  padding: 3px 0;
}
.good {
  color: #f13e3a;
}
.bad {
  color: #5ea732;
}
.high {
  background-color: #f13e3a;
}
.low {
  background-color: #5ea732;
}
.base {
  color: #ffffff;
  padding: 1px;
}
.shop-bottom {
  text-align: center;
  height: 45px;
  line-height: 45px;
  font-size: 15px;
  margin-top: 5px;
}
.shop-bottom span {
  padding: 5px 40px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  background-color: #f2f5f8;
}
</style>
