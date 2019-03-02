Component({
  properties: {
    hotel: {
      type: Object,
      value: null
    },
    favorite: {
      type: Boolean,
      value: false
    }
  },
  methods:{
    //添加房源为收藏
    addFavorite() {
      var index = getApp().globalData.user.favorites.indexOf(this.properties.hotel.id);
      if(index == -1) {
        wx.showToast({
          title: '已添加收藏',
          icon: 'success'
        });
        getApp().globalData.user.favorites.push(this.properties.hotel.id);
        this.setData({
          favorite: true
        });
      }
      else {
        wx.showToast({
          title: '已取消收藏',
          icon: 'none'
        });
        getApp().globalData.user.favorites.splice(index, 1);
        this.setData({
          favorite: false
        });
      }
    }
  },
})
