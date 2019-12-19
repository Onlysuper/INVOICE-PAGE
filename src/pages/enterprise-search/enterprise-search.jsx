import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
// redux start
import { connect } from '@tarojs/redux'
import * as actions from '@actions/invoice_electric'
// 获取订单信息
@connect(({ invoice_electric }) => ({invoice_enterprise_state:invoice_electric.invoice_enterprise_state}),{...actions})
class EnterpriseSearch extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      value: ''
    }
  }
  componentDidShow () {
    console.log(this.props);
    // console.log(invoice_enterprise_state);
    this.props.dispatchInvoiceEnterpriseReset()
  }
  onChange (value) {
    this.setState({
      value: value
    })
  }
  // 点击搜索按钮
  onActionClick () {
    this.props.dispatchInvoiceEnterprise(this.state.value);
    Taro.navigateBack({
      delta:1
    })
  }
  render () {
    return (
      <AtSearchBar
        actionName='搜一下'
        placeholder="请输入企业名称/关键字"
        value={this.state.value}
        onChange={this.onChange.bind(this)}
        onActionClick={this.onActionClick.bind(this)}
      />
    )
  }
}

export default EnterpriseSearch
