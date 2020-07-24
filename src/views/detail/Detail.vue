<template>
  <div id="detail">
    <detail-nav-bar :nav-index="navIndex" :nav-titles="navTitles" @gonavposition="goNavPosition"></detail-nav-bar>

    <b-scroll
      :isrefresh="true"
      :probeType="3"
      @refreshing="getNavPosition"
      @scrolling="toggleBackTop"
      class="bscroll-wrapper"
      ref="detailBscroll"
    >
      <detail-swiper :banners="banners"></detail-swiper>

      <detail-base-info :base-info="baseInfo" v-if="Object.keys(baseInfo).length !== 0"></detail-base-info>

      <detail-shop-info :shop-info="shopInfo"></detail-shop-info>

      <detail-good-info
        :good-info="goodInfo"
        @goodinfoimgloadrefresh="goodInfoImgLoadRefresh"
        ref="detailGoodRef"
      ></detail-good-info>

      <detail-param-info
        :param-info="paramInfo"
        ref="detailParamRef"
        v-if="Object.keys(paramInfo).length !== 0"
      ></detail-param-info>

      <detail-comment-info
        :comment-info="commentInfo"
        ref="detailCommentRef"
        v-if="Object.keys(commentInfo).length !== 0"
      ></detail-comment-info>

      <goods-list :goods="recommends" class="detail-recommends" ref="detailRecommendRef">
        <div class="detail-recommends-title" slot="title">
          <span>推荐信息</span>
        </div>
      </goods-list>
    </b-scroll>

    <detail-bottom-bar @addtocart="addToCart"></detail-bottom-bar>

    <back-top @click.native="backtopClick" class="detail-back-top" v-show="isShowBacktop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from '@/views/detail/childComps/DetailNavBar.vue'
import DetailSwiper from '@/views/detail/childComps/DetailSwiper.vue'
import DetailBaseInfo from '@/views/detail/childComps/DetailBaseInfo.vue'
import DetailShopInfo from '@/views/detail/childComps/DetailShopInfo.vue'
import DetailGoodInfo from '@/views/detail/childComps/DetailGoodInfo.vue'
import DetailParamInfo from '@/views/detail/childComps/DetailParamInfo.vue'
import DetailCommentInfo from '@/views/detail/childComps/DetailCommentInfo.vue'
import GoodsList from '@/components/goodslist/GoodsList.vue'
import BScroll from '@/components/bscroll/BScroll.vue'

import DetailBottomBar from '@/views/detail/childComps/DetailBottomBar.vue'
import BackTop from '@/components/backtop/BackTop.vue'

import { debounce } from '@/common/utils.js'
import { getDetailData, getDetailRecommends } from '@/network/detail.js'

export default {
  name: 'Detail',
  data() {
    return {
      iid: '',

      navIndex: 0,
      navTitles: ['商品', '参数', '评论', '推荐'],
      navPositions: [],

      isShowBacktop: false,
      detailData: {},
      banners: [],
      baseInfo: {},
      shopInfo: {},
      goodInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],

      debounceGoodInfoImg: null,
      debounceGoodRecommendImg: null,
      debounceGoodRecommendImgCB: null
    }
  },
  created() {
    this.iid = this.$route.query.iid
    this.getDetailData(this.iid)
    this.getDetailRecommends()
  },
  mounted() {
    // 防抖动函数 debounce 函数的第一次用法，实现效果：30 个商品图片需要加载 30 次，但是 BScroll 插件可能只刷新了几次
    // 多个异步操作短时间内迅速发生，这里得采用防抖动函数机制来进行处理
    this.debounceGoodInfoImg = debounce(this.$refs.detailBscroll.refresh, 200)

    // 防抖动函数 debounce 函数的第一次用法，实现效果：30 个商品图片需要加载 30 次，但是 BScroll 插件可能只刷新了几次
    // 多个异步操作短时间内迅速发生，这里得采用防抖动函数机制来进行处理
    this.debounceGoodRecommendImg = debounce(
      this.$refs.detailBscroll.refresh,
      200
    )
    this.debounceGoodRecommendImgCB = () => {
      this.debounceGoodRecommendImg()
    }
    this.$bus.$on('goodsImgLoadRefresh', this.debounceGoodRecommendImgCB)
  },
  destroyed() {
    this.$bus.$off('goodsImgLoadRefresh', this.debounceGoodRecommendImgCB)
  },
  methods: {
    // 获取轮播图数据、商品基本数据、店铺数据、商品详情数据、商品参数数据、推荐信息数据
    getDetailData(iid) {
      getDetailData(iid)
        .then(res => {
          this.detailData = res.result
          this.banners = this.detailData.itemInfo.topImages

          this.baseInfo.title = this.detailData.itemInfo.title
          this.baseInfo.price = this.detailData.itemInfo.lowNowPrice
          this.baseInfo.oldPrice = this.detailData.itemInfo.oldPrice
          this.baseInfo.discountDesc = this.detailData.itemInfo.discountDesc
          this.baseInfo.columns = this.detailData.columns
          this.baseInfo.services = this.detailData.shopInfo.services

          this.shopInfo = this.detailData.shopInfo

          this.goodInfo = this.detailData.detailInfo

          this.paramInfo = this.detailData.itemParams

          if (this.detailData.rate.list.length > 0) {
            this.commentInfo = this.detailData.rate.list[0]
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取推荐信息数据
    getDetailRecommends() {
      getDetailRecommends()
        .then(res => {
          this.recommends = res.data.list
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 商品详情子组件中，一堆详情图片加载完触发 BScroll 组件刷新高度问题
    // 否则滚动有不流畅卡顿死现象，显然此处需要  debounce 防抖函数机制
    goodInfoImgLoadRefresh() {
      this.debounceGoodInfoImg()
    },
    // BScroll 组件每次 refresh 刷新完，都重新计算四个 NavBar 项的实际 offsetTop 值
    getNavPosition() {
      this.navPositions = []
      this.navPositions.push(this.$refs.detailGoodRef.$el.offsetTop)
      this.navPositions.push(this.$refs.detailParamRef.$el.offsetTop)
      this.navPositions.push(this.$refs.detailCommentRef.$el.offsetTop)
      this.navPositions.push(this.$refs.detailRecommendRef.$el.offsetTop)
    },
    // 点击 NavBar 不同区域，BScroll 组件滚动到相应点击位置去
    goNavPosition(index) {
      this.navIndex = index
      this.$refs.detailBscroll.scrollTo(0, -this.navPositions[index], 600)
    },
    // BScroll 滚动时，切换 BackTop 子组件显隐
    toggleBackTop(pos) {
      if (-pos.y > 1000) {
        this.isShowBacktop = true
      } else {
        this.isShowBacktop = false
      }

      // 这个寻找相应 NavBar 索引值的手段，稍微有点复杂
      this.navPositions.forEach((item, index, arr) => {
        // 这个判断条件很关键，可拦截 90% 的循环次数
        if (this.navIndex !== index) {
          if (
            index < arr.length - 1 &&
            -pos.y > item &&
            -pos.y < arr[index + 1]
          ) {
            this.navIndex = index
          }
          if (index === arr.length - 1 && -pos.y > arr[arr.length - 1]) {
            this.navIndex = arr.length - 1
          }
        }
      })
    },
    addToCart() {
      let good = {}
      good.iid = this.iid
      good.img = this.banners[0]
      good.title = this.baseInfo.title
      good.price = parseFloat(this.baseInfo.price)
      good.desc = this.goodInfo.desc
      this.$store.commit('addCart', good)
    },
    // BackTop 子组件点击回到顶部
    backtopClick() {
      this.$refs.detailBscroll.scrollTo(0, 0, 600)
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    BScroll,
    DetailBottomBar,
    BackTop
  }
}
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  background-color: #ffffff;
  z-index: 10;
}
.bscroll-wrapper {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.detail-recommends-title {
  height: 45px;
  line-height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  padding: 10px 8px 10px;
  font-size: 18px;
  color: #333333;
}
.detail-back-top {
  position: absolute;
  right: 10px;
  bottom: 55px;
}
</style>
