const app = getApp();

Page({
  data: {
    user: null,
    hotels: null,
    topImages: [
      'cloud://fanxing-db-e9c08f.6661-fanxing-db-e9c08f/top_1.jpg',
      'cloud://fanxing-db-e9c08f.6661-fanxing-db-e9c08f/top_2.jpg'
      ],
    cityID: 0,
    cities: ['请选择城市', '北京', '上海', '深圳'],
    checkinDate: '请选择入住时间',
    checkoutDate: '请选择离开时间',
    peopleNumIndex: 0,
    peopleNums: ['请选择入住人数', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'],
    today: dateToString(new Date())
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
      app.queryUserCallback = x => {
        this.setData({
          user: x
        });
        this.favoriteIcon();
      }
    }
    //房源数据
    if (app.globalData.hotels) {
      this.setData({
        hotels: app.globalData.hotels
      });
      this.favoriteIcon();
    }
    else {
      app.queryHotelsCallback = x => {
        this.setData({
          hotels: x
        });
        this.favoriteIcon();
      }
    }
  },
  //初始化收藏图标
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
    app.globalData.search.cityID = e.detail.value;
  },
  //选择入住时间
  selectCheckinDate(e) {
    this.setCheckinDate(e.detail.value);
    if (app.globalData.search.checkinDate > app.globalData.search.checkoutDate)
      this.setCheckoutDate(e.detail.value);
  },
  //选择离开时间
  selectCheckoutDate(e) {
    this.setCheckoutDate(e.detail.value);
    if (app.globalData.search.checkinDate > app.globalData.search.checkoutDate)
      this.setCheckinDate(e.detail.value);
  },
  //选择人数
  selectPeopleNum(e) {
    this.setData({
      peopleNumIndex: e.detail.value
    });
    app.globalData.search.peopleNum = e.detail.value;
  },
  //搜索
  search() {
    
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
  }
})

function dateToString(x) {
  var y = x.getFullYear();
  var m = x.getMonth() + 1;
  var d = x.getDate();
  m = m < 10 ? '0' + m : m;
  d = d < 10 ? ('0' + d) : d;
  return y + '-' + m + '-' + d;
};

function stringToDate(x) {
  var y = x.split('-');
  return new Date(y[0], y[1], y[2]);
}