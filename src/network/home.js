import xhr from './request.js'

export function getHomeMultidata () {
  return xhr.get('home/multidata')
}

export function getHomeGoodsdata (type, page) {
  return xhr.get('home/data', {
    params: {
      type,
      page
    }
  })
}
