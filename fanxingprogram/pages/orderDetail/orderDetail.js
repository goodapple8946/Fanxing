const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    user: null,
    hotel: null,
    checkinDate: '请选择入住时间',
    checkoutDate: '请选择离开时间',
    checkinNum: 0,
    checkinPeopleIndexes: [],
    checkinPhone: '',
    
    today: dateToString(new Date())
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
  //选择入住时间
  selectCheckinDate(e) {
    this.setCheckinDate(e.detail.value);
    //离开时间修正
    this.data.checkinDate > this.data.checkoutDate && this.setCheckoutDate(e.detail.value);
  },
  //选择离开时间
  selectCheckoutDate(e) {
    this.setCheckoutDate(e.detail.value);
    //入住时间修正
    this.data.checkinDate > this.data.checkoutDate && this.setCheckinDate(e.detail.value);
  },
  //设置入住时间
  setCheckinDate(date) {
    this.setData({
      checkinDate: date
    });
  },
  //设置离开时间
  setCheckoutDate(date) {
    this.setData({
      checkoutDate: date
    });
  },
  jumpToCalendar() {
    wx.navigateTo({
      url: '/pages/calendar/calendar',
    });
  },
  //输入入住人数
  inputCheckinNum(e) {
    this.data.checkinNum = e.detail.value;
  },
  //选择入住人
  selectCheckinPeople() {
    wx.navigateTo({
      url: '/pages/selectCheckinPeople/selectCheckinPeople'
    });
  },
  //输入预订电话
  inputCheckinPhone(e) {
    this.data.checkinPhone = e.detail.value;
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
  return new Date(y[0], y[1], y[2]);
}