<template>
  <div class="bottom-bar">
    <div class="bottom-bar-check">
      <check-button class="check-button" :isChecked="AllClick" />
      <span @click="toAllClick">全选</span>
    </div>
    <div class="total-price">
      <span> 总计 {{ totalPrice !== 0 ? totalPrice : 0 }} </span>
    </div>
    <div class="calculate" @click="calcClick">
      <span>去结算（{{ productConut !== 0 ? productConut : 0 }}）</span>
    </div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkButton/CheckButton";

import { mapGetters } from "vuex";

export default {
  components: { CheckButton },
  name: "CartBottomBar",
  methods: {
    toAllClick() {
      if (this.AllClick) {
        return this.cartList.forEach((item) => (item.checked = false));
      } else {
        return this.cartList.forEach((item) => (item.checked = true));
      }
    },
    calcClick() {
      if (!this.AllClick) {
        this.$toast.show("您还未选择商品", 2000);
      }
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    productConut() {
      return this.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    AllClick() {
      if (this.cartList.length === 0) {
        return false;
      } else {
        return !this.cartList.find((item) => !item.checked);
      }
    },
  },
};
</script>
<style scoped>
.bottom-bar {
  display: flex;
  align-items: center;
  height: 40px;

  background-color: var(--color-tint);
}
.check-button {
  font-size: 0;
}
.check-button img {
  color: rgb(87, 85, 85);
}
.bottom-bar-check,
.total-price {
  padding-left: 5px;
  background-color: rgb(224, 223, 223);
  font-size: 14px;
  color: rgb(87, 85, 85);
}
.bottom-bar-check {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.bottom-bar-check span {
  padding-left: 5px;
}
.total-price,
.calculate {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
}
.calculate {
  font-weight: 700;
  color: #fff;
}
</style>