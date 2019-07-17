import Taro, { Component } from '@tarojs/taro';
import { View, Text, Swiper, SwiperItem, Image, Button, Block, RichText } from '@tarojs/components';
import { api } from '@/util/api'
import ask from '@/util/ask'
import util from '@/util/util'
import { set, get } from '@/util/global_data'
import Phone from '@/asset/phone.gif'
import Cart from '@/asset/cart.gif'
import Store from '@/asset/store.gif'
import ImgList from '@/component/imgList/imgList'
import Keywords from '@/component/keywords/keywords'
import Enquiry from '@/component/enquiry/enquiry'
import './proPreview.scss'
// import TaroBdparse from '@/component/taroBdparse/taroBdparse'
import md5 from 'md5'
// import '../../../../wxParse/wxParse'


export default class ProPreview extends Component {

  state = {
    imgList: [],
    title: '',
    price: null,
    minOrder: '',
    proAttr: [],
    corpName: '',
    phone: null,
    recommendList: [],
    keywords: [],
    product_desc: '',
    isShow: false,
    corpId: '',
    show: false
  }

  componentWillMount() {
  }
  componentDidMount() {
    this.getProId()
  }

  getProId() {
    Taro.getStorage({
      key: 'pid'
    }).then((res) => {
      this.getProDetail(res.data.id)
      if (res.data.test) {
        this.handleShowEnquiry()
      }
    })
  }

  getProDetail(id) {
    const sign = util.md5ParsePro(id)
    ask(api.pro_detail, { productid: id || 101030597384, sign }).then((res) => {
      let imgList = res.data.images_list
      let title = res.data.title
      let price = res.data.unit_price_show
      let minOrder = res.data.min_order
      let proAttr = res.data.product_std_attr
      let corpName = res.data.corpname
      let phone = res.data.mobile
      let recommendList = res.data.tuijian_arr
      let keywords = res.data.relate_keyword_array
      let product_desc = res.data.product_desc
      let corpId = res.data.corpid
      this.setState({
        imgList,
        title,
        price,
        minOrder,
        proAttr,
        corpName,
        phone,
        recommendList,
        keywords,
        product_desc,
        corpId
      })
    })
  }

  handlePhoneCall(phone) {
    Taro.makePhoneCall({ phoneNumber: phone }).then()
  }

  handleShowEnquiry() {
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 100
    })
    let isShow = !this.state.isShow
    this.setState({ isShow: isShow })
  }

  handleJumpYellow(id) {
    Taro.navigateTo({
      url: `/pages/yellow/yellow?id=${id}`
    })
  }
  show = () => {
    this.setState({ show: !this.state.show })
  }
  render() {
    const { imgList, title, price, minOrder, proAttr, corpName, phone, recommendList, keywords, product_desc, isShow, corpId } = this.state
    let nodes = product_desc
    return (
      <View>
        { isShow ? <Enquiry isShow={this.handleShowEnquiry.bind(this)} /> : null }
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
          <Button
            className='btn_item'
            onClick={this.handleShowEnquiry.bind(this)}
          >请供应商联系我</Button>
          <Button
            className='btn_item'
            onClick={this.handlePhoneCall.bind(this, phone)}
          >查看联系方式</Button>
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

        {
          this.state.show
          ?
          <View>
            <View className='pro_item'>产品介绍</View>
            <RichText nodes={nodes} className='rich' />
          </View>
          :
          <Button className='view_info'
            onClick={() => {
              this.show()
            }}
          >点击查看详细>>
          </Button>
        }

        <View className='corp_info'>
          <View
            className='corp_hd'
            onClick={this.handleJumpYellow.bind(this, corpId)}
          >{corpName}</View>
          <View className='corp_bd'>
            <View className='item' onClick={this.handleJumpYellow.bind(this, corpId)}>
              <Image className='icon_corp' src={Store} />
              <View className='item_text'>进入店铺</View>
            </View>
            <View className='item' onClick={this.handlePhoneCall.bind(this, phone)}>
              <Image className='icon_corp' src={Phone} />
              <View className='item_text'>{phone}</View>
            </View>
            <View className='item' onClick={this.handleShowEnquiry.bind(this)}>
              <Image className='icon_corp' src={Cart} />
              <View className='item_text'>询价</View>
            </View>
          </View>
        </View>

        <ImgList
          recommendList={recommendList}
          name='产品推荐'
          type='pro'
        />

        <Keywords
          keywords={keywords}
        />

      </View>
    );
  }
}
