Component({
  properties: {
    managerApplication: {
      type: Object,
      value: null
    }
  },
  methods: {
    //通过申请
    pass() {
      wx.showModal({
        title: '提示',
        content: '通过该管家申请？',
        success: res => {
          if (res.confirm) {
            wx.cloud.callFunction({
              name: 'updateManagerApplication',
              data: {
                doc: this.properties.managerApplication._id,
                state: 'pass'
              },
              success: res => {
                console.log('update ManagerApplication');
                wx.showToast({
                  title: '已通过',
                });
                var page = getCurrentPages().pop();
                page && page.refreshManagerApplication();
              }
            });
          }
        }
      })
    },
    //拒绝申请
    refuse() {
      wx.showModal({
        title: '提示',
        content: '拒绝该管家申请？',
        success: res => {
          if (res.confirm) {
            wx.cloud.callFunction({
              name: 'updateManagerApplication',
              data: {
                doc: this.properties.managerApplication._id,
                state: 'refuse'
              },
              success: res => {
                console.log('update ManagerApplication');
                wx.showToast({
                  title: '已拒绝',
                  icon: 'none'
                });
                var page = getCurrentPages().pop();
                page && page.refreshManagerApplication();
              }
            });
          }
        }
      })
    }
  }
})
