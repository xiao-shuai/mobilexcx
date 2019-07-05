import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import './keywords.scss'

export default class Keywords extends Component {

  state={}

  componentWillMount () {}
  componentDidMount () {} 

  jumpSearch (key) {
    Taro.navigateTo({ url: `/pages/search/search?key=${key}` })
  }

  render() {
    const { keywords } = this.props
    return (
      <View className='box'>
        <View className='list'>
          {keywords.map((item, i) => {
            return <View className='item' onClick={this.jumpSearch.bind(this,item)}>{item}</View>
          })}
        </View>
      </View>
    );
  }
}