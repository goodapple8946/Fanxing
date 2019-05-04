const db = wx.cloud.database();
const app = getApp();

Page({
  confirm(e) {
    if (e.detail.userInfo) {
      wx.showToast({
        title: '授权成功'
      });
      app.queryUser();
      wx.switchTab({
        url: '/pages/index/index',
      });
    } else {
      wx.showToast({
        title: '授权失败',
        icon: 'none'
      });
    }
  }
})