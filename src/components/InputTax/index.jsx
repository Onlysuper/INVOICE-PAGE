import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import TianYanCha from "@components/TianYanCha/index.jsx"
import {
  AtInput,
  AtButton,
  AtFloatLayout
} from 'taro-ui'
class InputTax extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      value:"税号",
      tianyanchaOpen:false // 天眼查模态框
    }
  }
  componentWillMount () {}

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}
  formDataChange(){
    console.log('改变值了')
  }
  // 点击查询税号按钮
  searchTaxHandle(){
    console.log('eeee');
    this.setState({
      tianyanchaOpen: true
    })
  }
   // 关闭天眼查模块
  tianyanchaCloseHandle(){
    this.setState({
     tianyanchaOpen: false
   })
 }
  // // 点击查询税号按钮
  // searchTaxHandle(){
  //   console.log('开始查询税号')
  //   // this.setState({
  //   //   tianyanchaOpen: true
  //   // })
  // }
  render () {
        {
        return !this.props.show?null:<View>
          <AtInput
            name={this.props.name}
            title={this.props.title}
            type={this.props.type}
            placeholder={this.props.placeholder}
            value={this.state.value}
            onChange={this.formDataChange.bind(this)}
          >
           {this.props.butShow&& <AtButton className="but-r"  onClick={this.searchTaxHandle.bind(this)}type='primary' size='small'>查询税号</AtButton>}
          </AtInput>
          {
            <AtFloatLayout isOpened={this.state.tianyanchaOpen} title="查询企业" onClose={this.tianyanchaCloseHandle.bind(this)}>
              eee
              {/* <TianYanCha isOpened={this.state.tianyanchaOpen} enterpriseName={this.state.formData.enterpriseName}/> */}
            </AtFloatLayout>
          }
        </View>
        }


  }
}
export default InputTax
