<template>
  <swiper>
    <swiper-item v-for="(item, id) in banners" :key="id">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImgLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      imageLoad: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    swiperImgLoad() {
      if (!this.imageLoad) {
        this.$emit("swiperImgLoad");
        this.imageLoad = true;
      }
    },
  },
};
</script>
<style scoped>
</style>