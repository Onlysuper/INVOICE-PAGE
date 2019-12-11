import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
  AtCard,
  AtAvatar, 
  AtInput, 
  AtForm, 
  AtRadio,
  AtList,
  AtListItem,
  AtButton 
} from 'taro-ui'
import './index.scss'
import { getOrderInfo } from '../../apis/index'

class ElectricInvoice extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      billType:'0', //开票类型 ,0 为企业，1为个人
      formData: {
        billItemNames:[]
      },
      formStructure:[
        {
          type:'text',
          name:'enterpriseName',
          title:'企业名称'
        },
        {
          type:'text',
          name:'taxNo',
          title:'企业税号'
        },
        {
          type:'phone',
          name:'phoneNo',
          title:'手机号码'
        },
        {
          type:'mail',
          name:'mail',
          title:'电子邮箱'
        }
      ]
    }
  }
  billTypeChange(type,value){
    this.setState({
      billType:value
    })
  }
  handleChange (type,value) {
    let newObj ={};
    newObj[type]=value
    this.setState({
      formData:Object.assign({}, this.state.formData,newObj)
    })
  }
  submit(){
    console.log('提交')
  }
  // 项目配置
  componentWillMount () {
    this.getOrderInfoHandle()
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}
  
  // 获取电子发票订单信息
  getOrderInfoHandle(){
    getOrderInfo()({orderNo:'11bn6368p20lv'}).then(res=>{
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
    let formStructure = this.state.formStructure;
    const FormContent = formStructure.map((item) =>
      <AtInput
        key={item.name}
        name={item.name}
        title={item.title}
        type={item.type}
        placeholder={item.title}
        value={this.state.formData[name]}
        onChange={this.handleChange.bind(this,{name})}
      />
    );
    console.log(FormContent);
    console.log('formStructure',formStructure)
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
        </View>
        <AtForm>
        <View className='bs-split-border20'></View>
        <View className='bs-title'>抬头类型</View>
        <AtRadio
          options={[
            { label: '企业', value: '0' },
            { label: '个人/其他', value: '1' },
          ]}
          value={this.state.billType}
          onClick={this.billTypeChange.bind(this,'billType')}
        />
         <FormContent />
          {/* <AtInput
            name='enterpriseName'
            title='企业名称'
            type='text'
            placeholder='企业名称'
            value={this.state.formData.enterpriseName}
            onChange={this.handleChange.bind(this,'enterpriseName')}
          />
          <AtInput
            name='taxNo'
            title='企业税号'
            type='text'
            placeholder='企业税号'
            value={this.state.formData.taxNo}
            onChange={this.handleChange.bind(this,'taxNo')}
          />
          <AtInput
            name='phoneNo'
            border={false}
            title='手机号码'
            type='phone'
            placeholder='手机号码'
            value={this.state.formData.phoneNo}
            onChange={this.handleChange.bind(this,'phoneNo')}
          />
          <AtInput
            name='mail'
            title='电子邮箱'
            type='text'
            placeholder='电子邮箱'
            value={this.state.formData.mail}
            onChange={this.handleChange.bind(this,'mail')}
          /> */}
        </AtForm>
        <View className='footer'>
          <AtButton onClick={this.submit.bind(this)} type='primary'>申请开票</AtButton>
        </View>
      </View>
    )
  }
}
export default ElectricInvoice