const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    minlength: 10
  },
  onLoad() {
    
  },
  submit(e) {
    var inputContent = e.detail.value.textarea;
    if (inputContent.length < this.data.minlength) {
      wx.showToast({
        title: '请输入不少于' + this.data.minlength + '个字的意见反馈',
        icon: 'none',
      })
    } else {
      db.collection('Feedback').add({
        data: {
          time: dateTimeToString(new Date()),
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

//日期时间转字符串
function dateTimeToString(x) {
  var year = x.getFullYear();
  var month = x.getMonth() + 1;
  var date = x.getDate();
  var hour = x.getHours();
  var minute = x.getMinutes();
  var second = x.getSeconds();
  month = month < 10 ? '0' + month : month;
  date = date < 10 ? ('0' + date) : date;
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
};