const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    hotel: null
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
      app.queryUserOrderDetail = x => {
        this.setData({
          user: x
        });
      }
    }
    //房源数据
    this.setData({
      hotel: app.globalData.orderDetail.hotel
    });
  },
  //选择入住人
  selectCheckinPeople() {
    
  }
})