module.exports = {
  // 登录
  login(param) {
    return wx.cloud.callFunction({
      name: 'login',
      data: param || {
        userInfo: null
      }
    })
  },

  /**
   * 获取图片
   * @param { type: string, param }
   */
  fetchPhoto(type, param) {
    return wx.cloud.callFunction({
      name: 'photo',
      data: {
        type,
        param
      }
    })
  },

  /**
   * 获取图虫图片
   */
  fetchTCPhoto(param) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://api.tuchong.com/search/posts',
        data: {
          query: '私房',
          ...param
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
}
