const db = wx.cloud.database();
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["订单管理", "房源管理", "管家管理"],
    activeIndex:0,
    orders:null,
    hotels:null,
    manages:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('Order').where({
      _openid: this.data._openid
    }).get({
      success: res => {
        this.setData({
          orders: res.data
        });
      }
    });
  },

  /**
   * 点击顶部button
   */
  topBtn0() {
    this.setData({
      activeIndex: 0
    });
  },

  topBtn1() {
    this.setData({
      activeIndex: 1
    });
  },
  
  topBtn2() {
    this.setData({
      activeIndex: 2
    });
  },

  orderSearch(){
    console.log("order");
  },

  hotelSearch() {
    console.log("hotel");
  },

  managerSearch(){
    console.log("manager");
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})