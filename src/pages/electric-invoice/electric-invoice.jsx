import Taro, { Component } from '@tarojs/taro'
import './index.scss'
import { View } from '@tarojs/components'
import {AtCard,AtAvatar, AtInput, AtForm,AtRadio,AtList, AtListItem,AtButton } from 'taro-ui'
class ElectricInvoice extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      value: ''
    }
  }
  handleChange (value) {
    this.setState({
      value
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value
  }
  // 项目配置
  componentWillMount () {}

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  render () {
    return (
      <View>
        <View className='content-top'>
          <View className='user-top'>
              <View className='bs-text-center'>
                <AtAvatar className='avatar' circle ></AtAvatar>
              </View>
              <View className='bs-text-center'>云票测试45</View>
          </View>
          <AtCard
            title='订单信息'
            icon={{ value: 'file-generic', color: '#77a1fd' }}
          >
            <AtList hasBorder={false}>
              <AtListItem  title='订单号' extraText='详细信息' />
              <AtListItem  title='开票金额' extraText='详细信息' />
              <AtListItem hasBorder={false} title='开票项目' extraText='详细信息' />
            </AtList>
          </AtCard>
        </View>
        <AtForm>
        <View className='bs-split-border20'></View>
        <View className='bs-title'>抬头类型</View>
        <AtRadio
          options={[
            { label: '企业', value: 'option1' },
            { label: '个人/其他', value: 'option2' },
          ]}
          value={this.state.value}
          onClick={this.handleChange.bind(this)}
        />
          <AtInput
            name='value1'
            title='企业名称'
            type='text'
            placeholder='企业名称'
            value={this.state.value1}
            onChange={this.handleChange.bind(this)}
          />
          <AtInput
            name='value1'
            title='企业税号'
            type='text'
            placeholder='企业税号'
            value={this.state.value1}
            onChange={this.handleChange.bind(this)}
          />
          <AtInput
            name='value6'
            border={false}
            title='手机号码'
            type='phone'
            placeholder='手机号码'
            value={this.state.value6}
            onChange={this.handleChange.bind(this)}
          />
          <AtInput
            name='value1'
            title='电子邮箱'
            type='text'
            placeholder='电子邮箱'
            value={this.state.value1}
            onChange={this.handleChange.bind(this)}
          />
        </AtForm>
        <View className='footer'>
          <AtButton type='primary'>申请开票</AtButton>
        </View>
      </View>
    )
  }
}
export default ElectricInvoice