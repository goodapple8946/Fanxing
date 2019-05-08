// fanxingprogram/pages/orderPay/orderPay.js
const app = getApp();

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
        var ran = Math.random()*999999999;
        var ip = wx.getStorageSync('ip');
        var fee = 1;
        var sign;
        var appid = 'wx6956cb292be5d887';
        var attach = '繁星小程序支付';
        var body = '繁星民宿租金支付';
        var mchid = '1533779071';
        var detail = '商品详情';
        var notify_url = 'http://wxpay.wxutil.com/pub_v2/pay/notify.v2.php';
        var tradeno = '123465';

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
        dataString += '</out_trade_no><spbill_create_ip>';
        dataString += ip;
        dataString += '</spbill_create_ip><total_fee>';
        dataString += fee;
        dataString += '</total_fee><trade_type>JSAPI</trade_type>';
        dataString += sign;
        dataString += '</sign></xml>'



        this.setData({
            info: app.globalData.user['_openid']
        });
        wx.cloud.callFunction({
            name: 'placeOrder',
            data: {
                data: dataString
            },
            complete: res => {
                // this.setData({
                //     info: res.result
                // });
            }
        });
        // "<xml>\r\n   <appid>wx2421b1c4370ec43b</appid>\r\n   <attach>支付测试</attach>\r\n   <body>JSAPI支付测试</body>\r\n   <mch_id>10000100</mch_id>\r\n   <detail><![CDATA[{ \"goods_detail\":[ { \"goods_id\":\"iphone6s_16G\", \"wxpay_goods_id\":\"1001\", \"goods_name\":\"iPhone6s 16G\", \"quantity\":1, \"price\":528800, \"goods_category\":\"123456\", \"body\":\"苹果手机\" }, { \"goods_id\":\"iphone6s_32G\", \"wxpay_goods_id\":\"1002\", \"goods_name\":\"iPhone6s 32G\", \"quantity\":1, \"price\":608800, \"goods_category\":\"123789\", \"body\":\"苹果手机\" } ] }]]></detail>\r\n   <nonce_str>1add1a30ac87aa2db72f57a2375d8fec</nonce_str>\r\n   <notify_url>http://wxpay.wxutil.com/pub_v2/pay/notify.v2.php</notify_url>\r\n   <openid>oUpF8uMuAJO_M2pxb1Q9zNjWeS6o</openid>\r\n   <out_trade_no>1415659990</out_trade_no>\r\n   <spbill_create_ip>14.23.150.211</spbill_create_ip>\r\n   <total_fee>1</total_fee>\r\n   <trade_type>JSAPI</trade_type>\r\n   <sign>0CB01533B8C1EF103065174F50BCA001</sign>\r\n</xml>"
        
    }
})