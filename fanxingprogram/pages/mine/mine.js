const app = getApp();

Page({
  data: {
    user: null,
    secret: false,
    phoneNumber: '400-000-0000'
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
      app.queryUserIndex = x => {
        this.setData({
          user: x
        });
      }
    }
    //显示后台按钮
    if (this.data.user._openid == 'o-Fo75ExkiEQEudSEd0m4bN0_8R0')
      this.setData({
        secret: true
      });
  },
  favorite() {
    wx.navigateTo({
      url: '/pages/favorite/favorite'
    });
  },
  checkinPeople() {
    wx.navigateTo({
      url: '/pages/checkinPeople/checkinPeople'
    });
  },
  about() {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },
  service() {
    wx.showModal({
      title: '客服热线',
      content: this.data.phoneNumber,
      confirmText: '立即拨打',
      success: res => {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: this.data.phoneNumber
          });
        }
      }
    });
  },
  feedback() {
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    });
  },
  manager() {
    
  },
  secret() {
    
  }
})