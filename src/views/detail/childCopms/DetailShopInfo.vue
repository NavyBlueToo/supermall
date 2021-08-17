<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" />
      <span class="title">{{ shop.name }}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">{{ shop.sells | sellCountFilter }}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{ shop.goodsCount }}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{ 'score-better': item.isBetter }">
              {{ item.score }}
            </td>
            <td class="better" :class="{ 'better-more': item.isBetter }">
              <span>{{ item.isBetter ? "高" : "低" }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="enter-store">
      <a href="">
        <button>进店逛逛</button>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    sellCountFilter: function (value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    },
  },
};
</script>
<style scoped>
.shop-info {
  background-color: #fff;
}
.shop-top {
  display: flex;
  height: 70px;
}
.shop-top img {
  width: 50px;
  height: 50px;
  margin: 10px 10px;
  border-radius: 25px;
}
.shop-top .title {
  display: block;
  height: 70px;
  line-height: 70px;
  font-size: 18px;
}
.shop-middle {
  display: flex;
}
.shop-middle-item {
  flex: 1;
  text-align: center;
}
.shop-middle-left {
  margin: 15px 0;
}
.info-sells {
  right: 10px;
}
.info-sells,
.info-goods {
  float: left;
  width: 50%;
}
.info-goods {
  border-right: 1px solid #999;
}
.sells-count,
.sells-text {
  float: right;
}
.goods-count,
.sells-count {
  font-size: 14px;
  height: 18px;
  width: 70%;
  margin-bottom: 5px;
  line-height: 18px;
}
.sells-text,
.goods-text {
  font-size: 10px;
  width: 70%;
}
.shop-middle-right {
  font-size: 10px;
  margin-left: 12px;
  margin-top: 6px;
  margin-bottom: 6px;
}
table {
  height: 60px;
  margin: 0px auto;
}
table td {
  /* height: 10px; */
  float: left;
  padding-right: 6px;
}
table td:last-child {
  color: #fff;
  padding-right: 0px;
}
.better {
  float: right;
  background-color: green;
}
.better-more {
  background-color: red;
}
.score {
  color: green;
}
.score-better {
  color: red;
}
.enter-store {
  text-align: center;
  border-bottom: 5px solid #f2f5f8;
}
.enter-store button {
  width: 50%;
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: #f2f5f8;
  margin-bottom: 20px;
}
</style>