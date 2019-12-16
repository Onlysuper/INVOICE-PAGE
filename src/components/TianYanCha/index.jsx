import Taro, { Component } from '@tarojs/taro'
// 引入 WebView 组件
import { WebView } from '@tarojs/components'
import './index.scss'

class TianYanCha extends Component {
  constructor(props){
        super(props)
        this.state = {

        }
  }
  handleMessage () {}
  render () {
    var isOpened=this.props.isOpened;
    var key = "速票通"
    if(isOpened){
        key = this.props.enterpriseName;
        var newUrl = "https://www.tianyancha.com/search?key=" +key +"&checkFrom=searchBox"
        return (
          <WebView className='tianyancha-page' src={newUrl} onMessage={this.handleMessage} />
        )
    }else{
      return ""
    }
  }
}

export default TianYanCha
