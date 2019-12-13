import Taro, { Component } from './node_modules/@tarojs/taro'
// 引入 WebView 组件
// import { WebView } from './node_modules/@tarojs/components'
import './index.scss'

class TianYanCha extends Component {
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
     "234"
      // <WebView className='tianyancha-page' src={newUrl} onMessage={this.handleMessage} />
    )
  }
}

export default TianYanCha