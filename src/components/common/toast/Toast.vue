<template>
  <div class="toast" v-show="isShow">
    <transition name="toast">
      <div>{{ message }}</div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(msg = "操作成功！", timer = 1500) {
      this.isShow = true;
      this.message = msg;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, timer);
    },
  },
};
</script>
<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  z-index: 999;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 2px;
}
.toast-enter,
.toast-leave-to {
  opacity: 0;
}
.toast-enter-to,
.toast-leave {
  opacity: 1;
}
.toast-enter-active,
.toast-leave-active {
  transition: all 2s;
}
</style>