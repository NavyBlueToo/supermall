import { ADD_COUNTER, AAD_TO_CART } from "./mutation-types"

/**
 * 更新购物车商品数量/加新商品进购物车
 */
export default {
  [ADD_COUNTER](state, oldProduct) {
    oldProduct.count++
  },
  [AAD_TO_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload)
  }
}