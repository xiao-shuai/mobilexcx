import Taro from '@tarojs/taro'
import { resolve } from 'url';

const showToast = (text) => {
  return Taro.showToast({ title: text,icon: 'none',duration: 1500 })
}

const ask = (url, data = {}) => {
  return Taro.request({
    url: url,
    data: data,
    header: 'application/json'
  }).then((res) => {
    let code = res.data.no || res.data.errno
    if (code !== 1) {
      console.log('请求失败:', url, '错误信息：', res.data.msg)
      return Promise.reject(res.data)
    }
    console.log('响应数据:', res.data)
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export default ask