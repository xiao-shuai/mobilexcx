import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import './imgPreview.scss'
import '../proPreview/proPreview.scss'
// import NavBar from '@/component/navBar/navBar'
import { api } from '@/util/api'
import ImgList from '@/component/imgList/imgList'
import Keywords from '@/component/keywords/keywords'

export default class ImgPreview extends Component {

  config = {
       navigationBarTitleText: '产品详情'
  }

  state = {
    pid: '',
    proImgList: [],
    proList: [],
    relatedList: [],
    keywordFirst: [],
    keywordSecond: [],
    curPosition: [],
    corpInfo: {}
  }

  componentWillMount () {
    this.getProId()

  }
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 

  getProImgDetail (pid) {
    Taro.request({
      url: api.pro_img,
      data: { pid },
      success: (res) => {
        console.log(res.data.data)
        const { product_imgs, list_arr, list_arr2, relate_keyword_array, relate_keyword_array2, breadcrumb, info } = res.data.data
        this.setState({
          proImgList: product_imgs,
          proList: list_arr,
          relatedList: list_arr2,
          keywordFirst: relate_keyword_array,
          keywordSecond: relate_keyword_array2,
          curPosition: breadcrumb,
          corpInfo: info
        })
      }
    })
  }

  getProId () {
    Taro.getStorage({ key: 'pid' })
    .then(res => {
      const pid = res.data.id
      this.setState({ pid })      
      this.getProImgDetail(pid)
    })
  }

  jumpProDetail () {
    const { pid } = this.state
    Taro.navigateTo({ url: `/pages/proDetail/proDetail?id=${pid}`})
  }

  render() {
    const { proImgList, proList, relatedList, keywordFirst, keywordSecond, curPosition, corpInfo } = this.state
    return (
      <View>
        {/* <NavBar
          imgPreview='selected'
        /> */}
        <Swiper 
          className='inner'
          circular
          autoplay
          indicatorDots
        >
          {proImgList.map((item, i) => {
            return (
              <SwiperItem key={i} ><Image src={item} className='imgItem' /></SwiperItem>
            )
          })}
        </Swiper>
        <View className='pro_top inner'>
          <View className='pro_title'>{corpInfo.title}</View>
        </View>
        <View className='contect'>
          <Button className='btn_item' onClick={this.jumpProDetail.bind(this)}>返回产品</Button>
          <Button className='btn_item'>联系供应商</Button>
        </View>
        <ImgList 
          recommendList={proList}
          name='产品推荐'
          type='img'
        />
        <Keywords
          keywords={keywordFirst}
        />
        <ImgList 
          recommendList={relatedList}
          name='相关推荐'
          type='img'
        />
        <Keywords
          keywords={keywordSecond}
        />
      </View>
    );
  }
}