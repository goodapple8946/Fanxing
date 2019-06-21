// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    var url = 'http://ip-api.com/json';
    let postResponse = await got(url, {
        method: 'post',
        headers: {}
    })
    return postResponse.body;
}