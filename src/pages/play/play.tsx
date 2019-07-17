import Taro , { Component } from '@tarojs/taro';
import { View, Video , RichText, Button } from '@tarojs/components';
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
    isShowRich: false,
    corpId: null
  }

  componentWillMount () {}
  componentDidMount () {
    this.getVideoData()
  } 

  getVideoData () {
    console.log('this.$router.params',this.$router.params)
    let pid
    let { proId, id }= this.$router.params
    if (proId) {
      pid = proId
    } else if (id) {
      pid = id
    } else {
      console.log('使用默认id')
      pid = 101033969955
    }
    setTimeout(() => {
      ask(api.play, { pid }).then((res) => {
        const { info, list_arr, video_list, corp_info } = res.data
        this.setState({
          info,
          videoInfo: info.pconf,
          videoList: video_list.vlist,
          proRecommendList: list_arr,
          corpId: corp_info.corpid
        })
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

  handlePhoneCall (phone) {
    Taro.makePhoneCall({ phoneNumber: phone }).then()
  }

  handleShowDesc () {
    const { isShowRich } = this.state
    this.setState({ isShowRich: !isShowRich })
  }

  render() {
    const { videoInfo, info, proRecommendList, videoList, corpId, isShow, isShowRich } = this.state
    console.log('videoInfo:',videoInfo.vido_url)
    return (
      <View className='content'>
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
            <View
              onClick={this.handleShowEnquiry.bind(this)}
            >
              <Image src={gril} className='img' />
              <Text>让供应商联系我</Text>
            </View>
            <View
              onClick={this.handlePhoneCall.bind(this, info.fix_phone)}
            >
              <Image src={phone} className='img' />
              <Text>{info.fix_phone}</Text>
            </View>
          </View>
        </View> 

        <View className='introduce_wrap inner'>
          <View className='pro_introduce'>产品介绍</View>
          {
            isShowRich 
            ? 
            <View className='rich'>
              <RichText nodes={info.detail} />
            </View>
            :
            <Button 
              className='btn_desc'
              onClick={this.handleShowDesc.bind(this)}
            >展开详情</Button>
          }
          
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