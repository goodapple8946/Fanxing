const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    hotel: null,
    markers: [],
    manager: null,
    facilityCnToEn: {
      '空气净化器': 'aircleaner',
      '空调': 'airconditioner',
      '浴袍': 'bathrobe',
      '暖气': 'centralheating',
      '密码锁': 'codedlock',
      '电脑': 'computer',
      '日常用品': 'dailyarticle',
      '双人床': 'doublebed',
      '电梯': 'elevator',
      '灭火器': 'extinguisher',
      '冰箱': 'fridge',
      '吹风': 'hairdrier',
      '衣架': 'hanger',
      '热水浴缸': 'hottub',
      '热水': 'hotwater',
      '厨具': 'kitchenware',
      '微波炉': 'microwaveoven',
      '矿泉水': 'mineralwater',
      '独立卫生间': 'privatebathroom',
      '沐浴露': 'showergel',
      '单人床': 'singlebed',
      '拖鞋': 'slipper',
      '沙发': 'sofa',
      '餐具': 'tableware',
      '电视': 'television',
      '牙具': 'toiletthing',
      '洗衣机': 'washer',
      'wifi': 'wifi',
      '工作区域': 'workarea'
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
    console.log(this.data.hotel);
    //管家数据
    db.collection('User').where({
      _openid: app.globalData.hotelDetail.hotel._openid
    }).get({
      success: res => {
        this.setData({
          manager: res.data[0]
        });
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