import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import './play.scss'

export default class Play extends Component {

  config = {
    navigationBarTitleText: '马可视频'
  }

  state = {
    proId: 101033969955,
    
  }

  componentWillMount () {}
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 

  render() {
    return (
      <View>
        
      </View>
    );
  }
}