const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    user: null,
    secret: false,
    phoneNumber: '400-000-0000',
    admins: null
  },
  onLoad() {
    //用户数据
    if (app.globalData.user) {
      this.setData({
        user: app.globalData.user
      });
      this.showSecret();
    }
    else {
      //防止onLaunch在onLoad之后返回
      app.queryUserMine = x => {
        this.setData({
          user: x
        });
        this.showSecret();
      }
    }
  },
  //收藏
  favorite() {
    wx.navigateTo({
      url: '/pages/favorite/favorite'
    });
  },
  //入住人
  checkinPeople() {
    wx.navigateTo({
      url: '/pages/checkinPeople/checkinPeople'
    });
  },
  //关于
  about() {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },
  //客服
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
  //意见反馈
  feedback() {
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    });
  },
  //成为管家
  manager(e) {
    wx.navigateTo({
      url: '/pages/manager/manager'
    });
  },
  //后台管理
  secret() {
    
  },
  //显示后台按钮
  showSecret() {
    if (this.data.user.role == 'administrator')
      this.setData({
        secret: true
      });
  }
})