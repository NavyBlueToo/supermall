<template>
  <div class="image-info" v-if="Object.keys(imagesInfo).length !== 0">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ imagesInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div v-for="item in imagesInfo.detailImage">
      <div class="info-key">{{ item.key }}</div>
      <div class="info-list">
        <img
          v-for="(item, index) in item.list"
          :key="index"
          :src="item"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailImageInfo",
  props: {
    imagesInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style scoped>
.image-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
  background-color: #fff;
}
.info-desc {
  padding: 0 15px;
}
.info-desc .start,
.info-desc .end {
  position: relative;
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
}
.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}
.info-desc .end {
  float: right;
}
.info-desc .end::after {
  right: 0;
}
.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}
.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}
.info-list {
  width: 100%;
}
.info-list img {
  width: 100%;
}
</style>