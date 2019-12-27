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
  }
}
