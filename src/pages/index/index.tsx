import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Icon, Image, Video, Swiper, SwiperItem, WebView } from '@tarojs/components'
import './index.scss'
import { AtTag, AtGrid } from 'taro-ui'
import makepolo from '../asset/makepolo.png'
import fenlei from '../asset/fenlei.png'
import person from '../asset/person.png'
import sj from '../asset/sj.png'
import sp from '../asset/sp.png'
import company from '../asset/company.png'
import { api } from '../../util/api'
import DescRichText from '../../component/taroWxParse-master/DescRichText'

export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hot_arr: [],
      video_list: [],
      hot_hy: [],
      category_tag: [],
      hysc: [],
      focus_img: [],
      jingpin: []
    }
  }
  /** 
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() { }

  componentDidMount() {

    //  Taro.request({
    //   url:api.pro_detail,
    //   data: {
    //     corpid: 100019237571,
    //     productid: 101030597384,
    //     aid: 61010,
    //     sign: ''
    //     }
    //  }).then(res=>{
    //  console.log('sss:',res)
    //   this.setState({jiexi:res.data.data.product_desc})

    //  }

    //  ).catch(err=>{
    //   console.log('err:',err)
    //  })

    Taro.request({
      url: api.index,
      header: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        console.warn('resdata:', res)
        //  let a =res.data.msg4

        if (res.data.msg == '成功') {
          let last_pro = res.data.data.last_pro

          let video_list = res.data.data.video_list

          let hothy = res.data.data.hot_industry
          let tag = res.data.data.category
          let focus_img = res.data.data.focus_img

          let hysc = res.data.data.hysc
          let jingpin = res.data.data.jingpin
          for (let i in jingpin) {
            this.state.jingpin.push(jingpin[i])
          }

          for (let i in focus_img) {
            this.state.focus_img.push(focus_img[i])
          }

          for (let i in last_pro) {
            this.state.hot_arr.push(last_pro[i])
          }
          for (let i in video_list) {
            this.state.video_list.push(video_list[i])
          }
          for (let i in hothy) {
            this.state.hot_hy.push(hothy[i])
          }
          for (let i in tag) {
            this.state.category_tag.push(tag[i])
          }
          for (let i in hysc) {
            this.state.hysc.push(hysc[i])
          }

        }
        this.setState({
          hot_arr: this.state.hot_arr,
          video_list: this.state.video_list,
          hot_hy: this.state.hot_hy,
          category_tag: this.state.category_tag,
          hysc: this.state.hysc,
          focus_img: this.state.focus_img,
          jingpin: this.state.jingpin
        })
      })
      .catch(err => console.log('err:', err))
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {

    console.log('remen:', this.state.hot_arr)
    let tab = [
      {
        icon: fenlei,
        name: '分类',
        path: '/pages/cate/cate'
      },
      {
        icon: sp,
        name: '视频'
      },
      {
        icon: sj,
        name: '商机'
      },
      {
        icon: person,
        name: '我的'
      },
    ]


    return (
      <View className='container'>
        <View className='top'>
          <Image src={makepolo}
            className={'top_log'}
          />

          <View className='search' onClick={() => {
            Taro.navigateTo({
              url: '/pages/search/search'
            })
          }}>
            <Icon type={'search'} size='20' className='search-icon' />
            <Text className='serch-text,hui-text'>搜索</Text>
          </View>

        </View>

        {/* <View > */}
        <Swiper className='swper' >
          {
            this.state.focus_img.length !== 0 && this.state.focus_img.map((i, k) => {
              return <SwiperItem key={k}>
                <Image src={i.img_src} className='banner-img' onClick={() => {
                  <WebView src={i.link} />

                }} />
              </SwiperItem>
            })
          }

        </Swiper>
        {/* </View> */}
        {/* tab */}
        <View className='tab'>
          {
            tab.map((i, m) => {
              return (<View className='tab-i' key={m} onClick={() => {
                Taro.navigateTo({
                  url: i.path
                })
              }}>

                <Image src={i.icon} className={m == 3 ? 'tab-img2' : 'tab-img'} />
                <Text className='tab-name'>{i.name}</Text>

              </View>)
            })
          }
        </View>
        {/* 热门产品 */}
        <View className='hot-view'>

          <Text className='hot-title'> 热门产品 </Text>

          <View className='hot-con-v'>
            {
              this.state.hot_arr.length !== 0 && this.state.hot_arr.map((i, k) => {
                return (
                  <View className='con-v' key={k} onClick={() => {
                    console.log(4456)
                    Taro.navigateTo({
                      url: `/pages/proDetail/proDetail?proid=${i.proid}`
                    })
                  }}>
                    <Image src={i.img} className='hot-img' />
                    <View className='hot_ms'>{i.title}</View>
                    <View className='price_show'>{i.price_show}</View>
                  </View>
                )
              })
            }
          </View>

        </View>
        {/* 马克视频 */}

        <View className='hot-view'>

          <Text className='hot-title'> 马克视频 </Text>

          <View className='hot-con-v'>
            {
              this.state.video_list.length !== 0 && this.state.video_list.map((i, k) => {
                return (
                  <View className='video-i' key={k}>
                    <Video src={i.video_address}
                      poster={i.show_image_url}
                      className='video'
                    />
                    <View className={'hot_ms sp_text'}>{i.title}</View>
                    <View className={'hot-con-v'}>
                      <Image src={company} className='icon_sp' />
                      <View className='hot_ms sp_text'>{i.corpname}</View>
                    </View>

                  </View>
                )
              })
            }
          </View>

        </View>
        {/* 热门行业 */}

        <View className='hot-view'>

          <Text className='hot-title'> 热门行业 </Text>

          <View className='hothy-con-v'>
            {
              this.state.hot_hy.length !== 0 && this.state.hot_hy.map((i, k) => {
                return (
                  <View key={k}>
                    <View className='conhy-v' >
                      {
                        k == 0 ?
                          <Image src={i.img} className='hothy-img-one' />
                          :
                          <Image src={i.img} className='hothy-img' />
                      }
                    </View>

                  </View>
                )
              })
            }
          </View>

        </View>
        <View className='hy-tag'>
          {
            this.state.category_tag.length !== 0 && this.state.category_tag.slice(0, 8).map((i, k) => {
              return <AtTag className='hy-tag-i' key={k}>{i.name}</AtTag>

            })
          }

        </View>

        {/* 行业市场 */}

        <View className='hot-view-sc'>

          <Text className='hot-title'> 行业市场 </Text>

          <View className='hot-con-v-sc'>
            {/* {
          this.state.hysc!==0&&this.state.hysc.map((i,k)=>{
          return (
            <View className='con-v' key={k}>
             <Image src={i.img} className='hot-img'/>
             <View className='hot_ms'>{i.title}</View>
             <View className='price_show'>{i.price_show}</View>
            </View>
          )
          })
        } */}

            {

              this.state.hysc.length !== 0 && <AtGrid

                data={
                  [
                    {
                      image: this.state.hysc[0].img_src,
                      value: this.state.hysc[0].title
                    },
                    {
                      image: this.state.hysc[1].img_src,
                      value: this.state.hysc[1].title
                    },
                    {
                      image: this.state.hysc[2].img_src,
                      value: this.state.hysc[2].title
                    },
                    {
                      image: this.state.hysc[3].img_src,
                      value: this.state.hysc[3].title
                    },
                    {
                      image: this.state.hysc[4].img_src,
                      value: this.state.hysc[4].title
                    },
                    {
                      image: this.state.hysc[5].img_src,
                      value: this.state.hysc[5].title
                    }
                  ]
                } />
            }


          </View>
          <View className='hy-tag'>
            {
              this.state.category_tag.length !== 0 && this.state.category_tag.slice(8, 20).map((i, k) => {
                return <AtTag className='hy-tag-i' key={k}>{i.name}</AtTag>

              })
            }

          </View>

        </View>

        {/* 精品推荐 */}

        <View className='hot-view' style='margin-bottom: 20px;'>

          <Text className='hot-title'> 精品推荐 </Text>

          <View className='hot-con-v' style='flex-wrap: wrap;'>
            {
              this.state.jingpin.length !== 0 && this.state.jingpin.map((i, k) => {
                return (
                  <View className='con-v-jp' key={k} style='margin-bottom: 20px;'>
                    <Image src={i.img} className='hot-img-jp' />
                    <View className='hot_ms'>{i.title}</View>
                    <View className='price_show'>{i.price_show}</View>
                  </View>
                )
              })
            }
          </View>

        </View>

      </View>
    )
  }
}
