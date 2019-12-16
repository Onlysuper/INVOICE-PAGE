import Taro, { getCurrentPages } from '@tarojs/taro'
import { AtSearchBar } from 'taro-ui'
export default class Index extends Taro.Component {
  constructor () {
    super(...arguments)
    this.state = {
      value: ''
    }
  }
  onChange (value) {
    this.setState({
      value: value
    })
  }
  onActionClick () {
    // url: `/pages/invoice-electric/invoice-electric?enterpriseName=${this.state.value}&from=search-enterprise`,
    // Taro.navigateBack({ delta: 2 })
    var pages = getCurrentPages();// 获取页面栈
    // var currPage = pages[pages.length-1];// 获取当前页面
    var prevPage = pages[pages.length-2];// 获取上一个页面
    console.log(prevPage);
    prevPage.setData({
      formData:"马大哈"
    })
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
