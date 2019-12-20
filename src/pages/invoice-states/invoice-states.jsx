import Taro, { Component } from '@tarojs/taro'
import { View,Image,Text} from '@tarojs/components'
import namedPng from '../../assets/imgs/invoice_fail.png'
import "./invoice-states"
class InvoiceStates extends Component {
  // 项目配置
  componentWillMount () {}

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  render () {
    return (
      <View>
         <View className="container">
            <View>
              <Image mode="widthFix" className="state-img" src={namedPng} />
            </View>
            <Text>内容巴拉巴拉</Text>
         </View>
      </View>
    )
  }
}
export default InvoiceStates
