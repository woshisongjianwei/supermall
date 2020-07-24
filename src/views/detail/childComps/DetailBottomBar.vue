<template>
  <div class="detail-bottom-bar">
    <div class="bottom-bar-left">
      <div class="phone">
        <div class="img"></div>
        <span>客服</span>
      </div>
      <div class="shop">
        <div class="img"></div>
        <span>店铺</span>
      </div>
      <div class="star">
        <div class="img"></div>
        <span>收藏</span>
      </div>
    </div>
    <div class="bottom-bar-right">
      <div @click="addToCart" class="cart">
        <span>加入购物车</span>
      </div>
      <div class="buy">
        <span>购买</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  methods: {
    addToCart() {
      this.$emit('addtocart')
    }
  }
}
</script>

<style scoped>
.detail-bottom-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 58px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  background-color: #ffffff;
  box-shadow: 0px -1px 6px rgba(100, 100, 100, 0.1);
}
.bottom-bar-left {
  flex: 1;
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
}
.phone,
.shop,
.star {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.img {
  background: url('~assets/img/detail/detail_bottom.png') no-repeat center
    center;
  width: 22px;
  height: 22px;
  background-size: cover;
}
.phone .img {
  background-position: 0px -52px;
}
.shop .img {
  background-position: 0px -98px;
}
.star .img {
  background-position: 0px 1px;
}
.bottom-bar-right {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}
.cart {
  width: 100px;
  font-size: 18px;
  background-color: #ffe817;
  color: #333333;
  text-align: center;
  line-height: 58px;
}
.buy {
  flex: 1;
  font-size: 18px;
  background-color: #f69;
  color: #ffffff;
  text-align: center;
  line-height: 58px;
}
</style>
