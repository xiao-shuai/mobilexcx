import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';

export default class Index extends Component {

   config = {
       navigationBarTitleText: ''
  }

  state={}

  componentWillMount () {}
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  render() {
    const { corpInfo } = this.props
    return (
      <View>
        <View>
          <View className='corp_wrap'>
            <View className='title'></View>
            <View className='item'>
              <View className='left'>公司名称</View>
              <View className='right'></View>
            </View>
            <View className='item'>
              <View className='left'>联系人</View>
              <View className='right'></View>
            </View>
            <View className='item'>
              <View className='left'>联系电话</View>
              <View className='right'></View>
            </View>
            <View className='item'>
              <View className='left'>公司地址</View>
              <View className='right'></View>
            </View>
            <View className='item'>
              <View className='left'>法人代表</View>
              <View className='right'></View>
            </View>
            <View className='item'>
              <View className='left'>公司类型</View>
              <View className='right'></View>
            </View>
            <View className='item'>
              <View className='left'>经营模式</View>
              <View className='right'></View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}