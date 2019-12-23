import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import {
  AtInput,
  AtButton,
  AtActionSheet,
  AtActionSheetItem
} from 'taro-ui'
// redux start
import { connect } from '@tarojs/redux'
import {
  commonInvoiceRecord, // 获取订单
} from '@actions/invoice_common'
@connect(({ invoice_common }) => ({
    storeInvoiceRecords:invoice_common.storeInvoiceRecords
  }),
  {commonInvoiceRecord}
)
export default class EnterpriseInput extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      value:"23",
      actionOpen:false, // 选择导入信息菜单
      // 选择按钮
      footerOpration:[],
    }
  }
  componentWillReceiveProps(){
  }
  componentWillUpdate () {

  }
  componentDidUpdate(){
    this.receiveValue()
    this.footerOprationCompose(this.props.storeInvoiceRecords);
  }
  componentDidMount () {
  }
  componentDidShow () {}
  componentDidHide () {}
  footerOprationCompose(res){
    let newArr=[
      {
        lable:"企业名匹配",
        code:"search"
      },
      {
        lable:"导入微信抬头",
        code:"weixin"
      }
    ]
    if(res instanceof Array){
      this.setState({
        footerOpration:newArr.concat(res)
      })
    }else{
      this.setState({
        footerOpration:newArr
      })
    }

  }
  receiveValue(){
    this.setState({
      value:this.props.value
    })
  }
  formDataChange(value){
    this.props.onChange(value)
  }
  // 点击选择按钮
  openChoiceAction(){
    this.setState({
      actionOpen:true
    })
  }
  // 关闭选择
  closeChoiceAction(){
    this.setState({
      actionOpen:false
    })
  }
  selectedChange(res){
    this.setState({
      actionOpen:false
    })
    this.props.selectedChange(res);
  }
  render () {
    let footerOpration = this.state.footerOpration;// 获取信息方式
    return (
      <View>
        {/* 我是企业名称输入框 */}
        <AtInput
              name={this.props.name}
              title={this.props.title}
              type={this.props.type}
              placeholder={this.props.placeholder}
              value={this.state.value}
              onChange={this.formDataChange.bind(this)}
        >
          {this.props.butShow && <AtButton className="but-r"  onClick={this.openChoiceAction.bind(this)} type='primary' size='small'>选择</AtButton>}
        </AtInput>
        <AtActionSheet cancelText='取消' title='可根据以下操作获取相应开票信息' isOpened={this.state.actionOpen} onClose={ this.closeChoiceAction.bind(this) }>
          {
            footerOpration.map((item,index) =>{
              return (
              (process.env.TARO_ENV !== 'weapp'&&item.code==='weixin')?null:
                <AtActionSheetItem onClick={this.selectedChange.bind(this,item)} key={index}>
                  {item.code==='search'?<Text className='danger' style='color: #FF4949;'>{item.lable||item.enterpriseName}</Text>:item.lable||item.enterpriseName}
                </AtActionSheetItem>
              )
            })
          }
        </AtActionSheet>
      </View>
    )
  }
}
