import { ADD_COUNTER, AAD_TO_CART } from "./mutation-types"

/**
 * 查找是否已经存在于购物车中，存在的数量+1，不存在push进入
 */
export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
        reject('商品数量添加失败')
      } else {
        payload.count = 1
        context.commit(AAD_TO_CART, payload)
        resolve('成功将该产品加入购物车')
        reject('新增商品失败')
      }
    })
  }
}