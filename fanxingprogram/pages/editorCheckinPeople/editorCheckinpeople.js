const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    user: null,
    name: '',
    idCardNo: ''
  },
  inputName(e) {
    this.setData({
      name: e.detail.value
    });
  },
  inputIdCardNo(e) {
    this.setData({
      idCardNo: e.detail.value
    });
  },
  submitInfo() {
    console.log("submit");
    if (this.data.name == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
    } else if (this.data.idCardNo.length != 18) {
      wx.showToast({
        title: '请输入正确的身份证',
        icon: 'none'
      })
    } else {
      //更新user
      app.globalData.user.checkinPeople.push({
        name: this.data.name,
        idCardNo: this.data.idCardNo
      });
      //更新数据库
      app.updateUser();
      wx.navigateBack({
        delta: 1
      })
    }
  }
})