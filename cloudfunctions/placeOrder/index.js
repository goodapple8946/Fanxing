// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    var url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
    var dataString = event.data;
    let postResponse = await got(url,{
        method: 'post',
        headers: { "Content-Type": "application/xml" },
        body: dataString
    })
    return postResponse.body;
    //return dataString;
}