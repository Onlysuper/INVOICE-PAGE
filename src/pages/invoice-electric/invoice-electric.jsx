// 电子发票
import Taro, { Component } from '@tarojs/taro'
import {
    AtCard,
    AtAvatar,
    AtList,
    AtListItem,
    AtForm,
    AtRadio,
    AtInput,
    AtNoticebar,
    AtAccordion,
    AtButton,
    AtFloatLayout,
    AtActionSheet,
    AtActionSheetItem
  } from 'taro-ui'


import { View } from '@tarojs/components'
import './invoice-electric.scss'
import TianYanCha from "../../components/TianYanCha/index.jsx"
// redux start
import { connect } from '@tarojs/redux'
import * as actions from '@actions/invoice_electric'
// import { dispatchInvoiceOrder } from '@actions/invoice_electric'
@connect(({ invoice_electric }) => ({
  invoice_enterprise_state:invoice_electric.invoice_enterprise_state}),{...actions})

class InvoiceElectric extends Component {
  config = {
    navigationBarTitleText: '电子发票'
  }
  constructor () {
    super(...arguments)
    this.state = {
      actionOpen:false, // 选择导入信息菜单
      enterpriseOpen:false,// 企业搜索模态框
      tianyanchaOpen:false, // 天眼查模态框
      openMoreForm:false, // 默认为企业 打开更多信息
      billType:'0', //开票类型 ,0 为企业，1为个人
      formData: {
        billItemNames:[]
      },
       //   // 表单一般表单
      formStructure:{
      enterpriseName:{
      name:'enterpriseName',
      type:'text',
      title:'企业名称',
      placeholder:'请输入企业名称 / 关键字',
      show:true
      },
      taxNo:{
       name:'taxNo',
       type:'text',
       title:'企业税号',
       placeholder:'请输入企业税号',
       show:true
      },
      phoneNo:{
      name:'phoneNo',
      type:'phone',
      title:'手机号码',
      placeholder:'请输入手机号码',
      show:true
      },
      mail:{
      name:'mail',
      type:'mail',
      title:'电子邮箱',
      placeholder:'请输入电子邮箱',
      show:true
      }
      },
      formMoreStructure: {
      registerAddress:{
      name:'registerAddress',
      type:'text',
      title:'注册地址',
      placeholder:'请输入注册地址',
      show:true
      },
      companyPhone:{
      name:'companyPhone',
      type:'text',
      title:'公司电话',
      show:true
      },
      countBank:{
      name:'countBank',
      type:'text',
      title:'开户银行',
      show:true
      },
      bankCard:{
      name:'bankCard',
      type:'text',
      title:'银行帐号',
      show:true
      }
     }
    }
  }
  componentDidMount () {
      this.getOrderInfoHandle()
  }
  componentDidShow () {
    // 搜索企业名称回显
    if(this.props.invoice_enterprise_state.isSearch){
      let enterpriseName = this.props.invoice_enterprise_state.name;
      this.formDataChange('enterpriseName',enterpriseName)
    }
  }
  componentDidHide () { }
  // 选择个人发票或普票
  billTypeChange(type,value){
    this.setState({
      billType:value
    })
    // 数组重新组合
    let formStructure =Object.assign({}, this.state.formStructure); // 一遍表单
    if(value==='0'){
      // 企业
      formStructure['enterpriseName']['title']="企业名称"
      formStructure['enterpriseName']['placeholder']="企业名称"
      // formStructure.taxNo.show=true
    }
    if(value==='1'){
      // 个人
      formStructure['enterpriseName']['title']="发票抬头"
      formStructure['enterpriseName']['placeholder']="请输入个人或姓名"
      // formStructure.taxNo.show=false
    }
    this.setState({
      formStructure:Object.assign({},formStructure)
    })
    console.log('巴拉巴拉',Object.assign({},formStructure));
  }
  // input数据改变
  formDataChange (type,value) {
    let newObj ={};
    newObj[type]=value
    this.setState({
      formData:Object.assign({}, this.state.formData,newObj)
    })
  }
  submit(){
    if (this.state.formData.transactionOrderNo < 5) {
      Taro.showToast({
        title: '订单信息不存在，无法开具电子发票',
        duration: 2000
      }).then(res => console.log(res))
    }
    //由于类型不同需要做处理
    let billType = ""; //开票类型 1:普票、3:普票个人
    //提取form
    let form = {};

  }
  // 点击选择按钮
  composeOptions(){
    this.setState({
      actionOpen:true
    })
  }
  // 点击查询税号按钮
  searchTaxHandle(){
    this.setState({
      tianyanchaOpen: true
    })
  }
  openMoreFormHanlde(value){
    // 点击查看更多
    this.setState({
      openMoreForm: value
    })
  }
  // 关闭天眼查模块
  tianyanchaCloseHandle(){
     this.setState({
      tianyanchaOpen: false
    })
  }

  // 企业名称被input被点击时候
  inputClick(type){
    if(type==='enterpriseName'){
      // 跳转到搜索页面
      Taro.navigateTo({
        url: '/pages/invoice-electric/search-enterprise/index'
      })
    }
  }
  // 打开企业搜索模块
  enterpriseOpenHandle(){

  }

  // 关闭企业搜索模块
  enterpriseCloseHandle(){
     this.setState({
      enterpriseOpen: false
    })
  }
  // 获取电子发票订单信息
  getOrderInfoHandle(){
    const payload = {
      orderNo:'11gecpd6p20lv'
    }
    this.props.dispatchInvoiceOrder(payload).then(res=>{
      if(res.resultCode==='0'){
        this.setState({
          formData:res.data
        })
      }else if (res.resultCode == "90") {
        // 跳转到开票状态页面
      }else{
        // 获取不到信息给个提示
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  render () {
  let formStructure = this.state.formStructure; // 一遍表单
  let formMoreStructure = this.state.formMoreStructure; //查看更多表单
  let formKeys = Object.values(formStructure).filter(item=>item.show)
  let formMoreKeys = Object.values(formMoreStructure).filter(item=>item.show)
  return (
      <View>
        <View className='content-top'>
        <View className='user-top'>
            <View className='bs-text-center'>
                <AtAvatar image='https://jdc.jd.com/img/200' className='avatar' circle ></AtAvatar>
            </View>
            <View className='bs-text-center'>{this.state.formData.enterpriseName}</View>
        </View>
        <AtCard
          title='订单信息'
          icon={{ value: 'file-generic', color: '#77a1fd' }}
        >
            <AtList hasBorder={false}>
            <AtListItem  title='订单号' note={this.state.formData.transactionOrderNo} />
            <AtListItem  title='开票金额' note={`${this.state.formData.billAmount}元`} />
            <AtListItem hasBorder={false} title='开票项目' note={this.state.formData.billItemNames[0]} />
            </AtList>
        </AtCard>
        <View className='bs-split-border20 bs-top-20'></View>
        <AtForm>
          <View className='bs-title'>抬头类型</View>
          <AtRadio
            options={[
              { label: '企业', value: '0' },
              { label: '个人/其他', value: '1' },
              ]}
            value={this.state.billType}
            onClick={this.billTypeChange.bind(this,'billType')}
          />
          <View className='bs-split-border20'></View>
          {formKeys.map((item,index) =>{
              return (
                !(this.state.billType==='0'&&item.name==='taxNo')?
                 <View key={index} className="bs-form-row">
                  <AtInput
                    name={item['name']}
                    title={item['title']}
                    type={item['type']}
                    placeholder={item['placeholder']}
                    value={this.state.formData[item['name']]}
                    editable={this.state.billType==='0'&&item['name']==='enterpriseName'?false:true}
                    onClick={this.inputClick.bind(this,item['name'])}
                    onChange={this.formDataChange.bind(this,item['name'])}
                  >
                  {item.name==='taxNo'&&this.state.formData.enterpriseName&& process.env.TARO_ENV === 'h5'&& <AtButton  onClick={this.searchTaxHandle.bind(this)}type='primary' size='small'>查询税号</AtButton>}
                  {this.state.billType==='0'&&item.name==='enterpriseName' && process.env.TARO_ENV !== 'h5'&& <AtButton  onClick={this.composeOptions.bind(this)} type='primary' size='small'>选择</AtButton>}
                </AtInput>
              </View>:null)
          })}
          {this.state.billType==='1'&&(<AtNoticebar>根据税务总局要求，除企业之外的所有个人消费者、个体工商户以及行政机关、事业单位、社会团体等非企业性单位均无需提供纳税人识别号。</AtNoticebar>)}
          {this.state.billType==='0'&&(<AtNoticebar>提示：请核对税号及联系方式准确无误</AtNoticebar>)}
          {this.state.billType==='0'&& <View className='bs-split-border20'></View>}
          {this.state.billType==='0'&&
            <AtAccordion
              open={this.state.openMoreForm}
              onClick={this.openMoreFormHanlde.bind(this)}
              title='更多信息'
            >
            {
              formMoreKeys.map((item,index) =>{
                return (
                  <AtInput
                    key={index}
                    name={item.name}
                    title={item.title}
                    type={item.type}
                    placeholder={item.title}
                    value={this.state.formData.name}
                    onChange={this.formDataChange.bind(this,item.name)}
                  >
                </AtInput>
                )
              })
            }
            </AtAccordion>
          }
        </AtForm>
        <View className='footer'>
          <AtButton onClick={this.submit.bind(this)} type='primary'>申请开票</AtButton>
        </View>
        <AtFloatLayout isOpened={this.state.enterpriseOpen} title="匹配企业" onClose={this.enterpriseCloseHandle.bind(this)}>
          查企业
        </AtFloatLayout>
        {/* 天眼查 */}
        {process.env.TARO_ENV === 'h5'&&
          <AtFloatLayout isOpened={this.state.tianyanchaOpen} title="查询企业" onClose={this.tianyanchaCloseHandle.bind(this)}>
            <TianYanCha isOpened={this.state.tianyanchaOpen} enterpriseName={this.state.formData.enterpriseName}/>
          </AtFloatLayout>
        }

        </View>
      <AtActionSheet isOpened={this.state.actionOpen}>
        <AtActionSheetItem>
          按钮一
        </AtActionSheetItem>
        <AtActionSheetItem>
          按钮二
        </AtActionSheetItem>
      </AtActionSheet>
      </View>
    )
  }
}

export default InvoiceElectric
