<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <p slot="center">购物街</p>
    </nav-bar>

    <tab-control
      :tab-titles="tabTitles"
      :tabindex="homeTabcontrolIndex"
      @tabclick="tabClick"
      class="home-tab-control"
      ref="tabControlCopy"
      v-show="isShowTabcontrol"
    ></tab-control>

    <b-scroll
      :data="displayGoods"
      :probeType="3"
      :pulldown="false"
      :pullup="true"
      @pullingdown="loadPullingdownGoodsdata"
      @pullingup="loadPullingupGoodsdata"
      @scrolling="toggleBacktopAndTabcontrol"
      class="bscroll-wrapper"
      ref="homeBscroll"
    >
      <home-swiper :banners="banners" @homeswiperimgload="homeSwiperImgLoad"></home-swiper>

      <recommend-view :recommends="recommends"></recommend-view>

      <feature-view></feature-view>

      <tab-control
        :tab-titles="tabTitles"
        :tabindex="homeTabcontrolIndex"
        @tabclick="tabClick"
        class="home-tab-control"
        ref="tabControl"
        v-show="!isShowTabcontrol"
      ></tab-control>

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

import { debounce } from '@/common/utils.js'
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
      isShowBacktop: false,
      saveY: 0,
      isShowTabcontrol: false,
      homeTabcontrolIndex: 0,
      tabcontrolOriginTop: 0,

      debounceGoodImg: null,
      debounceGoodImgCB: null,
      debounceTabcontrol: null
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
    // 防抖动函数 debounce 函数的第一次用法，实现效果：30 个商品图片需要加载 30 次，但是 BScroll 插件可能只刷新了几次
    // 多个异步操作短时间内迅速发生，这里得采用防抖动函数机制来进行处理
    this.debounceGoodImg = debounce(this.$refs.homeBscroll.refresh, 200)
    this.debounceGoodImgCB = () => {
      this.debounceGoodImg()
    }
    this.$bus.$on('goodsImgLoadRefresh', this.debounceGoodImgCB)

    // 防抖动函数 debounce 的第二次用法，实现效果：4 张轮播图图片需要加载 4 次，
    // 但是计算 tabControl 子组件的 offsetTop 值可能只计算了 1、2 次
    this.debounceTabcontrol = debounce(this.getTabcontrolOriginTop, 200)
  },
  activated() {
    this.$refs.homeBscroll.refresh() // 这行代码必须有，路由切回来先刷新，再跳回原来滚动条的位置
    this.$refs.homeBscroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    this.saveY = this.$refs.homeBscroll.getScrollY()

    this.$bus.$off('goodsImgLoadRefresh', this.debounceGoodImgCB)
  },
  methods: {
    // 获取轮播图数据、推荐区数据
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
    // 获取商品列表数据
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
    // BScroll 插件的下拉刷新
    loadPullingdownGoodsdata() {
      let page = this.goods[this.currentType].page + 1
      this.getHomeGoodsdata(this.currentType, page)
      this.goods[this.currentType].page++
    },
    // BScroll 插件的上拉刷新
    loadPullingupGoodsdata() {
      let page = this.goods[this.currentType].page + 1
      this.getHomeGoodsdata(this.currentType, page)
      this.goods[this.currentType].page++

      this.$refs.homeBscroll.finishPullUp()
    },
    // tabControl 子组件的点击
    tabClick(index) {
      this.homeTabcontrolIndex = index
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
    // BScroll 滚动时，切换 BackTop 子组件显隐和 TabControl 子组件吸顶效果
    toggleBacktopAndTabcontrol(pos) {
      if (-pos.y > 1000) {
        this.isShowBacktop = true
      } else {
        this.isShowBacktop = false
      }

      if (-pos.y > this.tabcontrolOriginTop) {
        this.isShowTabcontrol = true
      } else {
        this.isShowTabcontrol = false
      }
    },
    // BackTop 子组件点击回到顶部
    backtopClick() {
      this.$refs.homeBscroll.scrollTo(0, 0, 600)
    },
    // 获取 TabControl 子组件最开始的位置的 offsetTop 值
    getTabcontrolOriginTop() {
      this.tabcontrolOriginTop = this.$refs.tabControl.$el.offsetTop
    },
    // 轮播图图片加载完，子组件触发父组件
    homeSwiperImgLoad() {
      // 多个异步操作短时间内迅速发生，这里得采用防抖动函数机制来进行处理
      this.debounceTabcontrol()
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
  /* position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 9; */
}
.bscroll-wrapper {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.home-tab-control {
  background-color: #ffffff;
  position: relative;
  z-index: 10;
}
.home-back-top {
  position: absolute;
  right: 10px;
  bottom: 55px;
}
</style>
