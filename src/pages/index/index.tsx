import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text,Icon,Image } from '@tarojs/components'
import './index.scss'
import  makepolo from '../asset/makepolo.png'
// import { AtButton ,AtSearchBar} from 'taro-ui'
export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <View className='top'>
          <Image src={makepolo} 

          className={'top_log'}
          />
           
          <View>
            <Icon type={'search'} size='20'/>
            <Text>搜索</Text>
          </View>
        </View>
       
      </View>
    )
  }
}
