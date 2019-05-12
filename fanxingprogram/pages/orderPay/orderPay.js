// fanxingprogram/pages/orderPay/orderPay.js
const app = getApp();
var MD5 = require('../../util/MD5.js');
var Parser = require('../../util/dom-parser')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: null,
        ip : null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        wx.cloud.callFunction({
            name: 'getIP',
            complete: res => {
                wx.setStorageSync('ip', JSON.parse(res.result)['ip'])
            }
        });
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

    pay: function(){
        var fee = 1;
        var detail = '商品详情';
        var tradeno = Math.random() * 999999999;
        tradeno = Math.floor(tradeno);

        var ran = Math.random()*999999999;
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

        //["西红柿炒蛋","0.34","炒蛋",""]

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
                try{
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
                            'timeStamp': timestamp.toString(),
                            'nonceStr': ran1.toString(),
                            'package': packages,
                            'signType': 'MD5',
                            'paySign': sign,
                            'success': function (res) {
                                console.log(res)
                            },
                            'fail': function (res) {
                                console.log(res)
                            },
                            'complete': function (res) {
                                console.log(res)
                            }
                        }
                    )
                }
                catch(err){
                    console.log(err);
                }
            }
        });
    }
})