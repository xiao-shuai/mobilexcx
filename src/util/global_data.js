const globalData = {
  imgFun: null
}

export function set (key, val) {
  globalData[key] = val
}

export function get (key) {
  return globalData[key]
}