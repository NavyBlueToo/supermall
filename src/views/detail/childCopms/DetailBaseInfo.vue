<template>
  <div class="detail-base-info" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span class="discount" v-if="goods.discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span id="span-center">{{ goods.columns[1] }}</span>
      <span id="span-right">{{
        goods.services[goods.services.length - 1].name
      }}</span>
    </div>
    <div class="info-service">
      <span
        class="info-service-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style scoped>
.detail-base-info {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
  background-color: #fff;
}
.info-title {
  color: #222;
}
.info-price {
  position: relative;
  margin-top: 10px;
}
.info-price .n-price {
  font-size: 24px;
  color: var(--color-high-text);
}
.info-price .o-price {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}
.info-price .discount {
  position: absolute;
  top: 20%;
  font-size: 12px;
  padding: 2px 5px;
  margin-left: 5px;
  border-radius: 8px;
  color: #fff;
  background-color: var(--color-high-text);
}
.info-other {
  display: flex;
  font-size: 13px;
  line-height: 28px;
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom: 1px solid #f2f5f8;
}
.info-other span {
  flex: 1;
}
#span-center,
#span-right {
  margin-left: auto;
}
.info-service {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}
.info-service-item img {
  position: relative;
  width: 14px;
  height: 14px;
  top: 2px;
}
.info-service-item span {
  font-size: 13px;
  color: #333;
}
</style>