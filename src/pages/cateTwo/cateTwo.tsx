import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import { api } from '@/util/api'
import './CateTwo.scss'

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
    Taro.setNavigationBarTitle({title: this.$router.params.name})
    const id = this.$router.params.id
    const that = this
    Taro.request({
      url: api.cat_class,
      data: {cid: id},
      success: function (res) {
        const brother = res.data.data.brother
        const firstBrother = brother[0].catid
        const son = res.data.data.son
        that.setState({
          cateBrother: brother,
          cateSon: son,
          chooseId: firstBrother
        })
      }
    })
  }

  getSonList (id) {
    const that = this
    Taro.request({
      url: api.cat_class,
      data: {cid: id},
      success: function (res) {
        const brother = res.data.data.brother
        const firstBrother = id
        const son = res.data.data.son
        that.setState({
          cateBrother: brother,
          cateSon: son,
          chooseId: firstBrother
        })
      }
    })
  }

  jumpProList (id) {
    // const that = this
    // Taro.request({
    //   url: api.cat_class,
    //   data: {cid: id},
    //   success: function (res) {
    //     // const brother = res.data.data.brother
    //     // const firstBrother = id
    //     // const son = res.data.data.son
    //     // that.setState({
    //     //   cateBrother: brother,
    //     //   cateSon: son,
    //     //   chooseId: firstBrother
    //     // })
    //     console.log(res.data)
    //   }
    // })
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
                <View className='son_item' key={item.catid} onClick={this.jumpProList.bind(this,item.catid)}>{item.name}</View>
              )
            })}
          </View>
        </View>
      </View>
    );
  }
}
