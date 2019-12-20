// 云函数入口文件
const cloud = require('wx-server-sdk')

require('es6-promise').polyfill()
require('isomorphic-fetch')
const Unsplash = require('unsplash-js').default
const { toJson } = require('unsplash-js')

const unsplash = new Unsplash({
  accessKey: 'fa60305aa82e74134cabc7093ef54c8e2c370c47e73152f72371c828daedfcd7',
  timeout: 10000
})

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

function pick(obj, arr) {
  return arr.reduce((iter, val) => {
    if (val in obj) {
      iter[val] = obj[val]
    }
    return iter
  }, {})
}

// photos 提取数据
const photosFilter = ['id', 'likes', 'description', 'user', 'urls']
// user 提取数据
const userFilter = ['id', 'username', 'profile_image']

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { type, param } = event
  const { page = 1, perPage = 10, orderBy = 'latest' } = param

  let res = null
  if (type === 'photos') {
    // 获取图片列表
    res = await unsplash.photos.listPhotos(page, perPage, orderBy).then(toJson)

    if (res && res.length) {
      res = res.map(item => {
        return pick(item, photosFilter)
      })
      if (res.user) {
        res.user = pick(res.user, userFilter)
      }
    }
  }

  return res
}
