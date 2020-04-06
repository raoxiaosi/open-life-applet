import request from '../utils/request';

export function wxLogin(postData) {
  return request({
    url: '/api/auth/login/wx',
    method: 'POST',
    postData
  })
}


export function refreshLogin(refreshToken) {
  return request({
    url: '/api/auth/refresh_token',
    method: 'POST',
    postData: {
      refreshToken: refreshToken,
      loginType: '2',
      accountType: '2'
    }
  }).then((res) => {
    let { accessToken, expire, refreshToken } = res.data.data;
    const loginToken = {
      expireTime: new Date().getTime() + Number(expire),
      expire,
      accessToken: 'Bearer ' + accessToken,
      refreshToken
    };
    wx.setStorageSync('isRefashToken', false);
    wx.setStorageSync('loginToken', loginToken);
  }).catch((err) => {
    console.log(err)
  });
}