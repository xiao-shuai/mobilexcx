import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button, Form, Input, Checkbox, Label } from '@tarojs/components';
import { api } from '@/util/api'
import util from '@/util/util'
import './enquiry.scss'
import md5 from 'md5'

export default class Enquiry extends Component {

  state = {
    proId: '',
    mobile: '',
    linkman: '',
    code: '',
    currentTime: 61,
    timeText: '获取验证码'
  }

  componentWillMount () {
    this.getProId()
  }
  componentDidMount () {} 

  onIsShow () {
    this.props.isShow()
  }

  handleInput (key, ele) {
    let value = ele.target.value
    this.setState({[key]: value}) 
  }

  // 校验
  handleBlur (e) {
    let value = e.target.value
    let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (value.length == 0) {
      Taro.showToast({title: '请输入手机号',icon: 'none',duration: 1500})
    } else if (value.length !== 11) {
      Taro.showToast({title: '手机号长度有误',icon: 'none',duration: 1500})
    } else if (!myreg.test(value)) {
      Taro.showToast({title: '手机号有误', icon: 'none',duration: 1500})
    }
    return true
  }

  // 发送询盘
  handleSendEnquiry () {
    const { proId, mobile, linkman, code } = this.state
    if (!proId) return Taro.showToast({title: '缺乏产品id',icon: 'none',duration: 1500})
    if (!mobile) return Taro.showToast({title: '请输入手机号',icon: 'none',duration: 1500})
    if (!linkman) return Taro.showToast({title: '请输入联系人',icon: 'none',duration: 1500})
    if (!code) return Taro.showToast({title: '请输入验证码',icon: 'none',duration: 1500})
    let timestamp = util.getTimestamp
    const sign = util.md5ParseEnquiry({ proId, mobile, linkman, code })
    Taro.request({
      url: api.enquiry,
      data: {
        aid: '61010',
        product_id: proId,
        linkman,
        phone: mobile,
        code,
        ts: timestamp,
        sign
      },
      success: (res) => {
        console.log(res)
        if(res.data.no !== 1) return Taro.showToast({title: '询价失败',icon: 'none',duration: 1500})
        Taro.showToast({ title: '询价成功',icon: 'none',duration: 1500 })
        this.onIsShow()
      }
    })
  }
  
  // 验证码
  getCode () {
    let { mobile, currentTime } = this.state
    let timestamp = util.getTimestamp
    const sign = util.md5ParseCode(mobile)
    if (!mobile) return Taro.showToast({title:'请输入手机号',icon:'none'})
    Taro.request({
      url: api.code,
      data: {
        aid: '61010',
        type: 'send',
        mobile: mobile,
        ts: timestamp,
        sign
      },
      success: (res) => {
        console.log(res)
        if (res.data.errno !== 1) return Taro.showToast({ title: res.data.msg,icon: 'none',duration: 1500 })
        Taro.showToast({ title: res.data.msg, icon: 'none',duration: 1500 })
        let interval = setInterval(() => {
          currentTime --
          this.setState({ timeText: `${currentTime}秒` })
          if (currentTime <= 0) {
            clearInterval(interval)
            this.setState({
              timeText: '从新发送',
              currentTime: 61,
            })
          }
        },1000)
      }
    })
  }

  getProId () {
    Taro.getStorage({ 
      key: 'pid',
      success: (res) => {
        let proId = res.data.id
        this.setState({ proId })
      }
    })
  }

  render() {
    const { timeText } = this.state
    return (
      <View className='box show'>
        <View className='container'>
          {/* 输入框 */}
          <Form className='form'>
            <View className='input_list'>
              <View className='input_item'>
                <View className='item_name'>联系人</View>
                <View className='input_wrap'>
                  <Input 
                    type='text' 
                    className='input' 
                    onInput={this.handleInput.bind(this,'linkman')} 
                  />
                  {/* <Text className='span'>联系人姓名不能少于2个字符</Text> */}
                </View>
              </View>
              <View className='input_item'>
                <View className='item_name'>手机号</View>
                <View className='input_wrap'>
                  <Input 
                    type='text' 
                    className='input' 
                    onInput={this.handleInput.bind(this,'mobile')} 
                    onBlur={this.handleBlur.bind(this)}
                  />
                  {/* <Text className='span'>请输入手机号</Text> */}
                </View>
              </View>
              <View className='input_item'>
                <View className='item_name'>验证码</View>
                <View className='input_wrap'>
                  <View className='check_r fl'>
                    <Input 
                      type='text' 
                      className='input' 
                      onInput={this.handleInput.bind(this,'code')}
                    />
                  </View>
                  <View className='getQrcode fl'>
                    <Text 
                      className='span'
                      onClick={this.getCode.bind(this)}
                    >{timeText}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View className='foot'>
              <Checkbox name='allow' id='allow' className='allow' />
              <Label for='allow' className='laber'>允许同品行业优质供应商联系我</Label>
              <Button 
                className='btn'
                onClick={this.handleSendEnquiry.bind(this)}
              >发布询价单</Button>
              <Button className='more'>点此发布更详细的采购信息</Button>
            </View>
            <Button className='close' onClick={this.onIsShow.bind(this)}>关闭</Button>
          </Form>
        </View>
      </View>
    );
  }
}