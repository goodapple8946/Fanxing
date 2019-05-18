const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    user: null,
    checkinPeopleIndexes: [],
    checked: [],
    prePage: null
  },
  onLoad() {
    //上一页数据
    this.data.prePage = getCurrentPages()[getCurrentPages().length - 2];
    this.data.checkinPeopleIndexes = this.data.prePage.data.checkinPeopleIndexes;
    
    //用户数据
    if (app.globalData.user) {
      this.setData({
        user: app.globalData.user
      });
      this.showChecked();
    }
    else {
      //防止onLaunch在onLoad之后返回
      app.queryUserSelectCheckinPeople = x => {
        this.setData({
          user: x
        });
        this.showChecked();
      }
    }
  },
  onUnload() {
    this.data.prePage.setData({
      checkinPeopleIndexes: this.data.checkinPeopleIndexes
    });
  },
  //已选择打勾
  showChecked() {
    var checked = this.data.checked;
    for (var i = 0; i < this.data.user.checkinPeople.length; i++) {
      checked.push(this.data.checkinPeopleIndexes.indexOf(i) != -1);
    }
    this.setData({
      checked
    });
  },
  //选择入住人
  select(e) {
    this.data.checkinPeopleIndexes = [];
    for (var i in e.detail.value) {
      this.data.checkinPeopleIndexes.push(Number(e.detail.value[i]));
    }
    this.data.checkinPeopleIndexes.sort();
    wx.navigateBack({
      delta:1
    })
  },
  newCheckinPeople() {
    //跳转至editorCheckinPeople
    wx.navigateTo({
      url: '/pages/editorCheckinPeople/editorCheckinpeople',
    })
  }
})