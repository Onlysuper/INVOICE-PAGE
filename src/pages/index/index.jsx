import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'
import { AtButton } from 'taro-ui'
import './index.scss'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

    config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  go(path){
    console.log(1111);
    Taro.navigateTo({
      url: path
    })
  }
  render () {
    return (
      <View className='index'>
         <AtButton onClick={this.go.bind(this,'/pages/invoice-electric/invoice-electric')} type='primary'>电子发票</AtButton>
         <AtButton onClick={this.go.bind(this)} type='primary'>快速开票</AtButton>
         <AtButton onClick={this.go.bind(this)} type='primary'>支付</AtButton>
      </View>
    )
  }
}

export default Index
