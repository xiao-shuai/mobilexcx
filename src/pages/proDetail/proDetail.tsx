import Taro , { Component } from '@tarojs/taro';
import { View, Text , Swiper, SwiperItem, Image, Button, Icon} from '@tarojs/components';
import './proDetail.scss'
import Phone from '@/asset/phone.gif'
import Cart from '@/asset/cart.gif'
import Store from '@/asset/store.gif'
import ImgList from '@/component/imgList/imgList'
import Keywords from '@/component/keywords/keywords'
import NavBar from '@/component/navBar/navBar'
import { api } from '@/util/api'

export default class ProDetail extends Component {

  config = {
    navigationBarTitleText: '产品详情'
  }

  state = {
    imgList: [],
    title: '',
    price: null,
    minOrder: '',
    proAttr: [],
    corpName: '',
    phone: null,
    recommendList: [],
    keywords: []
  }

  componentWillMount () {
    this.getProDetail()
  }
  componentDidMount () {} 

  getProDetail () {
    const that = this
    Taro.request({
      url: api.pro_detail,
      data: {
        corpid: 100019237571,
        productid: 101030597384,
        aid: 61010,
        sign: ''
      },
      success: function (res) {
        console.log(res.data)
        let imgList = res.data.data.images_list
        let title = res.data.data.title
        let price = res.data.data.unit_price_show
        let minOrder = res.data.data.min_order
        let proAttr = res.data.data.product_std_attr      
        let corpName = res.data.data.corpname      
        let phone = res.data.data.mobile      
        let recommendList = res.data.data.tuijian_arr
        let keywords = res.data.data.relate_keyword_array
        that.setState({
          imgList,
          title,
          price,
          minOrder,
          proAttr,
          corpName,
          phone,
          recommendList,
          keywords
        })
      }
    })
  }
 
  render() {
    const { imgList, title, price, minOrder, proAttr, corpName, phone, recommendList, keywords } = this.state
    return (
      <View>
        <NavBar
          pro='selected'
        />
        <Swiper 
          className='inner'
          circular
          autoplay
          indicatorDots
        >
          {imgList.map((item, i) => {
            return (
              <SwiperItem key={item.index} ><Image src={item.bigs_medium} className='imgItem' /></SwiperItem>
            )
          })}
        </Swiper>
        <View className='pro_top inner'>
          <View className='pro_title'>{title}</View>
          <View className='price'>报价：<Text className='num'>{price}</Text></View>
          <View className='small_purchase'>最小采购量：{minOrder}</View>
        </View>
        <View className='contect'>
          <Button className='btn_item'>请供应商联系我</Button>
          <Button className='btn_item'>查看联系方式</Button>
        </View>
        <View className='inner pro_attr'>
        {proAttr.map((item, i) => {
            return (
              <View className='inner attr_item'>
                <View className='item_left'>{item.name}</View>
                <View className='item_right'>{item.show}</View>
              </View>
            )
          })}
        </View>

        <Button className='view_info'>点击查看详细>></Button>

        <View className='corp_info'>
          <View className='corp_hd'>{corpName}</View>
          <View className='corp_bd'>
            <View className='item'>
              <Image className='icon_corp' src={Store} />
              <View className='item_text'>进入店铺</View>
            </View>
            <View className='item'>
              <Image className='icon_corp' src={Phone} />
              <View className='item_text'>{phone}</View>
            </View>
            <View className='item'>
              <Image className='icon_corp' src={Cart} />
              <View className='item_text'>询价</View>
            </View>
          </View>
        </View>

        <ImgList 
          recommendList={recommendList}
          name='产品推荐'
        />

        <Keywords
          keywords={keywords}
        />

      </View>
    );
  }
}
