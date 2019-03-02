Page({
  data: {
    topImages: ['/images/top_1.jpg', '/images/top_2.jpg'],
    cityID: 0,
    cities: ['请选择城市', '北京', '上海', '深圳'],
    checkinDate: '请选择入住时间',
    checkoutDate: '请选择离开时间',
    peopleNumIndex: 0,
    peopleNums: ['请选择入住人数', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'],
    today: dateToString(new Date()),
    rcmdHotels: [
      {
        id: 0,
        picture: '/images/dyc.jpg',
        price: 1000,
        name: '大运村公寓',
        description: '1室0厅/宜住4人/公寓 · 知春路',
        favorite: getApp().globalData.user.favorites.indexOf(0) != -1
      },
      {
        id: 1,
        picture: '/images/mgb.jpg',
        price: 300,
        name: '蒙古包',
        description: '1室0厅/宜住2人/蒙古包 · 巴彦乌列盖',
        favorite: getApp().globalData.user.favorites.indexOf(1) != -1
      },
      {
        id: 2,
        picture: '/images/cb.jpg',
        price: 2000000,
        name: '中世纪古堡',
        description: '9232室11672厅/宜住100000人/城堡 · 卡尔卡松',
        favorite: getApp().globalData.user.favorites.indexOf(2) != -1
      }
    ]
  },
  selectCity(e) {
    this.setData({
      cityID: e.detail.value
    });
    getApp().globalData.search.cityID = e.detail.value;
  },
  selectCheckinDate(e) {
    this.setCheckinDate(e.detail.value);
    if (getApp().globalData.search.checkinDate > getApp().globalData.search.checkoutDate)
      this.setCheckoutDate(e.detail.value);
  },
  selectCheckoutDate(e) {
    this.setCheckoutDate(e.detail.value);
    if (getApp().globalData.search.checkinDate > getApp().globalData.search.checkoutDate)
      this.setCheckinDate(e.detail.value);
  },
  selectPeopleNum(e) {
    this.setData({
      peopleNumIndex: e.detail.value
    });
    getApp().globalData.search.peopleNum = e.detail.value;
  },
  search() {
    
  },
  setCheckinDate(date) {
    this.setData({
      checkinDate: date
    });
    getApp().globalData.search.checkinDate = stringToDate(date);
  },
  setCheckoutDate(date) {
    this.setData({
      checkoutDate: date
    });
    getApp().globalData.search.checkoutDate = stringToDate(date);
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