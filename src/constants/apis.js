/* eslint-disable */
export const host = HOST
export const hostM = HOST_M
/* eslint-enable */

// 电子发票订单信息
export const API_INVOICE_ElECTRIC_ORDER = `${host}/invoice/electronic/query/customer`

// 根据openid获取开票记录
export const API_INVOICE_ElECTRIC_RECORD= `${host}/invoice/page`

// 开电子发票
export const API_INVOICE_ElECTRIC_PAYMENT= `${host}/invoice/electronic/open`


// 企业名称模糊模糊查询
export const API_INVOICE_ENTERPRISE_NAME = `${hostM}/v2/enterpriseCard/newEntCardQuery`
//航信企业名称模糊查询
export const API_INVOICE_ENTERPRISE_NAME_HX = `${hostM}/v2/enterpriseCard/taxNoQuery`

