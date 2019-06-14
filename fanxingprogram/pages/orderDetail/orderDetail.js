const db = wx.cloud.database();
const app = getApp();

var MD5 = require('../../util/MD5.js');
var Parser = require('../../util/dom-parser')

Page({
  data: {
    user: null,
    hotel: null,
    checkinDate: '请选择入住时间',
    checkoutDate: '请选择离开时间',
    checkinNum: 0,
    checkinPeopleIndexes: [],
    checkinPhone: '',
    
    today: dateToString(new Date()),
    
    //支付
    info: null,
    ip: null
  },
  onLoad() {
    //用户数据
    if (app.globalData.user) {
      this.setData({
        user: app.globalData.user
      });
    }
    else {
      //防止onLaunch在onLoad之后返回
      app.queryUserOrderDetail = x => {
        this.setData({
          user: x
        });
      }
    }
    //房源数据
    this.setData({
      hotel: app.globalData.orderDetail.hotel
    });
  },
  //获取IP
  onShow() {
    wx.cloud.callFunction({
      name: 'getIP',
      complete: res => {
        wx.setStorageSync('ip', JSON.parse(res.result)['ip']);
      }
    });
  },
  //选择入住时间
  selectCheckinDate(e) {
    this.setCheckinDate(e.detail.value);
    //离开时间修正
    this.data.checkinDate > this.data.checkoutDate && this.setCheckoutDate(e.detail.value);
  },
  //选择离开时间
  selectCheckoutDate(e) {
    this.setCheckoutDate(e.detail.value);
    //入住时间修正
    this.data.checkinDate > this.data.checkoutDate && this.setCheckinDate(e.detail.value);
  },
  //设置入住时间
  setCheckinDate(date) {
    this.setData({
      checkinDate: date
    });
  },
  //设置离开时间
  setCheckoutDate(date) {
    this.setData({
      checkoutDate: date
    });
  },
  jumpToCalendar() {
    wx.navigateTo({
      url: '/pages/calendar/calendar',
    });
  },
  //输入入住人数
  inputCheckinNum(e) {
    this.data.checkinNum = e.detail.value;
  },
  //选择入住人
  selectCheckinPeople() {
    wx.navigateTo({
      url: '/pages/selectCheckinPeople/selectCheckinPeople'
    });
  },
  //输入预订电话
  inputCheckinPhone(e) {
    this.data.checkinPhone = e.detail.value;
  },
  //尝试支付
  tryPay() {
    if (this.data.checkinDate == '请选择入住时间' || this.data.checkoutDate == '请选择离开时间') {
      wx.showToast({
        title: '请输入时间',
        icon: 'none'
      })
    } else if (this.data.checkinDate == this.data.checkoutDate) {
      wx.showToast({
        title: '入住时间不能与离开时间相同',
        icon: 'none'
      })
    } else if (this.data.checkinPeopleIndexes.length == 0) {
      wx.showToast({
        title: '请选择入住人',
        icon: 'none'
      })
    } else if (this.data.checkinPhone.length != 11) {
      wx.showToast({
        title: '请输入正确的入住电话',
        icon: 'none'
      })
    } else {
      var dateAllowed = true;
      //日期不冲突
      for (var date = new Date(stringToDate(this.data.checkinDate)); date.getTime() <= stringToDate(this.data.checkoutDate).getTime(); date = new Date(date.getTime() + 86400000)) {
        if (this.data.hotel.dateUsed.indexOf(dateToString(date)) != -1) {
          wx.showToast({
            title: dateToString(date) + ' 已被订购，请选择其他日期',
            icon: 'none'
          })
          dateAllowed = false;
          break;
        }
      }
      if (dateAllowed) {
        this.pay();
      }
    }
  },
  //支付
  pay() {
    var duration = Math.ceil((stringToDate(this.data.checkoutDate) - stringToDate(this.data.checkinDate)) / (1000 * 60 * 60 * 24));
    var fee = this.data.hotel.price * duration;
    var detail = this.data.hotel.name + ' ' + duration + '天';
    var tradeno = Math.floor(Math.random() * 999999999);
    var ran = Math.random() * 999999999;
    var ran1 = Math.random() * 999999999;
    var ip = wx.getStorageSync('ip');
    var sign;
    var appid = 'wx6956cb292be5d887';
    var attach = '繁星小程序支付';
    var body = '繁星民宿租金支付';
    var mchid = '1533779071';
    var notify_url = 'http://wxpay.wxutil.com/pub_v2/pay/notify.v2.php';
    var stringA;
    stringA = "appid=" + appid + "&attach=" + attach + "&body=" + body + "&detail=" + detail + "&mch_id=" + mchid + "&nonce_str=" + ran.toString() + "&notify_url=" + notify_url + "&openid=" + app.globalData.user['_openid'] + "&out_trade_no=" + tradeno + "&sign_type=MD5&spbill_create_ip=" + ip + "&total_fee=" + fee + "&trade_type=JSAPI";

    var stringB;
    stringB = stringA + "&key=fanxingstellarisweixinzhifu00000"
    sign = MD5.md5(stringB).toUpperCase();

    var dataString = '';
    dataString += '<xml><appid>';
    dataString += appid;
    dataString += '</appid><attach>'
    dataString += attach;
    dataString += '</attach><body>'
    dataString += body;
    dataString += '</body><mch_id>';
    dataString += mchid;
    dataString += '</mch_id><detail><![CDATA[';
    dataString += detail;
    dataString += ']]></detail><nonce_str>';
    dataString += ran.toString();
    dataString += '</nonce_str><notify_url>';
    dataString += notify_url;
    dataString += '</notify_url><openid>'
    dataString += app.globalData.user['_openid'];
    dataString += '</openid><out_trade_no>';
    dataString += tradeno;
    dataString += '</out_trade_no><sign_type>MD5</sign_type><spbill_create_ip>';
    dataString += ip;
    dataString += '</spbill_create_ip><total_fee>';
    dataString += fee;
    dataString += '</total_fee><trade_type>JSAPI</trade_type><sign>';
    dataString += sign;
    dataString += '</sign></xml>'

    console.log(dataString);

    this.setData({
      info: app.globalData.user['_openid']
    });
    wx.cloud.callFunction({
      name: 'placeOrder',
      data: {
        data: dataString
      },
      complete: res => {
        this.setData({
          ip: res.result
        });
        console.log(res.result);

        var XMLParser = new Parser.DOMParser()
        var doc = XMLParser.parseFromString(res.result)
        var a = doc.getElementsByTagName('prepay_id')['0'];
        try {
          console.log(a.firstChild.nodeValue);
          var prepaid_id = a.firstChild.nodeValue;
          var timestamp = Date.parse(new Date());
          timestamp = timestamp / 1000;
          console.log("当前时间戳为：" + timestamp);
          var packages = 'prepay_id=' + prepaid_id;

          stringA = "appId=" + appid + "&nonceStr=" + ran1.toString() + "&package=" + packages + "&signType=MD5&timeStamp=" + timestamp;
          var stringB;
          stringB = stringA + "&key=fanxingstellarisweixinzhifu00000"
          sign = MD5.md5(stringB).toUpperCase();
          dataString = '';
          dataString += '<xml><appid>';
          dataString += appid;
          dataString += '</appid><nonce_str>';
          dataString += ran1.toString();
          dataString += '</nonce_str><package>';
          dataString += packages;
          dataString += '</package><sign_type>MD5</sign_type><timeStamp>';
          dataString += timestamp;
          dataString += '</timeStamp><sign>';
          dataString += sign;
          dataString += '</sign></xml>'
          console.log(dataString);

          wx.requestPayment(
            {
              timeStamp: timestamp.toString(),
              nonceStr: ran1.toString(),
              package: packages,
              signType: 'MD5',
              paySign: sign,
              success: res => {
                wx.showToast({
                  title: '支付成功'
                });
                //更新已入住时间
                var dateUses = this.data.hotel.dateUsed;
                for (var date = new Date(stringToDate(this.data.checkinDate)); date.getTime() <= stringToDate(this.data.checkoutDate).getTime(); date = new Date(date.getTime() + 86400000)) {
                  dateUses.push(dateToString(date));
                }
                dateUses.sort();
                wx.cloud.callFunction({
                  name: 'updateHotelDateUsed',
                  data: {
                    doc: this.data.hotel._id,
                    dateUsed: dateUses
                  },
                  success: res => {
                    console.log('update Hotel');
                    //更新订单
                    var people = [];
                    for (var i = 0; i < this.data.checkinPeopleIndexes.length; i++) {
                      people.push(this.data.user.checkinPeople[this.data.checkinPeopleIndexes[i]]);
                    }
                    db.collection('Order').add({
                      data: {
                        orderTime: dateToString(new Date()),
                        startTime: this.data.checkinDate,
                        endTime: this.data.checkoutDate,
                        hotelId: this.data.hotel._id,
                        hotelName: this.data.hotel.name,
                        phoneNumber:this.data.checkinPhone,
                        checkinPeople: people,
                        orderNumber: tradeno,
                        paymentNumber: fee,
                        state: '待入住'
                      },
                      success: res => {
                        console.log('insert Order');
                      },
                      fail: res => {
                        wx.showToast({
                          title: '订单数据添加失败',
                          icon: 'none'
                        })
                      }
                    });
                  },
                  fail: res => {
                    wx.showToast({
                      title: '房源数据更新失败',
                      icon: 'none'
                    })
                  }
                });
                wx.switchTab({
                  url: '/pages/order/order',
                  success: res => {
                    var page = getCurrentPages().pop();
                    page && page.onLoad();
                  }
                });
              },
              fail: res => {
                wx.showToast({
                  title: '支付取消',
                  icon: 'none'
                });
                //更新订单
                db.collection('Order').add({
                  data: {
                    orderTime: dateToString(new Date()),
                    startTime: this.data.checkinDate,
                    endTime: this.data.checkoutDate,
                    hotelId: this.data.hotel._id,
                    hotelName: this.data.hotel.name,
                    orderNumber: tradeno,
                    paymentNumber: fee,
                    state: '已取消'
                  },
                  success: res => {
                    console.log('insert Order');
                  },
                  fail: res => {
                    wx.showToast({
                      title: '订单数据添加失败',
                      icon: 'none'
                    })
                  }
                });
              }
            }
          )
        }
        catch (err) {
          console.log(err);
        }
      }
    });
  }
})

//日期转字符串
function dateToString(x) {
  var y = x.getFullYear();
  var m = x.getMonth() + 1;
  var d = x.getDate();
  m = m < 10 ? '0' + m : m;
  d = d < 10 ? ('0' + d) : d;
  return y + '-' + m + '-' + d;
};

//字符串转日期
function stringToDate(x) {
  var y = x.split('-');
  return new Date(y[0], y[1] - 1, y[2]);
}