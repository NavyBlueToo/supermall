<template>
  <div class="cart">
    <nav-bar class="cart_nav">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <cart-list />
    <cart-bottom-bar />
  </div>
</template>
<script>
import CartList from "./childComps/cartList";
import CartBottomBar from "./childComps/CartBottomBar";

import NavBar from "components/common/navbar/NavBar";

import { mapGetters } from "vuex";

export default {
  name: "cart",
  components: {
    CartList,
    CartBottomBar,
    NavBar,
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
};
</script>
<style scoped>
.cart_nav {
  position: relative;
  z-index: 9;
  color: #fff;
  background-color: var(--color-tint);
}
</style>