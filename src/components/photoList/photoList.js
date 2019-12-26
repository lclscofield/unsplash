Component({
  properties: {
    // 这里定义了组件属性，属性值可以在组件使用时指定
    photoList: {
      type: Array
    }
  },

  data: {
    // 这里是一些组件内部数据
  },

  lifetimes: {
    attached() {
      console.log(222, this.data.photoList)
    }
  },

  methods: {
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
