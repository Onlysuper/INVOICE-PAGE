import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
// redux start
import { connect } from '@tarojs/redux'
import {
  dispatchEnterpriseSearch, // 企业名称搜索
  dispatchEnterpriseReset, // 企业名称置空
  dispatchEnterpriseSelected // 企业选择
} from '@actions/enterprise_search'
// 获取订单信息
@connect(({ enterprise_search }) => (
  {
    enterprise_search_state:enterprise_search.enterprise_search_state
  }),
  {
    dispatchEnterpriseSearch,
    dispatchEnterpriseReset,
    dispatchEnterpriseSelected
   }
)
class EnterpriseSearch extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      value: ''
    }
  }
  componentDidShow () {
    this.props.dispatchEnterpriseReset()
  }
  onChange (value) {
    this.setState({
      value: value
    })
  }
  // 点击搜索按钮
  onActionClick () {
    this.props.dispatchEnterpriseSearch({
      randomCode:"",
      key:this.state.value
    }).then(res=>{
      console.log(res);
    })

    // this.props.dispatchEnterpriseSelected(this.state.value);
    // Taro.navigateBack({
    //   delta:1
    // })
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
