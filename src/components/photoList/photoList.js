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
    photoHandle(e) {
      console.log(e)
      const { target } = e
      const type = target.dataset.type

      if (type === 'img') {
        wx.previewImage({
          urls: target.dataset.url
        })
      }
    }
  }
})
