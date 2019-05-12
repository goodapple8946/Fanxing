// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    var url = 'https://ip.tianqiapi.com/';
    let postResponse = await got(url, {
        method: 'post',
        headers: {}
    })
    return postResponse.body;
}