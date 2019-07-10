import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button, Image } from '@tarojs/components';
import { AtPagination, AtTabs, AtTabsPane  } from 'taro-ui'
import { api } from '@/util/api'
import home from '@/asset/home.png'
import phone from '@/asset/blue_phone.png'
import star from '@/asset/fine_star.png'
import ImgList from '@/component/imgList/imgList'
import './Yellow.scss'

export default class Yellow extends Component {

  config = {
    navigationBarTitleText: '公司'
  }

  state = {
    current: 0,
    pages: 1,
    pagesCount: 10,
    corpId: '',
    corp: {},
    corpInfo: {},
    corpProList: [],
    corpIntro: {},
    corpIntroInfo: {},
    proList: [],
    turnover: {},
    yearExport: {},
    employeeNum: {},
    oem: '',
    corpType: '',
    company: '',
    data: {},
    indexData: {}
  }

  componentWillMount () {}
  componentDidMount () {
    this.getCorpIndex()
  } 

  getCorpIndex () {
    let id = this.$router.params.id
    if (!id) {
      id = 100019820814
    }
    Taro.request({
      url: api.corpIndex,
      data: { corpid: id },
      success: (res) => {
        console.log('success', res.data)
        const corp = res.data.data.corp_info
        const corpId = res.data.data.corp_info.corpid
        const corpInfo = res.data.data.corp_info.corpinfo
        const proList = res.data.data.product_arr
        const indexData = res.data.data
        this.setState({
          corp,
          corpId,
          corpInfo,
          proList,
          indexData
        })
      }
    })
  }

  getCorpPro () {
    const { corpId, pages } = this.state
    Taro.request({
      url: api.corpPro,
      data: {
        corpid: corpId,
        page: pages
      },
      success: (res) => {
        console.log('getCorpPro',res.data)
        const corpProList = res.data.data.list_arr
        const pagesCount = res.data.data.pages
        this.setState({
          corpProList,
          pagesCount
        })
      }
    })
  }

  getCorpIntro () {
    const corpId = this.state.corpId
    Taro.request({
      url: api.corpIntro,
      data: {
        corpid: corpId
      },
      success: (res) => {
        console.log('getCorpIntro',res.data)
        const corpIntro = res.data.data.corp_info
        const corpIntroInfo = res.data.data.corp_info.corpinfo
        const employeeNum = res.data.data.employee_num
        const turnover = res.data.data.year_earn
        const yearExport = res.data.data.year_export
        const oem = res.data.data.oem
        const corpType = res.data.data.biz_mode
        const company = res.data.data.dic_corpType
        const data = res.data.data
        this.setState({
          corpIntro,
          corpIntroInfo,
          employeeNum,
          turnover,
          yearExport,
          oem,
          corpType,
          company,
          data
        })
      }
    })
  }

  handleClick (value) {
    this.setState({
      current: value
    })
    if (value === 1) {
      this.getCorpPro()
    } else if (value === 2) {
      this.getCorpIntro()
    }
  }

  handleJumpPro (id, type) {
    if (type === 'enquiry'){
      Taro.navigateTo({ url: `/pages/proDetail/proDetail?id=${id}&en=true` })
    } else {
      Taro.navigateTo({ url: `/pages/proDetail/proDetail?id=${id}` })
    }
  }

  handlePagin (name) {
    let { pages, pagesCount } = this.state
    if (name === 'prev'){
      if (pages === 1) return false
      pages --
      console.log(pages)
      console.log(pagesCount)
      this.setState({ pages },() => {
        this.getCorpPro()
      })
    } else if (name === 'next') {
      if (pages === pagesCount) return false
      pages ++
      console.log(pages)
      console.log(pagesCount)
      this.setState({ pages },() => {
        this.getCorpPro()
      })
    }
  }

  render() {
    const tabList = [{ title: '公司首页' }, { title: '公司产品' }, { title: '公司介绍' }]
    const { corp, proList, corpInfo, corpProList, corpIntro, corpIntroInfo, data, pages, pagesCount, indexData } = this.state
    console.log('corpProList',corpProList)
    return (
      <View>

        <View className='head'>
          <View className='title'>
            <View className='left'>
              <Image src={home} className='img' />
              <Text className='info'>{corp.corpname}</Text>
            </View>
            <Image className='right' src={phone} />
          </View>
          <View className='content'>
            <Text>店铺总评价:</Text>
            <Image className='img' src={star} />
          </View>
        </View>

        <AtTabs 
          current={this.state.current} 
          tabList={tabList} 
          onClick={this.handleClick.bind(this)}
        >
          {/* 首页 */}
          <AtTabsPane current={this.state.current} index={0} >
            <View style='padding: 10px 10px;background-color: #FAFBFC;text-align: center;' >
              <View className='corp_wrap'>
                <View className='title'>公司信息</View>
                <View className='item'>
                  <View className='left'>公司名称:</View>
                  <View className='right'>{corp.corpname}</View>
                </View>
                <View className='item'>
                  <View className='left'>联系人:</View>
                  <View className='right'>{corpInfo.contact_person}</View>
                </View>
                <View className='item'>
                  <View className='left'>联系电话:</View>
                  <View className='right'>{corpInfo.contact_mobile}</View>
                </View>
                <View className='item'>
                  <View className='left'>公司地址:</View>
                  <View className='right'>{corpInfo.address}</View>
                </View>
                <View className='item'>
                  <View className='left'>法人代表:</View>
                  <View className='right'>{corpInfo.owner}</View>
                </View>
                <View className='item'>
                  <View className='left'>公司类型:</View>
                  <View className='right'>{indexData.dic_corpType}</View>
                </View>
                <View className='item'>
                  <View className='left'>经营模式:</View>
                  <View className='right'>{indexData.biz_mode}</View>
                </View>
              </View>
              <ImgList 
                recommendList={proList}
                name='精品推荐'
                type='goods'
              />
              <View 
                className='viewBtn'
                onClick={this.handleClick.bind(this,1)}
              >查看全部产品>></View>
            </View>
          </AtTabsPane>
          {/* 产品页 */}
          <AtTabsPane current={this.state.current} index={1}>
            <View style='padding: 5px 5px;background-color: #FAFBFC;text-align: center;'>
            {corpProList.map((item, i) => {
                return (
                  <View className='pro_item' key={item.corpid}>
                    <View className='left'>
                      <Image src={item.img_url} className='img'/>
                    </View>
                    <View className='right'>
                      <View 
                        className='title'
                        onClick={this.handleJumpPro.bind(this, item.product_id)}
                      >
                        {item.title}
                      </View>
                      <View className='content'>
                        <View className='price'>{item.unit_price}</View>
                        <Button 
                          className='btn'
                          onClick={this.handleJumpPro.bind(this, item.product_id, 'enquiry')}
                        >
                          点此询价
                        </Button>
                      </View>
                    </View>
                  </View>
                )
              })}
              <View className='pagin'>
                <View 
                  className='prev'
                  onClick={this.handlePagin.bind(this, 'prev')}
                >上一页</View>
                <Text>{`${pages}/${pagesCount}`}</Text>
                <View 
                  className='next'
                  onClick={this.handlePagin.bind(this, 'next')}
                >下一页</View>
              </View>
            </View>
          </AtTabsPane>
          {/* 介绍页 */}
          <AtTabsPane current={this.state.current} index={2}>
            <View style='padding: 5px 5px;background-color: #FAFBFC;text-align: center;'>
              <View className='corp_wrap'>
                <View className='title'>公司信息</View>
                <View className='item'>
                  <View className='left'>公司名称:</View>
                  <View className='right'>{corpIntro.corpname}</View>
                </View>
                <View className='item'>
                  <View className='left'>联系人:</View>
                  <View className='right'>{corpIntroInfo.contact_person}</View>
                </View>
                <View className='item'>
                  <View className='left'>联系电话:</View>
                  <View className='right'>{corpIntroInfo.contact_mobile}</View>
                </View>
                <View className='item'>
                  <View className='left'>公司地址:</View>
                  <View className='right'>{corpIntroInfo.address}</View>
                </View>
                <View className='item'>
                  <View className='left'>法人代表:</View>
                  <View className='right'>{corpIntroInfo.owner}</View>
                </View>
                <View className='item'>
                  <View className='left'>邮政编码:</View>
                  <View className='right'>{corpIntroInfo.zipcode}</View>
                </View>
                <View className='item'>
                  <View className='left'>公司类型:</View>
                  <View className='right'>{data.dic_corpType}</View>
                </View>
                <View className='item'>
                  <View className='left'>经营模式:</View>
                  <View className='right'>{data.biz_mode}</View>
                </View>
                <View className='item'>
                  <View className='left'>注册资本:</View>
                  <View className='right'>{corpIntroInfo.reg_capital}</View>
                </View>
                <View className='item'>
                  <View className='left'>主营产品:</View>
                  <View className='right'>{corpIntroInfo.sales_product}</View>
                </View>
                <View className='item'>
                  <View className='left'>成立时间:</View>
                  <View className='right'>{corpIntroInfo.createdate}</View>
                </View>
                <View className='item'>
                  <View className='left'>员工人数:</View>
                  <View className='right'>{employeeNum.info_name}</View>
                </View>
                <View className='item'>
                  <View className='left'>年营业额:</View>
                  <View className='right'>{data.year_earn.info_name}</View>
                </View>
                <View className='item'>
                  <View className='left'>厂房面积:</View>
                  <View className='right'>{`${corpIntroInfo.area}平方米`}</View>
                </View>
                <View className='item'>
                  <View className='left'>主要销售区域:</View>
                  <View className='right'>{corpIntro.biz_market}</View>
                </View>
                <View className='item'>
                  <View className='left'>年出口额:</View>
                  <View className='right'>{data.year_export.info_name}</View>
                </View>
                <View className='item'>
                  <View className='left'>公司传真:</View>
                  <View className='right'>{corpIntroInfo.fax}</View>
                </View>
                <View className='item'>
                  <View className='left'>公司网址:</View>
                  <View className='right'>{corpIntroInfo.web_site}</View>
                </View>
                <View className='item'>
                  <View className='left'>提供OEM代工:</View>
                  <View className='right'>{data.oem}</View>
                </View>
              </View>
              <View className='corp_wrap'>
                <View className='title'>资质证书</View>
                {corpIntro.certInfoAry.map((item, i) => {
                  return (
                    <Image src={item.img} className='img' />
                  )
                })}
              </View>
              <View className='corp_wrap'>
                <View className='title'>公司详情</View>
              </View>

            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}