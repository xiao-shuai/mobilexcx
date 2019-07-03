import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text,Icon,Image ,Video,Swiper, SwiperItem,WebView} from '@tarojs/components'
import './search.scss'
import { AtSearchBar} from 'taro-ui'

import { api } from '../../util/api';

export default class Search extends Component{
    constructor (props) {
        super(props)
        this.state = {
          value: ''
        }
      }
    config: Config = {
        navigationBarTitleText: '搜索'
      } 

      onChange (value) {
          
        this.setState({
          value: value
        },()=>{console.log('value',value)})
      }
      onActionClick () {
        console.log('开始搜索')
      }

      render(){
          return(
              <View className='container'>
                  <AtSearchBar 
                //   showActionButton  
        value={this.state.value}
        onChange={this.onChange.bind(this)}
        onActionClick={this.onActionClick.bind(this)}/>
              </View>
          )
      }


}