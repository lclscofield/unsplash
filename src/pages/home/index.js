const api = require('../../api/index')

Page({
  data: {
    page: 1,
    photos: [],
    cache: new Set(), // 存放 id
    loadMore: false, // 显示加载更多
    hintType: '', // 提示类型 info、error、success
    hintMsg: '', // 提示文本
    retryNum: 0 // 重试次数，最多重试 5 次
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
  onReachBottom() {
    this.reachBottomHandle()
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
      // 过滤重复图片
      const result = res.result.filter(item => {
        if (!cache.has(item.id)) {
          cache.add(item.id)
          // 初始化加载小图
          item.url = item.urls.small
          this.setData({
            cache
          })
          return true
        }
      })
      return result
    }
  },

  // 初始化
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
    } else {
      this.setData({
        hintType: 'error',
        hintMsg: '请求失败，请下拉重试'
      })
    }
  },

  // 触底处理
  async reachBottomHandle() {
    let { page, retryNum } = this.data
    // 最多重试 5 次
    if (retryNum >= 5) return
    page++
    retryNum++
    this.setData({
      page,
      loadMore: true,
      retryNum: retryNum
    })
    const res = await this.loadPhotos()
    if (res) {
      this.setData({
        [`photos[${page - 1}]`]: res,
        loadMore: false
      })
    } else {
      this.reachBottomHandle()
    }
  },

  // 提示隐藏回调
  hintHide () {
    this.setData({
      hintType: '',
      hintMsg: ''
    })
  }
})
