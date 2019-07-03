import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button, Image} from '@tarojs/components';
import './imgList.scss'

export default class ImgList extends Component {

  state = {}

  componentWillMount () {}
  componentDidMount () {} 

  render() {
    const { recommendList, name } = this.props
    return (
      <View className='ImgList inner'>
        <View className='title'>·
          <Text className='name'>{name}</Text>
          ·
        </View>
        <View className='img_list'>
          {recommendList.map((item, i) => {
            return (
              <View className='item'>
                <Image className='img' src={item.hot_pro_img} />
                <View className='pro_title'>{item.title}</View>
                <View className='price'>{item.product_price_unit ? item.product_price_unit : '面议'}</View>
              </View>
            )
          })}

        </View>
      </View>
    );
  }
}

