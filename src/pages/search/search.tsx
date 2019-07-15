import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text,Icon,Image ,Video,Swiper, SwiperItem,WebView, Button} from '@tarojs/components'
import './search.scss'
import { AtSearchBar,AtTabs, AtTabsPane,AtButton,AtDrawer,AtFloatLayout,AtAccordion,
AtList,AtListItem} from 'taro-ui'
import pp from '../asset/pp.png'
import play from '../asset/play.png'
import { api } from '../../util/api';

export default class Search extends Component{
    constructor (props) {
        super(props)
        this.state = {
          value: undefined,
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
          company_list:[],
          open: false,
          city_id:'',
          tit:'搜索'
         
        }
      }
    config: Config = {
        navigationBarTitleText:'搜索'
      } 

      onChange (value) {
      
        this.setState({
          value: value,
          kw_show:value==undefined||value==''?false:true
        },()=>{
          console.log('value',value)
          this.get_kw()
        }
          )
      }
      onActionClick () {
        // console.log('开始搜索')
        this.setState({kw_show:false})
        if(this.state.current==0){
          this.ss_btn()
        }else if(this.state.current==1){
          this.get_video()
        }else {
          this.get_company_list()
        }
       
      }

 ss_btn=()=>{
 
  console.log('this.state.city_id:',this.state.city_id)
  Taro.request({
    url: api.product_list,
    // method:'',
    header: {
      'content-type': 'application/json'
    },
    data:{
      catid:this.$router.params.catid,  
      keywords:this.state.value,
      page :this.state.page,
      area:this.state.city_id, 
      attr:''
    } 
  }).then(res=>{
    console.log('product_list:',res)
     if(res.data.no===1){
      this.setState({
        product_cpc_list:res.data.data.product_cpc_list,
        list_arr:res.data.data.list_arr,
        wangkelai_data:res.data.data.wangkelai_data,
        pages:res.data.data.pages,
        pro_city_list:res.data.data.pro_city_list,
        k_data:[],
       })
     }
     
    
  })
  .catch(err=>{
    console.log('product_list err:',err)
  })
  // this.get_company_list()
  // this.get_video()
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
        cid:this.$router.params.catid,
        keyword:this.state.value,
        page:this.state.page2,
      }
    }).then(res=>{
    console.log('video res:',res)
    let vv=res.data.data.list_arr
  //  let a= Object.getOwnPropertyNames(vv)
   let a=Object.values(vv)
   console.log('video!!!:',a)  

     this.setState({video_search:a,v_pages:res.data.data.pages})
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
   console.log('current:',value)
  this.setState({
    current: value
  },()=>{
    if(value==0){
      this.ss_btn()
    }else if(value==1){
      this.get_video()
    }else {
      this.get_company_list()
    }
  })
  
}
handleClick2 (value) {
  this.setState({
    open: value
  })
}

handleJumpProDetail (id) { 
  Taro.navigateTo({
    url: `/pages/proDetail/proDetail?id=${id}`
  })
}

componentWillMount(){
  console.log('参数:',this.$router.params)
} 
componentDidMount(){
   console.log('this.$router.params.key:',this.$router.params.key,
   'this.$router.params.sp',this.$router.params.sp)
   if(this.$router.params.sp=='ok'){
     this.setState({
      current:1
     },()=>{this.get_video()})
    // this.get_video()
   }
   this.setState({value:this.$router.params.key},()=>{
    this.state.value==undefined?null:this.ss_btn()
   })
   if(this.$router.params.key!==undefined){
    Taro.setNavigationBarTitle({ title:this.$router.params.key })
   }
   
  //  this.get_video()
  //  this.get_company_list()
}

      render(){
         let kw=this.state.k_data
         const tabList = [{ title: '产品' }, { title: '视频' }, { title: '企业' }]
         let product_cpc_list =this.state.product_cpc_list        
         let list_arr =this.state.list_arr
         let wangkelai_data=this.state.wangkelai_data
         let pro_city_list=this.state.pro_city_list
         let sp=this.$router.params.sp
         console.log('kw',this.state.k_data,
         'product_cpc_list',this.state.product_cpc_list,

         'list_arr',this.state.list_arr
         ,'wangkelai_data',this.state.wangkelai_data,
         'city:',this.state.pro_city_list,
         'kw_show',this.state.kw_show,
         'this.state.video',this.state.video_search,
         'company_list:',this.state.company_list
         )
         
          return(
              <View className='container'>
                  <AtSearchBar 
                //   showActionButton  
         value={this.state.value} 
         onChange={this.onChange.bind(this)}
         onActionClick={this.onActionClick.bind(this)}/>
         {
           kw.length==0||this.state.value==undefined||this.state.kw_show==false?null
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
         
         {
        // this.state.value==undefined&&sp==undefined?null
        // : 
         <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <View  className='top-big'>
           {/* top */}
           {pro_city_list.length!==0&&
            <View className='cp_top'>
            <AtButton size='small' >综合</AtButton>

            <AtButton size='small' onClick={()=>{
              this.setState({show:true})
            }} >{this.state.city_name==undefined?'全国':this.state.city_name}</AtButton>
            </View>
          }
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
                  {
                    i.title==undefined?null
                    :
                    <View className='list_i' onClick={()=>{
                      Taro.navigateTo({
                        url:`/pages/proDetail/proDetail?id=${i.product_id}`
                      })
                    }}>
  
                     <View className='list_i_left'>
                       <Image src={pp} className='pp'/>
                       <Image src={i.img_url} mode='center' className='list_i_img' />
                      </View> 
  
                      <View className='list_i_right'>
                       <View className='list_title' style={{width:'80%'}} onClick={this.handleJumpProDetail.bind(this,i.product_id)}>{i.title}</View>
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
                  }
                 
                  

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
                 i.title==undefined?null
                 :
                <View className='list_i' key={k} onClick={()=>{
                  Taro.navigateTo({
                    url:`/pages/proDetail/proDetail?id=${i.product_id}`
                  })
                }}>

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
                <View className='list_i' key={k} onClick={()=>{
                  Taro.navigateTo({
                    url:`/pages/proDetail/proDetail?id=${i.product_id}`
                  })
                }}>

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
        <View style={{textAlign:'center',color:'#CCCCCC',marginTop:'20px'}}>
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
        

        <AtDrawer
  show={this.state.show}
  right={true} 
  className='drawer'
  
>
  
{
  pro_city_list.length!==0&&pro_city_list.map((i,k)=>{
    // console.log('pro_city_list111:',i.city_items)
    
      return(
        <View className='cus-bt'>
          <AtButton className='cus-bt' onClick={()=>{
            this.setState({city_index:k})
          }}>{i.name}</AtButton>
          <View className='city-list cus-bt' >
            {this.state.city_index!==k?null
                :
              i.city_items.map((city,j)=>{
                return <AtButton className='cus-bt'  onClick={()=>{
                   
                  this.setState({city_id:city.id,show:false,city_name:city.name},()=>{
                         this.ss_btn()
                      console.log('ooook:',this.state.city_id) 
                  })

                }}>{city.name}</AtButton>
              })
            }
         
          </View>
        </View>

      )
  })
}
 



</AtDrawer>
       

            </View> 
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <View  className='video-big'> 
           {
             this.state.video_search.length!==0&&this.state.video_search.map((i,k)=>{
              return (
                <View className='video-i' key={k} onClick={()=>{
                  Taro.navigateTo({
                    url:`/pages/play/play?id=${i.proid}`
                  })
                }}> 
                   <Image src={this.state.value==undefined?i.show_img_url:i.img_url} className='video-img'/>
                   <Image src={play} className='play'/>
                   <View className='list_title'>{i.title}</View>
                </View>
              )
             })
           }
            
            </View>
           
           {
             this.state.video_search.length==0?
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
                  <View className='qiye-i' onClick={()=>{
                    Taro.navigateTo({
                      url:`/pages/yellow/yellow?id=${i.crop_id}` 
                    })
                  }}>
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
      }  
      

              </View>
          )
      }


}