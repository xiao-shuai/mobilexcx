import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';

export default class CateTwo extends Component {

  config = {
    navigationBarTitleText: ''
  }

  state = {}

  componentWillMount () {
    console.log('123')
    this.getCateTwoList()
  }
  componentDidMount () {
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 

  getCateTwoList () {
    Taro.setNavigationBarTitle({title: this.$router.params.name})
    console.log(this.$router.params.id)
    console.log(this.$router.params.name)
  }

  render() {
    return (
      <View>
        <Text>fweafwaef</Text>
      </View>
    );
  }
}
