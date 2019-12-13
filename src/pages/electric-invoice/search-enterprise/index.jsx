import Taro from '@tarojs/taro'
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
    console.log('开始搜索')
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