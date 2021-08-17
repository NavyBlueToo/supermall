<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav-bar"
      @titleClick="tClick"
      ref="detailNav"
    />
    <scroll class="content" ref="scroll" @scroll="detailScroll" :probe-type="3">
      <detail-top-image :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-image-info :imagesInfo="imagesInfo" />
      <detail-params-info ref="params" :paramsInfo="paramsInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="goods" :goods="recommend" />
    </scroll>
    <detail-bottom-bar @addCart="addStore" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>
<script>
import DetailNavBar from "./childCopms/DetailNavBar";
import DetailTopImage from "./childCopms/DetailTopImage";
import DetailBaseInfo from "./childCopms/DetailBaseInfo";
import DetailShopInfo from "./childCopms/DetailShopInfo";
import DetailImageInfo from "./childCopms/DetailImageInfo";
import DetailParamsInfo from "./childCopms/DetailParamsInfo";
import DetailCommentInfo from "./childCopms/DetailCommentInfo";
import DetailBottomBar from "./childCopms/DetailBottomBar";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/Detail";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/common/backTop/BackTop";

import { backTopMixin } from "common/mixin";

import { mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    Scroll,
    GoodsList,
    DetailNavBar,
    DetailTopImage,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    BackTop,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      imagesInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommend: [],
      titleClick: [],
      currentIndex: 0,
    };
  },
  mixins: [backTopMixin],
  created() {
    this.iid = this.$route.params.id;
    getDetail(this.iid).then((res) => {
      const data = res.result;
      //获取首部banner图
      this.topImages = data.itemInfo.topImages;
      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //获取图片详情
      this.imagesInfo = data.detailInfo;
      //获取参数列表
      this.paramsInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取评论详情
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //获取推荐商品
    getRecommend().then((res) => {
      this.recommend = res.data.list;
      // console.log(res.data.list);
    });
    // 定时器，用于判断文档和所有子资源(图片、音视频等)已完成加载
    var _this = this;
    var timer = setInterval(function () {
      if (document.readyState === "complete") {
        //执行方法
        _this.initTitleClick();
        window.clearInterval(timer);
      }
    }, 500);
  },
  methods: {
    ...mapActions(["addCart"]),
    tClick(index) {
      // console.log(-this.titleClick[index]);
      this.$refs.scroll.scroll.scrollTo(0, -this.titleClick[index], 500);
    },
    //获取各模块的offsetTop，实现点击首部跳转
    initTitleClick() {
      this.titleClick = [];

      this.titleClick.push(0);
      this.titleClick.push(this.$refs.params.$el.offsetTop);
      this.titleClick.push(this.$refs.comment.$el.offsetTop);
      this.titleClick.push(this.$refs.goods.$el.offsetTop);
      this.titleClick.push(Number.MAX_VALUE);
      // console.log(this.titleClick);
    },
    //设置首部导航随动
    detailScroll(position) {
      const positionY = -position.y;
      // console.log(positionY);
      let length = this.titleClick.length;

      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.titleClick[i] &&
          positionY < this.titleClick[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.detailNav.currentIndex = this.currentIndex;
        }
      }
      this.listenShowBackTop(position);
    },
    //添加购物车
    addStore() {
      //获取购物车所需的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      this.addCart(product).then((res) => {
        this.$toast.show(res, 2000);
      });
    },
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  overflow: hidden;
  height: 100vh;
  z-index: 9;
  background-color: #fff;
}
.content {
  position: absolute;
  background-color: #fff;
  height: calc(100% - 101px);
  width: 100%;
}
</style>