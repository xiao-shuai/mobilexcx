import Taro , { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { api } from '@/util/api'
import ask from '@/util/ask'
import './cateTwo.scss'

export default class CateTwo extends Component {

  config = {
    navigationBarTitleText: ''
  }

  state = {
    cateBrother: [],
    cateSon: [],
    chooseId: null
  }

  componentWillMount () {
    this.getCateTwoList()
    swan.setPageInfo({
      title: '「行业设备」-行业设备网-专业行业设备-马可波罗网',
      keywords: '行业设备,行业设备网,专业行业设备',
      description: '马可波罗网行业设备频道提供了行业分类及其产品信息,其中主要以it行业设备、机械行业设备、通信行业设备、电器行业设备及特种行业设备等产品信息，找行业设备相关的产品就上马可波罗网行业设备信息频道!',
      
      success: function () {
          console.log('setPageInfo success');
      },
      fail: function (err) {
          console.log('setPageInfo fail', err);
      }
  })
  }
  componentDidMount () {
  } 

  getCateTwoList () {
    const { id, name } = this.$router.params
    Taro.setNavigationBarTitle({ title: name })
    ask(api.cat_class,{ cid: id }).then((res) => {
      const brother = res.data.brother
      const firstBrother = brother[0].catid
      const son = res.data.son
      this.setState({
        cateBrother: brother,
        cateSon: son,
        chooseId: firstBrother
      })
    })
  }

  getSonList (id) {
    ask(api.cat_class, { cid: id }).then((res) => {
      const brother = res.data.brother
      const firstBrother = id
      const son = res.data.son
      this.setState({
        cateBrother: brother,
        cateSon: son,
        chooseId: firstBrother
      })
    })
  }

  handleJumpSearch (id) {
    Taro.navigateTo({ url: `/pages/search/search?catid=${id.catid}&key=${id.name}`})
  }

  render() {
    const { cateBrother, cateSon, chooseId } = this.state
    return (
      <View>
        <View className='inner list_box'>
          <View className='list_left'>
            {cateBrother.map((item, i) => {
              let flag = chooseId === item.catid ? 'item selected' : 'item'
              return (
                <View className={flag} key={item.catid} onClick={this.getSonList.bind(this, item.catid)}>{item.name}</View>
              )
            })}
          </View>
          <View className='list_right'>
            {cateSon.map((item, i) => {
              return (
                <View className='son_item' key={item.catid} onClick={this.handleJumpSearch.bind(this,item)}>{item.name}</View>
              )
            })}
          </View>
        </View>
      </View>
    );
  }
}
