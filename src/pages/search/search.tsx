import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text,Icon,Image ,Video,Swiper, SwiperItem,WebView} from '@tarojs/components'
import './search.scss'
import { AtSearchBar} from 'taro-ui'

import { api } from '../../util/api';

export default class Search extends Component{
    constructor (props) {
        super(props)
        this.state = {
          value: '',
          k_data:[],
          kw_show:false
         
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
        console.log('开始搜索')
      }

 ss_btn=()=>{
  Taro.request({
    url: api.product_list,
    // method:'POST',
    // header: {
    //   'content-type': 'application/json'
    // },
    // data:{
    //   catid:'', 
    //   keywords:'等待',
    //   page :1,
    //   area:'',
    //   attr:''
    // }
  }).then(res=>{
     console.log('res:',res)
  })
  .catch(err=>{
    console.log('err:',err)
  })
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
      
componentDidMount(){
  
}

      render(){
         let kw=this.state.k_data
         console.log('kw',kw)
          return(
              <View className='container'>
                  <AtSearchBar 
<<<<<<< HEAD
                //   showActionButton
        value={this.state.value}
        onChange={this.onChange.bind(this)}
        onActionClick={this.onActionClick.bind(this)}/>
=======
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
               <View className='kw_i' onClick={()=>{
                  this.click_kw(i)
               }}>
                {i.uk}
               </View>
               )
             })
           }
         </View>
         }

>>>>>>> 15327c92336277849ffbdc32f7104ace63cdad25
              </View>
          )
      }


}