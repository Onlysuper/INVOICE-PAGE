// 电子发票
import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
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
    AtFloatLayout
  } from 'taro-ui'
import './invoice-electric.scss'
import TianYanCha from "@components/TianYanCha/index.jsx"
import InputEnterprise from "@components/InputEnterprise/index.jsx"
import InputTax from "@components/InputTax/index.jsx"
// redux start
import { connect } from '@tarojs/redux'
import {
  dispatchInvoiceOrder, // 获取订单
  dispatchInvoiceRecord, // 获取电子发票记录
  dispatchInvoicePayment // 开具电子发票
} from '@actions/invoice_electric'

import {
  commonInvoiceRecord // 获取订单
} from '@actions/invoice_common'
@connect(
  ({ enterprise_search,invoice_common }) => ({
    enterprise_search:enterprise_search.enterprise_search_state,
    storeInvoiceRecords:invoice_common.storeInvoiceRecords
  }),
  {
    dispatchInvoiceOrder,
    dispatchInvoiceRecord,
    dispatchInvoicePayment,
    commonInvoiceRecord
  }
)
class InvoiceElectric extends Component {
  config = {
    navigationBarTitleText: '电子发票'
  }
  constructor () {
    super(...arguments)
    this.state = {
      orderNo: "",// 链接拿到orderNo
      openId: "", // 链接拿到openid
      enterpriseOpen:false,// 企业搜索模态框
      tianyanchaOpen:false, // 天眼查模态框
      openMoreForm:false, // 默认为企业 打开更多信息
      billType:'0', //开票类型 ,0 为企业，1为个人
      //订单数据
      orderData: {
        customerNo: "",
        enterpriseName: "--",
        taxNo: "--",
        transactionOrderNo: "--",
        billAmount: "0",
        billItemNames: ["--"],
        authCode: ''
      },
      // 发票数据
      formData:{
        enterpriseName: "",
        taxNo: "",
        phoneNo: "",
        mail: "",
        registerAddress:"",
        companyPhone:"",
        countBank:"",
        bankCard:""
      },
      // 表单结构
      formStructure:{
        // taxNo:{
        //   name:'taxNo',
        //   type:'text',
        //   title:'企业税号',
        //   placeholder:'请输入企业税号',
        //   show:true
        // },
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
      this.getRouterData();
      // 底部选择按钮组合
      // this.footerOprationCompose();
      // 获取订单信息
      this.getOrderHandle()
      // 获取根据微信开票记录
      this.getInvoiceRecordHandle()
  }
  componentDidShow () {
    // 搜索企业名称回调
    this.enterpriseSearchCallback()
  }
  componentDidHide () { }
  // 路由数据组合
  getRouterData(){
    let params = this.$router.params;
    this.setState({
      orderNo:params.orderNo||'',
      openId:params.openId||''
    })
  }
  // 选择个人发票或普票
  billTypeChange(type,value){
    // console.log('这里',)
    this.setState({
      billType:value
    })
  }
  enterpriseChange(type,value){
    let newObj ={};
    newObj[type]=value
    this.setState({
      formData:Object.assign({}, this.state.formData,newObj)
    })
  }
  // input数据改变
  formDataChange (type,value) {
    let newObj ={};
    newObj[type]=value
    this.setState({
      formData:Object.assign({}, this.state.formData,newObj)
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
  // 关闭企业搜索模块
  enterpriseCloseHandle(){
     this.setState({
      enterpriseOpen: false
    })
  }
  // 获取订单信息
  getOrderHandle(){
    const payload = {
      orderNo:'11gecpd6p20lv'
    }
    this.props.dispatchInvoiceOrder(payload).then(res=>{
      if(res.resultCode==='0'){
        this.setState({
          orderData:res.data
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


  //根据openid获取已开的电子发票记录
  getInvoiceRecordHandle(){
    const payload = { openId: "oHHGmwBryETTaIw27Y-dn3Q4A5cw" }
    this.props.dispatchInvoiceRecord(payload).then(res=>{
      if(res.resultCode==='0'){
        let data = res.data || [];
        // 组合开票记录选择按钮列表
        this.props.commonInvoiceRecord(data);
        // this.footerOprationCompose(data);
        // 回显最近一条发票信息
        let recentInvoice = data[0];
        if(recentInvoice){
          this.echoOneRecordInvoice(recentInvoice)
        }
      }else{
        // 获取不到信息给个提示
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  // 回显某条发票记录
  echoOneRecordInvoice(res){
    // 根据税号区分企业与个人,并回显 0=企业 1=个人
    var billType = res.taxNo ? "0" : "1";
    this.setState({
      billType:billType
    })
    this.echoInvoiceForm(res)
  }
  // 企业模糊搜索回调
  enterpriseSearchCallback(){
    if(this.props.enterprise_search.isSearch){
      let res  = this.props.enterprise_search;
      this.echoInvoiceForm({
        enterpriseName:res.name,
        taxNo:res.tax,
        phoneNo:"",
        mail:""
      })
    }
  }
  // 回显发票信息
  echoInvoiceForm(res){
    this.setState({
      formData:{
        enterpriseName:res.enterpriseName,
        taxNo:res.taxNo,
        phoneNo:res.phoneNo,
        mail:res.mail
      }
    })
  }
  // 选择导入发票信息方式
  getInvoiceDataChoice(res){

    if(res.code==='weixin'){
      // 从微信抬头选择
      Taro.chooseInvoiceTitle({}).then(res=>{
        var billType = res.type===0 ? "0" : "1";//type 0:企业  1:个人
        this.setState({
          billType:billType
        })
        this.echoInvoiceForm({
          enterpriseName:res.title,
          taxNo:res.taxNumber,
          phoneNo:'',
          mail:''
        })
      })
    }else if(res.code==='search'){
      Taro.navigateTo({
        url: '/pages/enterprise-search/enterprise-search?authCode='+this.state.orderData.authCode
      })
    }else{
      // 从历史记录选择
      this.echoOneRecordInvoice(res)
    }
  }
   // 提交开票信息
  submit(){
    let formData = this.state.formData;
    let billType = this.state.billType==='0'?'企业':'个人';
    let sendBillType = billType==='企业'?'1':'3'; // 1：企业，3：个人
    let sendData = {
      orderNo: this.state.orderNo,
      openId: this.state.openId,
      billType: sendBillType,
    };
    if (this.state.orderData.transactionOrderNo < 5) {
      Taro.showToast({
        title: '订单信息不存在，无法开具电子发票',
        duration: 2000
      }).then(res => console.log(res))
    }
    if(billType==='企业'){
      // 企业发票
      sendData=Object.assign(sendData,formData)
    }else if(billType==='个人'){
      // 个人发票
      sendData=Object.assign(sendData,{
        enterpriseName: formData.enterpriseName,
        phoneNo: formData.phoneNo,
        mail: formData.mail
      })
    }else{
      throw Error('未知发票类型')
    }
    // 税号转大写
    sendData.taxNo&&(sendData.taxNo=sendData.taxNo.toUpperCase());
      if(billType === "企业"){
        if(!(/(^[\d|A-Z]{15}$)|(^[\d|A-Z]{18}$)|(^[\d|A-Z]{20}$)/.test(sendData.taxNo))){
          // '税号一般为15，18，20位数字或者大写字母，您填写的税号可能有误，确定提交？'
          Taro.showModal({
            title:'温馨',
            content:'税号一般为15，18，20位数字或者大写字母，您填写的税号可能有误，确定提交？',
            success:(res)=>{
              if(res.confirm){
                this.confirmSubmit(sendData)
              }else{
                console.log('暂时不提交')
              }
            },
            fail:(err)=>{
              return new Error()
            }
          })
      }else{
        this.confirmSubmit(sendData)
      }
    }else{
      this.confirmSubmit(sendData)
    }
  }
  // 确认提交
  confirmSubmit(sendData){
    console.log('sendData',sendData);
    return false;
    this.props.dispatchInvoicePayment({
      ...sendData
    }).then(res=>{
      Taro.navigateTo({
        url: '/pages/invoice-states/invoice-states'
      })
        // query: {
        //           ...this.$route.query,
        //           entName: this.order.enterpriseName,
        //           taxNo: this.order.taxNo
        //   }
    })
  }
  render () {
    let formStructure = this.state.formStructure; // 表单数据
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
            <View className='bs-text-center'>{this.state.order.enterpriseName}</View>
        </View>
        <AtCard
          title='订单信息'
          icon={{ value: 'file-generic', color: '#77a1fd' }}
        >
            <AtList hasBorder={false}>
            <AtListItem  title='订单号' note={this.state.orderData.transactionOrderNo} />
            <AtListItem  title='开票金额' note={`${this.state.orderData.billAmount}元`} />
            <AtListItem hasBorder={false} title='开票项目' note={this.state.orderData.billItemNames[0]} />
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
          <InputEnterprise
          name='enterpriseName'
          title={this.state.billType==='0'?'企业名称':'发票抬头'}
          type='text'
          placeholder={this.state.billType==='0'?'请输入企业名称':'请输入个人或姓名'}
          value={this.state.formData.enterpriseName}
          onChange={this.enterpriseChange.bind(this,'enterpriseName')}
          selectedChange={this.getInvoiceDataChoice.bind(this)}
          butShow={this.state.billType==='0'&& process.env.TARO_ENV !== 'h5'}
          ></InputEnterprise>
          <InputTax
           name='taxNo'
           title='企业税号'
           type='text'
           placeholder='请输入企业税号'
           show={this.state.billType==='0'}
           butShow={this.state.formData.enterpriseName}
          ></InputTax>

          {formKeys.map((item,index) =>{
              return (
                (this.state.billType==='1'&&item.name==='taxNo')?null:<View key={index} className="bs-form-row">
                 <AtInput
                   name={item['name']}
                   title={item['title']}
                   type={item['type']}
                   placeholder={item['placeholder']}
                   value={this.state.formData[item['name']]}
                   // editable={this.state.billType==='0'&&item['name']==='enterpriseName'?false:true}
                  //  onClick={this.inputClick.bind(this,item['name'])}
                   onChange={this.formDataChange.bind(this,item['name'])}
                 >
                 {/* {item.name==='taxNo'&&this.state.formData.enterpriseName&& process.env.TARO_ENV === 'h5'&& <AtButton className="but-r"  onClick={this.searchTaxHandle.bind(this)}type='primary' size='small'>查询税号</AtButton>} */}
                 {/* {this.state.billType==='0'&&item.name==='enterpriseName' && process.env.TARO_ENV !== 'h5'&& <AtButton className="but-r"  onClick={this.openChoiceAction.bind(this)} type='primary' size='small'>选择</AtButton>} */}
               </AtInput>
             </View>)
          })}
          {this.state.billType==='1'&&(<AtNoticebar icon='volume-plus'>根据税务总局要求，除企业之外的所有个人消费者、个体工商户以及行政机关、事业单位、社会团体等非企业性单位均无需提供纳税人识别号。</AtNoticebar>)}
          {this.state.billType==='0'&&(<AtNoticebar icon='volume-plus'>请核对税号及联系方式准确无误</AtNoticebar>)}
          {<View className='bs-split-border20'></View>}
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
        {process.env.TARO_ENV === 'h5'&&
          <AtFloatLayout isOpened={this.state.tianyanchaOpen} title="查询企业" onClose={this.tianyanchaCloseHandle.bind(this)}>
            <TianYanCha isOpened={this.state.tianyanchaOpen} enterpriseName={this.state.formData.enterpriseName}/>
          </AtFloatLayout>
        }
        </View>

      </View>
    )
  }
}

export default InvoiceElectric
