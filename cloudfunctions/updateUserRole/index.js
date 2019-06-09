const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  await db.collection('User').doc(event.doc).update({
    data: {
      role: event.role
    }
  });
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  };
}