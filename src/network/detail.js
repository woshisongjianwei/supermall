import xhr from './request.js'

export function getDetailData (iid) {
  return xhr.get('detail', {
    params: {
      iid
    }
  })
}

export function getDetailRecommends () {
  return xhr.get('recommend')
}
