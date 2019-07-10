import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text,Icon,Image ,Video,Swiper, SwiperItem,WebView, Button} from '@tarojs/components'
import './search.scss'
import { AtSearchBar,AtTabs, AtTabsPane,AtButton,AtDrawer,AtFloatLayout} from 'taro-ui'
import pp from '../asset/pp.png'
import play from '../asset/play.png'
import { api } from '../../util/api';

export default class Search extends Component{
    constructor (props) {
        super(props)
        this.state = {
          value: '',
          page:1,
          page2:1,
          page3:1,
          k_data:[],
          kw_show:false,
          current: 0,
          product_cpc_list:[],//带图标
          list_arr:[],//产品下面
          wangkelai_data:[],//产品下面
          pro_city_list:[],
          show:false,
          video_search:[],
          company_list:[]
         
        }
      }
    config: Config = {
        navigationBarTitleText: '搜索'
      } 

      onChange (value) {
          
        this.setState({
          value: value,
          kw_show:true
        },()=>{
          console.log('value',value)
          this.get_kw()
        }
          )
      }
      onActionClick () {
        // console.log('开始搜索')
        this.ss_btn()
      }

 ss_btn=()=>{
  this.setState({kw_show:false})
  Taro.request({
    url: api.product_list,
    // method:'',
    header: {
      'content-type': 'application/json'
    },
    data:{
      catid:'', 
      keywords:this.state.value,
      page :this.state.page,
      area:'',
      attr:''
    }
  }).then(res=>{
    console.log('product_list:',res)
     this.setState({
      product_cpc_list:res.data.data.product_cpc_list,
      list_arr:res.data.data.list_arr,
      wangkelai_data:res.data.data.wangkelai_data,
      pages:res.data.data.pages,
      pro_city_list:res.data.data.pro_city_list
     })
    
  })
  .catch(err=>{
    console.log('product_list err:',err)
  })
  this.get_company_list()
  this.get_video()
 } 
 get_kw=()=>{
  Taro.request({
    url: api.sw+`?wd=${this.state.value}`,
    
  }).then(res=>{
     console.log('res:',res)
      
     if(res.data!==''){
       let list=res.data
       let a=[]
        for(let i in list){
            a.push(list[i])
        }
        this.setState({k_data:a})
     }
  })
  .catch(err=>{
    console.log('err:',err)
  })
 }
 click_kw=(e)=>{
   console.log('ee:',e)
   this.setState({value:e.uk,kw_show:false})
 }

 get_video=()=>{
    Taro.request({
      url:api.video_search,
      data:{
        cid:'',
        keyword:this.state.value,
        page:this.state.page2,
      }
    }).then(res=>{
    console.log('video res:',res)
    let vv=res.data.data.list_arr
  //  let a= Object.getOwnPropertyNames(vv)
   let a=Object.values(vv)
   console.log('video!!!:',a)

     this.setState({video:a,v_pages:res.data.data.pages})
    }
    ).catch(err=>{
    console.log('video err:',err)
    })
 }
 get_company_list=()=>{
   Taro.request({
     url:api.company_list,
     data:{
      search_word:this.state.value,
      page:this.state.page3
    }
   }).then(res=>{
      console.log('get_company_list:',res)
      let aa=res.data.data.corp_list
      let bb=[]
      for(let i in aa){
        bb.push(aa[i])
      }
      this.setState({company_list:bb,com_allpages:res.data.data.pages})

   }).catch(err=>{
      console.log('err:',err)
   })
 }  

 handleClick (value) {
  this.setState({
    current: value
  })
}
componentWillMount(){
  console.log('参数:',this.$router.params)
}
componentDidMount(){
   this.setState({value:this.$router.params.key},()=>{
     this.ss_btn()
   })
   this.get_video()
   this.get_company_list()
}

      render(){
         let kw=this.state.k_data
         const tabList = [{ title: '产品' }, { title: '视频' }, { title: '企业' }]
         let product_cpc_list =this.state.product_cpc_list        
         let list_arr =this.state.list_arr
         let wangkelai_data=this.state.wangkelai_data
         let pro_city_list=this.state.pro_city_list
         console.log('kw',kw,product_cpc_list,list_arr,wangkelai_data)
          return(
              <View className='container'>
                  <AtSearchBar 
                //   showActionButton  
         value={this.state.value} 
         onChange={this.onChange.bind(this)}
         onActionClick={this.onActionClick.bind(this)}/>
         {
           kw==''||this.state.value==''||this.state.kw_show==false?null
           :
           <View className='list_wd'>
           {
             kw.map((i,k)=>{
               return(
               <View className='kw_i' key={k} onClick={()=>{
                  this.click_kw(i)
               }}>
                {i.uk}
               </View>
               )
             })
           }
         </View>
         }
         {/*list  data */}
         <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <View  className='top-big'>
           {/* top */}
            <View className='cp_top'>
            <AtButton size='small' >综合</AtButton>

            <AtButton size='small' onClick={()=>{
              this.setState({show:true})
            }} >全国</AtButton>
            </View>
            {/* product_cpc_list */} 
            <View className='cp_list'>
              {
                product_cpc_list.length!==0&&product_cpc_list.map((i,m)=>{
              return( 
                <View className='cp_list_i' key={m}>
                  {
                    m==0?
                   <View className='video'>
                   <Video src={i.video_address} poster={i.img_url} className='cp_video'/>
                   <View className='top_under'>
                     <View className='hui-text'>{i.crop_name}</View>
                   </View>
                  </View>
                    :
                    null
                  }
                  <View className='list_i'>

                   <View className='list_i_left'>
                     <Image src={pp} className='pp'/>
                     <Image src={i.img_url} mode='center' className='list_i_img' />
                    </View> 

                    <View className='list_i_right'>
                     <View className='list_title' style={{width:'80%'}}>{i.title}</View>
                     <View className='hui-text' style='margin-top: 10px;'>{i.crop_name}</View>
                     <View className='list_i_under'>
                       <Text className='list_title'>面议</Text>
                       <AtButton className='xj_btn' size='small' onClick={()=>{
                         Taro.navigateTo({
                           url:`/pages/proDetail/proDetail?id=${i.product_id}&en=true`
                         })
                       }}>点此询价</AtButton>
                     </View>
                    </View>
              
                  </View>
                  

                </View>
              )
                })
              }
            </View>
            {/* list_arr */}
            <View className='cp_list'>
           {
             list_arr.length!==0&&list_arr.map((i,k)=>{
               return(
                <View className='list_i' key={k}>

                <View className='list_i_left'>
                  
                  <Image src={i.img_url} mode='center' className='list_i_img' />
                 </View> 

                 <View className='list_i_right'>
                  <View className='list_title'>{i.title}</View>
                  <View className='hui-text' style='margin-top: 10px;'>{i.crop_name}</View>
                  <View className='list_i_under'>
                    <Text className='list_title'>面议</Text>
                    <AtButton className='xj_btn' size='small' onClick={()=>{
                                               Taro.navigateTo({
                                                url:`/pages/proDetail/proDetail?id=${i.product_id}`
                                              })
                    }}>点此询价</AtButton>
                  </View>
                 </View>
           
               </View>
               )
             })
           }
            </View>
            {/* wangkelai_data */}
            <View className='cp_list'>
           {
             wangkelai_data!==null&&list_arr.map((i,k)=>{
               return(
                <View className='list_i' key={k}>

                <View className='list_i_left'>
                  
                  <Image src={i.img_url} mode='center' className='list_i_img' />
                 </View> 

                 <View className='list_i_right'>
                  <View className='list_title'>{i.title}</View>
                  <View className='hui-text' style='margin-top: 10px;'>{i.crop_name}</View>
                  <View className='list_i_under'>
                    <Text className='list_title'>面议</Text>
                    <AtButton className='xj_btn' size='small' onClick={()=>{
                                Taro.navigateTo({
                                 url:`/pages/proDetail/proDetail?id=${i.product_id}`
                              })
                    }} >点此询价</AtButton>
                  </View>
                 </View>
           
               </View>
               )
             })
           }
            </View>
       {
        product_cpc_list.length==0&&list_arr.length==0&&wangkelai_data.length==0?
        <View style={{textAlign:'center',color:'#CCCCCC'}}>
          暂无信息
        </View>
        :
        <View className='fenye'>
        <AtButton disabled={this.state.page==1?true:false} 
        // size={'small'}
        onClick={()=>{
           this.setState({page:this.state.page-1},()=>{
             this.ss_btn()
           })
         }}>
           上一页
         </AtButton>
        <View className='yema'>{this.state.page}/{this.state.pages}</View>
        <AtButton  disabled={this.state.page==this.state.pages?true:false} 
          //  size={'small'}
        onClick={()=>{
           this.setState({page:this.state.page+1},()=>{
             this.ss_btn()
           })
         }}>
           下一页
         </AtButton>
        </View>

       }
        

        <AtFloatLayout isOpened={this.state.show} 
        title="这是个标题" scrollY={true}>
  这是内容区 随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写这是内容区
  随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写
        </AtFloatLayout>
       

            </View> 
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <View  className='video-big'>
           {
             this.state.video!==undefined&&this.state.video.map((i,k)=>{
              return (
                <View className='video-i' key={k}>
                   <Image src={i.show_image_url} className='video-img'/>
                   <Image src={play} className='play'/>
                   <View className='list_title'>{i.title}</View>
                </View>
              )
             })
           }
            
            </View>
           
           {
             this.state.video.length==0?
             <View style={{textAlign:'center',color:'#CCCCCC'}}>
             暂无信息
           </View>
           :
           <View className='fenye'>
        <AtButton disabled={this.state.page2==1?true:false} 
        // size={'small'}
        onClick={()=>{
           this.setState({page2:this.state.page2-1},()=>{
            //  this.ss_btn()
            this.get_video()
           })
         }}>
           上一页
         </AtButton>
        <View className='yema'>{this.state.page2}/{this.state.v_pages}</View>
        <AtButton  disabled={this.state.page2==this.state.v_pages?true:false} 
          //  size={'small'}
        onClick={()=>{
           this.setState({page2:this.state.page2+1},()=>{
            //  this.ss_btn()
            this.get_video()
           })
         }}>
           下一页
         </AtButton>
        </View>

           }
            
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <View className='qiye-big'>
            {
              this.state.company_list.length!==0&&this.state.company_list.map((i,k)=>{
                return (
                  <View className='qiye-i'>
                   <View>{i.title}</View>
                   <View className='hui-text addr'>{i.addr}</View>
                   <View className='qiye_under'>
                     <View className='hui-text addr'>主营: {i.crop_product}</View>
                     <View className='at-icon at-icon-phone' onClick={()=>{
                       Taro.makePhoneCall({phoneNumber:i.contact_mobile})
                     }} style={{color:'#436EEE'}}></View>
                   </View>
                  </View>
                )
              })
            }
            </View>
            {
              this.state.company_list.length==0?
              <View style={{textAlign:'center',color:'#CCCCCC',marginTop:'20px'}}>
              暂无信息
            </View>
            :
        <View className='fenye'>
        <AtButton disabled={this.state.page3==1?true:false} 
        // size={'small'}
        onClick={()=>{
           this.setState({page3:this.state.page3-1},()=>{
             this.get_company_list()
           })
         }}>
           上一页
         </AtButton>
        <View className='yema'>{this.state.page3}/{this.state.com_allpages}</View>
        <AtButton  disabled={this.state.page3==this.state.com_allpages?true:false} 
          //  size={'small'}
        onClick={()=>{
           this.setState({page3:this.state.page3+1},()=>{
             this.get_company_list()
           })
         }}>
           下一页
         </AtButton>
        </View>
            }
            
        </AtTabsPane>
      </AtTabs>

              </View>
          )
      }


}