export function debounce (func, delay) {
  let timer = null

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
      console.log('我来自 debounce 防抖函数内部，我出现一次代表你防抖失败一次，哈哈哈...')
    }, delay)
  }
}

/**
 * @desc  {把一个 Date 格式的日期，转为 fmt 任意格式的日期字符串，例如 '2020-01-11'}
 * @param {new Date(时间戳)} date
 * @param {类似 'yyyy-MM-dd'} fmt
 */
export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
