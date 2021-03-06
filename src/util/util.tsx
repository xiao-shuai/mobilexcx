import md5 from 'md5'

const aid = 61010
const key = 'smallprogram20180716rmaekd8d4ds9'
const productid = '101030597384'

const getTimestamp = () => {
  return new Date().getTime();
}

const md5ParsePro = (productid) => {
  let timestamp = getTimestamp()
  let code = `aid=${aid}&productid=${productid}&ts=${timestamp}&${key}`
  const sign = md5(code)
  return sign
}

const md5ParseCode = (mobile) => {
  let timestamp = getTimestamp()
  let code = `aid=${aid}&mobile=${mobile}&ts=${timestamp}&type=send&${key}`
  return md5(code)
}

const md5ParseEnquiry = (options) => {
  const { mobile, code, linkman, proId } = options
  let timestamp = getTimestamp()
  const md5Code = `aid=${aid}&code=${code}&linkman=${linkman}&product_id=${proId}&phone=${mobile}&ts=${timestamp}&${key}`
  return md5(md5Code)
}

const debounce = (fn, wait, immediate) => {
  let timer
  return () => {
    let args = arguments
    let that = this
    if (immediate && !timer) {
      fn.apply(that, args)
    }
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(that, args)
    }, wait)
  }
}

const util = {
  md5ParsePro,
  md5ParseCode,
  md5ParseEnquiry,
  getTimestamp,
  debounce
}

export default util

// $str = 'aid=61010&mobile='.$_REQUEST['mobile'].'&ts='.$_REQUEST['ts'].'&type='.$_REQUEST['type'].'&smallprogram20180716rmaekd8d4ds9';
// 100007741659