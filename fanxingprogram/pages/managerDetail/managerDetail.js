const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    manager: null,
    hotels: null,
    user: null
  },
  onLoad() {
    //用户数据
    if (app.globalData.user) {
      this.setData({
        user: app.globalData.user
      });
      this.favoriteIcon();
    }
    else {
      //防止onLaunch在onLoad之后返回
      app.queryUserManagerDetail = x => {
        this.setData({
          user: x
        });
      }
      this.favoriteIcon();
    }
    //管家房源数据
    var hotels = this.data.hotels;
    db.collection('Hotel').where({
      _openid: app.globalData.managerDetail.manager._openid
    }).get({
      success: res => {
        this.setData({
          manager: app.globalData.managerDetail.manager,
          hotels: res.data
        });
        this.favoriteIcon();
      }
    });
  },
  //收藏图标
  favoriteIcon() {
    if (this.data.user && this.data.hotels) {
      var hotels = this.data.hotels;
      for (var i = 0; i < hotels.length; i++) {
        hotels[i].favorite = this.data.user.favorites.indexOf(hotels[i]._id) != -1;
      }
      this.setData({
        hotels
      });
    }
  }
})