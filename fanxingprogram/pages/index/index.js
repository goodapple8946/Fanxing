Page({
  data: {
    searchCity: '请选择城市',
    searchTime: '请选择入住/离开时间',
    searchPeopleNum: '请选择入住人数',

    city: '',
    startTime: Date(),
    endTime: Date(),
    peopleNum: 0,

    topPictures: [
      '/images/top_1.jpg',
      '/images/top_2.jpg',
    ]
  },
  selectCity() {
    wx.navigateTo({
      url: '/pages/selectCity/selectCity'
      })
  },
  selectTime() {
    wx.navigateTo({
      url: '/pages/selectTime/selectTime'
    })
  }
})