<template>
  <swiper class="detail-swiper">
    <swiper-item :key="index" v-for="(item,index) in banners">
      <a href>
        <img :src="item" alt />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from '@/components/swiper'

export default {
  name: 'DetailSwiper',
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
.detail-swiper {
  height: 300px;
}
</style>
