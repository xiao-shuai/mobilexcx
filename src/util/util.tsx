import md5 from 'md5'


const aid = 61010
const key = 'smallprogram20180716rmaekd8d4ds9'
const productid = '101030597384'

let getTimestamp = () => {
  return new Date().getTime();
}

let md5ParsePro = (productid) => {
  let timestamp = getTimestamp()
  let code = `aid=${aid}&productid=${productid}&ts=${timestamp}&${key}`
  const sign = md5(code)
  console.log('sign')
  return sign
}

let md5ParseCode = (mobile) => {
  let timestamp = getTimestamp()
  let code = `aid=${aid}&mobile=${mobile}&ts=${timestamp}&type=send&${key}`
  return md5(code)
}

let md5ParseEnquiry = (options) => {
  const { mobile, code, linkman, proId } = options
  let timestamp = getTimestamp()
  const md5Code = `aid=${aid}&code=${code}&linkman=${linkman}&product_id=${proId}&phone=${mobile}&ts=${timestamp}&${key}`
  return md5(md5Code)
}

let util = {
  md5ParsePro,
  md5ParseCode,
  md5ParseEnquiry,
  getTimestamp
}

export default util

// $str = 'aid=61010&mobile='.$_REQUEST['mobile'].'&ts='.$_REQUEST['ts'].'&type='.$_REQUEST['type'].'&smallprogram20180716rmaekd8d4ds9';