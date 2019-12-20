import { ENTERPRISE_SEARCH,ENTERPRISE_SEARCH_TEST} from '@constants/enterprise_search'
const INITIAL_STATE = {
  enterprise_search_test:'zzzz',
  enterprise_search_state:{ // 搜索企业数据
    isSearch:false,
    name:"",
    tax:""
  }
}
export default function invoice_electric (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ENTERPRISE_SEARCH: {
      return {
        ...state,
        enterprise_search_state:action.payload
      }
    }
    case ENTERPRISE_SEARCH_TEST: {
      return {
        ...state,
        enterprise_search_test:'哈哈哈哈完成'
      }
    }
    default:
      return state
  }
}
