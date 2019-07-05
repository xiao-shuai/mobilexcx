import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button, Form, Input, Checkbox, Label } from '@tarojs/components';
import './enquiry.scss'

export default class Enquiry extends Component {

  state={
    show: ''
  }

  componentWillMount () {}
  componentDidMount () {} 

  render() {
    const { show = '' } = this.props
    return (
      <View className={`box ${show}`}>
        <View className='container'>
          {/* 输入框 */}
          <Form className='form'>
            <View className='input_list'>
              <View className='input_item'>
                <View className='item_name'>联系人</View>
                <View className='input_wrap'>
                  <Input type='text' className='input' />
                  <Text className='span'>联系人姓名不能少于2个字符</Text>
                </View>
              </View>
              <View className='input_item'>
                <View className='item_name'>手机号</View>
                <View className='input_wrap'>
                  <Input type='text' className='input' />
                  <Text className='span'>请输入手机号</Text>
                </View>
              </View>
              <View className='input_item'>
                <View className='item_name'>验证码</View>
                <View className='input_wrap'>
                  <View className='check_r fl'>
                    <Input type='text' className='input' />
                  </View>
                  <View className='getQrcode fl'>
                    <Text className='span'>获取验证码</Text>
                  </View>
                </View>
              </View>
            </View>

            <View className='foot'>
              <Checkbox name='allow' id='allow' className='allow' />
              <Label for='allow' className='laber'>允许同品行业优质供应商联系我</Label>
              <Button className='btn'>发布询价单</Button>
              <Button className='more'>点此发布更详细的采购信息</Button>
            </View>
            <Button className='close' onClick={this.handleHidEnquiry.bind(this)}>关闭</Button>
          </Form>
        </View>
      </View>
    );
  }
}