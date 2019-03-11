// component/calendar/calendar.js
var util = require('../../util/util.js');  
Component({
    /**
     * 组件的属性列表
     */
    properties: {
    },

    /**
     * 组件的初始数据
     */
    data: {
        weekDayArr: ['日', '一', '二', '三', '四', '五', '六'],
        monthDayArr: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8,9,10,11,12],
        calendarDate: String,
        chosen: {
            type: Boolean,
            value: false
        },
        selectedDate1: {
            type: String,
            value: "选择日期"
        },
        selectedDate2: {
            type: String,
            value: "选择日期"
        }
    },

    lifetimes:{
        created(){
        },
        attached(){
            this.setData({
                calendarDate: wx.getStorageSync("date")
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap: function(e){
            console.log(e.currentTarget)
            this.triggerEvent('myevent',"111")
        },

        lastMonth: function(){
            var lastMonthDate = util.dateUtil.preMonth(this.data.calendarDate[0], this.data.calendarDate[1] - 1)
            lastMonthDate = util.formatTime(lastMonthDate)
            this.setData({
                calendarDate: lastMonthDate
            })
            console.log(this.data.calendarDate)
            this.setData({
                monthDayArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            })
        },

        nextMonth: function(){
            var nextMonthDate = util.dateUtil.nextMonth(this.data.calendarDate[0], this.data.calendarDate[1]-1)
            nextMonthDate = util.formatTime(nextMonthDate)
            this.setData({
                calendarDate: nextMonthDate
            })
            console.log(this.data.calendarDate)
            this.setData({
                monthDayArr: [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            })        
        }
    }
})
