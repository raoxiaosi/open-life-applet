// 开发环境
const isDev = 1;

// 域名
const prodUrl = 'https://test.api.agtsci.cn'


// const isToken = function token() {
//   let { expireTime } = wx.getStorageSync('loginToken');
//   if (expireTime) {
//     let nowTime = new Date().getTime();
//     if (nowTime >= expireTime) {
//       return true
//     } else {
//       return false
//     }
//   } else {
//     return false
//   }
// };

// const isRefashToken = isToken();

module.exports = {
  isDev,
  prodUrl,
  // isRefashToken
}