const app = getApp();

Component({
  properties: {
    checkinPeople: {
      type: Object,
      value: null
    }
  },
  methods: {
    edit() {
      
    },
    remove() {
      wx.showModal({
        title: '提示',
        content: '删除该入住人？',
        success: res => {
          if (res.confirm) {
            //定位user中入住人index
            var index = app.globalData.user.checkinPeople.indexOf(this.properties.checkinPeople);
            //显示弹出框
            wx.showToast({
              title: '已删除入住人',
              icon: 'none'
            });
            //在user中删除入住人
            app.globalData.user.checkinPeople.splice(index, 1);
            //刷新入住人页面
            getCurrentPages()[getCurrentPages().length - 1].onLoad();
            //更新数据库用户数据
            app.updateUser();
          }
        }
      })
    }
  }
})
