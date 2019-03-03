const app = getApp();

Component({
  properties: {
    hotel: {
      type: Object,
      value: null
    }
  },
  methods:{
    //添加房源为收藏
    addFavorite() {
      var index = app.globalData.user.favorites.indexOf(this.properties.hotel._id);
      if(index == -1) {
        wx.showToast({
          title: '已添加收藏',
          icon: 'success'
        });
        var hotel = this.properties.hotel;
        app.globalData.user.favorites.push(hotel._id);
        hotel.favorite = true;
        this.setData({
          hotel
        });
      }
      else {
        wx.showToast({
          title: '已取消收藏',
          icon: 'none'
        });
        var hotel = this.properties.hotel;
        app.globalData.user.favorites.splice(index, 1);
        hotel.favorite = false;
        this.setData({
          hotel
        });
      }
      app.updateUserFavorites();
    },
    getFavorite(isFavorite) {
      this.setData({
        favorite: isFavorite
      });
    }
  }
})
