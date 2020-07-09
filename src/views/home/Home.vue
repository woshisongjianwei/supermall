<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <p slot="center">购物街</p>
    </nav-bar>

    <b-scroll
      :data="displayGoods"
      :pulldown="false"
      :pullup="true"
      @pullingdown="loadPullingdownGoodsdata"
      @pullingup="loadPullingupGoodsdata"
      @scrolling="toggleBacktop"
      class="bscroll-wrapper"
      ref="bscroll"
    >
      <home-swiper :banners="banners"></home-swiper>

      <recommend-view :recommends="recommends"></recommend-view>

      <feature-view></feature-view>

      <tab-control :tab-titles="tabTitles" @tabclick="execTabClick"></tab-control>

      <goods-list :goods="displayGoods"></goods-list>
    </b-scroll>

    <back-top @click.native="backtopClick" class="home-back-top" v-show="isShowBacktop"></back-top>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar.vue'
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'
import TabControl from '@/components/tabcontrol/TabControl.vue'
import GoodsList from '@/components/goodslist/GoodsList.vue'
import BScroll from '@/components/bscroll/BScroll.vue'

import BackTop from '@/components/backtop/BackTop.vue'

import { getHomeMultidata, getHomeGoodsdata } from '@/network/home.js'

export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      recommends: [],
      tabTitles: ['流行', '新款', '精选'],
      currentType: 'pop',
      goods: {
        pop: {
          page: 1,
          list: []
        },
        new: {
          page: 1,
          list: []
        },
        sell: {
          page: 1,
          list: []
        }
      },
      displayGoods: [],
      isShowBacktop: false
    }
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoodsdata('pop', 1)
    this.getHomeGoodsdata('new', 1)
    this.getHomeGoodsdata('sell', 1)
    this.displayGoods = this.goods.pop.list
  },
  mounted() {
    const refresh = this.debounce(this.$refs.bscroll.refresh, 200)

    this.$bus.$on('goodsImgLoadRefresh', () => {
      console.log('图片已 load 完成')
      refresh()
    })
  },
  methods: {
    debounce(func, delay) {
      let timer = null

      return function(...args) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    },
    getHomeMultidata() {
      getHomeMultidata()
        .then(res => {
          console.log(res)
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
        .catch(err => {
          console.log(err)
        })
    },
    getHomeGoodsdata(type, page) {
      getHomeGoodsdata(type, page)
        .then(res => {
          console.log(res)
          this.goods[type].list.push(...res.data.list)
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadPullingdownGoodsdata() {
      let page = this.goods[this.currentType].page + 1
      this.getHomeGoodsdata(this.currentType, page)
      this.goods[this.currentType].page++
    },
    loadPullingupGoodsdata() {
      let page = this.goods[this.currentType].page + 1
      this.getHomeGoodsdata(this.currentType, page)
      this.goods[this.currentType].page++

      this.$refs.bscroll.finishPullUp()
    },
    execTabClick(index) {
      if (index === 0) {
        this.displayGoods = this.goods.pop.list
        this.currentType = 'pop'
      } else if (index === 1) {
        this.displayGoods = this.goods.new.list
        this.currentType = 'new'
      } else if (index === 2) {
        this.displayGoods = this.goods.sell.list
        this.currentType = 'sell'
      }
    },
    toggleBacktop(pos) {
      if (-pos.y > 1000) {
        this.isShowBacktop = true
      } else {
        this.isShowBacktop = false
      }
    },
    backtopClick() {
      this.$refs.bscroll.scrollTo(0, 0, 600)
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BScroll,
    BackTop
  }
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav-bar {
  background-color: #ff8198;
  color: #ffffff;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 9;
}
.bscroll-wrapper {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.home-back-top {
  position: absolute;
  right: 10px;
  bottom: 55px;
}
</style>
