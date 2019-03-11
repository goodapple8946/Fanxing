// component/calendar/calendar.js

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        selectedDate1:{
            type:String
        },
        selectedDate2:{
            type:String
        },
        currentDate:{
            type:String
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        weekDayArr: ['日', '一', '二', '三', '四', '五', '六'],
        monthDayArr: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8,9,10,11,12]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onDayTap: function(e){
            this.triggerEvent('onDayTap',e.currentTarget.dataset)
        },

        lastMonth: function(){
            this.setData({
                monthDayArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            })
        },

        nextMonth: function(){
            this.setData({
                monthDayArr: [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            })        
        }
    }
})
