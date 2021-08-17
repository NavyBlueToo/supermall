import Toast from './Toast';
import Vue from 'vue'

const toastContrustor = Vue.extend(Toast)
const toast = new toastContrustor();
toast.$mount(document.createElement('div'))
document.body.appendChild(toast.$el)
Vue.prototype.$toast = toast

export default toast
