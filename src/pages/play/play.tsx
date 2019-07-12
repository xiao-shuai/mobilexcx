import Taro , { Component } from '@tarojs/taro';
import { View, Video , Button} from '@tarojs/components';
import { api } from '@/util/api'
import ask from '@/util/ask'
import gril from '@/asset/gril.png'
import phone from '@/asset/phone.gif'
import ImgList from '@/component/imgList/imgList'
import Enquiry from '@/component/enquiry/enquiry'
// import TaroBdparse from '@/component/taroBdparse/taroBdparse'
import './play.scss'
import { fail } from 'assert';

export default class Play extends Component {

  config = {
    navigationBarTitleText: '马可视频',
  }

  state = {
    proId: 101033969955,
    info: {},
    videoInfo: {},
    videoList: [],
    proRecommendList: [],
    isShow: false,
    corpId: null
  }

  componentWillMount () {}
  componentDidMount () {
    this.getVideoData()
    console.log('666:',)
  } 

  getVideoData () {
    console.log('this.$router.params',this.$router.params)
    let proId = this.$router.params.id
    if (!proId) {
      proId = Taro.getStorageSync('vid')
      if (!proId) {
        proId = 101033969955
      }
    }
    setTimeout(() => {
      ask(api.play, { pid: proId || 101033969955 }).then((res) => {
        const { info, list_arr, video_list, corp_info } = res.data
        this.setState({
          info,
          videoInfo: info.pconf,
          videoList: video_list.vlist,
          proRecommendList: list_arr,
          corpId: corp_info.corpid
        })
        Taro.clearStorage()
        Taro.setStorage({key: 'pid', data: { id: info.proid }})
      })
    })
  }

  handleJumpYellow (id) {
    Taro.navigateTo({ url: `/pages/yellow/yellow?id=${id}` })
  }

  handleShowEnquiry () {
    let isShow = !this.state.isShow
    this.setState({ isShow: isShow })
  }

  render() {
    const { videoInfo, info, proRecommendList, videoList, corpId, isShow } = this.state
    return (
      <View>
        <Video
          src={videoInfo.vido_url}
          controls={true}
          autoplay={false}
          initialTime='0'
          id='video'
          loop={false}
          muted={false}
        />
        <View className='inner head'>
          <View className='title'>{info.title}</View>
        </View>

        <View className='corp_wrap'>
          <View 
            className='title'
            onClick={this.handleJumpYellow.bind(this, corpId)}
          >{info.corpname}</View>
          <View className='bd'>
            <View>
              <Image src={gril} className='img' />
              <Text onClick={this.handleShowEnquiry.bind(this)}>让供应商联系我</Text>
            </View>
            <View>
              <Image src={phone} className='img' />
              <Text>{info.fix_phone}</Text>
            </View>
          </View>
        </View> 

        <View className='introduce_wrap inner'>
          <View className='pro_introduce'>产品介绍</View>
          {/* <View className='content'>{info.detail}</View> */}
        </View>

        {isShow && <Enquiry isShow={this.handleShowEnquiry.bind(this)} />}

        <ImgList 
          recommendList={videoList}
          name='视频推荐'
          type='video'
        />

        <ImgList 
          recommendList={proRecommendList}
          name='产品推荐'
          type='pro'
        />
        
      </View>
    );
  }
}