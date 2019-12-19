/* eslint-disable */
export const host = HOST
export const hostM = HOST_M
/* eslint-enable */

// 电子发票订单信息
export const API_INVOICE_ElECTRIC_ORDER = `${host}/invoice/electronic/query/customer`

// 根据openid获取开票记录
export const API_INVOICE_ElECTRIC_RECORD= `${host}/invoice/page`

// 企业名称模糊搜索
export const API_INVOICE_ENTERPRISE_NAME = `${host}/v2/enterpriseCard/newEntCardQuery`

const entCardQuery = (randomCode, key) => { return (params) => { return http.get(base.oaIp, `/v2/enterpriseCard/newEntCardQuery/${randomCode}/${key}`, params, false) } }
