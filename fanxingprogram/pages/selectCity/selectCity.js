// pages/selectCity/selectCity.js
Page({
  data: {
    cities: [
      {
        name: 'Beijing',
        cnName: '北京',
      },
      {
        name: 'Hangzhou',
        cnName: '杭州',
      },
      {
        name: 'Xiamen',
        cnName: '厦门',
      },
      {
        name: 'Zhuhai',
        cnName: '珠海',
      },
      {
        name: 'Guilin',
        cnName: '桂林',
      },
      {
        name: 'Beihai',
        cnName: '北海',
      },
      {
        name: 'Sanya',
        cnName: '三亚',
      },
      {
        name: 'Chongqing',
        cnName: '重庆',
      },
      {
        name: 'Xian',
        cnName: '西安',
      }
    ]
  },
  selectCity(event) {
    var pages = getCurrentPages();
    var i = event.currentTarget.dataset.index;
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      city: this.data.cities[i].name,
      searchCity: this.data.cities[i].cnName
    });
    wx.navigateBack({
      delta: 1
    })
  }
})