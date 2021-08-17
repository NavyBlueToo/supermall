import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'

import VueLazyLoad from 'vue-lazyload'
import errorImg from 'assets/img/common/placeholder.png'
import loadingImg from 'assets/img/common/placeholder.png'

Vue.use(VueLazyLoad, { // 注意：此项一定要写在new Vue（{}）之前，否则会报错：[Vue warn]: Failed to resolve directive: lazy
  preload: 1.3, // 预加载高度比例
  error: errorImg, // 图片路径出错时加载图片 此处
  loading: loadingImg, // 预加载图片
  attempt: 10, // 尝试加载图片数量
  observer: true,
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  toast
}).$mount('#app')
