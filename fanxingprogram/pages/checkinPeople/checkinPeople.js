const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    user: null,
    newBtn: 'newCheckinPeople',
    input: 'hide',
    name: '',
    idCardNo: ''
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
      app.queryUserCheckinPeople = x => {
        this.setData({
          user: x
        });
      }
    }
  },
  //添加新的入住人
  newCheckinPeople() {
    //隐藏按钮，显示输入
    this.setData({
      newBtn: 'hide',
      input: 'inputCheckinPeople'
    });
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
  newCheckinPeopleYes() {
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
      //更新入住人页面
      this.setData({
        user: app.globalData.user,
        newBtn: 'newCheckinPeople',
        input: 'hide',
        name: '',
        idCardNo: ''
      });
    }
  },
  newCheckinPeopleNo() {
    //更新入住人页面
    this.setData({
      newBtn: 'newCheckinPeople',
      input: 'hide',
      name: '',
      idCardNo: ''
    });
  }
})