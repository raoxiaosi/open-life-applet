//app.js
import { wxLogin } from './apis/login';

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    wx.login({
      success: (res)=>{
        const code = res.code;
        wxLogin({ code, accountType: "c_user" }).then((res) => {
          console.log(res);
          let { accessToken, expire, refreshToken } = res.data.data;
          const loginToken = {
            expireTime: new Date().getTime() + Number(expire),
            expire,
            accessToken: 'Bearer ' + accessToken,
            refreshToken
          };
          wx.setStorageSync('loginToken', loginToken);
          wx.setStorageSync('isRefashToken', false);
        }).catch((err) => {
          console.log(err);
        });
      },
    });
  },

  onShow() {
  },

  globalData: {
    userInfo: null,
  },
})