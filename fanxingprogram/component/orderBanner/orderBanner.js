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
      //房源数据
      db.collection('Hotel').where({
        _id: this.properties.order.hotelId
      }).get({
        success: res => {
          app.globalData.hotelDetail.hotel = res.data[0];
          wx.navigateTo({
            url: '/pages/hotelDetail/hotelDetail',
          });
        },
        fail: res => {
          wx.showToast({
            title: '房源数据获取失败',
            icon: 'none'
          })
        }
      })
    }
  }
})
