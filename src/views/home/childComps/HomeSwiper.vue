<template>
  <div>
    <swiper>
      <swiper-item :key="index" v-for="(item,index) in banners">
        <a :href="item.link">
          <img :src="item.image" @load="homeSwiperImgLoad" alt />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from '@/components/swiper'

export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    homeSwiperImgLoad() {
      this.$emit('homeswiperimgload')
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
</style>
