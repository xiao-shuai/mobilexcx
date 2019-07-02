import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import './imgDetail.scss'
import NavBar from '@/component/navBar/navBar'

export default class ImgDetail extends Component {

   config = {
       navigationBarTitleText: '产品详情'
  }

  state={}

  componentWillMount () {}
  componentDidMount () {} 

  render() {
    return (
      <View>
        <NavBar
          imgDetail='selected'
        />
      </View>
    );
  }
}