<template>
  <div>
    <cart-list-item :key="index" :product="item" v-for="(item,index) in cartList"></cart-list-item>
  </div>
</template>

<script>
import CartListItem from '@/views/cart/childComps/CartListItem.vue'

export default {
  name: 'CartList',
  props: {
    cartList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    CartListItem
  }
}
</script>

<style scoped>
</style>
