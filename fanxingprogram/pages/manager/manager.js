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
          phoneNo: inputPhoneNo,
          date: dateToString(new Date()),
          state:'processing'
        },
        success: res => {
          wx.showToast({
            title: "提交成功",
            icon: 'success',
            duration: 1000,
          })
          setTimeout(() => {
            wx.navigateBack();
          }, 1000);
        }
      });
    }
  }
})

//日期转字符串
function dateToString(x) {
  var y = x.getFullYear();
  var m = x.getMonth() + 1;
  var d = x.getDate();
  m = m < 10 ? '0' + m : m;
  d = d < 10 ? ('0' + d) : d;
  return y + '-' + m + '-' + d;
};

//字符串转日期
function stringToDate(x) {
  var y = x.split('-');
  return new Date(y[0], y[1] - 1, y[2]);
}