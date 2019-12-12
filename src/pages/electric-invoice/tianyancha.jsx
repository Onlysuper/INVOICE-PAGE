import Taro, { Component } from '@tarojs/taro'
// 引入 WebView 组件
import { WebView } from '@tarojs/components'
import './tianyancha.scss'

export default class TianYanCha extends Component {
    constructor(props){
        super(props)
        this.state = {
          
        }
    }
    componentDidMount () {

    }
    componentWillUpdate (nextProps,nextState) {
    }
  handleMessage () {}
  render () {
    var isOpened=this.props.isOpened;
    var key = "速票通"
    if(isOpened){
        key = this.props.enterpriseName;
    }
    var newUrl = "https://www.tianyancha.com/search?key=" +key +"&checkFrom=searchBox"
    return (
      <WebView className='tianyancha-page' src={newUrl} onMessage={this.handleMessage} />
    )
  }
}