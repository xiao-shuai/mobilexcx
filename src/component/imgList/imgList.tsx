import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button, Image} from '@tarojs/components';
import './imgList.scss'

export default class ImgList extends Component {

  state = {}

  componentWillMount () {}
  componentDidMount () {} 

  jumpProDetail (id) {
    console.log(id)
    // let key = 'pid'
    // let data = { id: id }
    // Taro.setStorage({ key, data })
    // .then(res => console.log(res))
    Taro.navigateTo({ url: `/pages/proDetail/proDetail?id=${id}` })
  }

  render() {
    const { recommendList, name, type } = this.props
    return (
      <View className='ImgList inner'>
        <View className='title'>·
          <Text className='name'>{name}</Text>
        </View>
        <View className='img_list'>
          {type === 'pro' 
          ?
          recommendList.map((item, i) => {
            return (
            <View className='item' key={item.proid} onClick={this.jumpProDetail.bind(this,item.proid)}>
                <Image className='img' src={item.hot_pro_img} />
                <View className='pro_title'>{item.title}</View>
                <View className='price'>{item.product_price_unit ? item.product_price_unit : '面议'}</View>
              </View>
            )
          })
          :
          recommendList.map((item, i) => {
            return (
            <View className='item' key={item.product_id} onClick={this.jumpProDetail.bind(this,item.product_id)}>
                <Image className='img' src={item.img_url} />
                <View className='pro_title'>{item.title}</View>
                <View className='price'>{item.unit_price}</View>
              </View>
            )
          })
          }
        </View>
      </View>
    );
  }
}

