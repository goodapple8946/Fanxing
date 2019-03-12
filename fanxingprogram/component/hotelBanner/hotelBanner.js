const db = wx.cloud.database();
const app = getApp();

Component({
  properties: {
    hotel: {
      type: Object,
      value: null
    },
    manager: {
      type: Object,
      value: null
    }
  },
  lifetimes: {
    //管家数据
    attached() {
      db.collection('User').where({
        _openid: this.properties.hotel._openid
      }).get({
        success: res => {
          this.setData({
            manager: res.data[0]
          });
        }
      });
    },
  },
  methods: {
    //添加或删除收藏
    addFavorite() {
      var index = app.globalData.user.favorites.indexOf(this.properties.hotel._id);
      if (index == -1) {
        //显示弹窗
        wx.showToast({
          title: '已添加收藏',
          icon: 'success'
        });
        var hotel = this.properties.hotel;
        //在user中添加收藏
        app.globalData.user.favorites.push(hotel._id);
        //收藏页面添加收藏
        hotel.favorite = true;
        this.setData({
          hotel
        });
      }
      else {
        //显示弹窗
        wx.showToast({
          title: '已取消收藏',
          icon: 'none'
        });
        var hotel = this.properties.hotel;
        //在user中删除收藏
        app.globalData.user.favorites.splice(index, 1);
        //收藏页面移除收藏
        hotel.favorite = false;
        this.setData({
          hotel
        });
      }
      //更新数据库用户数据
      app.updateUser();
      //主页收藏图标更新
      app.favoriteIconIndex();
    },
    //房源详情
    hotelDetail() {
      app.globalData.hotelDetail.hotel = this.properties.hotel;
      wx.navigateTo({
        url: '/pages/hotelDetail/hotelDetail'
      });
    },
    //管家详情
    managerDetail() {
      app.globalData.managerDetail.manager = this.properties.manager;
      wx.navigateTo({
        url: '/pages/managerDetail/managerDetail'
      });
    }
  }
})
