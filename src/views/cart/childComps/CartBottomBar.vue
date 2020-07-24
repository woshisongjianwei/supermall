<template>
  <div class="cart-bottom-bar">
    <div class="cart-bottom-left">
      <cart-check-button :ischeck="isSelectAll" @checkclick="checkClick"></cart-check-button>
      <span>全选</span>
      <span class="total">合计 {{"¥" + totalMoney}}</span>
    </div>
    <div class="cart-bottom-right">去结算 {{cartListLength}}</div>
  </div>
</template>

<script>
import CartCheckButton from '@/views/cart/childComps/CartCheckButton.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'CartBottomBar',
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.$store.commit('unSelectAll')
      } else {
        this.$store.commit('selectAll')
      }
    }
  },
  computed: {
    ...mapGetters(['isSelectAll', 'totalMoney', 'cartListLength'])
  },
  components: {
    CartCheckButton
  }
}
</script>

<style scoped>
.cart-bottom-bar {
  height: 40px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 49px;
  background-color: #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}
.cart-bottom-left {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}
.cart-bottom-left .total {
  margin-left: 20px;
}
.cart-bottom-right {
  width: 100px;
  font-size: 18px;
  background-color: #f69;
  color: #ffffff;
  text-align: center;
  line-height: 40px;
}
</style>
