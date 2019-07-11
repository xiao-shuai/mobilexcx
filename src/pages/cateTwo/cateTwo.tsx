import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
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
      console.log(brother)
      console.log(son)
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
    Taro.navigateTo({ url: `/pages/search/search?catid=${id}`})
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
                <View className='son_item' key={item.catid} onClick={this.handleJumpSearch.bind(this,item.catid)}>{item.name}</View>
              )
            })}
          </View>
        </View>
      </View>
    );
  }
}
