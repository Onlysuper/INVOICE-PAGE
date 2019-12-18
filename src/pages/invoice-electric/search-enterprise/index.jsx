import Taro, { getCurrentPages } from '@tarojs/taro'
import { AtSearchBar } from 'taro-ui'

import { connect } from '@tarojs/redux'
import * as actions from '@actions/invoice_electric'
import { dispatchInvoiceEnterprise,dispatchInvoiceEnterpriseReset } from '@actions/invoice_electric'// 获取订单信息
@connect(state => state.invoice_electric, {...actions,dispatchInvoiceEnterprise,dispatchInvoiceEnterpriseReset})
export default class Index extends Taro.Component {
  constructor () {
    super(...arguments)
    this.state = {
      value: ''
    }
  }
  componentDidShow () {
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
