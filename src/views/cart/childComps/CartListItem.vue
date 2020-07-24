<template>
  <div class="cart-list-item">
    <cart-check-button :ischeck="product.ischeck" @checkclick="checkClick"></cart-check-button>
    <div class="cart-left">
      <img :src="product.img" alt />
    </div>
    <div class="cart-right">
      <p class="title">{{product.title}}</p>
      <p class="desc">{{product.desc}}</p>
      <p class="info">
        <span>{{product.price}}</span>
        <span>{{"x" + product.counter}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import CartCheckButton from '@/views/cart/childComps/CartCheckButton.vue'

export default {
  name: 'CartListItem',
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    checkClick() {
      this.product.ischeck = !this.product.ischeck
    }
  },
  components: {
    CartCheckButton
  }
}
</script>

<style scoped>
.cart-list-item {
  width: 100%;
  border-bottom: 1px solid #cccccc;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  padding: 10px 6px 10px;
}
.cart-left {
  width: 100px;
}
.cart-left img {
  width: 100px;
  height: 120px;
  border-radius: 5px;
}
.cart-right {
  flex: 1;
  overflow: hidden;
}
.title {
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
  padding: 0px 0px 5px 10px;
  color: #333333;
  font-size: 16px;
}
.desc {
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
  padding: 10px 0px 45px 10px;
  color: #999999;
  font-size: 14px;
}
.info {
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
}
</style>
