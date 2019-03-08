const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    user: null,
    hotels: null,
    showHotels: null,
    showNum: 0
  },
  onLoad() {
    //清空
    this.setData({
      showNum: 0
    });
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
    db.collection('Hotel').get({
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
          }
        }
        this.setData({
          hotels
        });
        this.showMoreHotels();
        this.favoriteIcon();
      }
    });
  },
  //收藏图标
  favoriteIcon() {
    if (this.data.user && this.data.showHotels) {
      var showHotels = this.data.showHotels;
      for (var i = 0; i < showHotels.length; i++) {
        showHotels[i].favorite = this.data.user.favorites.indexOf(showHotels[i]._id) != -1;
      }
      this.setData({
        showHotels
      });
    }
  },
  //拉至底部刷新
  onReachBottom() {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000,
      mask: true
    })
    this.showMoreHotels();
  },
  //显示更多房源
  showMoreHotels() {
    this.data.showNum = Math.min(this.data.showNum + 2, this.data.hotels.length);
    this.freshHotels();
    this.favoriteIcon();
  },
  //刷新显示房源
  freshHotels() {
    var showHotels = this.data.showHotels;
    showHotels = [];
    for (var i = 0; i < this.data.showNum; i++)
      showHotels.push(this.data.hotels[i]);
    this.setData({
      showHotels
    });
    wx.hideToast();
  }
})