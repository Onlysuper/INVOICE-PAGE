/**
 * NOTE HOST、HOST_M 是在 config 中通过 defineConstants 配置的
 * 只所以不在代码中直接引用，是因为 eslint 会报 no-undef 的错误，因此用如下方式处理
 */
/* eslint-disable */
export const host = HOST
export const hostM = HOST_M
import request from './request'
// const getOrderInfo = () => {return (params)=>{return service.get(`${host}/invoice/electronic/query/customer`,params)}}
const getOrderInfo = () => {return (params)=>{return request.get(`${host}/invoice/electronic/query/customer`,params)}}
const getOrderInfo2 = () => {return (params)=>{return request.get(`${hostM}/xhr/rcmd/index.json`,params)}}
export {
    //获取电子发票订单信息
    getOrderInfo,
    getOrderInfo2
}