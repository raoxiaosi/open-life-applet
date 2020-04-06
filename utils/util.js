const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const isToken = function token() {
  let { expireTime } = wx.getStorageSync('loginToken');
  if (expireTime) {
    let nowTime = new Date().getTime();
    if (nowTime >= expireTime) {
      wx.setStorageSync('isRefashToken', true);
    } else {
      wx.setStorageSync('isRefashToken', false);
    }
  } else {
    wx.setStorageSync('isRefashToken', false);
  }
};

module.exports = {
  formatTime: formatTime,
  isToken
}
