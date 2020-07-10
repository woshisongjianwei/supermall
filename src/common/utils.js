export function debounce (func, delay) {
  let timer = null

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
      console.log('真正执行了...')
    }, delay)
  }
}