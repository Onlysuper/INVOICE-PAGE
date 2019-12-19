import { INVOICE_ENTERPRISE_NAME } from '@constants/enterprise_search'
const INITIAL_STATE = {
  enterprise_search_state:{ // 搜索企业数据
    isSearch:false,
    name:"",
    tax:""
  }
}
export default function invoice_electric (state = INITIAL_STATE, action) {
  switch (action.type) {
    case INVOICE_ENTERPRISE_NAME: {
      return {
        ...state,
        enterprise_search_state:action.payload
      }
    }
    default:
      return state
  }
}
