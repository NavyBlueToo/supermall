<template>
  <div id="hy-swiper">
    <div
      class="swiper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot></slot>
    </div>

    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <div
          class="indi-item"
          v-for="(item, index) in slideCount"
          :class="{ active: index === currentIndex - 1 }"
          :key="index"
        ></div>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Swiper",
  props: {
    //滚动间隔时间（自动）
    interval: {
      type: Number,
      default: 3000,
    },
    //滚动动画持续的时间
    duration: {
      type: Number,
      default: 300,
    },
    //移动的比率
    moveRatio: {
      type: Number,
      default: 0.25,
    },
    //显示指示
    showIndicator: {
      type: Boolean,
      default: true,
    },
  },
  data: function () {
    return {
      slideCount: 0, // 滑动图片元素的个数
      totalWidth: 0, // 滑动图片组件的宽度（隐藏的不算）
      swiperStyle: {}, // 滑动图片的样式
      currentIndex: 1, //当前图片组件的编号
      scrolling: false, //是否正在滚动
    };
  },
  mounted: function () {
    // 1.操作DOM, 在前后添加Slide
    setTimeout(() => {
      this.handleDom();

      // 2.开启定时器
      this.startTimer();
    }, 500);
  },
  methods: {
    /**
     * 1.定时器-开始
     */
    startTimer() {
      this.palyTimer = window.setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval);
    },
    /**
     * 2.定时器-停止
     */
    stopTimer() {
      window.clearInterval(this.palyTimer);
    },
    /**
     * 3.自动滚动，开始,currentPosition为当前的位置
     */
    scrollContent(currentPosition) {
      //更改滚动状态
      this.scrolling = true;
      //设置滚动动画时间
      this.swiperStyle.transition = "transform" + this.duration + "ms";
      //设置滚动的位置
      this.setTransform(currentPosition);

      this.checkPosition();

      //滚动完成后，更改滚动的状态
      this.scrolling = false;
    },
    /**
     * 4.设置滚动的位置
     */
    setTransform(position) {
      //设置向左滑动position px的距离
      this.swiperStyle.transform = `translate3d(${position}px,0,0)`;
      //兼容苹果浏览器
      this.swiperStyle["-webkit-transform"] = `translate3d(${position}px,0,0)`;
      //兼容IE浏览器
      this.swiperStyle["-ms-transform"] = `translate3d(${position}px,0,0)`;
    },
    /**
     * 5.校验图片滑动的位置
     */
    checkPosition() {
      window.setTimeout(() => {
        //初始化动画滑动动作
        this.swiperStyle.transition = "0ms";
        //当滑动到最后一页时
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
          //当滑动到第一页继续向前滑动时
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }
        //结束之后回调
        this.$emit("transitionEnd", this.currentIndex - 1);
      }, this.duration);
    },
    /**
     * 6.根据后台返回的数据，通过操作Dom，来给滚动图片的首、尾各加一张图，第一张前加一张尾图，最后一张图后加一张首图
     */
    handleDom() {
      //获取轮播图组件节点
      let swiperEl = document.querySelector(".swiper");
      //获取所有的轮播图节点数组
      let slidesEls = swiperEl.getElementsByClassName("slide");

      //保存轮播图的数量
      this.slideCount = slidesEls.length;

      //3.如果结果大于1个，则进行首、尾的图片添加
      if (this.slideCount > 1) {
        //获取并拷贝首、尾轮播图
        let cloneFirst = slidesEls[0].cloneNode(true);
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
        swiperEl.insertBefore(cloneLast, slidesEls[0]);
        swiperEl.appendChild(cloneFirst);
        this.totalWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;
      }

      //让默认显示的尾第二张图（因为第一张是尾页）
      this.setTransform(-this.totalWidth);
    },
    /**
     * 7.拖动事件处理
     */
    touchStart(e) {
      //触摸时，不可拖动
      if (this.scrolling) return;
      //停止定时器
      this.stopTimer();
      //保存开始滚动时候的位置
      this.startX = e.touches[0].pageX;
    },
    /**
     * 8.手指移动事件处理
     */
    touchMove(e) {
      //计算出移动的距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;
      //设置当前的位置
      this.setTransform(moveDistance);
    },
    /**
     * 9.手指离开事件处理
     */
    touchEnd(e) {
      // 1.获取移动的距离
      let currentMove = Math.abs(this.distance);
      // 2.判断最终的距离
      if (this.distance === 0) {
        return;
      } else if (
        this.distance > 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        // 右边移动超过0.5
        this.currentIndex--;
      } else if (
        this.distance < 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        // 向左移动超过0.5
        this.currentIndex++;
      }
      //移动到正确的位置
      this.scrollContent(-this.currentIndex * this.totalWidth);
      // 4.移动完成后重新开启定时器
      this.startTimer();
    },
    /**
     * 10.手指拨动图片切换
     */
    changeItem(num) {
      //移除定时器
      this.stopTimer();
      //修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);
      //添加定时器
      this.startTimer();
    },
    /**
     * 向前拨动图片
     */
    pervious() {
      this.changeItem(-1);
    },
    /**
     * 向后拨动图片
     */
    next() {
      this.changeItem(1);
    },
  },
};
</script>
<style scoped>
#hy-swiper {
  position: relative;
  overflow: hidden;
}
.swiper {
  display: flex;
}
.indicator {
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  bottom: 8px;
}
.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  background-color: #fff;
  margin: 0 5px;
}
.indi-item.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>