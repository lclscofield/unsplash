module.exports = {
  // 登录
  login() {
    return wx.cloud.callFunction({
      name: 'login'
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
  }
}
