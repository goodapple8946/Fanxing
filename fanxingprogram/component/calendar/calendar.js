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
        selectedDate1: String,
        selectedDate2: String,
        selected1: Boolean,
        selected2: Boolean,
        tempDate: [],
        tempDate1: [],
        tempDate2: []
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
            var currentDay = [
                {
                    date: null,
                    selected: false
                }
            ]
            var today = wx.getStorageSync("date")
            if (this.data.calendarDate[0] == today[0] && this.data.calendarDate[1] == today[1]){
                firstDay += today[2] -1
                daysOfMonth -= today[2] - 1
                currentDate = today
            }
            for (let i = 0; i < firstDay; i++) {
                monthDayArrayTemp = monthDayArrayTemp.concat(currentDay)
            }
            for (let i = firstDay; i < firstDay + daysOfMonth; i++) {
                if (i != firstDay) {
                    let currentDateTemp = util.dateUtil.nextDay(currentDate[0], currentDate[1] - 1, currentDate[2])
                    currentDate = util.formatTime(currentDateTemp)
                }
                currentDay = [
                    {
                        date: currentDate,
                        selected: false
                    }
                ]
                monthDayArrayTemp = monthDayArrayTemp.concat(currentDay)
            }
            currentDay = [
                {
                    date: null,
                    selected: false
                }
            ]
            for (let i = firstDay + daysOfMonth; i < 42; i++) {
                monthDayArrayTemp = monthDayArrayTemp.concat(currentDay)
            }
            this.setData({
                monthDayArr: monthDayArrayTemp
            })
        },

        onTap: function(e){
            let info = this.data.monthDayArr[e.currentTarget.id]
            // console.log(e.currentTarget.id)
            if (info.date == null){
                ;
            }
            else{
                var up = "monthDayArr[" + e.currentTarget.id + "].selected"
                if (this.data.selected2 == false) {
                    let judge = false
                    if (info.date[0] < this.data.tempDate[0]) {
                        judge = true
                    }
                    else if (info.date[0] == this.data.tempDate[0]) {
                        if (info.date[1] < this.data.tempDate[1]) {
                            judge = true
                        }
                        else if (info.date[1] == this.data.tempDate[1]) {
                            if (info.date[2] < this.data.tempDate[2]) {
                                judge = true
                            }
                        }
                    }
                    if (!(info.date[0] == this.data.tempDate[0] && info.date[1] == this.data.tempDate[1] && info.date[2] == this.data.tempDate[2] )) {
                        if (judge == false) {
                            this.setData({
                                selectedDate2: info.date[0] + "年" + info.date[1] + "月" + info.date[2] + "日",
                                selected2: true,
                                tempDate2: info.date
                            })
                        }
                        else {
                            this.setData({
                                selectedDate1: info.date[0] + "年" + info.date[1] + "月" + info.date[2] + "日",
                                selectedDate2: this.data.tempDate[0] + "年" + this.data.tempDate[1] + "月" + this.data.tempDate[2] + "日",
                                selected2: true,
                                tempDate2: this.data.tempDate,
                                tempDate1: info.date
                            })
                        }
                    }
                    else{
                        console.log("!!!")
                        return
                    }
                    var date1 = this.data.tempDate1
                    var date2 = this.data.tempDate2
                    var up2
                    var judge1 = false
                    var judge2 = false
                    var firstDay = this.data.calendarDate
                    var daysOfMonth = util.dateUtil.getDaysOfMonth(firstDay[0], firstDay[1])
                    
                    var nextMonthDate = util.dateUtil.nextMonth(firstDay[0], firstDay[1] - 1)
                    nextMonthDate = util.formatTime(nextMonthDate)
                    firstDay = util.dateUtil.preMonth(nextMonthDate[0], nextMonthDate[1] - 1)
                    firstDay = util.formatTime(firstDay)

                    var lastDay = firstDay
                    lastDay[2] += daysOfMonth - 1

                    var firstDisplayDate = null
                    var lastDisplayDate = null

                    //判断本月最后一天是否比初始日期大
                    if (lastDay[0] > date1[0]) {
                        judge1 = true
                    }
                    else if (lastDay[0] == date1[0]) {
                        if (lastDay[1] > date1[1]) {
                            judge1 = true
                        }
                        else if (lastDay[1] == date1[1]) {
                            judge1 = true
                            firstDisplayDate = date1
                        }
                    }
                    //判断本月第一天是否比结束日期小
                    if (firstDay[0] < date2[0]) {
                        judge2 = true
                    }
                    else if (firstDay[0] == date2[0]) {
                        if (firstDay[1] < date2[1]) {
                            judge2 = true
                        }
                        else if (firstDay[1] == date2[1]) {
                            judge2 = true
                            lastDisplayDate = date2
                        }
                    }

                    //本月有选中的日期
                    if(judge1 && judge2){
                        var day1, day2
                        if(firstDisplayDate != null && lastDisplayDate != null){
                            day1 = firstDay[3]%7 + firstDisplayDate[2] - 1
                            day2 = lastDisplayDate[2] + firstDay[3] % 7 - 1
                        }
                        else if(firstDisplayDate == null && lastDisplayDate == null){
                            day1 = firstDay[3] % 7
                            day2 = daysOfMonth + firstDay[3] % 7 - 1
                        }
                        else if(firstDisplayDate == null){
                            day2 = lastDisplayDate[2] + firstDay[3] % 7 - 1
                            day1 = firstDay[3] % 7
                        }
                        else{
                            day1 = firstDay[3] % 7 + firstDisplayDate[2] - 1
                            day2 = daysOfMonth + firstDay[3] % 7 - 1
                        }
                        for(let i = day1; i <= day2; i++){
                            up2 = "monthDayArr[" + i + "].selected"
                            this.setData({
                                [up2]: true
                            })
                        }
                    }
                }
                else {
                    this.calCalendar(this.data.calendarDate[0], this.data.calendarDate[1])
                    this.setData({
                        selectedDate1: info.date[0] + "年" + info.date[1] + "月" + info.date[2] + "日",
                        selectedDate2: "选择日期",
                        selected1: true,
                        selected2: false,
                        tempDate: info.date,
                        tempDate1: info.date,
                        [up]: true
                    })
                }

                var res = [this.data.selectedDate1, this.data.selectedDate2, this.data.selected1, this.data.selected2, this.data.tempDate]

                this.triggerEvent('myevent', res)
            }
        },

        lastMonth: function(){
            var lastMonthDate = util.dateUtil.preMonth(this.data.calendarDate[0], this.data.calendarDate[1] - 1)
            lastMonthDate = util.formatTime(lastMonthDate)
            var currentDate = wx.getStorageSync("date")
            if(lastMonthDate[0]<currentDate[0]){
                return
            }
            else if (lastMonthDate[0] == currentDate[0]){
                if (lastMonthDate[1] < currentDate[1]){
                    return
                }
            }

            this.setData({
                calendarDate: lastMonthDate
            })
            this.calCalendar(this.data.calendarDate[0], this.data.calendarDate[1])

            if(this.data.selected1 == true && this.data.selected2 == false){
                var date1 = this.data.tempDate1
                for(let i=0;i<42;i++){
                    var date = this.data.monthDayArr[i].date
                    var up = "monthDayArr[" + i + "].selected"
                    if(date!=null){
                        if (date[0] == date1[0]){
                            if (date[1] == date1[1]){
                                if (date[2] == date1[2]){
                                    this.setData({
                                        [up]: true
                                    })
                                }
                            }
                        }
                    }
                }
            }
            else if(this.data.selected2 == true){
                var date1 = this.data.tempDate1
                var date2 = this.data.tempDate2
                var up2
                var judge1 = false
                var judge2 = false
                var firstDay = this.data.calendarDate
                var daysOfMonth = util.dateUtil.getDaysOfMonth(firstDay[0], firstDay[1])

                var nextMonthDate = util.dateUtil.nextMonth(firstDay[0], firstDay[1] - 1)
                nextMonthDate = util.formatTime(nextMonthDate)
                firstDay = util.dateUtil.preMonth(nextMonthDate[0], nextMonthDate[1] - 1)
                firstDay = util.formatTime(firstDay)

                var lastDay = firstDay
                lastDay[2] += daysOfMonth - 1

                var firstDisplayDate = null
                var lastDisplayDate = null

                //判断本月最后一天是否比初始日期大
                if (lastDay[0] > date1[0]) {
                    judge1 = true
                }
                else if (lastDay[0] == date1[0]) {
                    if (lastDay[1] > date1[1]) {
                        judge1 = true
                    }
                    else if (lastDay[1] == date1[1]) {
                        judge1 = true
                        firstDisplayDate = date1
                    }
                }
                //判断本月第一天是否比结束日期小
                if (firstDay[0] < date2[0]) {
                    judge2 = true
                }
                else if (firstDay[0] == date2[0]) {
                    if (firstDay[1] < date2[1]) {
                        judge2 = true
                    }
                    else if (firstDay[1] == date2[1]) {
                        judge2 = true
                        lastDisplayDate = date2
                    }
                }

                //本月有选中的日期
                if (judge1 && judge2) {
                    var day1, day2
                    if (firstDisplayDate != null && lastDisplayDate != null) {
                        day1 = firstDay[3] % 7 + firstDisplayDate[2] - 1
                        day2 = lastDisplayDate[2] + firstDay[3] % 7 - 1
                    }
                    else if (firstDisplayDate == null && lastDisplayDate == null) {
                        day1 = firstDay[3] % 7
                        day2 = daysOfMonth + firstDay[3] % 7 - 1
                    }
                    else if (firstDisplayDate == null) {
                        day2 = lastDisplayDate[2] + firstDay[3] % 7 - 1
                        day1 = firstDay[3] % 7
                    }
                    else {
                        day1 = firstDay[3] % 7 + firstDisplayDate[2] - 1
                        day2 = daysOfMonth + firstDay[3] % 7 - 1
                    }
                    for (let i = day1; i <= day2; i++) {
                        up2 = "monthDayArr[" + i + "].selected"
                        this.setData({
                            [up2]: true
                        })
                    }
                }
            }
        },

        nextMonth: function(){
            var nextMonthDate = util.dateUtil.nextMonth(this.data.calendarDate[0], this.data.calendarDate[1]-1)
            nextMonthDate = util.formatTime(nextMonthDate)
            this.setData({
                calendarDate: nextMonthDate
            })
            // console.log(this.data.calendarDate)
            this.calCalendar(this.data.calendarDate[0], this.data.calendarDate[1])

            if (this.data.selected1 == true && this.data.selected2 == false) {
                var date1 = this.data.tempDate1
                for (let i = 0; i < 42; i++) {
                    var date = this.data.monthDayArr[i].date
                    var up = "monthDayArr[" + i + "].selected"
                    if (date != null) {
                        if (date[0] == date1[0]) {
                            if (date[1] == date1[1]) {
                                if (date[2] == date1[2]) {
                                    this.setData({
                                        [up]: true
                                    })
                                }
                            }
                        }
                    }
                }
            }
            else if (this.data.selected2 == true) {
                var date1 = this.data.tempDate1
                var date2 = this.data.tempDate2
                var up2
                var judge1 = false
                var judge2 = false
                var firstDay = this.data.calendarDate
                var daysOfMonth = util.dateUtil.getDaysOfMonth(firstDay[0], firstDay[1])

                var nextMonthDate = util.dateUtil.nextMonth(firstDay[0], firstDay[1] - 1)
                nextMonthDate = util.formatTime(nextMonthDate)
                firstDay = util.dateUtil.preMonth(nextMonthDate[0], nextMonthDate[1] - 1)
                firstDay = util.formatTime(firstDay)

                var lastDay = firstDay
                lastDay[2] += daysOfMonth - 1

                var firstDisplayDate = null
                var lastDisplayDate = null

                //判断本月最后一天是否比初始日期大
                if (lastDay[0] > date1[0]) {
                    judge1 = true
                }
                else if (lastDay[0] == date1[0]) {
                    if (lastDay[1] > date1[1]) {
                        judge1 = true
                    }
                    else if (lastDay[1] == date1[1]) {
                        judge1 = true
                        firstDisplayDate = date1
                    }
                }
                //判断本月第一天是否比结束日期小
                if (firstDay[0] < date2[0]) {
                    judge2 = true
                }
                else if (firstDay[0] == date2[0]) {
                    if (firstDay[1] < date2[1]) {
                        judge2 = true
                    }
                    else if (firstDay[1] == date2[1]) {
                        judge2 = true
                        lastDisplayDate = date2
                    }
                }

                //本月有选中的日期
                if (judge1 && judge2) {
                    var day1, day2
                    if (firstDisplayDate != null && lastDisplayDate != null) {
                        day1 = firstDay[3] % 7 + firstDisplayDate[2] - 1
                        day2 = lastDisplayDate[2] + firstDay[3] % 7 - 1
                    }
                    else if (firstDisplayDate == null && lastDisplayDate == null) {
                        day1 = firstDay[3] % 7
                        day2 = daysOfMonth + firstDay[3] % 7 - 1
                    }
                    else if (firstDisplayDate == null) {
                        day2 = lastDisplayDate[2] + firstDay[3] % 7 - 1
                        day1 = firstDay[3] % 7
                    }
                    else {
                        day1 = firstDay[3] % 7 + firstDisplayDate[2] - 1
                        day2 = daysOfMonth + firstDay[3] % 7 - 1
                    }
                    for (let i = day1; i <= day2; i++) {
                        up2 = "monthDayArr[" + i + "].selected"
                        this.setData({
                            [up2]: true
                        })
                    }
                }
            }
        }
    }
})
