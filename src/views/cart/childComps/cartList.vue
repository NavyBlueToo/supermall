<template>
  <div class="cart-list">
    <scroll class="cart-score" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      />
    </scroll>
  </div>
</template>
<script>
import CartListItem from "./CartListItem";

import Scroll from "components/common/scroll/Scroll";

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: { Scroll, CartListItem },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.scroll.refresh();
  },
};
</script>
<style scoped>
.cart-list {
  height: calc(100vh - 93px - 40px);
}
.cart-score {
  overflow: hidden;
  height: 100%;
}
</style>
