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
    user: null,
    hotels: null
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
    this.queryHotels();
  },
  //获取用户数据
  queryUser() {
    db.collection('User').where({
      _openid: this.globalData.openid
    }).get({
      success: res => {
        if (res.data[0]) {
          this.globalData.user = res.data[0];
        }
        else {
          this.insertUser();
        }
        //防止onLaunch在onLoad之后返回
        if (this.queryUserCallback) {
          this.queryUserCallback(res.data[0]);
        }
      }
    })
  },
  //获取房源数据
  queryHotels() {
    db.collection('Hotel').get({
      success: res => {
        this.globalData.hotels = res.data;
        //防止onLaunch在onLoad之后返回
        if (this.queryHotelsCallback) {
          this.queryHotelsCallback(res.data);
        }
      }
    })
  },
  //更新用户收藏
  updateUserFavorites() {
    db.collection("User").doc('userData').update({
      data: {
        favorites: this.globalData.user.favorites
      }
    })
    console.log('update User');
  },
  //新增用户数据
  insertUser() {
    db.collection('User').add({
      data: {
        _id: 'userData',
        favorites: [],
        orders: [],
        checkinPeople: [],
        coupons: []
      },
      success: res => {
      }
    })
    console.log('insert User');
  }
})