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
  }
})