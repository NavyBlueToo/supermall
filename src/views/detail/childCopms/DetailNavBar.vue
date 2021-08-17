<template>
  <nav-bar class="nav-bar">
    <div class="back" slot="left" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="" />
    </div>
    <div class="title" slot="center">
      <div
        class="itemTitle"
        v-for="(item, index) in titles"
        @click="itemClick(index)"
        :class="{ active: index === currentIndex }"
      >
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  props: {},
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.currentIndex = 0;
      this.$router.back();
    },
  },
};
</script>
<style scoped>
.nav-bar {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.back {
  margin-top: 8px;
}
.title {
  display: flex;
  font-size: 14px;
}
.itemTitle {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
</style>