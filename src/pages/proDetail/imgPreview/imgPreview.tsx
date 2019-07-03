import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import './imgPreview.scss'
import NavBar from '@/component/navBar/navBar'

export default class ImgPreview extends Component {

   config = {
       navigationBarTitleText: '产品详情'
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
    return (
      <View>
        <NavBar
          imgPreview='selected'
        />
      </View>
    );
  }
}