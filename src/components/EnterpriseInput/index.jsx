import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
  AtInput
} from 'taro-ui'
export default class EnterpriseInput extends Component {
  constructor () {
    super(...arguments)
    this.state = {

    }
  }
  componentWillMount () {

  }
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  render () {
    return (
      <View>
        我是企业名称输入框
        {/* <AtInput
              name='enterpriseName'
              title={this.state.billType==='0'?'企业名称':'发票抬头'}
              type='text'
              placeholder={this.state.billType==='0'?'请输入企业名称':'请输入个人或姓名'}
              value={this.state.formData.enterpriseName}
              onChange={this.formDataChange.bind(this,'enterpriseName')}
        >
           {this.state.billType==='0'&& process.env.TARO_ENV !== 'h5'&& <AtButton className="but-r"  onClick={this.openChoiceAction.bind(this)} type='primary' size='small'>选择</AtButton>}
        </AtInput> */}
      </View>
    )
  }
}
