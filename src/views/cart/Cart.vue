<template>
  <div id="cart">
    <nav-bar class="cart-nav-bar">
      <p slot="center">购物车({{cartListLength}})</p>
    </nav-bar>

    <cart-list :cart-list="cartList"></cart-list>

    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar.vue'
import CartList from '@/views/cart/childComps/CartList.vue'
import CartBottomBar from '@/views/cart/childComps/CartBottomBar.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  computed: {
    ...mapGetters(['cartList', 'cartListLength'])
  },
  components: {
    NavBar,
    CartList,
    CartBottomBar
  }
}
</script>

<style scoped>
#cart {
  height: 100vh;
  position: relative;
}
.cart-nav-bar {
  background-color: #ff8198;
  color: #ffffff;
}
</style>
