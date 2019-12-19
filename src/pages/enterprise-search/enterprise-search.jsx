import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
// redux start
import { connect } from '@tarojs/redux'
import * as actions from '@actions/enterprise_search'
// 获取订单信息
@connect(({ enterprise_search }) => ({enterprise_search_state:enterprise_search.enterprise_search_state}),{...actions})
class EnterpriseSearch extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      value: ''
    }
  }
  componentDidShow () {
    console.log(this.props);
    // console.log(enterprise_search_state);
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
