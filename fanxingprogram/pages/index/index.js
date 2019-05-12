const db = wx.cloud.database();
const app = getApp();

var util = require('../../util/util.js');  

Page({
  data: {
    user: null,
    hotels: null,
    topImages: [
      'cloud://fanxing-zufxl.6661-fanxing-zufxl/indexBanner/top1.jpg',
      'cloud://fanxing-zufxl.6661-fanxing-zufxl/indexBanner/top2.jpg',
      'cloud://fanxing-zufxl.6661-fanxing-zufxl/indexBanner/top3.jpg'
      ],
    //筛选相关
    cityID: 0,
    cities: null,
    checkinDate: '请选择入住时间',
    checkoutDate: '请选择离开时间',
    peopleNumIndex: 0,
    peopleNums: ['请选择入住人数', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'],

    today: dateToString(new Date())
  },
  onLoad() {
    // 获取日期存入缓存
    var currentDate = util.formatTime(new Date());
    wx.setStorageSync("date", currentDate)
    //用户数据
    if (app.globalData.user) {
      this.setData({
        user: app.globalData.user
      });
      this.favoriteIcon();
    }
    else {
      //防止onLaunch在onLoad之后返回
      app.queryUserIndex = x => {
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
      app.queryCityIndex = x => {
        this.setData({
          cities: x
        });
      }
    }
    //房源数据
    db.collection('Hotel').where({
      recommend: true
    }).get({
      success: res => {
        this.setData({
          hotels: res.data
        });
        this.favoriteIcon();
      }
    });
    //收藏图标app调用
    app.favoriteIconIndex = () => {
      this.favoriteIcon();
    }
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
  //选择城市
  selectCity(e) {
    this.setData({
      cityID: e.detail.value
    });
    app.globalData.search.cityID = this.data.cityID;
    app.globalData.search.city = this.data.cities[e.detail.value];
  },
  //选择入住时间
  selectCheckinDate(e) {
    this.setCheckinDate(e.detail.value);
    //离开时间修正
    app.globalData.search.checkinDate > app.globalData.search.checkoutDate && this.setCheckoutDate(e.detail.value);
  },
  //选择离开时间
  selectCheckoutDate(e) {
    this.setCheckoutDate(e.detail.value);
    //入住时间修正
    app.globalData.search.checkinDate > app.globalData.search.checkoutDate && this.setCheckinDate(e.detail.value);
  },
  //选择入住人数
  selectPeopleNum(e) {
    this.setData({
      peopleNumIndex: e.detail.value
    });
    app.globalData.search.peopleNum = e.detail.value;
  },
  //搜索
  search() {
    wx.navigateTo({
      url: '/pages/search/search',
    });
    app.doSearch && app.doSearch();
  },

  //支付测试
  pay(){
      wx.navigateTo({
          url: '/pages/orderPay/orderPay',
      })
  },

  //更多房源（无筛选条件搜索）
  moreHotel() {
    this.setData({
      cityID: 0,
      checkinDate: '请选择入住时间',
      checkoutDate: '请选择离开时间',
      peopleNumIndex: 0
    });
    app.globalData.search.cityID = 0;
    app.globalData.search.city = '请选择城市';
    app.globalData.search.checkinDate = null;
    app.globalData.search.checkoutDate = null;
    app.globalData.search.peopleNum = 0;
    wx.navigateTo({
      url: '/pages/search/search',
    });
    app.doSearch && app.doSearch();
  },
  //设置入住时间
  setCheckinDate(date) {
    this.setData({
      checkinDate: date
    });
    app.globalData.search.checkinDate = stringToDate(date);
  },
  //设置离开时间
  setCheckoutDate(date) {
    this.setData({
      checkoutDate: date
    });
    app.globalData.search.checkoutDate = stringToDate(date);
  },
  jumpToCalendar(){
      wx.navigateTo({
          url: '/pages/calendar/calendar',
      });
  }
})

//日期转字符串
function dateToString(x) {
  var y = x.getFullYear();
  var m = x.getMonth() + 1;
  var d = x.getDate();
  m = m < 10 ? '0' + m : m;
  d = d < 10 ? ('0' + d) : d;
  return y + '-' + m + '-' + d;
};

//字符串转日期
function stringToDate(x) {
  var y = x.split('-');
  return new Date(y[0], y[1], y[2]);
}