import { isDev, prodUrl } from './config';
import { refreshLogin } from '../apis/login';
import { isToken } from '../utils/util';
const rootUrl = isDev ? prodUrl : '';

isToken();

export default function postServer ({url, method, postData} = opt) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: rootUrl + url,
      data: postData,
      header: {
        'content-type':'application/json',
        Authorization: wx.getStorageSync("loginToken").accessToken || null
      },
      method,
      success: (res)=>{
        if (res.data.code === 200) {
          if (wx.getStorageSync('isRefashToken')) {
            let { refreshToken } = wx.getStorageSync('loginToken');
            refreshLogin(refreshToken).then(() => {
              resolve(res)
            })
            return
          }
          resolve(res)
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
          });
          console.log(res);
        }
      },
      fail: (err)=>{
        reject(err);
      }
    });
  })
}