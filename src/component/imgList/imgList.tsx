import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button, Image} from '@tarojs/components';
import './imgList.scss'

export default class ImgList extends Component {

  state = {}

  componentWillMount () {}
  componentDidMount () {
  } 

  jumpProDetail (id) {
    Taro.navigateTo({ url: `/pages/proDetail/proDetail?id=${id}` })
  }

  jumpPlay (id) {
    Taro.navigateTo({ url: `/pages/play/play?proId=${id}` })
  }

  filter (text) {
    let str
    if (!text) {
      str = '面议'
    } else if (text.match(/^\s+$/)) {
      str = '面议'
    } else {
      str = text
    }
    return str
  }

  render() { 
    const { recommendList, name, type } = this.props
    return (
      <View className='ImgList inner'>
        <View className='title'>
          ·
          <Text className='name'>{name}</Text>
          ·
        </View>
        <View className='img_list'>
          {
            {
              'pro': recommendList.map((item, i) => {
                return (
                  <View className='item' key={item.proid} onClick={this.jumpProDetail.bind(this, item.proid)}>
                    <Image className='img' src={item.hot_pro_img} />
                    <View className='pro_title'>{item.title}</View>
                    <View className='price'>{this.filter(item.product_price_unit)}</View>
                  </View>
                )
              }),
              'img': recommendList.map((item, i) => {
                return (
                  <View className='item' key={item.product_id} onClick={this.jumpProDetail.bind(this, item.product_id ? item.product_id : item.proid)}>
                    {item.img_url && <Image className='img' src={item.img_url} />}
                    {!item.img_url && <Image className='img' src={item.hot_pro_img} />}
                    <View className='pro_title'>{item.title}</View>
                    {item.unit_price && <View className='price'>{this.filter(item.unit_price)}</View>}
                    {!item.unit_price && <View className='price'>{this.filter(item.product_price_unit)}</View>}
                  </View>
                )
              }),
              'video': recommendList.map((item, i) => {
                return (
                  <View className='v_item' key={item.proid} onClick={this.jumpPlay.bind(this, item.proid)}>
                    <Image className='img' src={item.show_image_url} />
                    <View className='pro_title'>{item.title}</View>
                    <Image src='http://jic.makepolo.cn/html/make_video_m/img/video-play.png' className='play' />
                  </View>
                )
              }),
              'goods': recommendList.map((item, i) => {
                return (
                  <View className='item goods' key={item.product_id} onClick={this.jumpProDetail.bind(this, item.product_id)}>
                    <Image className='img' src={item.img_url} />
                    <View className='pro_title'>{item.title}</View>
                    <View className='price'>{this.filter(item.unit_price)}</View>
                  </View>
                )
              })
            }[type]
          }
        </View>
      </View>
    );
  }
}

