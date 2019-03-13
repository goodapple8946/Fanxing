// fanxingprogram/pages/calendar/calendar.js
var util = require('../../util/util.js');  
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentDate: String,
        selectedDate1: String,
        selectedDate2: String,
        selected: Boolean,
        tempDate: []
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
            selectedDate2: "选择日期",
            selected1: false,
            selected2: false
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

    onMyEvent: function(e){
        console.log(e.detail)
        if(this.data.selected1 == false){
            this.setData({
                selectedDate1: e.detail.date[0] + "年" + e.detail.date[1] + "月" + e.detail.date[2] + "日",
                selected1: true,
                tempDate: e.detail.date
            })
            console.log(this.data.tempDate[0])
        }
        else if(this.data.selected2 == false){
            let judge = false
            if (e.detail.date[0]<this.data.tempDate[0]){
                judge = true
            }
            else if (e.detail.date[0] == this.data.tempDate[0]){
                if (e.detail.date[1] < this.data.tempDate[1]){
                    judge = true
                }
                else if (e.detail.date[1] == this.data.tempDate[1]){
                    if (e.detail.date[2] < this.data.tempDate[2]){
                        judge = true
                    }
                }
            }
            if (e.detail.date != this.data.tempDate){
                if(judge == false){
                    this.setData({
                        selectedDate2: e.detail.date[0] + "年" + e.detail.date[1] + "月" + e.detail.date[2] + "日",
                        selected2: true
                    })
                }
                else{
                    this.setData({
                        selectedDate1: e.detail.date[0] + "年" + e.detail.date[1] + "月" + e.detail.date[2] + "日",
                        selectedDate2: this.data.tempDate[0] + "年" + this.data.tempDate[1] + "月" + this.data.tempDate[2] + "日",
                        selected2: true
                    })
                }
            }
        }
        else{
            this.setData({
                selectedDate1: e.detail.date[0] + "年" + e.detail.date[1] + "月" + e.detail.date[2] + "日",
                selectedDate2: "选择日期",
                selected1: true,
                selected2: false,
                tempDate: e.detail.date
            })
        }
    }
})