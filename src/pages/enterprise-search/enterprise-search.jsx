import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar,AtList, AtListItem } from "taro-ui"
// redux start
import { connect } from '@tarojs/redux'
import {
  dispatchEnterpriseSearch, // 企业名称搜索
  dispatchEnterpriseReset, // 企业名称置空
  dispatchEnterpriseSelected, // 企业选择
  dispatchEnterpriseTest, // 企业选择
} from '@actions/enterprise_search'
// 获取订单信息
@connect(({ enterprise_search }) => (
  {
    enterprise_search_state:enterprise_search.enterprise_search_state,
    enterprise_search_test:enterprise_search.enterprise_search_test
  }),
  {
    dispatchEnterpriseSearch,
    dispatchEnterpriseReset,
    dispatchEnterpriseSelected,
    dispatchEnterpriseTest
   }
)
class EnterpriseSearch extends Component {
  config = {
    navigationBarTitleText: '企业搜索'
  }
  constructor () {
    super(...arguments)
    this.state = {
      searchVal: '', // 搜索框输入文字
      authCode:'', // 企业搜索请求需要参数
      enterpriseList:[]// 企业列表
    }
  }
  componentWillMount () {
    console.log('这里哦',this.props);
    let authCode = this.$router.params.authCode
    this.setState({
      authCode:authCode
    })
  }
  componentDidShow () {
    this.props.dispatchEnterpriseReset()
  }
  onChange (value) {
    this.setState({
      searchVal: value
    })
  }
  // 点击搜索按钮
  onActionClick () {
    this.props.dispatchEnterpriseSearch({
    },{
      // randomCode:this.state.authCode || '',
      randomCode:'07cf546c2' || '',
      key:this.state.searchVal
    }).then(res=>{
      if(res.resultCode==='0'){
        this.setState({
          enterpriseList:res.data
        })
      }
      console.log(res);
    })
  }
  // 选择企业
  selectedEnterprise(item){
    this.props.dispatchEnterpriseSelected(item);
    Taro.navigateBack({
      delta:1
    })
  }
  // 测试
  dispatchEnterpriseTest(){
    this.props.dispatchEnterpriseTest();
  }
  render () {
    return (
      <View>
        {/* {this.props.enterprise_search_test} */}
        {/* <View onClick={this.dispatchEnterpriseTest.bind(this)}>测试</View> */}
        <AtSearchBar
          actionName='搜一下'
          placeholder="请输入企业名称/关键字"
          value={this.state.searchVal}
          onChange={this.onChange.bind(this)}
          onActionClick={this.onActionClick.bind(this)}
        />
        <AtList>
       {
          this.state.enterpriseList.map((item) =>{
            return (
                <AtListItem key={item.code} title={item.name} onClick={this.selectedEnterprise.bind(this,item)} />
            )
          })
       }
        </AtList>
      </View>
    )
  }
}

export default EnterpriseSearch
