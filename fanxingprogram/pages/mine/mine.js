Page({
  data: {
    avatarImage: ''
  },
  btnGetUserInfo(e) {
    getApp().globalData.userInfo = e.detail.userInfo;
    this.setData({
      avatarImage: getApp().globalData.userInfo.avatarUrl
    })
  }
})