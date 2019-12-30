const api = require('./api/index')

App({
  //全局变量
  globalData: {
    userInfo: null
  },

  // 程序初始化
  async onLaunch() {
    // 云环境初始化
    wx.cloud.init({
      // dev 环境
      // env: 'dev-gpyb0',
      // prod 环境
      env: 'prod-qkk2g',
      traceUser: true
    })
    // login
    const res = await api.login()
    if (res && res.result) {
      // 登录获取用户信息
      this.globalData.userInfo = res.result
    }
  }
})
