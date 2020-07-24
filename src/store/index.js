import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  getters: {
    cartList (state, getters) {
      return state.cartList
    },
    cartListLength (state, getters) {
      return state.cartList.length
    },
    isSelectAll (state, getters) {
      let index = state.cartList.findIndex((item, index, self) => {
        return item.ischeck === false
      })
      if (index === -1 && getters.cartListLength > 0) {
        return true
      } else {
        return false
      }
    },
    totalMoney (state, getters) {
      return state.cartList.filter((item, index, self) => {
        return item.ischeck
      }).reduce((temp, iten, indey, selz) => {
        return temp + iten.counter * iten.price
      }, 0)
    }
  },
  mutations: {
    addCart (state, payload) {
      let oldIndex = state.cartList.findIndex((item, index, self) => {
        return item.iid === payload.iid
      })
      if (oldIndex === -1) {
        payload.counter = 1
        payload.ischeck = true
        state.cartList.push(payload)
        Vue.prototype.$toast({
          message: '商品加入购物车成功',
          duration: 1500
        })
      } else {
        state.cartList[oldIndex].counter++
        Vue.prototype.$toast({
          message: '商品数量+1',
          duration: 1500
        })
      }
    },
    selectAll (state, payload) {
      state.cartList.forEach((item, index, self) => {
        item.ischeck = true
      })
    },
    unSelectAll (state, payload) {
      state.cartList.forEach((item, index, self) => {
        item.ischeck = false
      })
    }
  },
  actions: {
  },
  modules: {

  }
})

export default store
