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
    AtFloatLayout
  } from 'taro-ui'

import { View } from '@tarojs/components'
import './invoice-electric.scss'
import TianYanCha from "../../components/TianYanCha/index.jsx"
import { getOrderInfo } from '../../apis/index'
class InvoiceElectric extends Component {
  config = {
    navigationBarTitleText: '电子发票'
  }
  constructor () {
    super(...arguments)
    this.state = {
      enterpriseOpen:false,// 企业搜索模态框
      tianyanchaOpen:false, // 天眼查模态框
      openAccordion:false, // 默认为企业 打开更多信息
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
    // console.log('zzz',this.$router.params);
    // if(this.$router.params.from==='search-enterprise'&&this.$router.params.enterpriseName){
    //   let newformData = Object.assign({},this.state.formData,{enterpriseName:this.$router.params.enterpriseName})
    //   this.setState({
    //     formData:newformData
    //   })
    // }
  }

  componentDidHide () { }
  billTypeChange(type,value){
    this.setState({
      billType:value
    })
  }

  // input数据改变
  inputChange (type,value) {
    let newObj ={};
    newObj[type]=value
    this.setState({
      formData:Object.assign({}, this.state.formData,newObj)
    })
  }
  submit(){
    console.log(this);
    // let self = this;
    // if (this.order.transactionOrderNo.length < 5) {
    //         this.Toast("订单信息不存在，无法开具电子发票");
    //         return;
    // }

    // //由于类型不同需要做处理
    // let billType = ""; //开票类型 1:普票、3:普票个人
    // //提取form
    // let form = {};

    // switch (this.billType) {
    //         case "普票":
    //                 billType = "1";
    //                 form = { ...this.form };
    //                 break;
    //         case "普票个人":
    //                 billType = "3";
    //                 form = {
    //                         enterpriseName: this.form.enterpriseName,
    //                         phoneNo: this.form.phoneNo,
    //                         mail: this.form.mail
    //                 };
    //                 break;
    // }

    // //校验表单 返回true代表校验通过
    // if (!this.checkForm(billType)) return false;

    // //合并数据
    // var sendData = {
    //         orderNo: this.orderNo,
    //         openId: this.openId,
    //         billType: billType,
    //         ...form
    // };

    // //税号小写转大写
    // if (sendData.taxNo) {
    //         sendData.taxNo = sendData.taxNo.toUpperCase();
    // }

    // if(!(/(^[\d|A-Z]{15}$)|(^[\d|A-Z]{18}$)|(^[\d|A-Z]{20}$)/.test(sendData.taxNo)) && self.page.titleType === "企业"){
    //         self.MessageBox.confirm('税号一般为15，18，20位数字或者大写字母，您填写的税号可能有误，确定提交？').then(action => {
    //                   //发送开票申请
    //               if (action == 'confirm') {     //确认的回调
    //                 self.confirmApply(sendData);
    //                 }
    //         }).catch(()=>{
    //                 if (err == 'cancel') {     //取消的回调
    //                 // console.log(2);
    //                 }
    //         });
    // }else{
    //         self.confirmApply(sendData)
    // }
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
      openAccordion: value
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
    console.log('这里啊');
    getOrderInfo()({orderNo:'11ffm7vhh20lv'}).then(res=>{
      // this.initData();
      if (res.resultCode == "0") {
        this.setState({
          formData:res.data
        })
      }
      //  else if (data.resultCode == "90") {
      //         this.$router.replace({
      //                 path: "/eic_billFail",
      //                 query: {
      //                         resultCode: data.resultCode,
      //                         resultMsg: data.resultMsg
      //                 }
      //         });
      // } else {
      //         this.Toast(data.resultMsg);
      // }
    })
  }
  render () {
    let formStructure = this.state.formStructure; // 一遍表单
    let formMoreStructure = this.state.formMoreStructure; //查看更多表单
    if(this.state.billType==='0'){
      // 企业
      formStructure['enterpriseName']['title']="企业名称"
      formStructure['enterpriseName']['placeholder']="企业名称"
      formStructure['taxNo']['show']=true
    }
    if(this.state.billType==='1'){
      // 个人
      formStructure['enterpriseName']['title']="发票抬头"
      formStructure['enterpriseName']['placeholder']="请输入个人或姓名"
      formStructure['taxNo']['show']=false
    }
  let formKeys = Object.values(formStructure).filter(item=>item.show)
  let formMoreKeys = Object.values(formMoreStructure).filter(item=>item.show)
  return (
        <View>
          {this.state.formData}
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
            <AtInput
              key={index}
              name={item['name']}
              title={item['title']}
              type={item['type']}
              placeholder={item['placeholder']}
              value={this.state.formData[item['name']]}
              editable={this.state.billType==='0'&&item['name']==='enterpriseName'?false:true}
              onClick={this.inputClick.bind(this,item['name'])}
              onChange={this.inputChange.bind(this,item['name'])}
            >
            {item.name==='taxNo'&&this.state.formData.enterpriseName&& process.env.TARO_ENV === 'h5'&& <View onClick={this.searchTaxHandle.bind(this)}>查询税号</View>}
          </AtInput>)
          })}
          {this.state.billType==='1'&&(<AtNoticebar>根据税务总局要求，除企业之外的所有个人消费者、个体工商户以及行政机关、事业单位、社会团体等非企业性单位均无需提供纳税人识别号。</AtNoticebar>)}
          {this.state.billType==='0'&&(<AtNoticebar>提示：请核对税号及联系方式准确无误</AtNoticebar>)}
          {this.state.billType==='0'&& <View className='bs-split-border20'></View>}
          {this.state.billType==='0'&&
            <AtAccordion
              open={this.state.openAccordion}
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
                    onChange={this.inputChange.bind(this,item.name)}
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
        </View>
    )
  }
}

export default InvoiceElectric
