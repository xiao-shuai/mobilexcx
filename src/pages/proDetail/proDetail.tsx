import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui'
import { set, get } from '@/util/global_data'
import ProPreview from './proPreview/proPreview'
import ImgPreview from './imgPreview/imgPreview'

export default class ProDetail extends Component {

  config = {
    navigationBarTitleText: '产品详情'
  }

  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
      id: ''
    }
  }

  componentWillMount () {}
  componentDidMount () {
    this.setProId()
  } 

  setProId () {
    console.log('this.$router.params',this.$router.params)
    const { id, en } = this.$router.params
    this.setState({ id })
    let key = 'pid'
    let data
    if (en) {
      data = { id: id, test: 'true' }
    } else {
      data = { id: id }
    }
    Taro.clearStorage()
    Taro.setStorage({ key, data })
    .then(res => console.log('setStorage',res))
  }

  handleClick (value) {
    this.setState({
      current: value
    })
    if (value === 1) {
      const pid = this.state.id
      get('imgFun')(pid)
    }
  }

  render() {
    const tabList = [{ title: '产品' }, { title: '图片' }]
    return (
      <AtTabs 
        current={this.state.current} 
        tabList={tabList} 
        onClick={this.handleClick.bind(this)}
      >
        <AtTabsPane current={this.state.current} index={0} >
          <View style='padding: 20px 10px;background-color: #FAFBFC;text-align: center;' >
            <ProPreview />
          </View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <View style='padding: 20px 10px;background-color: #FAFBFC;text-align: center;'>
            <ImgPreview />
          </View>
        </AtTabsPane>
      </AtTabs>
    );
  }
}