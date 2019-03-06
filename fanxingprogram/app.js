wx.cloud.init();
const db = wx.cloud.database();

App({
  globalData: {
    openid: '',
    userInfo: null,
    search: {
      cityID: 0,
      checkinDate: new Date(2019, 1, 1),
      checkoutDate: new Date(2099, 12, 31),
      peopleNum: 0,
    },
    user: null
  },
  onLaunch() {
    //获取用户openid
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        this.globalData.openid = res.result.openid;
      }
    });
    this.queryUser();
  },
  //获取用户数据
  queryUser() {
    db.collection('User').where({
      _openid: this.globalData.openid
    }).get({
      success: res => {
        //如果数据库已有用户数据，则取用，否则插入新用户
        if (res.data[0]) 
          this.globalData.user = res.data[0];
        else
          this.insertUser();
        //防止onLaunch在onLoad之后返回
        this.queryUserIndex && this.queryUserIndex(res.data[0]);
        this.queryUserFavorite && this.queryUserFavorite(res.data[0]);
        this.queryUserCheckinPeople && this.queryUserCheckinPeople(res.data[0]);
      }
    });
  },
  //更新数据库用户数据
  updateUser() {
    db.collection("User").doc(this.globalData.user._id).update({
      data: {
        favorites: this.globalData.user.favorites,
        checkinPeople: this.globalData.user.checkinPeople
      }
    });
    console.log('update User Data');
  },
  //新增用户数据
  insertUser() {
    db.collection('User').add({
      data: {
        favorites: [],
        orders: [],
        checkinPeople: [],
        coupons: []
      },
      success: res => {
      }
    });
    console.log('insert User');
    this.queryUser();
  }
})