<template>
  <div class="shop-item">
    <div class="item-selector">
      <check-button :isChecked="product.checked" @click.native="checkClick" />
    </div>
    <div class="item-img">
      <img :src="product.image" alt="" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">{{ product.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{ product.price }}</div>
        <div class="item-count right">×{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  components: { CheckButton },
  name: "CartListItem",
  props: {
    product: Object,
    default() {
      return {};
    },
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked;
    },
  },
};
</script>
<style scoped>
.shop-item {
  display: flex;
  width: 100%;
  padding: 5px;
  font-size: 0;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  display: flex;
  width: 20px;
  justify-content: center;
  align-items: center;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-info {
  position: relative;
  overflow: hidden;
  padding: 5px 10px;
  font-size: 17px;
  color: #333;
}
.item-info .item-desc {
  margin-top: 15px;
  font-size: 14px;
  color: #666;
}
.info-bottom {
  position: absolute;
  margin-top: 10px;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.info-bottom .item-price {
  color: orangered;
}
</style>