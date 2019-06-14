const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    user: null,
    hotels: null
  },
  onLoad() {
    //显示加载弹窗
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000,
      mask: true
    })
    //用户数据
    if (app.globalData.user) {
      this.setData({
        user: app.globalData.user
      });
      this.favoriteHotels();
    }
    else {
      //防止onLaunch在onLoad之后返回
      app.queryUserFavorite = x => {
        this.setData({
          user: x
        });
        this.favoriteHotels();
      }
    }
  },
  //用户收藏的房源数据
  favoriteHotels() {
    var user = this.data.user;
    var hotels = this.data.hotels;
    hotels = [];
    if (user) {
      for (var i = 0; i < user.favorites.length; i++) {
        db.collection('Hotel').where({
          _id: user.favorites[i]
        }).get({
          success: res => {
            res.data[0].favorite = true;
            hotels.push(res.data[0]);
            this.setData({
              hotels
            })
          },
          fail: res => {
            wx.showToast({
              title: '房源数据获取失败',
              icon: 'none'
            })
          }
        })
      }
      this.setData({
        hotels
      });
      //隐藏加载弹窗
      wx.hideToast();
    }
  }
})