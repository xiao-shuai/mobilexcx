import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import './navBar.scss'

export default class NavBar extends Component {

  state = {}

  componentWillReceiveProps () {
    console.log('componentWillReceiveProps',this.props)
  }
  componentWillMount () {
    // console.log('componentWillMount：',this.props)
  }
  componentDidMount () {
    // console.log('componentDidMount',this.props)
  } 
  componentDidShow() {
    console.log('componentDidShow',this.props) 
  }
  
  

  jumpNavBar (name) {
    Taro.navigateTo({ url: `/pages/proDetail/${name}` })
  }

  render() {
    const { pro, imgPreview } = this.props
    return (
      <View className='nav_box'>
        <View className='arrow'></View>
        <View className='nav_list'>
          <View className={`nav_item ${pro}`} onClick={this.jumpNavBar.bind(this,'proDetail')}>产品</View>
          <View className={`nav_item ${imgPreview}`} onClick={this.jumpNavBar.bind(this,'imgPreview/imgPreview')}>图片</View>
        </View>
      </View>
    );
  }
}