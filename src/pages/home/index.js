const api = require('../../api/index')

Page({
  data: {
    page: 1,
    photos: [],
    cache: new Set(),// 存放 id
    loadMore: false // 显示加载更多
  },

  // 页面加载
  async onLoad() {
    wx.showLoading({
      title: '加载中...'
    })
    await this.init()
    wx.hideLoading()
  },

  // 下拉刷新
  async onPullDownRefresh() {
    await this.init()
    wx.stopPullDownRefresh()
  },

  // 上拉触底
  async onReachBottom() {
    let { page } = this.data
    page++
    this.setData({
      page,
      loadMore: true
    })
    const res = await this.loadPhotos()
    if (res) {
      this.setData({
        [`photos[${page - 1}]`]: res,
        loadMore: false
      })
    }
  },

  // 分享
  onShareAppMessage() {
    return {
      title: 'Unsplash'
    }
  },

  // 加载图片列表
  async loadPhotos() {
    let { page } = this.data
    const res = await api.fetchPhoto('photos', {
      page
    })

    if (page === 1) {
      this.setData({
        cache: new Set()
      })
    }
    let { cache } = this.data
    if (res && res.result && res.result.length) {
      const result = res.result.filter(item => {
        if (!cache.has(item.id)) {
          cache.add(item.id)
          this.setData({
            cache
          })
          return true
        }
      })
      console.log(123, page, result, this.data.photos)
      return result
    }
  },

  async init() {
    let { page } = this.data
    page = 1
    this.setData({
      page
    })
    const res = await this.loadPhotos()
    if (res) {
      this.setData({
        photos: [res]
      })
    }
  }
})
