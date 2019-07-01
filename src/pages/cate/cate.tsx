import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button, Image} from '@tarojs/components';
// import { api } from '@/util/api'
import { api } from '@/util/api'
import ask from '@/util/ask'
import './cate.scss'
import List_icon_1 from './images/list_icon_1.gif'
import List_icon_2 from './images/list_icon_2.gif'
import List_icon_3 from './images/list_icon_3.gif'
import List_icon_4 from './images/list_icon_4.gif'
import List_icon_5 from './images/list_icon_5.gif'
import List_icon_6 from './images/list_icon_6.gif'
import List_icon_7 from './images/list_icon_7.gif'
import List_icon_8 from './images/list_icon_8.gif'
import List_icon_9 from './images/list_icon_9.gif'
import List_icon_10 from './images/list_icon_10.gif'
import List_icon_11 from './images/list_icon_11.gif'
import List_icon_12 from './images/list_icon_12.gif'
import List_icon_13 from './images/list_icon_13.gif'
import List_icon_14 from './images/list_icon_14.gif'
import List_icon_15 from './images/list_icon_15.gif'
import List_icon_16 from './images/list_icon_16.gif'
import List_icon_17 from './images/list_icon_17.gif'
import List_icon_18 from './images/list_icon_18.gif'
import List_icon_19 from './images/list_icon_19.gif'
import List_icon_20 from './images/list_icon_20.gif'
import List_icon_21 from './images/list_icon_21.gif'

export default class Cate extends Component {

  config = {
    navigationBarTitleText: '行业分类'
  }

  state = {
    cateList: [],
    imgList: [
      List_icon_1,
      List_icon_2,
      List_icon_3,
      List_icon_4,
      List_icon_5,
      List_icon_6,
      List_icon_7,
      List_icon_8,
      List_icon_9,
      List_icon_10,
      List_icon_11,
      List_icon_12,
      List_icon_13,
      List_icon_14,
      List_icon_15,
      List_icon_16,
      List_icon_17,
      List_icon_18,
      List_icon_19,
      List_icon_20,
      List_icon_21
    ]
  }

  componentWillMount () {
    this.getCateList()
  }
  componentDidMount () {
    this.getCateList()
  } 

  getCateList () {
    let that = this
    Taro.request({
      url: api.cat,
      success: function (res) {
        that.setState({
          cateList: res.data.data
        })
      }
    })
  }

  jumpCateTwo (id,name) {
    Taro.navigateTo({url: `/pages/cateTwo/cateTwo?id=${id}&name=${name}`})
  }

  render() {
    const { cateList, imgList } = this.state
    return (
      <View>
        <View className='inner'>
          { cateList.map((item, i) => {
            return (
              <View className="item" key={item.catid} onClick={this.jumpCateTwo.bind(this, item.catid, item.name)}>
                <Image className='icon_l' src={imgList[i]}></Image>
                <Text>{item.name}</Text>
              </View>
            )
          })}
        </View>
      </View>
    );
  }
}
