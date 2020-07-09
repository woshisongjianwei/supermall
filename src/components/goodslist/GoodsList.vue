<template>
  <div class="goods-list">
    <goods-list-item :goods-item="item" :key="index" v-for="(item,index) in goods"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from '@/components/goodslist/GoodsListItem.vue'

export default {
  name: 'GoodsList',
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  }
}
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  padding: 2px;
}
</style>
