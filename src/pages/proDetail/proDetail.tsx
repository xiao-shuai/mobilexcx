import Taro , { Component } from '@tarojs/taro';
import { View, Text , Swiper, SwiperItem, Image, Button, Block } from '@tarojs/components';
import { api } from '@/util/api'
import './proDetail.scss'
import Phone from '@/asset/phone.gif'
import Cart from '@/asset/cart.gif'
import Store from '@/asset/store.gif'
import ImgList from '@/component/imgList/imgList'
import Keywords from '@/component/keywords/keywords'
import NavBar from '@/component/navBar/navBar'
import Enquiry from '@/component/enquiry/enquiry'
// import TaroBdparse from '@/component/taroBdparse/taroBdparse'
import md5 from 'md5'
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
    keywords: [],
    product_desc: '',
    isShow: '',
    test: ''
  }

  componentWillMount () {
    // this.getProDetail()
    console.log('proid:',this.$router.params) 
  }
  componentDidMount () {
    const that = this
    let b=`aid=61010&productid=&${this.$router.params}&smallprogram20180716rmaekd8d4ds9`
   let sign=  md5(b)
   
    let url=`${api.pro_detail}?productid=${this.$router.params.proid}&sign=${sign}`
    console.log('sign:',sign,'url:',url)
     Taro.request({
       url:url
     }).then(res=>{
      console.log('res11:',res)
      let imgList = res.data.data.images_list
        let title = res.data.data.title
        let price = res.data.data.unit_price_show
        let minOrder = res.data.data.min_order
        let proAttr = res.data.data.product_std_attr      
        let corpName = res.data.data.corpname      
        let phone = res.data.data.mobile      
        let recommendList = res.data.data.tuijian_arr
        let keywords = res.data.data.relate_keyword_array
        let product_desc = res.data.data.product_desc
        that.setState({
          imgList,
          title,
          price,
          minOrder,
          proAttr,
          corpName,
          phone,
          recommendList,
          keywords,
          product_desc
        })
        let key = 'desc'
        let data = { desc: product_desc }
        swan.setStorage({ key, data});
     }).catch(err=>{
      console.log('errr22:',err)
     })
  } 
  componentDidShow() {
    // console.log('父组件富文本数据：',this.state)
  }
  
  getProDetail () {
    const that = this
    Taro.request({
      url: api.pro_detail,
      data: {
        corpid: this.$router.params,
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
        let product_desc = res.data.data.product_desc
        that.setState({
          imgList,
          title,
          price,
          minOrder,
          proAttr,
          corpName,
          phone,
          recommendList,
          keywords,
          product_desc
        })
        let key = 'desc'
        let data = { desc: product_desc }
        swan.setStorage({ key, data});
      }
    })
  }

  handleShowEnquiry () {
    this.setState({ isShow: 'show' })
  }

  handleGetDesc () {
    this.setState({ test: '<div>这是一个大的div</div>' },() => {
      console.log(this.state.test)
    })
    console.log('test')
  }
 
  render() {
    const { imgList, title, price, minOrder, proAttr, corpName, phone, recommendList, keywords, product_desc, isShow, test } = this.state
    return (
      <View>
        <NavBar
          pro='selected'
        />
        <Block>
          <View>
            {/* <TaroBdparse desc={test} /> */}
          </View>
        </Block>

        <Enquiry show={isShow} />


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
          <Button className='btn_item' onClick={this.handleShowEnquiry.bind(this)}>请供应商联系我</Button>
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



        <Button className='view_info' onClick={this.handleGetDesc.bind(this)}>点击查看详细>></Button>

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
