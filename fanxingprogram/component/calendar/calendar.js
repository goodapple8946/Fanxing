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
        monthDayArr: [],
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
            this.calCalendar(this.data.calendarDate[0], this.data.calendarDate[1])
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        calCalendar: function(y, m){
            var nextMonthDate = util.dateUtil.nextMonth(y, m - 1)
            nextMonthDate = util.formatTime(nextMonthDate)
            var lastMonthDate = util.dateUtil.preMonth(nextMonthDate[0], nextMonthDate[1] - 1)
            lastMonthDate = util.formatTime(lastMonthDate)
            // console.log(lastMonthDate)
            var currentDate = lastMonthDate
            var firstDay = lastMonthDate[3]
            firstDay = firstDay % 7
            var daysOfMonth = util.dateUtil.getDaysOfMonth(lastMonthDate[0], lastMonthDate[1])
            var monthDayArrayTemp = []
            for (let i = 0; i < firstDay; i++) {
                let currentDay = [
                    {
                        date: null,
                        //hidden: false,
                        selected: false
                    }
                ]
                monthDayArrayTemp = monthDayArrayTemp.concat(currentDay)
            }
            for (let i = firstDay; i < firstDay + daysOfMonth; i++) {
                if (i != firstDay) {
                    let currentDateTemp = util.dateUtil.nextDay(currentDate[0], currentDate[1] - 1, currentDate[2])
                    currentDate = util.formatTime(currentDateTemp)
                }
                let currentDay = [
                    {
                        date: currentDate,
                        // hidden: false,
                        selected: false
                    }
                ]
                monthDayArrayTemp = monthDayArrayTemp.concat(currentDay)
            }
            for (let i = firstDay + daysOfMonth; i < 42; i++) {
                let currentDay = [
                    {
                        date: null,
                        // hidden: true,
                        selected: false
                    }
                ]
                monthDayArrayTemp = monthDayArrayTemp.concat(currentDay)
            }
            this.setData({
                monthDayArr: monthDayArrayTemp
            })
        },

        onTap: function(e){
            let info = this.data.monthDayArr[e.currentTarget.id]
            console.log(info)
            if(info.date != null)
                this.triggerEvent('myevent', info)
        },

        lastMonth: function(){
            var lastMonthDate = util.dateUtil.preMonth(this.data.calendarDate[0], this.data.calendarDate[1] - 1)
            lastMonthDate = util.formatTime(lastMonthDate)
            this.setData({
                calendarDate: lastMonthDate
            })
            console.log(this.data.calendarDate)
            this.calCalendar(this.data.calendarDate[0], this.data.calendarDate[1])
        },

        nextMonth: function(){
            var nextMonthDate = util.dateUtil.nextMonth(this.data.calendarDate[0], this.data.calendarDate[1]-1)
            nextMonthDate = util.formatTime(nextMonthDate)
            this.setData({
                calendarDate: nextMonthDate
            })
            console.log(this.data.calendarDate)
            this.calCalendar(this.data.calendarDate[0], this.data.calendarDate[1])
        }
    }
})
