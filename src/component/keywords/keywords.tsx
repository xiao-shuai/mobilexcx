import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';
import './keywords.scss'

export default class Keywords extends Component {

  state={}

  componentWillMount () {}
  componentDidMount () {} 

  render() {
    const { keywords } = this.props
    return (
      <View className='box'>
        <View className='list'>
          {keywords.map((item, i) => {
            return <View className='item'>{item}</View>
          })}
        </View>
      </View>
    );
  }
}