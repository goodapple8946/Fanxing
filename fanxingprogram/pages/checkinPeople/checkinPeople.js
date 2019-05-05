const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    user: null
  },
  onLoad() {
    //用户数据
    if (app.globalData.user) {
      this.setData({
        user: app.globalData.user
      });
    }
    else {
      //防止onLaunch在onLoad之后返回
      app.queryUserCheckinPeople = x => {
        this.setData({
          user: x
        });
      }
    }
  },
  onShow() {
    if (app.globalData.user) {
      this.setData({
        user: app.globalData.user
      });
    }
  },
  //添加新的入住人
  newCheckinPeople() {
    //跳转至editorCheckinPeople
    wx.navigateTo({
      url: '/pages/editorCheckinPeople/editorCheckinpeople',
    })
  }
})