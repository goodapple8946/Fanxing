wx.cloud.init();
const db = wx.cloud.database();

App({
  globalData: {
    openid: '',
    search: {
      cityID: 0,
      city: '请选择城市',
      checkinDate: null,
      checkoutDate: null,
      peopleNum: 0,
      type: 0
    },
    hotelDetail: {
      hotel: null
    },
    orderDetail: {
      hotel: null
    },
    managerDetail: {
      manager: null
    },
    user: null,
    cities: null
  },
  onLaunch() {
    this.queryCity();
  },
  //获取用户数据
  queryUser() {
    //获取用户openid
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        this.globalData.openid = res.result.openid;
        //获取UserInfo
        wx.getUserInfo({
          success: res => {
            var userInfo = res.userInfo;
            db.collection('User').where({
              _openid: this.globalData.openid
            }).get({
              success: res => {
                var user = res.data[0];
                //如果数据库已有用户数据，则取用，否则插入新用户
                if (user) {
                  //更新头像
                  if (user.avatarUrl != userInfo.avatarUrl) {
                    user.avatarUrl = userInfo.avatarUrl
                  }
                  //更新昵称
                  if (user.name != userInfo.nickName) {
                    user.name = userInfo.nickName
                  }
                  this.globalData.user = res.data[0];
                }
                else
                  this.insertUser(userInfo);
                //防止onLaunch在onLoad之后返回
                this.queryUserIndex && this.queryUserIndex(res.data[0]);
                this.queryUserOrder && this.queryUserOrder(res.data[0]);
                this.queryUserMine && this.queryUserMine(res.data[0]);
                this.queryUserManager && this.queryUserManager(res.data[0]);
                this.queryUserFavorite && this.queryUserFavorite(res.data[0]);
                this.queryUserCheckinPeople && this.queryUserCheckinPeople(res.data[0]);
                this.queryUserSearch && this.queryUserSearch(res.data[0]);
                this.queryUserManagerDetail && this.queryUserManagerDetail(res.data[0]);
                this.queryUserSelectCheckinPeople && this.queryUserSelectCheckinPeople(res.data[0]);
                this.queryUserBackgroundManage && this.queryUserBackgroundManage(res.data[0]);
              }
            });
          }
        });
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
  insertUser(userInfo) {
    db.collection('User').add({
      data: {
        hotels: [],
        favorites: [],
        orders: [],
        checkinPeople: [],
        coupons: [],
        role: 'user',
        introduction: '没有介绍。',
        avatarUrl: userInfo.avatarUrl,
        name: userInfo.nickName
      },
      success: res => {
        console.log('insert User');
        this.queryUser();
      }
    });
  }
})