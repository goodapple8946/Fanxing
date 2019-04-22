// component/navbar/navbar.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Component({
  properties: {
    activeIndex:{
      type:Number,
      value:0
    }
  },
  data: {
      tabs: ["订单管理", "房源管理", "管家管理"],
  },
  methods: {
    onLoad: function () {
      var that = this;
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            
          });
        }
      });
    },
    tabClick: function (e) {
      this.setData({
        activeIndex: e.currentTarget.id
      });
      wx.navigateTo({
        url: '/pages/hotelManage/hotelManage?activeIndex=3',
      });
    }
  }
})
