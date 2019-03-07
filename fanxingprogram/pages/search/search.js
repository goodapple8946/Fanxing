const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    user: null,
    hotels: null
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
      app.queryUserSearch = x => {
        this.setData({
          user: x
        });
        this.favoriteIcon();
      }
    }
    //城市数据
    if (app.globalData.cities) {
      this.setData({
        cities: app.globalData.cities
      });
    }
    else {
      //防止onLaunch在onLoad之后返回
      app.queryCitySearch = x => {
        this.setData({
          cities: x
        });
      }
    }
    this.doSearch();
  },
  doSearch() {
    //房源数据
    db.collection('Hotel').where({
      recommend: true
    }).get({
      success: res => {
        var results = res.data;
        var hotels = this.data.hotels;
        hotels = [];
        //根据条件筛选
        for (var i = 0; i < results.length; i++) {
          if (
            //城市
            (app.globalData.search.city == '请选择城市' ||
              app.globalData.search.city == results[i].city) &&
            //人数
            (app.globalData.search.peopleNum == 0 ||
              app.globalData.search.peopleNum <= results[i].peopleNum) &&
            //户型（居室）
            (app.globalData.search.bedroomNum == 0 ||
              app.globalData.search.bedroomNum == results[i].bedroomNum)
          ) {
            hotels.push(results[i]);
            this.setData({
              hotels
            })
          }
        }
        this.setData({
          hotels
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
  },
})