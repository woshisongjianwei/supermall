<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

export default {
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: true
    },
    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: null
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullup: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pulldown: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 是否开启组件的 refresh 刷新事件，用于刷新后的额外逻辑处理
     */
    isrefresh: {
      type: Boolean,
      default: false
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 200
    }
  },
  mounted() {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        pullUpLoad: this.pullup
      })

      // 是否派发滚动事件
      if (this.listenScroll) {
        this.scroll.on('scroll', pos => {
          this.$emit('scrolling', pos)
        })
      }

      // 是否派发滚动到底部事件，用于上拉加载
      // if (this.pullup) {
      //   this.scroll.on('scrollEnd', () => {
      //     console.log('兄弟，你在上拉加载...')
      //     // 滚动到底部
      //     if (this.scroll.y <= this.scroll.maxScrollY + 50) {
      //       this.$emit('pullingup')
      //     }
      //   })
      // }
      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullup) {
        this.scroll.on('pullingUp', () => {
          console.log('兄弟，你在上拉加载...')
          this.$emit('pullingup')
        })
      }

      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pulldown) {
        this.scroll.on('touchEnd', pos => {
          console.log('兄弟，你在下拉加载...')
          // 下拉动作
          if (pos.y > 50) {
            this.$emit('pullingdown')
          }
        })
      }

      // 是否派发组件 refresh 刷新的事件
      if (this.isrefresh) {
        this.scroll.on('refresh', () => {
          this.$emit('refreshing')
        })
      }

      // 是否派发列表滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    disable() {
      // 代理better-scroll的disable方法
      this.scroll && this.scroll.disable()
    },
    enable() {
      // 代理better-scroll的enable方法
      this.scroll && this.scroll.enable()
    },
    getScrollY() {
      return this.scroll.y
    },
    refresh() {
      console.log('哥们，你正在刷新我 BScroll...')
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh()
    },
    scrollTo(...args) {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, args)
    },
    scrollToElement() {
      // 代理better-scroll的scrollToElement方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    // 每次触发 pullingUp 事件后，必须执行这个 finishPullUp 方法，否则下次不能继续 pullingUp
    finishPullUp() {
      this.scroll.finishPullUp()
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data() {
      setTimeout(() => {
        console.log('兄弟，你传给我的 data 变了，我可要刷新了...')
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style scoped>
</style>
