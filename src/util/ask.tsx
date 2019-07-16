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
    if (res.data === undefined) {
      return ask(url, data)
    }
    let code = null
    try {
      if (res.data.no) {
        code = res.data.no
      } else if (res.data.errno) {
        code = res.data.errno
      }
    }
    catch (err) {
      console.log(err)
    }
    if (code !== 1) {
      console.log('请求失败:', url, '错误信息：', res.data.msg || res.data)
      return Promise.reject(res.data)
    }
    console.log('响应数据:', res.data)
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
    return (err)
  })
}

export default ask