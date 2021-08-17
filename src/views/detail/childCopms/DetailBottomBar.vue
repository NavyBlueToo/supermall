<template>
  <div class="bottom-bar">
    <div class="bar-item item-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">搜藏</span>
      </div>
    </div>
    <div class="bar-item item-right">
      <div class="cart" @click="addCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addCart() {
      this.$emit("addCart");
    },
  },
};
</script>
<style scoped>
.bottom-bar {
  position: fixed;
  display: flex;
  bottom: 0px;
  height: 58px;
  width: 100%;
  text-align: center;
  /* border-top: 1px solid #666; */
  box-shadow: 0 3px 3px rgba(100, 100, 100, 0.3);
}
.bar-item {
  display: flex;
  flex: 1;
}
.bar-item > div {
  flex: 1;
}
.item-left {
  font-size: 13px;
  background-color: #fff;
}
.item-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 10px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
.item-left .service {
  background-position: 0 -54px;
}
.item-left .shop {
  background-position: 0 -98px;
}
.cart,
.buy {
  height: 59px;
  line-height: 59px;
  color: #666;
  font-size: 15px;
}
.cart {
  background-color: yellow;
}
.buy {
  color: #fff;
  font-weight: 700;
  background-color: pink;
}
</style>