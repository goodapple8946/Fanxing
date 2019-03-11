const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    hotel: null,
    markers: [],
  },
  onLoad() {
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
  }
})