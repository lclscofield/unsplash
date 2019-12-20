const api = require('../../api/index')

Page({
  data: {
    page: 1,
    photos: []
  },

  async onLoad() {
    this.loadPhotos()
  },

  // 加载图片列表
  async loadPhotos() {
    let { page } = this.data
    const res = await api.fetchPhoto('photos', {
      page
    })
    if (res && res.result && res.result.length) {
      const result = res.result
      console.log(page, result)
      this.setData({
        [`photos[${page - 1}]`]: result
      })
    }
    console.log(123, this.data.photos)
  }
})
