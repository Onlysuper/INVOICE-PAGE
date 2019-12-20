import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar,AtList, AtListItem,AtDivider } from "taro-ui"
import "./index.scss"
import utils from "@utils/common.js"
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
    this.debouncePrint = utils._debounce(this.searchChange, 1000);
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
          enterpriseList:res.data||[]
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

  searchChange(value){
    // 防抖模糊搜索
    console.log(value)
  }
  onChange (value) {
    this.setState({
      searchVal: value
    })
    this.debouncePrint(value);
  }
  render () {
    return (
      <View>
        <AtSearchBar
          actionName='搜索'
          placeholder="请输入企业名称/关键字"
          value={this.state.searchVal}
          onChange={this.onChange.bind(this)}
          onActionClick={this.onActionClick.bind(this)}
        />
        <View className='container'>
          {this.state.enterpriseList&&this.state.enterpriseList.length===0?
            <AtDivider content='没有更多了' fontColor='#eee' lineColor='#eee' />
            :<AtList>
                {this.state.enterpriseList.map((item) =>{
                  return (
                      <AtListItem key={item.code} title={item.name} onClick={this.selectedEnterprise.bind(this,item)} />
                  )
                })}
              </AtList>
          }
        </View>
      </View>
    )
  }
}

export default EnterpriseSearch
