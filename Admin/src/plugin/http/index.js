import Vue from 'vue'
import HttpUtils from './http'
class Https {
  getOpenId = (params) => {
    return HttpUtils.get('/api/reportDateDZS.action', params)
  }
  // 商品分类查询
  getCategoryList = (parmas) => {
    return HttpUtils.get('/category',parmas)
  }
  // 新增商品分类
  postAddCategory = (parmas) => {
      return HttpUtils.post('/category',parmas)
  }
  // 修改商品分类
  postChangeCatePory = (parmas) =>{
      const {id} = parmas
      let url = `/category/${id}`
      return HttpUtils.post(url,parmas)
  }
  // 修改商品
  getGoodsList = (parmas) =>{
      return HttpUtils.get('/goods',parmas)
  }
  // 添加商品
  postAddGoods = (parmas) =>{
      return HttpUtils.post('/goods',parmas)
  }
  // 修改商品状态
  postUpdateGoodsStatus = (params) =>{
      const {id} = params
      let url = `/goods/updateStatus/${id}`
      return HttpUtils.post(url,params)
  }
    // 修改商品状态
    postChangeGoods = (params) =>{
        const {id} = params
        console.log(params)
        let url = `/goods/${id}`
        return HttpUtils.post(url,params)
    }
  postLogin = (params) => {
      return HttpUtils.post('/login', params)
  }
}
Vue.prototype.$http = new Https()