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
      app.queryUserFavorite = x => {
        this.setData({
          user: x
        });
      }
    }
  },
  submit(e) {
    var inputContent = e.detail.value.textarea;
    if (inputContent.length == 0) {
      wx.showToast({
        title: '请输入意见反馈',
        icon: 'none',
      })
    } else {
      db.collection('Feedback').add({
        data: {
          content: inputContent
        },
        success: res => {
          wx.showToast({
            title: "提交成功",
            icon: 'success',
            duration: 1000,
          })
          setTimeout(function () {
            wx.navigateBack();
          }, 1000);
        }
      });
    }
  }
})