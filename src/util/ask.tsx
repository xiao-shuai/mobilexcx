import Taro from '@tarojs/taro'

const ask = (url, data = {}) => {
  Taro.request({
    url: url,
    data: data,
    header: 'application/json'
  })
}

export default ask