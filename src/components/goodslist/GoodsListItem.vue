<template>
  <div @click="itemClick(goodsItem.iid)" class="goods-list-item">
    <img :src="compuImg" @load="goodsImgLoad" alt />
    <div class="goods-info">
      <p class="title">{{goodsItem.title}}</p>
      <p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="cfav">
          <i class="fa fa-star-o"></i>
          {{goodsItem.cfav}}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    goodsImgLoad() {
      this.$bus.$emit('goodsImgLoadRefresh')
    },
    itemClick(iid) {
      this.$router.push({
        path: '/detail',
        query: {
          iid
        }
      })
    }
  },
  computed: {
    compuImg() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  }
}
</script>

<style scoped>
.goods-list-item {
  width: 48%;
}
.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  text-align: center;
  font-size: 12px;
  margin: 5px 0 5px;
}
.goods-info .title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: red;
}
.goods-info .cfav {
  margin-left: 20px;
}
</style>
