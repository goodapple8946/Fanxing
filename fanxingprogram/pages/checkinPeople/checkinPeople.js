const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    user: null,
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
  edit() {

  },
  remove() {
    
  }
})