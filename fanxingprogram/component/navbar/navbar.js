// component/navbar/navbar.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activeIndex:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
      tabs: ["订单管理", "房源管理", "管家管理"],
  },

  /**
   * 组件的方法列表
   */
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
