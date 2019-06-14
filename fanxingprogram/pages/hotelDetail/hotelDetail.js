const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    hotel: null,
    markers: [],
    manager: null,
    facilityCnToEn: {
      '空调': 'airconditioner',
      '智能门锁': 'lock',
      '电梯': 'elevator',
      '灭火器': 'nofire',
      '冰箱': 'fridge',
      '吹风': 'hairdrier',
      '衣架': 'rack',
      '热水': '24hotwater',
      '厨具': 'pan',
      '微波炉': 'microwave',
      '拖鞋': 'slipper',
      '电视': 'tv',
      '牙具': 'toothbrush',
      '洗衣机': 'washingmachine',
      'wifi': 'wifi',
      '浴巾': 'bathtowel',
      '煤气灶': 'gascooker',
      '热水器': 'heater',
      '洗手液': 'liquidsoap',
      '安保': 'security',
      '淋浴': 'shower',
      '香皂': 'soap',
      '餐具': 'tableware',
      '马桶': 'toilet',
      '纸巾': 'toiletpaper',
      '洗洁剂': 'washing',
      '窗户': 'window'
    }
  },
  onLoad() {
    //地图标志
    var markers = this.data.markers;
    markers = [
      {
        iconPath: '/icons/marker.png',
        callout: {
          content: app.globalData.hotelDetail.hotel.name
        },
        id: 0,
        latitude: app.globalData.hotelDetail.hotel.geopoint.latitude,
        longitude: app.globalData.hotelDetail.hotel.geopoint.longitude,
        width: 40,
        height: 40
      }
    ];
    this.setData({
      hotel: app.globalData.hotelDetail.hotel,
      markers
    });
    //管家数据
    db.collection('User').where({
      _openid: app.globalData.hotelDetail.hotel._openid
    }).get({
      success: res => {
        this.setData({
          manager: res.data[0]
        });
      },
      fail: res => {
        wx.showToast({
          title: '管家数据获取失败',
          icon: 'none'
        })
      }
    });
  },
  //添加或删除收藏
  addFavorite() {
    var index = app.globalData.user.favorites.indexOf(this.properties.hotel._id);
    if (index == -1) {
      //显示弹窗
      wx.showToast({
        title: '已添加收藏',
        icon: 'success'
      });
      var hotel = this.properties.hotel;
      //在user中添加收藏
      app.globalData.user.favorites.push(hotel._id);
      //收藏页面添加收藏
      hotel.favorite = true;
      this.setData({
        hotel
      });
    }
    else {
      //显示弹窗
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      });
      var hotel = this.properties.hotel;
      //在user中删除收藏
      app.globalData.user.favorites.splice(index, 1);
      //收藏页面移除收藏
      hotel.favorite = false;
      this.setData({
        hotel
      });
    }
    //更新数据库用户数据
    app.updateUser();
    //主页收藏图标更新
    app.favoriteIconIndex();
  },
  //管家详情
  managerDetail() {
    app.globalData.managerDetail.manager = this.data.manager;
    wx.navigateTo({
      url: '/pages/managerDetail/managerDetail'
    });
  },
  //立即预订
  orderNow() {
    app.globalData.orderDetail.hotel = this.data.hotel;
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail'
    });
  }
})