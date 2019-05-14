const app = getApp();
const db = wx.cloud.database();

Component({
  properties: {
    order: {
      type: Object,
      value: null
    }
  },
  methods: {
    hotelDetail() {
      db.collection('Hotel').where({
        _id: this.properties.order.hotelId
      }).get({
        success: res => {
          app.globalData.hotelDetail.hotel = res.data[0];
          wx.navigateTo({
            url: '/pages/hotelDetail/hotelDetail',
          });
        }
      })
    }
  }
})
