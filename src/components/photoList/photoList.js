//引入图片预加载组件
const ImgLoader = require('../../utils/img_loader/img_loader.js')

Component({
  properties: {
    // 这里定义了组件属性，属性值可以在组件使用时指定
    photoList: {
      type: Array
    }
  },

  data: {
    // 这里是一些组件内部数据
    cacheList: {} // 缓存高清图 url 位置
  },

  lifetimes: {
    attached() {
      //初始化图片预加载组件，并指定统一的加载完成回调
      this.imgLoader = new ImgLoader(this, this.imageOnLoad.bind(this))
      this.loadImages()
    }
  },

  methods: {
    //同时发起全部图片的加载
    loadImages() {
      const cacheList = {}
      this.data.photoList.forEach((item, idx) => {
        const src = item.urls.regular
        cacheList[src] = idx
        this.imgLoader.load(src)
      })
      this.setData({ cacheList })
    },

    //加载完成后的回调
    imageOnLoad(err, data) {
      const idx = this.data.cacheList[data.src]

      const str = `photoList[${idx}].url`
      this.setData({
        [str]: data.src
      })
    },

    // 卡片点击事件分发
    cardHandler(e) {
      console.log(e)
      const { target } = e
      const type = target.dataset.type

      if (type === 'img') {
        this.photoHandler(target.dataset.url)
      }
    },

    // 图片点击事件
    photoHandler(url) {
      if (!url) return
      wx.previewImage({
        urls: [url]
      })
    }
  }
})
