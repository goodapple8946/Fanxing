Component({
  properties: {
    //显示的房源ID
    id: {
      type: Number,
      value: 0
    },
    //显示的房源图片
    picture: {
      type: String,
      value: '/images/house.png'
    },
    //显示的房源价格
    price: {
      type: Number,
      value: 0
    },
    //显示的房源名称
    name: {
      type: String,
      value: 'default_name'
    },
    //显示的房源描述
    description: {
      type: String,
      value: 'default_description'
    },
    //显示的房源是否添加收藏
    favorite: {
      type: Boolean,
      value: false
    }
  },
  methods:{
    //添加房源为收藏
    addFavorite() {
      wx.showToast({
        title: '已添加收藏',
      })
    }
  },
})
