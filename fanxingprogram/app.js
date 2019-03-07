wx.cloud.init();
const db = wx.cloud.database();

App({
  globalData: {
    openid: '',
    userInfo: null,
    search: {
      city: '请选择城市',
      checkinDate: null,
      checkoutDate: null,
      peopleNum: 0,
      bedroomNum: 0,
      livingroomNum: 0
    },
    user: null,
    cities: null
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
    this.queryCity();
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
        this.queryUserSearch && this.queryUserSearch(res.data[0]);
      }
    });
  },
  //获取城市数据
  queryCity() {
    db.collection('City').get({
      success: res => {
        this.globalData.cities = [];
        for (var i = 0; i < res.data.length; i++)
          this.globalData.cities.push(res.data[i].name);
        //防止onLaunch在onLoad之后返回
        this.queryCityIndex && this.queryCityIndex(this.globalData.cities);
        this.queryCitySearch && this.queryCitySearch(this.globalData.cities);
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