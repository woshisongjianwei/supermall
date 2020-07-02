import Vue from 'vue'

import Vuex from 'vuex'
import { Promise } from 'q';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    counter: 10,
    students: [{
      id: 1,
      name: '小羊苏西',
      age: 4
    }, {
      id: 2,
      name: '大猪佩奇',
      age: 5
    }, {
      id: 3,
      name: '猪爹',
      age: 30
    }]
  },
  getters: {
    myStudents (state, getters) {
      return state.students.filter((item, index, arr) => {
        return item.age > 4
      })
    },
    myStudentsLength (state, getters) {
      return getters.myStudents.length
    },
    myOrderStudents (state, getters) {
      return function (ageParam) {
        return state.students.filter((item, index, arr) => {
          return item.age > ageParam
        })
      }
    }
  },
  mutations: {
    increment (state, payload) {
      console.log(payload)
      state.counter++
    }
  },
  actions: {
    a_increment (context, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload)
        setTimeout(() => {
          context.commit('increment', payload)
          // 你代码能走到这里，说明你的异步逻辑已经成功了
          resolve('666')
        }, 2000)
      })
    }
  },
  modules: {

  }
})

export default store
