import md5 from 'md5'

let timestamp = new Date().getTime();

const aid = 61010
const key = 'smallprogram20180716rmaekd8d4ds9'

function md5ParsePro(productid) {
  let code = `aid=${aid}&productid=${productid}&ts=${timestamp}&${key}`
  return md5(code)
}

function md5ParseCode(mobile) {
  let code = `aid=${aid}&mobile=${mobile}&ts=${timestamp}&type=send&${key}`
  return md5(code)
}

export {
  md5ParsePro,
  md5ParseCode
}

$str = 'aid=61010&mobile='.$_REQUEST['mobile'].'&ts='.$_REQUEST['ts'].'&type='.$_REQUEST['type'].'&smallprogram20180716rmaekd8d4ds9';