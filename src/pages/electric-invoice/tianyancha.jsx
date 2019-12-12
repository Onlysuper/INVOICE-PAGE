import Taro, { Component } from '@tarojs/taro'
// 引入 WebView 组件
import { WebView } from '@tarojs/components'
import './tianyancha.scss'

export default class TianYanCha extends Component {
    constructor(){
        super()
        this.state = {
            // searchValue:"", // 搜索关键字
            url:"https://www.tianyancha.com/search?key=" +
            "速票通" +
            "&checkFrom=searchBox",// 天眼查链接
        }
    }
    componentDidMount(){
        console.log('props',this.props)
    }
  handleMessage () {}
  render () {
    return (
      <WebView className='tianyancha-page' src={this.state.url} onMessage={this.handleMessage} />
    )
  }
}