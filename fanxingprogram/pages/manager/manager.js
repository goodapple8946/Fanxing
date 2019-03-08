const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    phoneNo: ''
  },
  inputPhoneNo(e) {
    this.setData({
      phoneNo: e.detail.value
    });
  },
  apply() {
    var inputPhoneNo = this.data.phoneNo;
    if (inputPhoneNo.length != 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
      })
    } else {
      db.collection('ManagerApplication').add({
        data: {
          phoneNo: inputPhoneNo
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