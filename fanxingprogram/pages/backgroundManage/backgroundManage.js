const db = wx.cloud.database();
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["订单管理", "房源管理", "管家管理"],
    orderInputValue:'',
    hotelInputValue: '',
    managerInputValue: '',
    activeIndex:0,
    orders:null,
    hotels:null,
    managerApplications:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取订单信息，降序排列
    db.collection('Order')
    .limit(10)
    .orderBy('orderTime','desc')
    .get({
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
  orderBtn() {
    this.setData({
      activeIndex: 0
    });
    //更新订单信息
    db.collection('Order')
      .limit(10)
      .orderBy('orderTime', 'desc')
      .get({
        success: res => {
          this.setData({
            orders: res.data
          });
        }
      });
  },

  hotelBtn() {
    this.setData({
      activeIndex: 1
    });
  },
  
  managerBtn() {
    this.setData({
      activeIndex: 2
    });
    //获取管家申请信息
    db.collection('ManagerApplication')
      .limit(10)
      .where({
        state:'processing'
      })
      .get({
        success: res => {
          this.setData({
            managerApplications: res.data
          })
        }
      });
    console.log(this.data.managerApplications);
  },

  orderSearchInput(e){
    this.setData({
      orderInputValue:e.detail.value
    })
  },
  hotelSearchInput(e) {
    this.setData({
      hotelInputValue: e.detail.value
    })
  },
  managerSearchInput(e) {
    this.setData({
      managerInputValue: e.detail.value
    })
  },

  orderSearch(){
    db.collection('Order')
      .limit(10)
      .orderBy('orderTime', 'desc')
      .get({
        success: res => {
          var results = res.data;
          var orders = [];
          for (var i = 0; i < results.length; i++) {
            if (
              //关键词
              (this.data.orderInputValue == '' ||
                results[i].hotelName.indexOf(this.data.orderInputValue) != -1 ||
                results[i].state.indexOf(this.data.orderInputValue) != -1 )
            ) {
              orders.push(results[i]);
            }
          }
          this.setData({
            orders:orders
          });
        }
      });
      console.log(this.data.orders[0].orderTime);
  },

  hotelSearch() {
    console.log("hotel");
  },

  //TODO 通过申请
  passApplication(){
    wx.showModal({
      title: '提示',
      content: '通过该管家申请？',
      success: res => {
        if (res.confirm) {
          
        }
      }
    })
  },
  //TODO 拒绝申请
  refuseApplication() {
    wx.showModal({
      title: '提示',
      content: '拒绝该管家申请？',
      success: res => {
        if (res.confirm) {

        }
      }
    })
  },

  managerSearch(){
    console.log("managerSearch");
    db.collection('ManagerApplication')
    .limit(10)
    .where({
      phoneNo:this.data.managerInputValue
    })
    .get({
      success: res => {
        this.setData({
          managerApplications: res.data
        })
      }
    })
  },
})