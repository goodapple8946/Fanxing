const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    user: null,
    hotels: null,
    showHotels: null,
    showNum: 0,
    //筛选相关
    cityID: 0,
    cities: null,
    checkinDate: '请选择入住时间',
    checkoutDate: '请选择离开时间',
    peopleNumIndex: 0,
    peopleNums: ['请选择入住人数', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'],
    typeIndex: 0,
    types: ['请选择户型', '一居', '二居', '三居', '四居', '五居', '六居'],
    sortIndex: 0,
    sorts: ['综合排序', '价格由高到低', '价格由低到高', '好评优先'],
    searchText: '',
    today: dateToString(new Date())
  },
  onLoad() {
    //初始化
    this.setData({
      cityID: app.globalData.search.cityID,
      checkinDate: app.globalData.search.checkinDate ? dateToString(app.globalData.search.checkinDate) : '请选择入住时间',
      checkoutDate: app.globalData.search.checkoutDate ? dateToString(app.globalData.search.checkoutDate) : '请选择离开时间',
      peopleNumIndex: app.globalData.search.peopleNum,
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
    //显示加载弹窗
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 10000,
      mask: true
    });
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
            (app.globalData.search.cityID == 0 ||
              app.globalData.search.city == results[i].city) &&
            //人数
            (app.globalData.search.peopleNum == 0 ||
              app.globalData.search.peopleNum <= results[i].peopleNum) &&
            //户型（居室）
            (app.globalData.search.type == 0 ||
              app.globalData.search.type == results[i].bedroomNum) &&
            //关键词
            (this.data.searchText == '' ||
              results[i].name.indexOf(this.data.searchText) != -1 ||
              results[i].type.indexOf(this.data.searchText) != -1 ||
              results[i].location.indexOf(this.data.searchText) != -1)
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
  //选择房源户型
  selectType(e) {
    this.setData({
      typeIndex: e.detail.value
    });
    app.globalData.search.type = e.detail.value;
  },
  //选择入住人数
  selectPeopleNum(e) {
    this.setData({
      peopleNumIndex: e.detail.value
    });
    app.globalData.search.peopleNum = e.detail.value;
  },
  //选择排序方式
  selectSort(e) {
    this.setData({
      sortIndex: e.detail.value
    });
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
  //输入搜索关键词
  searchInput(e) {
    this.setData({
      searchText: e.detail.value
    });
  },
  //拉至底部刷新
  onReachBottom() {
    //显示加载弹窗
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
    this.data.showNum = Math.min(this.data.showNum + 3, this.data.hotels.length);
    this.freshHotels();
    this.favoriteIcon();
  },
  //刷新显示房源
  freshHotels() {
    var showHotels = this.data.showHotels;
    showHotels = [];
    for (var i = 0; i < this.data.showNum; i++)
      showHotels.push(this.data.hotels[i]);
    //排序
    this.data.sortIndex == 0 && showHotels.sort(general) ||
    this.data.sortIndex == 1 && showHotels.sort(expensive) ||
    this.data.sortIndex == 2 && showHotels.sort(cheap) ||
    this.data.sortIndex == 3 && showHotels.sort(general)
    this.setData({
      showHotels
    });
    //隐藏加载弹窗
    wx.hideToast();
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

//排序-综合排序
function general(x, y) {
  return x._id - y._id;
}

//排序-价格由高到低
function expensive(x, y) {
  return y.price - x.price;
}

//排序-价格由低到高
function cheap(x, y) {
  return x.price - y.price;
}

//排序-好评优先
function highrated(x, y) {
  return y.rated - x.rated;
}