import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import './imgPreview.scss'
import NavBar from '@/component/navBar/navBar'
import TaroBdparse from '@/component/taroBdparse/taroBdparse'

export default class ImgPreview extends Component {

  config = {
       navigationBarTitleText: '产品详情'
  }

  state = {
    desc: ''
  }

  componentWillMount () {
    this.getDesc()
  }
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 

  getDesc () {
    const key = 'desc'
    const that = this
    swan.getStorage({
      key,
      success: res => {
        console.log('获取成功')
        that.setState({ desc: res.data.desc })
      },
      fail: () => console.log('获取失败'),
      complete: () => console.log('获取完成')
    })
  }

  render() {
    const { desc } = this.state
    return (
      <View>
        <NavBar
          imgPreview='selected'
        />
        <View>
          <TaroBdparse desc={desc} />
        </View>
      </View>
    );
  }
}