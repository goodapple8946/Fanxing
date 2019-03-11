// fanxingprogram/pages/calendar/calendar.js
var util = require('../../util/util.js');  
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentDate: String,
        selectedDate1: String,
        selectedDate2: String
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(this.selectComponent("#test"));
        // 获取日期存入缓存
        var currentDate = util.formatTime(new Date());
        wx.setStorageSync("date", currentDate);
        this.setData({
            currentDate: wx.getStorageSync("date"),
            selectedDate1: "选择日期",
            selectedDate2: "选择日期"
        })
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
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    onMyEvent: function(){
        console.log("2333")
    }
})