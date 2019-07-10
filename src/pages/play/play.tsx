import Taro , { Component } from '@tarojs/taro';
import { View, Video , Button} from '@tarojs/components';
import { api } from '@/util/api'
import gril from '@/asset/gril.png'
import phone from '@/asset/phone.gif'
import ImgList from '@/component/imgList/imgList'
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
    proRecommendList: []
  }

  componentWillMount () {}
  componentDidMount () {
    this.getVideoData()
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 

  getVideoData () {
    console.log('this.$router.params',this.$router.params)
    let proId = this.$router.params.proId
    if (!proId) {
      proId = Taro.getStorageSync('vid')
      if (!proId) {
        proId = 101033969955
      }
    }
    setTimeout(() => {
      Taro.request({
        url: api.play,
        data: { pid: proId || 101033969955 },
        success: (res) => {
          console.log(res.data.data)
          const { info, list_arr, video_list } = res.data.data
          this.setState({
            info,
            videoInfo: info.pconf,
            videoList: video_list.vlist,
            proRecommendList: list_arr
          })
        },
        fail: (err) => {
          console.log('err',err)
        }      
      })
    })

  }

  render() {
    const { videoInfo, info, proRecommendList, videoList } = this.state
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
          <View className='title'>{info.corpname}</View>
          <View className='bd'>
            <View>
              <Image src={gril} className='img' />
              <Text>让供应商联系我</Text>
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